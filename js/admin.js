// Logique d'administration et de gestion des scores / classements
const ADMIN_UTILS = {
  // Mot de passe admin par défaut
  DEFAULT_PASSCODE: "admin2026",

  // Clés de stockage LocalStorage
  KEYS: {
    LEAGUE_STATE: "worldcup_league_state",
    USER_STATE: "worldcup_user_state"
  },

  // Générer un code d'exportation pour un joueur (Base64 compact)
  generateExportCode(userProfile, predictions) {
    try {
      const exportData = {
        id: userProfile.id,
        name: userProfile.username,
        avatar: userProfile.avatar,
        discriminator: userProfile.discriminator || "0000",
        provider: userProfile.provider || "discord",
        predictions: predictions,
        timestamp: Date.now()
      };
      
      const jsonStr = JSON.stringify(exportData);
      // Utilisation de btoa avec encodage UTF-8 sécurisé pour le français (accents)
      const utf8Bytes = new TextEncoder().encode(jsonStr);
      let binary = "";
      utf8Bytes.forEach(byte => binary += String.fromCharCode(byte));
      const base64 = btoa(binary);
      
      return `WC26PR_${base64}`;
    } catch (e) {
      console.error("Erreur lors de la génération du code d'exportation:", e);
      return null;
    }
  },

  // Décoder un code d'exportation de joueur
  parseExportCode(code) {
    if (!code || !code.startsWith("WC26PR_")) {
      throw new Error("Format de code invalide. Le code doit commencer par 'WC26PR_'.");
    }

    try {
      const base64 = code.substring(7);
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const jsonStr = new TextDecoder().decode(bytes);
      const data = JSON.parse(jsonStr);
      
      if (!data.id || !data.name || !data.predictions) {
        throw new Error("Données manquantes dans le code.");
      }
      return data;
    } catch (e) {
      console.error("Erreur lors du décodage du code:", e);
      throw new Error("Impossible de décoder le code de pronostics. Fichier corrompu ?");
    }
  },

  // Initialiser l'état de la ligue
  initializeLeagueState() {
    const defaultMatches = getInitialMatches();
    const state = {
      passcode: this.DEFAULT_PASSCODE,
      matches: defaultMatches,
      players: {
        "mock_player_1": {
          id: "mock_player_1",
          name: "Lucas (Pro)",
          avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
          discriminator: "1337",
          provider: "discord",
          predictions: {
            "1": { homeScore: 2, awayScore: 1 },
            "2": { homeScore: 1, awayScore: 1 },
            "3": { homeScore: 3, awayScore: 0 },
            "4": { homeScore: 0, awayScore: 2 }
          },
          points: 0,
          correct: 0,
          exacts: 0,
          totalPredictions: 4
        },
        "mock_player_2": {
          id: "mock_player_2",
          name: "Sarah (Queen)",
          avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
          discriminator: "4242",
          provider: "discord",
          predictions: {
            "1": { homeScore: 1, awayScore: 1 },
            "2": { homeScore: 2, awayScore: 0 },
            "3": { homeScore: 2, awayScore: 2 },
            "4": { homeScore: 1, awayScore: 3 }
          },
          points: 0,
          correct: 0,
          exacts: 0,
          totalPredictions: 4
        }
      }
    };

    // Mettre à jour quelques résultats de matchs pour la démo
    const m1 = defaultMatches.find(m => m.id === 1);
    if (m1) { m1.homeScore = 2; m1.awayScore = 1; m1.status = "finished"; m1.winner = "home"; }
    const m2 = defaultMatches.find(m => m.id === 2);
    if (m2) { m2.homeScore = 2; m2.awayScore = 0; m2.status = "finished"; m2.winner = "home"; }
    const m3 = defaultMatches.find(m => m.id === 3);
    if (m3) { m3.homeScore = 2; m3.awayScore = 2; m3.status = "finished"; m3.winner = "draw"; }
    const m4 = defaultMatches.find(m => m.id === 4);
    if (m4) { m4.homeScore = 1; m4.awayScore = 3; m4.status = "finished"; m4.winner = "away"; }

    this.recalculatePoints(state);
    return state;
  },

  // Charger l'état de la ligue
  loadLeagueState() {
    let stateStr = localStorage.getItem(this.KEYS.LEAGUE_STATE);
    if (!stateStr) {
      return this.initializeLeagueState();
    }
    try {
      const state = JSON.parse(stateStr);
      // S'assurer que la structure de base existe
      if (!state.matches || !state.players) {
        return this.initializeLeagueState();
      }
      if (!state.passcode) {
        state.passcode = this.DEFAULT_PASSCODE;
      }
      return state;
    } catch (e) {
      console.error("Erreur chargement état ligue:", e);
      return this.initializeLeagueState();
    }
  },

  // Sauvegarder l'état de la ligue
  saveLeagueState(state) {
    if (!state.passcode) {
      const existing = localStorage.getItem(this.KEYS.LEAGUE_STATE);
      if (existing) {
        try {
          const parsed = JSON.parse(existing);
          if (parsed && parsed.passcode) {
            state.passcode = parsed.passcode;
          }
        } catch (e) {}
      }
    }
    if (!state.passcode) {
      state.passcode = this.DEFAULT_PASSCODE;
    }
    localStorage.setItem(this.KEYS.LEAGUE_STATE, JSON.stringify(state));
  },

  // Recalculer les points de tous les joueurs de la ligue
  recalculatePoints(state) {
    const matches = state.matches;
    const players = state.players;
    
    // Obtenir le barème des points pour chaque phase
    const stages = WORLD_CUP_DATA.stages;

    Object.keys(players).forEach(playerId => {
      const player = players[playerId];
      let totalPoints = 0;
      let correctPredictions = 0;
      let exactScoresCount = 0;
      let totalPredictionsCount = 0;

      // Sécurité si predictions est absent ou invalide
      if (!player.predictions || typeof player.predictions !== "object") {
        player.predictions = {};
      }

      // Parcourir tous les paris du joueur
      Object.keys(player.predictions).forEach(matchIdStr => {
        const matchId = parseInt(matchIdStr);
        const pred = player.predictions[matchIdStr];
        
        if (!pred) return;
        
        // Extraction des pronostics (support de la compatibilité avec l'ancien format string)
        let predHomeScore = null;
        let predAwayScore = null;
        let predWinner = null;
        
        if (typeof pred === "object") {
          predHomeScore = pred.homeScore;
          predAwayScore = pred.awayScore;
          if (predHomeScore !== null && predAwayScore !== null && predHomeScore !== "" && predAwayScore !== "") {
            const h = parseInt(predHomeScore);
            const a = parseInt(predAwayScore);
            predWinner = h > a ? "home" : (h < a ? "away" : "draw");
          }
        } else if (typeof pred === "string") {
          predWinner = pred;
        }
        
        if (!predWinner) return;
        totalPredictionsCount++;

        // Trouver le match correspondant
        const match = matches.find(m => m.id === matchId);
        const calc = calculatePredictionPoints(match, predWinner, predHomeScore, predAwayScore);
        if (calc.isCorrect) {
          totalPoints += calc.points;
          correctPredictions++;
          if (calc.isExact) {
            exactScoresCount++;
          }
        }
      });

      player.points = totalPoints;
      player.correct = correctPredictions;
      player.exacts = exactScoresCount;
      player.totalPredictions = totalPredictionsCount;
    });

    state.players = players;
    this.saveLeagueState(state);
  },

  // Mettre à jour le résultat d'un match (côté Administrateur)
  updateMatchResult(state, matchId, homeScore, awayScore, isFinished, oddsHome, oddsDraw, oddsAway) {
    const match = state.matches.find(m => m.id === matchId);
    if (!match) return false;

    // BLOCAGE : Si le match est déjà immutable (résultat définitif), refuser toute modification
    if (match.immutable) {
      console.warn(`Match #${matchId} est définitif et ne peut plus être modifié.`);
      return false;
    }

    // Toujours sauvegarder les cotes si fournies (même avant finalisation)
    if (oddsHome !== undefined) match.oddsHome = oddsHome ? parseFloat(oddsHome) : null;
    if (oddsDraw !== undefined) match.oddsDraw = oddsDraw ? parseFloat(oddsDraw) : null;
    if (oddsAway !== undefined) match.oddsAway = oddsAway ? parseFloat(oddsAway) : null;

    if (isFinished) {
      if (homeScore === null || awayScore === null) return false;
      
      match.homeScore = parseInt(homeScore);
      match.awayScore = parseInt(awayScore);
      match.status = "finished";
      match.immutable = true; // Résultat DEFINITIF - non modifiable
      
      if (match.homeScore > match.awayScore) {
        match.winner = "home";
      } else if (match.homeScore < match.awayScore) {
        match.winner = "away";
      } else {
        match.winner = "draw"; // Possible uniquement en poules
      }
    } else {
      // Remettre en attente (seulement si pas encore immutable)
      match.homeScore = null;
      match.awayScore = null;
      match.winner = null;
      match.status = "pending";
    }

    this.recalculatePoints(state);

    // --- Sauvegarde en ligne ---
    if (isSupabaseConfigured) {
      SUPABASE_API.saveMatchResult(match).then(success => {
        if (success) {
          SUPABASE_API.fetchLeagueState(getInitialMatches(), true).then(newState => {
            if (newState) {
              APP_STATE.league = newState;
              // Rendre le panel admin à jour
              const activeTab = document.querySelector(".nav-link.active");
              if (activeTab && activeTab.getAttribute("data-tab") === "admin") {
                UI.renderAdminPanel();
              }
            }
          });
        }
      });
    }

    return true;
  },

  // Mettre à jour l'intitulé des équipes de phase finale (côté Admin)
  updateMatchTeams(state, matchId, homeTeamCode, awayTeamCode, homeLabel, awayLabel) {
    const match = state.matches.find(m => m.id === matchId);
    if (!match) return false;

    // Si on passe des codes d'équipes valides, on configure l'équipe
    match.homeTeam = homeTeamCode;
    match.awayTeam = awayTeamCode;
    
    if (homeLabel) {
      match.homeTeamLabel = homeLabel;
      match.homeTeamLabelEn = homeLabel;
    }
    if (awayLabel) {
      match.awayTeamLabel = awayLabel;
      match.awayTeamLabelEn = awayLabel;
    }

    this.saveLeagueState(state);

    // --- Sauvegarde en ligne ---
    if (isSupabaseConfigured) {
      SUPABASE_API.saveMatchResult(match).then(success => {
        if (success) {
          SUPABASE_API.fetchLeagueState(getInitialMatches(), true).then(newState => {
            if (newState) {
              APP_STATE.league = newState;
              // Rendre le panel admin à jour
              const activeTab = document.querySelector(".nav-link.active");
              if (activeTab && activeTab.getAttribute("data-tab") === "admin") {
                UI.renderAdminPanel();
              }
            }
          });
        }
      });
    }

    return true;
  },

  // Importer le code d'un joueur dans la ligue
  importPlayerCode(state, code) {
    try {
      const playerData = this.parseExportCode(code);
      
      // Enregistrer ou mettre à jour le joueur
      state.players[playerData.id] = {
        id: playerData.id,
        name: playerData.name,
        avatar: playerData.avatar,
        discriminator: playerData.discriminator,
        provider: playerData.provider || "discord",
        predictions: playerData.predictions,
        points: 0, // Sera calculé immédiatement après
        correct: 0
      };

      this.recalculatePoints(state);
      return state.players[playerData.id];
    } catch (e) {
      throw e;
    }
  },

  // Supprimer un joueur de la ligue
  removePlayer(state, playerId) {
    if (state.players[playerId]) {
      delete state.players[playerId];
      this.recalculatePoints(state);

      // --- Sauvegarde en ligne ---
      if (isSupabaseConfigured) {
        SUPABASE_API.removePlayer(playerId).then(success => {
          if (success) {
            SUPABASE_API.fetchLeagueState(getInitialMatches(), true).then(newState => {
              if (newState) {
                APP_STATE.league = newState;
                // Rendre le panel admin à jour
                const activeTab = document.querySelector(".nav-link.active");
                if (activeTab && activeTab.getAttribute("data-tab") === "admin") {
                  UI.renderAdminPanel();
                }
              }
            });
          }
        });
      }

      return true;
    }
    return false;
  },

  // Générer le fichier JSON de la ligue globale pour distribution
  getLeagueExportJSON(state) {
    return JSON.stringify({
      version: "WC2026-V1",
      timestamp: Date.now(),
      matches: state.matches,
      players: state.players
    }, null, 2);
  },

  // Importer un fichier de ligue globale (pour mettre à jour les matchs + leaderboard)
  importLeagueJSON(state, jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.matches || !data.players) {
        throw new Error("Format de fichier de ligue invalide.");
      }

      state.matches = data.matches;
      state.players = data.players;
      
      this.recalculatePoints(state);
      return true;
    } catch (e) {
      console.error(e);
      throw new Error("Impossible d'importer le fichier de ligue. Format corrompu.");
    }
  },

  // Basculer le verrouillage d'un match (côté Administrateur)
  toggleMatchLock(state, matchId) {
    const match = state.matches.find(m => m.id === matchId);
    if (!match) return false;

    if (match.status === "pending") {
      match.status = "locked";
    } else if (match.status === "locked") {
      match.status = "pending";
    }

    this.saveLeagueState(state);

    // --- Sauvegarde en ligne ---
    if (isSupabaseConfigured) {
      SUPABASE_API.saveMatchResult(match).then(success => {
        if (success) {
          SUPABASE_API.fetchLeagueState(getInitialMatches(), true).then(newState => {
            if (newState) {
              APP_STATE.league = newState;
              // Rendre le panel admin à jour
              const activeTab = document.querySelector(".nav-link.active");
              if (activeTab && activeTab.getAttribute("data-tab") === "admin") {
                UI.renderAdminPanel();
              }
            }
          });
        }
      });
    }

    return true;
  }
};

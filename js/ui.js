// Rendu dynamique de l'interface utilisateur
const TRANSLATIONS = {
  fr: {
    dashboard: "Tableau de Bord",
    predict: "Pronostics",
    leaderboard: "Classement",
    admin: "Administration",
    welcome: "Bienvenue",
    stats_points: "Points cumulés",
    stats_correct: "Pronos corrects",
    stats_rank: "Votre classement",
    rules_title: "Comment marquer des points ?",
    rule_1: "<strong>Système de Cotes :</strong> Les points sont calculés d'après les vraies cotes de paris. Parier sur un outsider rapporte plus, mais c'est plus risqué !",
    rule_2: "<strong>Score exact = Bonus :</strong> Si tu trouves le score parfait, tu gagnes +50% en bonus. 🎯",
    rule_3: "<strong>Exemples de cotes :</strong> Cote 1.50 → 3pts | Cote 2.00 → 5pts | Cote 3.00 → 8pts | Cote 4.00 → 10pts | Cote 6.00 → 13pts",
    rule_4: "<strong>Anti-favori :</strong> Espérance quasi-égale pour tous les choix. Toujours parier sur le favori n'est pas optimal !",
    rule_5: "<strong>Résultats définitifs :</strong> Une fois l'admin entre le score, il est 🔒 permanent. La carte devient 🟢 verte (correct), 🔴 rouge (incorrect) ou 🔵 bleue (score exact !).",
    rule_6: "<strong>Pas d'argent réel !</strong> Jeu 100% fun entre amis, pour toute la compétition.",
    sync_title: "Jouer avec vos amis (Synchronisation)",
    sync_desc: "Pour jouer ensemble sans serveur centralisé, faites vos pronostics puis cliquez sur <strong>Exporter mes pronos</strong>. Copiez le code généré et envoyez-le à votre administrateur de ligue par Discord ! Une fois que l'administrateur vous a renvoyé le fichier de ligue mis à jour (JSON), importez-le ci-dessous pour actualiser le classement.",
    btn_export: "Exporter mes pronos",
    btn_copy: "Copier le code",
    btn_download_my: "Télécharger mes paris (JSON)",
    match_locked: "Pari verrouillé (Match commencé/fini)",
    match_correct: "Correct (+{pts} pts)",
    match_wrong: "Incorrect (+0 pts)",
    draw: "Match Nul",
    podium_empty: "Aucun joueur dans la ligue pour l'instant.",
    rank: "Rang",
    player: "Joueur",
    pts: "Points",
    correct_count: "Corrects",
    predict_count: "Total Paris",
    admin_login_title: "Connexion Administration",
    admin_pass_placeholder: "Entrez le mot de passe...",
    btn_login: "Se connecter",
    btn_logout: "Se déconnecter",
    admin_title: "Panneau d'Administration de la Ligue",
    admin_matches_tab: "Gestion des Matchs",
    admin_sync_tab: "Synchronisation & Joueurs",
    admin_enter_score: "Entrer le score",
    admin_match_finish: "Valider résultat",
    admin_match_reset: "Réinitialiser",
    admin_team_edit: "Définir les équipes (Phase finale)",
    admin_import_player: "Importer le code d'un joueur",
    admin_import_placeholder: "Collez le code de pronostics du joueur ici...",
    admin_btn_import: "Valider l'import",
    admin_players_list: "Joueurs enregistrés dans la ligue",
    admin_btn_remove: "Supprimer",
    admin_export_league: "Exporter la base de la Ligue (JSON)",
    admin_export_desc: "Partagez ce fichier ou son contenu avec vos joueurs. Ils pourront l'importer pour mettre à jour les résultats réels et le classement global sur leur propre navigateur !",
    admin_import_league: "Importer un fichier de Ligue (JSON)",
    admin_import_league_btn: "Charger le fichier Ligue",
    no_predictions_yet: "Vous n'avez pas encore fait de pronostics ! Allez dans l'onglet Pronostics.",
    predict_saved: "Pronostic enregistré !",
    code_copied: "Code copié dans le presse-papiers !",
    invalid_code: "Code invalide !",
    player_imported: "Joueur {name} importé avec succès !",
    league_imported: "Base de la ligue mise à jour !",
    save: "Sauvegarder",
    matchday: "Journée",
    winner_placeholder: "Vainqueur du match",
    placeholder_team: "En attente...",
    admin_btn_lock: "Verrouiller",
    admin_btn_unlock: "Déverrouiller",
    locked: "Verrouillé",
    pending: "En attente",
    finished: "Terminé",
    connected_via_discord: "Connecté avec Discord",
    connected_via_google: "Connecté avec Google"
  },
  en: {
    dashboard: "Dashboard",
    predict: "Predict",
    leaderboard: "Leaderboard",
    admin: "Admin",
    welcome: "Welcome",
    stats_points: "Total Points",
    stats_correct: "Correct Predicts",
    stats_rank: "Your Rank",
    rules_title: "How to earn points?",
    rule_1: "<strong>Odds-Based Points:</strong> Points are calculated from real betting odds. Picking an underdog earns more points but is riskier!",
    rule_2: "<strong>Exact Score Bonus:</strong> Predict the exact final score and earn +50% bonus points. 🎯",
    rule_3: "<strong>Points Examples:</strong> Odds 1.50 → 3pts | Odds 2.00 → 5pts | Odds 3.00 → 8pts | Odds 4.00 → 10pts | Odds 6.00 → 13pts",
    rule_4: "<strong>Anti-favorite:</strong> Expected value is nearly equal for all choices. Always picking favorites is NOT the optimal strategy!",
    rule_5: "<strong>Permanent Results:</strong> Once the admin enters the score, it's 🔒 permanent. Cards become 🟢 green (correct), 🔴 red (wrong) or 🔵 blue (exact score!).",
    rule_6: "<strong>No real money!</strong> 100% fun game between friends for the whole competition.",
    sync_title: "Play with Friends (Synchronization)",
    sync_desc: "To play together serverless, make your predictions and click <strong>Export Predictions</strong>. Copy the generated code and send it to your league admin via Discord! Once the admin sends you back the updated league file (JSON), import it below to refresh the leaderboard.",
    btn_export: "Export Predictions",
    btn_copy: "Copy Code",
    btn_download_my: "Download my bets (JSON)",
    match_locked: "Bet locked (Match started/finished)",
    match_correct: "Correct (+{pts} pts)",
    match_wrong: "Incorrect (+0 pts)",
    draw: "Draw",
    podium_empty: "No players in the league yet.",
    rank: "Rank",
    player: "Player",
    pts: "Points",
    correct_count: "Correct",
    predict_count: "Total Bets",
    admin_login_title: "Admin Portal",
    admin_pass_placeholder: "Enter password...",
    btn_login: "Login",
    btn_logout: "Logout",
    admin_title: "League Management Console",
    admin_matches_tab: "Match Manager",
    admin_sync_tab: "Sync & Players",
    admin_enter_score: "Enter score",
    admin_match_finish: "Submit Result",
    admin_match_reset: "Reset Match",
    admin_team_edit: "Set Teams (Knockout)",
    admin_import_player: "Import Player Code",
    admin_import_placeholder: "Paste player prediction code here...",
    admin_btn_import: "Verify & Import",
    admin_players_list: "Registered Players in League",
    admin_btn_remove: "Remove",
    admin_export_league: "Export League Base (JSON)",
    admin_export_desc: "Share this file or its contents with your players. They can import it to update real scores and the leaderboard on their own browsers!",
    admin_import_league: "Import League File (JSON)",
    admin_import_league_btn: "Load League File",
    no_predictions_yet: "You haven't made any predictions yet! Go to the Predict tab.",
    predict_saved: "Prediction saved!",
    code_copied: "Code copied to clipboard!",
    invalid_code: "Invalid code!",
    player_imported: "Player {name} imported successfully!",
    league_imported: "League base updated!",
    save: "Save",
    matchday: "Matchday",
    winner_placeholder: "Match winner",
    placeholder_team: "Waiting...",
    admin_btn_lock: "Lock",
    admin_btn_unlock: "Unlock",
    locked: "Locked",
    pending: "Pending",
    finished: "Finished",
    connected_via_discord: "Connected with Discord",
    connected_via_google: "Connected with Google"
  }
};

const UI = {
  lang: "fr", // Langue par défaut
  
  // Fonction de traduction pratique
  t(key, replace = {}) {
    let text = TRANSLATIONS[this.lang][key] || key;
    Object.keys(replace).forEach(placeholder => {
      text = text.replace(`{${placeholder}}`, replace[placeholder]);
    });
    return text;
  },

  getProviderBadgeHTML(provider) {
    const isGoogle = provider === "google";
    const tooltipKey = isGoogle ? "connected_via_google" : "connected_via_discord";
    const tooltip = this.t(tooltipKey);
    
    if (isGoogle) {
      return `
        <div class="provider-badge google" title="${tooltip}">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.091 14.974 0 12 0 7.354 0 3.307 2.68 1.347 6.58l3.919 3.185z"/>
            <path fill="#34A853" d="M16.04 15.345c-1.077.733-2.43 1.164-4.04 1.164-3.555 0-6.566-2.4-7.634-5.636L1.137 14.07C3.067 17.93 7.21 20.6 12 20.6c3.11 0 6.08-1.11 8.273-3.073l-4.233-2.182z"/>
            <path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.625-.215-2.4H12v4.55h6.48c-.28 1.48-1.12 2.73-2.38 3.58l4.233 2.182c2.474-2.28 3.89-5.64 3.89-9.64-.003-.105-.003-.217-.003-.322z"/>
            <path fill="#FBBC05" d="M4.366 10.873a7.115 7.115 0 0 1 0-2.836l-3.92-3.185A11.996 11.996 0 0 0 0 12c0 2.59.82 5.002 2.215 6.983l3.919-3.185a7.126 7.126 0 0 1-1.768-4.925z"/>
          </svg>
        </div>
      `;
    } else {
      return `
        <div class="provider-badge discord" title="${tooltip}">
          <svg viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.32,2.53-2a75.46,75.46,0,0,0,72.76,0c.81.7,1.66,1.38,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.24,123.6,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
          </svg>
        </div>
      `;
    }
  },

  // Changer de langue
  setLang(langCode) {
    if (TRANSLATIONS[langCode]) {
      this.lang = langCode;
      document.querySelector(".lang-btn").textContent = langCode.toUpperCase();
      this.updateStaticTexts();
      this.renderCurrentTab();
    }
  },

  // Mettre à jour les textes statiques dans le DOM
  updateStaticTexts() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (el.tagName === "INPUT" && el.type === "password") {
        el.placeholder = this.t(key);
      } else {
        el.innerHTML = this.t(key);
      }
    });
  },

  // Déterminer l'onglet actif et le re-rendre
  renderCurrentTab() {
    const activeTab = document.querySelector(".nav-link.active");
    if (!activeTab) return;
    
    const tabId = activeTab.getAttribute("data-tab");
    if (tabId === "dashboard") this.renderDashboard();
    else if (tabId === "predict") this.renderPredictPage();
    else if (tabId === "leaderboard") this.renderLeaderboard();
    else if (tabId === "admin") this.renderAdminPanel();
  },

  // ---- DASHBOARD ----
  renderDashboard() {
    const user = APP_STATE.user;
    const league = APP_STATE.league;
    const predictions = APP_STATE.predictions;

    // Calculer les stats de l'utilisateur actuel
    let userPoints = 0;
    let correctCount = 0;
    const totalPredictionsCount = Object.keys(predictions).length;

    let userRank = "-";
    if (user) {
      let userLeaguePlayer = (league && league.players) ? league.players[user.id] : null;
      if (userLeaguePlayer) {
        userPoints = userLeaguePlayer.points;
        correctCount = userLeaguePlayer.correct;
      } else {
        // Calculer les points locaux en direct pour le dashboard
        Object.keys(predictions).forEach(matchIdStr => {
          const matchId = parseInt(matchIdStr);
          const pred = predictions[matchIdStr];
          if (!pred) return;

          let predWinner = null;
          let predHomeScore = null;
          let predAwayScore = null;

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

          const match = league.matches.find(m => m.id === matchId);
          const calc = calculatePredictionPoints(match, predWinner, predHomeScore, predAwayScore);
          if (calc.isCorrect) {
            userPoints += calc.points;
            correctCount++;
          }
        });
      }

      // Calculer le rang dans la liste des joueurs
      const sortedPlayers = Object.values(league.players).sort((a, b) => b.points - a.points || b.correct - a.correct);
      const userIndex = sortedPlayers.findIndex(p => p.id === user.id);
      if (userIndex !== -1) {
        userRank = `${userIndex + 1} / ${sortedPlayers.length}`;
      } else if (sortedPlayers.length > 0) {
        // S'il n'est pas encore importé dans la ligue admin locale mais qu'il y a des joueurs
        userRank = `Non classé`;
      }
    }

    const container = document.getElementById("dashboard-tab");
    container.innerHTML = `
      <h2 class="panel-title" style="font-size: 1.8rem; margin-bottom: 30px;">
        ${this.t("welcome")}, ${user ? user.username : "Invite"} 👋
      </h2>
      
      <div class="dashboard-grid">
        <div class="dashboard-main">
          <!-- Stats Cards -->
          <div class="stats-panel">
            <div class="stat-card">
              <div class="stat-icon">🏆</div>
              <div class="stat-info">
                <h3>${this.t("stats_points")}</h3>
                <div class="stat-value">${userPoints} pts</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-info">
                <h3>${this.t("stats_correct")}</h3>
                <div class="stat-value">${correctCount} <span style="font-size: 1rem; font-weight: normal; color: var(--text-muted);">/ ${totalPredictionsCount}</span></div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-info">
                <h3>${this.t("stats_rank")}</h3>
                <div class="stat-value" style="font-size: 1.4rem;">${userRank}</div>
              </div>
            </div>
          </div>

          <!-- Rules Panel -->
          <div class="glass-panel">
            <h3 class="panel-title">${this.t("rules_title")}</h3>
            <ul class="rules-list">
              <li><span class="rule-number">1</span><p>${this.t("rule_1")}</p></li>
              <li><span class="rule-number">2</span><p>${this.t("rule_2")}</p></li>
              <li><span class="rule-number">3</span><p>${this.t("rule_3")}</p></li>
              <li><span class="rule-number">4</span><p>${this.t("rule_4")}</p></li>
              <li><span class="rule-number">5</span><p>${this.t("rule_5")}</p></li>
              <li><span class="rule-number">6</span><p>${this.t("rule_6")}</p></li>
            </ul>
          </div>
        </div>

        <div class="dashboard-side">
          <!-- Sync & Share Box -->
          <div class="glass-panel" style="margin-bottom: 0;">
            ${isSupabaseConfigured ? `
              <h3 class="panel-title" style="color: var(--color-success);">⚡ Synchro Cloud Active</h3>
              <div style="display: flex; flex-direction: column; gap: 15px; align-items: center; text-align: center; margin-top: 10px;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                  ☁️
                </div>
                <p style="color: var(--text-normal); font-weight: 600; font-size: 1.1rem; margin: 0;">Vos pronostics sont synchronisés en direct !</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin: 0;">
                  Grâce à la connexion en ligne (Supabase), tous vos pronostics sont enregistrés instantanément. Le classement et les scores sont mis à jour en temps réel pour tous les participants.
                </p>
                <div style="width: 100%; border-top: 1px solid var(--border-standard); padding-top: 15px; margin-top: 5px;">
                  <span style="font-size: 0.8rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 5px;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-success); display: inline-block;"></span>
                    Connecté de manière sécurisée
                  </span>
                </div>
              </div>
            ` : `
              <h3 class="panel-title">🔄 ${this.t("sync_title")}</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
                ${this.t("sync_desc")}
              </p>
              
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <button class="btn-primary" id="btn-export-code" style="width: 100%; justify-content: center;">
                  📤 ${this.t("btn_export")}
                </button>
                
                <div id="export-code-result" style="display: none; flex-direction: column; gap: 8px;">
                  <textarea class="console-textarea" id="txt-export-code" readonly style="height: 90px; margin-bottom: 0; font-size: 0.75rem; word-break: break-all;"></textarea>
                  <button class="btn-secondary" id="btn-copy-code" style="width: 100%; justify-content: center;">
                    📋 ${this.t("btn_copy")}
                  </button>
                </div>
                
                <button class="btn-secondary" id="btn-download-bets" style="width: 100%; justify-content: center;">
                  💾 ${this.t("btn_download_my")}
                </button>

                <div style="border-top: 1px solid var(--border-standard); margin-top: 8px; padding-top: 12px; display: flex; flex-direction: column; gap: 8px;">
                  <h4 style="font-size: 0.9rem; margin-bottom: 2px; color: var(--text-normal);">📥 ${this.t("admin_import_league")}</h4>
                  <input type="file" id="user-file-import-league" accept=".json" style="display: none;">
                  <button class="btn-secondary" id="btn-user-trigger-import-league" style="width: 100%; justify-content: center;">
                    🔌 ${this.t("admin_import_league_btn")}
                  </button>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Attacher les écouteurs d'événements (seulement si Supabase est désactivé)
    if (!isSupabaseConfigured) {
      document.getElementById("btn-export-code").addEventListener("click", () => {
        const code = ADMIN_UTILS.generateExportCode(user, predictions);
        if (code) {
          const area = document.getElementById("txt-export-code");
          area.value = code;
          document.getElementById("export-code-result").style.display = "flex";
          
          // Auto scroll/reveal
          area.select();
        }
      });

      document.getElementById("btn-copy-code").addEventListener("click", () => {
        const area = document.getElementById("txt-export-code");
        area.select();
        navigator.clipboard.writeText(area.value);
        alert(this.t("code_copied"));
      });

      document.getElementById("btn-download-bets").addEventListener("click", () => {
        const codeData = {
          user: user,
          predictions: predictions,
          timestamp: Date.now()
        };
        const blob = new Blob([JSON.stringify(codeData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `prono_worldcup2026_${user.username}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });

      const userFileInput = document.getElementById("user-file-import-league");
      document.getElementById("btn-user-trigger-import-league").addEventListener("click", () => {
        userFileInput.click();
      });

      userFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            ADMIN_UTILS.importLeagueJSON(league, event.target.result);
            APP_STATE.league = league; // Réassigner l'état mis à jour

            // S'assurer que le joueur actuellement connecté reste enregistré
            if (user) {
              if (!league.players[user.id]) {
                league.players[user.id] = {
                  id: user.id,
                  name: user.username,
                  avatar: user.avatar,
                  discriminator: user.discriminator || "0000",
                  provider: user.provider || "discord",
                  predictions: predictions || {},
                  points: 0,
                  correct: 0,
                  exacts: 0,
                  totalPredictions: 0
                };
              } else {
                // Fusionner ses pronostics locaux s'ils sont plus récents/complets
                league.players[user.id].predictions = {
                  ...league.players[user.id].predictions,
                  ...predictions
                };
                league.players[user.id].provider = user.provider || "discord";
              }
              ADMIN_UTILS.recalculatePoints(league);
            }

            alert(this.t("league_imported"));
            this.renderDashboard();
          } catch (err) {
            alert(err.message);
          }
        };
        reader.readAsText(file);
      });
    }
  },

  // ---- PRONOSTICS PAGE ----
  currentStageFilter: "GROUP", // GROUP, R32, R16, QF, SF, TP, FI
  currentGroupFilter: "A",

  renderPredictPage() {
    const container = document.getElementById("predict-tab");
    const matches = APP_STATE.league.matches;
    const predictions = APP_STATE.predictions;

    // Filtres des phases
    const stages = WORLD_CUP_DATA.stages;
    let filterButtonsHTML = "";
    Object.keys(stages).forEach(stageKey => {
      const activeClass = this.currentStageFilter === stageKey ? "active" : "";
      filterButtonsHTML += `
        <button class="filter-btn ${activeClass}" data-stage="${stageKey}">
          ${this.t(stages[stageKey].id === "GROUP" ? "GROUP" : stageKey)} (${stages[stageKey].points} pts)
        </button>
      `;
    });

    // Filtres des groupes (uniquement visible si phase de groupes sélectionnée)
    let groupFiltersHTML = "";
    if (this.currentStageFilter === "GROUP") {
      groupFiltersHTML += `<div class="groups-subfilters">`;
      Object.keys(WORLD_CUP_DATA.groups).forEach(gId => {
        const activeClass = this.currentGroupFilter === gId ? "active" : "";
        groupFiltersHTML += `
          <button class="subfilter-btn ${activeClass}" data-group="${gId}">${gId}</button>
        `;
      });
      groupFiltersHTML += `</div>`;
    }

    container.innerHTML = `
      <div class="matches-layout">
        <div class="stage-filters">
          ${filterButtonsHTML}
        </div>
        ${groupFiltersHTML}
        
        <div class="matches-grid" id="matches-grid-container">
          <!-- Les cartes de match seront générées ici -->
        </div>
      </div>
    `;

    // Attacher les écouteurs de filtres
    container.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.currentStageFilter = e.target.getAttribute("data-stage");
        this.renderPredictPage();
      });
    });

    if (this.currentStageFilter === "GROUP") {
      container.querySelectorAll(".subfilter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          this.currentGroupFilter = e.target.getAttribute("data-group");
          this.renderPredictPage();
        });
      });
    }

    // Filtrer et afficher les matchs
    this.renderMatchesGrid();
  },

  renderMatchesGrid() {
    const grid = document.getElementById("matches-grid-container");
    const matches = APP_STATE.league.matches;
    const predictions = APP_STATE.predictions;

    // Filtrer la liste des matchs
    let filteredMatches = matches.filter(m => m.stage === this.currentStageFilter);
    if (this.currentStageFilter === "GROUP") {
      filteredMatches = filteredMatches.filter(m => m.group === this.currentGroupFilter);
    }

    grid.innerHTML = "";

    if (filteredMatches.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Aucun match disponible pour cette phase.</div>`;
      return;
    }

    filteredMatches.forEach(match => {
      const card = document.createElement("div");
      const isLocked = match.status === "finished" || match.status === "locked";

      // ─── Calcul de la classe de résultat couleur ───
      let resultClass = "";
      const pred = predictions[match.id];
      if (match.status === "finished" && pred) {
        let predHomeScore = null, predAwayScore = null, predWinner = null;
        if (typeof pred === "object" && pred.homeScore !== null && pred.homeScore !== undefined &&
            pred.awayScore !== null && pred.awayScore !== undefined) {
          predHomeScore = parseInt(pred.homeScore);
          predAwayScore = parseInt(pred.awayScore);
          predWinner = predHomeScore > predAwayScore ? "home" : (predHomeScore < predAwayScore ? "away" : "draw");
        } else if (typeof pred === "string") {
          predWinner = pred;
        }

        const calc = calculatePredictionPoints(match, predWinner, predHomeScore, predAwayScore);
        if (calc.isCorrect) {
          resultClass = calc.isExact ? "result-exact" : "result-correct";
        } else {
          resultClass = "result-wrong";
        }
      } else if (match.status === "finished" && !pred) {
        // Pas de prono — carte grisée
        resultClass = "";
      }

      card.className = `match-card ${isLocked ? "locked" : ""} ${resultClass}`;
      
      // Trouver les détails des équipes
      const homeTeam = WORLD_CUP_DATA.teams[match.homeTeam];
      const awayTeam = WORLD_CUP_DATA.teams[match.awayTeam];
      
      const homeFlag = homeTeam ? homeTeam.flag : "🏳️";
      const awayFlag = awayTeam ? awayTeam.flag : "🏳️";
      
      const homeName = homeTeam ? (this.lang === "fr" ? homeTeam.name : homeTeam.nameEn) : (match.homeTeamLabel || this.t("placeholder_team"));
      const awayName = awayTeam ? (this.lang === "fr" ? awayTeam.name : awayTeam.nameEn) : (match.awayTeamLabel || this.t("placeholder_team"));

      const isGroup = match.stage === "GROUP";
      
      // Récupérer le pronostic de l'utilisateur (déjà déclaré en haut du bloc)
      // pred = predictions[match.id]  ← Voir ligne ~566
      
      let predHomeScore = "";
      let predAwayScore = "";
      let legacyWinner = null;
      let hasPrediction = false;

      if (pred !== undefined && pred !== null) {
        if (typeof pred === "object") {
          predHomeScore = pred.homeScore !== null && pred.homeScore !== undefined ? pred.homeScore : "";
          predAwayScore = pred.awayScore !== null && pred.awayScore !== undefined ? pred.awayScore : "";
          hasPrediction = predHomeScore !== "" && predAwayScore !== "";
        } else if (typeof pred === "string") {
          legacyWinner = pred;
          hasPrediction = true;
        }
      }

      // ─── Génération de l'affichage des cotes (points potentiels) ───
      const hasOdds = match.oddsHome || match.oddsDraw || match.oddsAway;
      let oddsDisplayHTML = "";
      if (hasOdds && match.status === "pending") {
        const ptsH = match.oddsHome ? oddsToPoints(match.oddsHome) : null;
        const ptsD = match.oddsDraw ? oddsToPoints(match.oddsDraw) : null;
        const ptsA = match.oddsAway ? oddsToPoints(match.oddsAway) : null;
        oddsDisplayHTML = `
          <div class="match-odds-display">
            ${ptsH ? `<span class="odds-tag home-odds" title="Cote ${match.oddsHome} → ${ptsH} pts si ${homeName} gagne">🏠 ${match.oddsHome} → <strong>${ptsH}pts</strong></span>` : ""}
            ${ptsD ? `<span class="odds-tag draw-odds" title="Cote nul ${match.oddsDraw} → ${ptsD} pts">🤝 ${match.oddsDraw} → <strong>${ptsD}pts</strong></span>` : ""}
            ${ptsA ? `<span class="odds-tag away-odds" title="Cote ${match.oddsAway} → ${ptsA} pts si ${awayName} gagne">✈️ ${match.oddsAway} → <strong>${ptsA}pts</strong></span>` : ""}
          </div>
        `;
      }

      // Badges et statuts
      let statusBadge = "";
      if (match.status === "finished") {
        let pWinner = null;
        let predHomeScore = null;
        let predAwayScore = null;

        if (typeof pred === "object" && pred && pred.homeScore !== null && pred.awayScore !== null && pred.homeScore !== "" && pred.awayScore !== "") {
          predHomeScore = parseInt(pred.homeScore);
          predAwayScore = parseInt(pred.awayScore);
          pWinner = predHomeScore > predAwayScore ? "home" : (predHomeScore < predAwayScore ? "away" : "draw");
        } else if (typeof pred === "string") {
          pWinner = pred;
        }

        const calc = calculatePredictionPoints(match, pWinner, predHomeScore, predAwayScore);

        if (calc.isCorrect) {
          if (calc.isExact) {
            statusBadge = `<div class="predict-status-badge correct-exact">🔥 Score Exact (+${calc.points} pts)</div>`;
          } else {
            statusBadge = `<div class="predict-status-badge correct">🎯 Bon Résultat (+${calc.points} pts)</div>`;
          }
        } else {
          statusBadge = `<div class="predict-status-badge wrong">❌ Incorrect (+0 pts)</div>`;
        }
      } else if (match.status === "locked") {
        statusBadge = `<div class="predict-status-badge pending">🔒 ${this.t("match_locked")}</div>`;
      }

      if (match.status === "pending") {
        // Déterminer l'état initial du bouton
        const isSaved = pred && pred.homeScore !== null && pred.awayScore !== null &&
                        parseInt(predHomeScore) === pred.homeScore && 
                        parseInt(predAwayScore) === pred.awayScore;

        card.innerHTML = `
          <div class="match-header-info">
            <span class="match-stage-tag">${this.t(match.stage)}</span>
            <span class="match-label">${this.lang === "fr" ? match.label : match.labelEn}</span>
          </div>
          
          ${oddsDisplayHTML}

          <div class="match-teams">
            <div class="team-row">
              <div class="team-info">
                <span class="team-flag">${homeFlag}</span>
                <span class="team-name">${homeName}</span>
              </div>
              <input type="number" min="0" placeholder="-" class="predict-score-input" data-match="${match.id}" data-team="home" value="${predHomeScore}">
            </div>
            
            <div class="team-row">
              <div class="team-info">
                <span class="team-flag">${awayFlag}</span>
                <span class="team-name">${awayName}</span>
              </div>
              <input type="number" min="0" placeholder="-" class="predict-score-input" data-match="${match.id}" data-team="away" value="${predAwayScore}">
            </div>
          </div>
          
          <div class="derived-prono-badge" id="derived-badge-${match.id}"></div>

          <div style="margin-top: 12px;">
            <button class="btn-primary btn-save-prono" id="btn-save-${match.id}" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 8px; transition: all 0.2s;">
              ${isSaved ? "Enregistré ! ✅" : "💾 Valider Prono"}
            </button>
          </div>
        `;

        const saveBtn = card.querySelector(".btn-save-prono");
        if (isSaved) {
          saveBtn.style.background = "var(--color-success)";
          saveBtn.style.boxShadow = "0 4px 12px var(--color-success-glow)";
        }

        const inputs = card.querySelectorAll(".predict-score-input");
        
        const updateBadgeAndButton = () => {
          const homeVal = card.querySelector(`[data-team="home"]`).value.trim();
          const awayVal = card.querySelector(`[data-team="away"]`).value.trim();
          const badge = card.querySelector(`.derived-prono-badge`);
          
          // Badge
          if (homeVal !== "" && awayVal !== "") {
            const h = parseInt(homeVal);
            const a = parseInt(awayVal);
            if (h > a) {
              badge.className = "derived-prono-badge home-win";
              badge.innerHTML = `🔮 Prono : <strong>${homeName}</strong> gagnant`;
            } else if (h < a) {
              badge.className = "derived-prono-badge away-win";
              badge.innerHTML = `🔮 Prono : <strong>${awayName}</strong> gagnant`;
            } else {
              badge.className = "derived-prono-badge draw-win";
              badge.innerHTML = `🔮 Prono : <strong>Match nul</strong>`;
            }

            // Comparer avec la version sauvegardée
            const currentlySaved = predictions[match.id];
            const matchesSaved = currentlySaved && currentlySaved.homeScore !== null && currentlySaved.awayScore !== null &&
                                  currentlySaved.homeScore === h && currentlySaved.awayScore === a;

            if (matchesSaved) {
              saveBtn.innerHTML = "Enregistré ! ✅";
              saveBtn.style.background = "var(--color-success)";
              saveBtn.style.boxShadow = "0 4px 12px var(--color-success-glow)";
            } else {
              saveBtn.innerHTML = "💾 Valider Prono";
              saveBtn.style.background = "linear-gradient(135deg, var(--color-accent) 0%, #6366f1 100%)";
              saveBtn.style.boxShadow = "0 4px 12px var(--color-accent-glow)";
            }
          } else {
            badge.className = "derived-prono-badge empty";
            badge.innerHTML = `🔮 Saisissez vos scores`;
            saveBtn.innerHTML = "💾 Valider Prono";
            saveBtn.style.background = "rgba(255, 255, 255, 0.05)";
            saveBtn.style.boxShadow = "none";
          }
        };

        inputs.forEach(inp => {
          inp.addEventListener("input", updateBadgeAndButton);
        });

        // Clic sur valider
        saveBtn.addEventListener("click", async () => {
          const homeVal = card.querySelector(`[data-team="home"]`).value.trim();
          const awayVal = card.querySelector(`[data-team="away"]`).value.trim();
          
          if (homeVal === "" || awayVal === "") {
            alert(this.lang === "fr" ? "Veuillez saisir les deux scores pour valider le pronostic !" : "Please enter both scores to validate the prediction!");
            return;
          }

          const h = parseInt(homeVal);
          const a = parseInt(awayVal);

          // Sauvegarde temporaire de l'ancien état pour restauration si erreur
          const oldPrediction = predictions[match.id];
          predictions[match.id] = {
            homeScore: h,
            awayScore: a
          };

          // Feedback visuel premium
          saveBtn.disabled = true;
          saveBtn.innerHTML = this.lang === "fr" ? "Enregistrement... ⏳" : "Saving... ⏳";
          saveBtn.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";

          try {
            const success = await saveUserState(match.id, h, a);
            if (success) {
              updateBadgeAndButton();
            } else {
              predictions[match.id] = oldPrediction;
              alert(this.lang === "fr"
                ? "⚠️ Échec de l'enregistrement en ligne. Vérifiez votre connexion ou cliquez sur le badge de statut pour voir les diagnostics de la base."
                : "⚠️ Online save failed. Check your connection or click the status badge to view database diagnostics.");
              
              saveBtn.disabled = false;
              saveBtn.innerHTML = this.lang === "fr" ? "❌ Réessayer" : "❌ Retry";
              saveBtn.style.background = "linear-gradient(135deg, var(--color-danger) 0%, #b91c1c 100%)";
            }
          } catch (err) {
            console.error("Erreur save click:", err);
            predictions[match.id] = oldPrediction;
            saveBtn.disabled = false;
            saveBtn.innerHTML = this.lang === "fr" ? "❌ Réessayer" : "❌ Retry";
            saveBtn.style.background = "linear-gradient(135deg, var(--color-danger) 0%, #b91c1c 100%)";
          } finally {
            saveBtn.disabled = false;
          }
        });

        // Premier appel pour afficher le badge
        updateBadgeAndButton();

      } else {
        // Match locked ou finished
        let pronoText = "";
        if (typeof pred === "object" && pred && pred.homeScore !== null && pred.awayScore !== null) {
          pronoText = `${pred.homeScore} - ${pred.awayScore}`;
        } else if (legacyWinner) {
          pronoText = legacyWinner === "home" ? `Gagnant: ${homeName}` : (legacyWinner === "away" ? `Gagnant: ${awayName}` : "Match nul");
        } else {
          pronoText = "Aucun prono";
        }

        const homeScoreText = match.homeScore !== null ? match.homeScore : "-";
        const awayScoreText = match.awayScore !== null ? match.awayScore : "-";

        // Calcul des points gagnés pour affichage
        let pointsWonText = "";
        let pointsWonStyle = "";
        if (match.status === "finished" && pred) {
          let ph = null, pa = null, pw = null;
          if (typeof pred === "object" && pred.homeScore !== null && pred.awayScore !== null) {
            ph = parseInt(pred.homeScore); pa = parseInt(pred.awayScore);
            pw = ph > pa ? "home" : (ph < pa ? "away" : "draw");
          } else if (typeof pred === "string") { pw = pred; }
          if (pw === match.winner) {
            // Calculer les points gagnés
            let oddsForP = null;
            if (pw === 'home') oddsForP = match.oddsHome;
            else if (pw === 'away') oddsForP = match.oddsAway;
            else if (pw === 'draw') oddsForP = match.oddsDraw;
            let pts = oddsForP ? oddsToPoints(oddsForP) : (WORLD_CUP_DATA.stages[match.stage] ? WORLD_CUP_DATA.stages[match.stage].points : 1);
            let exactBonus = oddsForP ? Math.max(3, Math.round(pts * 0.5)) : 5;
            const isExact = ph !== null && pa !== null && ph === match.homeScore && pa === match.awayScore;
            if (isExact) {
              pts += exactBonus;
              pointsWonText = `+${pts} pts 🎯`;
              pointsWonStyle = "color: #3b82f6; font-weight: 800;";
            } else {
              pointsWonText = `+${pts} pts`;
              pointsWonStyle = "color: var(--color-success); font-weight: 800;";
            }
          } else if (pw !== null) {
            pointsWonText = "+0 pts";
            pointsWonStyle = "color: var(--color-danger); font-weight: 700;";
          }
        }

        card.innerHTML = `
          ${statusBadge}
          <div class="match-header-info">
            <span class="match-stage-tag">${this.t(match.stage)}</span>
            <span class="match-label">${this.lang === "fr" ? match.label : match.labelEn}</span>
          </div>
          
          <div class="match-teams">
            <div class="team-row">
              <div class="team-info">
                <span class="team-flag">${homeFlag}</span>
                <span class="team-name">${homeName}</span>
              </div>
              <span class="team-score final">${homeScoreText}</span>
            </div>
            
            <div class="team-row">
              <div class="team-info">
                <span class="team-flag">${awayFlag}</span>
                <span class="team-name">${awayName}</span>
              </div>
              <span class="team-score final">${awayScoreText}</span>
            </div>
          </div>
          
          <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed rgba(255, 255, 255, 0.05); font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--text-muted);">Votre prono :</span>
            <span style="font-weight: 700; color: var(--color-accent);">${pronoText}</span>
          </div>
          ${pointsWonText ? `
          <div style="text-align: center; margin-top: 8px; font-size: 0.95rem; ${pointsWonStyle}">${pointsWonText}</div>
          ` : ""}
        `;
      }

      grid.appendChild(card);
    });
  },

  // ---- LEADERBOARD ----
  renderLeaderboard() {
    const container = document.getElementById("leaderboard-tab");
    const league = APP_STATE.league;
    const currentUser = APP_STATE.user;

    // Trier les joueurs par points (décroissant), puis par pronos corrects (décroissant)
    const playersList = Object.values(league.players).sort((a, b) => {
      const pointsA = a.points || 0;
      const pointsB = b.points || 0;
      if (pointsB !== pointsA) {
        return pointsB - pointsA;
      }
      const correctA = a.correct || 0;
      const correctB = b.correct || 0;
      return correctB - correctA;
    });

    if (playersList.length === 0) {
      container.innerHTML = `
        <div class="glass-panel" style="text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 10px;">🏆</div>
          <p>${this.t("podium_empty")}</p>
        </div>
      `;
      return;
    }

    // Répartir pour le podium
    const p1 = playersList[0] || null;
    const p2 = playersList[1] || null;
    const p3 = playersList[2] || null;

    let podiumHTML = "";
    if (playersList.length > 0) {
      podiumHTML = `
        <div class="podium">
          <!-- 2e Place -->
          ${p2 ? `
            <div class="podium-place second">
              <div class="podium-avatar-wrapper">
                <img class="podium-avatar" src="${p2.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="${p2.name}">
                <div class="podium-rank-badge">2</div>
                ${this.getProviderBadgeHTML(p2.provider || "discord")}
              </div>
              <div class="podium-name">${p2.name}</div>
              <div class="podium-points">${p2.points || 0} pts</div>
              <div class="podium-bar">🥈</div>
            </div>
          ` : `<div style="width: 140px;"></div>`}
          
          <!-- 1ère Place -->
          ${p1 ? `
            <div class="podium-place first">
              <div class="podium-avatar-wrapper">
                <img class="podium-avatar" src="${p1.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="${p1.name}">
                <div class="podium-rank-badge" style="font-size: 1.2rem;">👑</div>
                ${this.getProviderBadgeHTML(p1.provider || "discord")}
              </div>
              <div class="podium-name">${p1.name}</div>
              <div class="podium-points" style="font-size: 1.3rem;">${p1.points || 0} pts</div>
              <div class="podium-bar">🥇</div>
            </div>
          ` : `<div style="width: 140px;"></div>`}
          
          <!-- 3e Place -->
          ${p3 ? `
            <div class="podium-place third">
              <div class="podium-avatar-wrapper">
                <img class="podium-avatar" src="${p3.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="${p3.name}">
                <div class="podium-rank-badge">3</div>
                ${this.getProviderBadgeHTML(p3.provider || "discord")}
              </div>
              <div class="podium-name">${p3.name}</div>
              <div class="podium-points">${p3.points || 0} pts</div>
              <div class="podium-bar">🥉</div>
            </div>
          ` : `<div style="width: 140px;"></div>`}
        </div>
      `;
    }

    // Générer le tableau
    let tableRows = "";
    playersList.forEach((player, index) => {
      const isCurrentUser = currentUser && player.id === currentUser.id ? "current-user" : "";
      const rank = index + 1;
      
      tableRows += `
        <tr class="leaderboard-row ${isCurrentUser}">
          <td class="leaderboard-rank">#${rank}</td>
          <td>
            <div class="leaderboard-player">
              <div class="leaderboard-avatar-wrapper">
                <img class="leaderboard-avatar" src="${player.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="${player.name}">
                ${this.getProviderBadgeHTML(player.provider || "discord")}
              </div>
              <div>
                <span class="leaderboard-name">${player.name}</span>
                ${player.discriminator && player.discriminator !== "0000" ? `<span style="font-size: 0.8rem; color: var(--text-muted);">#${player.discriminator}</span>` : ""}
                ${isCurrentUser ? `<span class="leaderboard-tag">VOUS</span>` : ""}
              </div>
            </div>
          </td>
          <td>${player.correct || 0}</td>
          <td>${player.totalPredictions || 0}</td>
          <td class="leaderboard-points">${player.points || 0} pts</td>
        </tr>
      `;
    });

    container.innerHTML = `
      <div class="leaderboard-panel">
        <h2 class="panel-title" style="margin-bottom: 30px;">🏆 ${this.t("leaderboard")}</h2>
        
        ${podiumHTML}
        
        <div class="leaderboard-table-card">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th style="width: 80px;">${this.t("rank")}</th>
                <th>${this.t("player")}</th>
                <th style="width: 120px;">🎯 ${this.t("correct_count")}</th>
                <th style="width: 120px;">📋 ${this.t("predict_count")}</th>
                <th style="width: 120px;">${this.t("pts")}</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ---- ADMIN PANEL ----
  adminStageFilter: "GROUP",
  adminGroupFilter: "A",

  renderAdminPanel() {
    const container = document.getElementById("admin-tab");
    
    // Si l'admin n'est pas connecté
    if (!APP_STATE.adminAuthenticated) {
      container.innerHTML = `
        <div class="admin-panel-login glass-panel">
          <div style="font-size: 3rem; margin-bottom: 10px;">🔐</div>
          <h2 class="panel-title" style="justify-content: center; border-left: none; padding-left: 0; margin-bottom: 20px;">
            ${this.t("admin_login_title")}
          </h2>
          <div class="mock-input-group" style="text-align: left;">
            <label data-i18n="admin_pass_placeholder">${this.t("admin_pass_placeholder")}</label>
            <input type="password" class="mock-input" id="admin-passcode-input" placeholder="Mot de passe admin...">
          </div>
          <button class="btn-primary" id="btn-admin-login" style="width: 100%; justify-content: center;">
            ${this.t("btn_login")}
          </button>
          <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 15px;">
            Le mot de passe par défaut est : <code style="color: #c084fc; font-weight: bold;">admin2026</code>
          </p>
        </div>
      `;

      document.getElementById("btn-admin-login").addEventListener("click", () => {
        const pass = document.getElementById("admin-passcode-input").value;
        const league = APP_STATE.league;
        
        if (pass === league.passcode) {
          APP_STATE.adminAuthenticated = true;
          this.renderAdminPanel();
        } else {
          alert(this.t("invalid_code"));
        }
      });
      return;
    }

    // Si connecté, afficher la console d'administration complète
    const league = APP_STATE.league;
    
    container.innerHTML = `
      <div class="admin-header-actions">
        <h2 class="panel-title" style="margin-bottom: 0;">⚙️ ${this.t("admin_title")}</h2>
        <button class="btn-secondary" id="btn-admin-logout" style="padding: 6px 12px; font-size: 0.85rem;">
          ❌ ${this.t("btn_logout")}
        </button>
      </div>
      
      <div class="admin-layout">
        <!-- Colonne 1: Gestion des Matchs & Saisie des Scores -->
        <div class="glass-panel">
          <h3 class="panel-title">⚽ ${this.t("admin_matches_tab")}</h3>
          
          <div class="stage-filters" style="margin-bottom: 15px;">
            <!-- On utilise les mêmes filtres que pour les pronos -->
            ${this.getAdminFiltersHTML()}
          </div>
          ${this.adminStageFilter === "GROUP" ? this.getAdminGroupsHTML() : ""}
          
          <div class="admin-match-list" id="admin-matches-list-container">
            <!-- Liste des matchs éditables -->
          </div>
        </div>
        
        <!-- Colonne 2: Synchronisation des Joueurs & Export Base -->
        <div class="admin-data-console">
          <!-- Bloc Importer un code joueur -->
          <div class="glass-panel">
            <h3 class="panel-title">📥 ${this.t("admin_import_player")}</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">
              Copiez-collez le code de pronostics fourni par un joueur pour l'enregistrer ou mettre à jour ses paris.
            </p>
            <textarea class="console-textarea" id="txt-import-player" placeholder="${this.t("admin_import_placeholder")}"></textarea>
            <button class="btn-primary" id="btn-import-player" style="width: 100%; justify-content: center;">
              📥 ${this.t("admin_btn_import")}
            </button>
          </div>
          
          <!-- Bloc Liste des joueurs & suppression -->
          <div class="glass-panel">
            <h3 class="panel-title">👥 ${this.t("admin_players_list")}</h3>
            <div id="admin-players-list-container" style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
              <!-- Rendu des joueurs -->
            </div>
          </div>

          <!-- Bloc Sécurité / Mot de Passe -->
          <div class="glass-panel">
            <h3 class="panel-title">🔐 Sécurité</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">
              Modifier le mot de passe d'accès au panneau d'administration.
            </p>
            <div class="mock-input-group" style="margin-bottom: 12px;">
              <input type="password" class="mock-input" id="admin-new-passcode" placeholder="Nouveau mot de passe...">
            </div>
            <button class="btn-secondary" id="btn-change-passcode" style="width: 100%; justify-content: center;">
              💾 Enregistrer le mot de passe
            </button>
          </div>
          
          <!-- Bloc Importer/Exporter la base entière -->
          <div class="glass-panel">
            <h3 class="panel-title">💾 Synchronisation Générale</h3>
            
            <div style="margin-bottom: 15px;">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">1. ${this.t("admin_export_league")}</h4>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 8px;">
                ${this.t("admin_export_desc")}
              </p>
              <button class="btn-secondary" id="btn-export-league" style="width: 100%; justify-content: center;">
                📤 Télécharger le fichier de ligue (JSON)
              </button>
            </div>
            
            <div style="border-top: 1px solid var(--border-standard); padding-top: 15px;">
              <h4 style="font-size: 0.95rem; margin-bottom: 4px;">2. ${this.t("admin_import_league")}</h4>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 8px;">
                Chargez un fichier de ligue JSON sauvegardé pour restaurer tous les joueurs et scores.
              </p>
              <input type="file" id="file-import-league" accept=".json" style="display: none;">
              <button class="btn-secondary" id="btn-trigger-import-league" style="width: 100%; justify-content: center;">
                📥 ${this.t("admin_import_league_btn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attacher événements de base admin
    document.getElementById("btn-admin-logout").addEventListener("click", () => {
      APP_STATE.adminAuthenticated = false;
      this.renderAdminPanel();
    });

    document.getElementById("btn-import-player").addEventListener("click", () => {
      const code = document.getElementById("txt-import-player").value.trim();
      if (!code) return;
      try {
        const player = ADMIN_UTILS.importPlayerCode(league, code);
        alert(this.t("player_imported", { name: player.name }));
        document.getElementById("txt-import-player").value = "";
        
        // Rafraîchir les listes
        this.renderAdminPlayers();
        this.renderLeaderboard(); // Met à jour le leaderboard en tâche de fond
      } catch (e) {
        alert(e.message);
      }
    });

    document.getElementById("btn-export-league").addEventListener("click", () => {
      const json = ADMIN_UTILS.getLeagueExportJSON(league);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `worldcup2026_league_state.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    const fileInput = document.getElementById("file-import-league");
    document.getElementById("btn-trigger-import-league").addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          ADMIN_UTILS.importLeagueJSON(league, event.target.result);
          APP_STATE.league = league; // Réassigner pour mise à jour
          alert(this.t("league_imported"));
          this.renderAdminPanel();
        } catch (e) {
          alert(e.message);
        }
      };
      reader.readAsText(file);
    });

    // Enregistrer le nouveau mot de passe admin
    document.getElementById("btn-change-passcode").addEventListener("click", () => {
      const newPass = document.getElementById("admin-new-passcode").value.trim();
      if (!newPass) {
        alert("Veuillez saisir un mot de passe valide !");
        return;
      }
      league.passcode = newPass;
      ADMIN_UTILS.saveLeagueState(league);
      alert("Mot de passe administrateur mis à jour !");
      document.getElementById("admin-new-passcode").value = "";
    });

    // Attacher filtres de matchs
    this.attachAdminFilterEvents();
    
    // Rendre sous-composants
    this.renderAdminMatches();
    this.renderAdminPlayers();
  },

  getAdminFiltersHTML() {
    const stages = WORLD_CUP_DATA.stages;
    let html = "";
    Object.keys(stages).forEach(stageKey => {
      const activeClass = this.adminStageFilter === stageKey ? "active" : "";
      html += `
        <button class="filter-btn admin-stage-btn ${activeClass}" data-stage="${stageKey}">
          ${this.t(stages[stageKey].id === "GROUP" ? "GROUP" : stageKey)}
        </button>
      `;
    });
    return html;
  },

  getAdminGroupsHTML() {
    let html = `<div class="groups-subfilters" style="margin-bottom: 15px;">`;
    Object.keys(WORLD_CUP_DATA.groups).forEach(gId => {
      const activeClass = this.adminGroupFilter === gId ? "active" : "";
      html += `
        <button class="subfilter-btn admin-group-btn ${activeClass}" data-group="${gId}">${gId}</button>
      `;
    });
    html += `</div>`;
    return html;
  },

  attachAdminFilterEvents() {
    const panel = document.getElementById("admin-tab");
    panel.querySelectorAll(".admin-stage-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.adminStageFilter = e.target.getAttribute("data-stage");
        this.renderAdminPanel();
      });
    });

    if (this.adminStageFilter === "GROUP") {
      panel.querySelectorAll(".admin-group-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          this.adminGroupFilter = e.target.getAttribute("data-group");
          this.renderAdminPanel();
        });
      });
    }
  },

  renderAdminMatches() {
    const container = document.getElementById("admin-matches-list-container");
    const league = APP_STATE.league;
    
    let filteredMatches = league.matches.filter(m => m.stage === this.adminStageFilter);
    if (this.adminStageFilter === "GROUP") {
      filteredMatches = filteredMatches.filter(m => m.group === this.adminGroupFilter);
    }

    container.innerHTML = "";

    filteredMatches.forEach(match => {
      const card = document.createElement("div");
      card.className = "admin-match-card";
      
      const homeTeam = WORLD_CUP_DATA.teams[match.homeTeam];
      const awayTeam = WORLD_CUP_DATA.teams[match.awayTeam];
      
      const homeFlag = homeTeam ? homeTeam.flag : "🏳️";
      const awayFlag = awayTeam ? awayTeam.flag : "🏳️";
      
      const homeName = homeTeam ? (this.lang === "fr" ? homeTeam.name : homeTeam.nameEn) : (match.homeTeamLabel || this.t("placeholder_team"));
      const awayName = awayTeam ? (this.lang === "fr" ? awayTeam.name : awayTeam.nameEn) : (match.awayTeamLabel || this.t("placeholder_team"));

      const isFinished = match.status === "finished";
      const isImmutable = match.immutable === true;
      const valHomeScore = match.homeScore !== null ? match.homeScore : "";
      const valAwayScore = match.awayScore !== null ? match.awayScore : "";

      const isKnockout = match.stage !== "GROUP";

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 6px;">
          <span>Match #${match.id} - ${this.lang === "fr" ? match.label : match.labelEn}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${isImmutable ? `<span class="admin-immutable-badge">🔒 Résultat Définitif</span>` : ""}
            <span class="admin-status-badge ${match.status}">${this.t(match.status)}</span>
          </div>
        </div>
        
        <!-- Édition des équipes si phase finale -->
        ${isKnockout && !isImmutable ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 6px; margin-bottom: 8px;">
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block;">Equipe 1 (Code ou Nom)</label>
              <input type="text" class="mock-input" id="edit-home-${match.id}" style="padding: 4px 8px; font-size: 0.85rem;" value="${match.homeTeam || ""}" placeholder="Ex: FRA ou France">
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block;">Equipe 2 (Code ou Nom)</label>
              <input type="text" class="mock-input" id="edit-away-${match.id}" style="padding: 4px 8px; font-size: 0.85rem;" value="${match.awayTeam || ""}" placeholder="Ex: BRA ou Brésil">
            </div>
            <button class="btn-secondary btn-save-teams" data-match="${match.id}" style="grid-column: 1/-1; padding: 4px; font-size: 0.8rem; justify-content: center;">
              💾 ${this.t("save")} Equipes
            </button>
          </div>
        ` : ""}
        
        <!-- Inputs cotes (désactivés si match immutable) -->
        <div style="background: rgba(139,92,246,0.05); border: 1px dashed rgba(139,92,246,0.2); border-radius: 8px; padding: 10px; margin-bottom: 4px;">
          <div style="font-size: 0.7rem; color: #c084fc; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
            📈 Cotes paris (pour calcul des points)
          </div>
          <div class="admin-odds-row ${isImmutable ? 'admin-score-frozen' : ''}">
            <div>
              <label>🏠 1 - ${homeName}</label>
              <input class="admin-odds-input" type="number" step="0.01" min="1.01" id="odds-home-${match.id}"
                value="${match.oddsHome || ''}" placeholder="1.50" ${isImmutable ? 'disabled' : ''}>
            </div>
            <div>
              <label>🤝 Nul</label>
              <input class="admin-odds-input" type="number" step="0.01" min="1.01" id="odds-draw-${match.id}"
                value="${match.oddsDraw || ''}" placeholder="3.50" ${isImmutable ? 'disabled' : ''}>
            </div>
            <div>
              <label>✈️ 2 - ${awayName}</label>
              <input class="admin-odds-input" type="number" step="0.01" min="1.01" id="odds-away-${match.id}"
                value="${match.oddsAway || ''}" placeholder="5.00" ${isImmutable ? 'disabled' : ''}>
            </div>
          </div>
          ${!isImmutable && !isFinished ? `<button class="btn-sm-warning" id="btn-save-odds-${match.id}" style="width: 100%; margin-top: 8px; font-size: 0.75rem; justify-content: center;" onclick="">
            💾 Enregistrer les cotes seulement
          </button>` : ""}
        </div>
        
        <div class="admin-score-inputs ${isImmutable ? 'admin-score-frozen' : ''}">
          <div class="score-input-box">
            <span style="font-size: 1.2rem;">${homeFlag}</span>
            <span style="font-size: 0.9rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 90px;">${homeName}</span>
            <input type="number" min="0" placeholder="-" id="score-home-${match.id}" value="${valHomeScore}" ${isImmutable ? 'readonly' : ''}>
          </div>
          
          <div class="admin-vs">VS</div>
          
          <div class="score-input-box" style="justify-content: flex-end;">
            <input type="number" min="0" placeholder="-" id="score-away-${match.id}" value="${valAwayScore}" ${isImmutable ? 'readonly' : ''}>
            <span style="font-size: 0.9rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 90px; text-align: right;">${awayName}</span>
            <span style="font-size: 1.2rem;">${awayFlag}</span>
          </div>
        </div>
        
        <div class="admin-actions" style="margin-top: 8px;">
          ${isImmutable ? `
            <div style="width: 100%; text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 8px; background: rgba(16,185,129,0.05); border-radius: 6px; border: 1px solid rgba(16,185,129,0.15);">
              🔒 Résultat <strong style="color: var(--color-success);">${match.homeScore} - ${match.awayScore}</strong> — Définitif, non modifiable.
            </div>
          ` : `
            <button class="btn-sm-success btn-admin-save-result" data-match="${match.id}">
              ✅ ${this.t("admin_match_finish")}
            </button>
            ${!isFinished ? `
              <button class="btn-sm-warning btn-admin-lock" data-match="${match.id}">
                ${match.status === "locked" ? `🔓 ${this.t("admin_btn_unlock")}` : `🔒 ${this.t("admin_btn_lock")}`}
              </button>
            ` : ""}
          `}
        </div>
      `;
      // Attacher événements d'édition des équipes phase finale
      if (isKnockout && !isImmutable) {
        card.querySelector("button.btn-secondary").addEventListener("click", () => {
          const homeVal = document.getElementById(`edit-home-${match.id}`).value.trim().toUpperCase();
          const awayVal = document.getElementById(`edit-away-${match.id}`).value.trim().toUpperCase();
          
          if (!homeVal || !awayVal) return;
          
          // Vérifier si ce sont des codes d'équipe officiels
          let homeTeamCode = homeVal;
          let awayTeamCode = awayVal;
          let homeLabel = "";
          let awayLabel = "";
          
          if (!WORLD_CUP_DATA.teams[homeVal]) {
            homeTeamCode = `CUSTOM_H_${match.id}`;
            homeLabel = homeVal;
          }
          if (!WORLD_CUP_DATA.teams[awayVal]) {
            awayTeamCode = `CUSTOM_A_${match.id}`;
            awayLabel = awayVal;
          }

          ADMIN_UTILS.updateMatchTeams(league, match.id, homeTeamCode, awayTeamCode, homeLabel, awayLabel);
          alert("Equipes configurées !");
          this.renderAdminMatches();
          this.renderPredictPage(); // Mettre à jour l'onglet predict
        });
      }

      // Bouton "enregistrer cotes seulement" (avant résultat final)
      if (!isImmutable && !isFinished) {
        const btnSaveOdds = card.querySelector(`#btn-save-odds-${match.id}`);
        if (btnSaveOdds) {
          btnSaveOdds.addEventListener("click", () => {
            const oddsH = document.getElementById(`odds-home-${match.id}`).value;
            const oddsD = document.getElementById(`odds-draw-${match.id}`).value;
            const oddsA = document.getElementById(`odds-away-${match.id}`).value;
            ADMIN_UTILS.updateMatchResult(league, match.id, null, null, false, oddsH, oddsD, oddsA);
            btnSaveOdds.innerHTML = "✅ Cotes enregistrées !";
            btnSaveOdds.style.background = "var(--color-success)";
            setTimeout(() => {
              btnSaveOdds.innerHTML = "💾 Enregistrer les cotes seulement";
              btnSaveOdds.style.background = "";
            }, 2000);
          });
        }
      }

      // Attacher événements de saisie de score
      if (!isImmutable) {
        card.querySelector(".btn-admin-save-result").addEventListener("click", () => {
          const homeScore = document.getElementById(`score-home-${match.id}`).value;
          const awayScore = document.getElementById(`score-away-${match.id}`).value;
          const oddsH = document.getElementById(`odds-home-${match.id}`)?.value;
          const oddsD = document.getElementById(`odds-draw-${match.id}`)?.value;
          const oddsA = document.getElementById(`odds-away-${match.id}`)?.value;
          
          if (homeScore === "" || awayScore === "") {
            alert("Veuillez saisir les deux scores !");
            return;
          }

          // Confirmation avant de valider définitivement
          const confirmMsg = `⚠️ RÉSULTAT DÉFINITIF

Vous êtes sur le point de valider :
${homeName} ${homeScore} - ${awayScore} ${awayName}

Ce résultat sera PERMANENT et ne pourra plus être modifié.
Confirmer ?`;
          if (!confirm(confirmMsg)) return;

          ADMIN_UTILS.updateMatchResult(league, match.id, homeScore, awayScore, true, oddsH, oddsD, oddsA);
          this.renderAdminPanel();
        });
      }  
      if (!isImmutable) {
        const lockBtn = card.querySelector(".btn-admin-lock");
        if (lockBtn) {
          lockBtn.addEventListener("click", () => {
            ADMIN_UTILS.toggleMatchLock(league, match.id);
            this.renderAdminPanel();
          });
        }
      }

      container.appendChild(card);
    });
  },

  renderAdminPlayers() {
    const container = document.getElementById("admin-players-list-container");
    const league = APP_STATE.league;
    
    container.innerHTML = "";
    
    const players = Object.values(league.players);
    if (players.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 10px;">Aucun joueur enregistré.</div>`;
      return;
    }

    players.forEach(player => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.justifyContent = "space-between";
      row.style.background = "rgba(255, 255, 255, 0.02)";
      row.style.padding = "8px 12px";
      row.style.borderRadius = "8px";
      row.style.border = "1px solid var(--border-standard)";

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="admin-player-avatar-wrapper">
            <img src="${player.avatar}" alt="${player.name}" style="width: 28px; height: 28px; border-radius: 50%;">
            ${this.getProviderBadgeHTML(player.provider || "discord")}
          </div>
          <span style="font-weight: 600; font-size: 0.9rem;">${player.name}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">(${player.points} pts, ${player.correct} correct(s))</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-sm-primary btn-view-player-predictions" data-id="${player.id}" style="padding: 4px 8px; font-size: 0.75rem; background: var(--color-accent); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
            👁️ Voir Pronos
          </button>
          <button class="btn-sm-danger btn-remove-player" data-id="${player.id}" style="padding: 4px 8px; font-size: 0.75rem;">
            ${this.t("admin_btn_remove")}
          </button>
        </div>
      `;

      row.querySelector(".btn-view-player-predictions").addEventListener("click", () => {
        this.openPlayerPredictionsModal(player.id);
      });

      row.querySelector(".btn-remove-player").addEventListener("click", () => {
        if (confirm(`Voulez-vous vraiment retirer ${player.name} de la ligue ?`)) {
          ADMIN_UTILS.removePlayer(league, player.id);
          this.renderAdminPanel();
          this.renderLeaderboard();
        }
      });

      container.appendChild(row);
    });
  },

  openPlayerPredictionsModal(playerId) {
    const league = APP_STATE.league;
    const player = league.players[playerId];
    if (!player) return;
    
    if (!player.predictions || typeof player.predictions !== "object") {
      player.predictions = {};
    }
    
    // Créer l'overlay de la modal s'il n'existe pas
    let overlay = document.getElementById("player-predictions-modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "player-predictions-modal-overlay";
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }
    
    // Contenu de la modal
    let predictionsHTML = "";
    const matches = league.matches;
    const stages = WORLD_CUP_DATA.stages;
    
    // Trier les matchs par id
    const sortedMatches = [...matches].sort((a, b) => a.id - b.id);
    
    sortedMatches.forEach(match => {
      const pred = player.predictions[match.id];
      if (!pred) return;
      
      const homeTeam = WORLD_CUP_DATA.teams[match.homeTeam];
      const awayTeam = WORLD_CUP_DATA.teams[match.awayTeam];
      const homeFlag = homeTeam ? homeTeam.flag : "🏳️";
      const awayFlag = awayTeam ? awayTeam.flag : "🏳️";
      const homeName = homeTeam ? (UI.lang === "fr" ? homeTeam.name : homeTeam.nameEn) : (match.homeTeamLabel || UI.t("placeholder_team"));
      const awayName = awayTeam ? (UI.lang === "fr" ? awayTeam.name : awayTeam.nameEn) : (match.awayTeamLabel || UI.t("placeholder_team"));
      
      let pronoText = "";
      let ptsClass = "pending";
      let ptsText = "-";
      
      let predHomeScore = null;
      let predAwayScore = null;
      let predWinner = null;
      
      if (typeof pred === "object") {
        predHomeScore = pred.homeScore;
        predAwayScore = pred.awayScore;
        if (predHomeScore !== null && predAwayScore !== null && predHomeScore !== "" && predAwayScore !== "") {
          pronoText = `${predHomeScore} - ${predAwayScore}`;
          const h = parseInt(predHomeScore);
          const a = parseInt(predAwayScore);
          predWinner = h > a ? "home" : (h < a ? "away" : "draw");
        } else {
          pronoText = "Incomplet";
        }
      } else if (typeof pred === "string") {
        predWinner = pred;
        pronoText = pred === "home" ? "Victoire 1" : (pred === "away" ? "Victoire 2" : "Nul");
      }
      
      // Calculer les points
      if (match.status === "finished") {
        const calc = calculatePredictionPoints(match, predWinner, predHomeScore, predAwayScore);
        if (calc.isCorrect) {
          if (calc.isExact) {
            ptsClass = "correct-exact";
            ptsText = `+${calc.points}`;
          } else {
            ptsClass = "correct-outcome";
            ptsText = `+${calc.points}`;
          }
        } else {
          ptsClass = "wrong";
          ptsText = "+0";
        }
      } else {
        ptsText = "En attente";
      }
      
      const realScoreText = match.status === "finished" ? `${match.homeScore} - ${match.awayScore}` : "Non joué";
      
      predictionsHTML += `
        <div class="modal-prediction-card">
          <div style="display: flex; flex-direction: column; gap: 4px; min-width: 100px;">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Match #${match.id}</span>
            <span class="match-stage-tag" style="font-size: 0.7rem; padding: 1px 6px; width: fit-content;">${UI.t(match.stage)}</span>
          </div>
          
          <div class="modal-prediction-teams" style="flex: 1; justify-content: center; display: flex; align-items: center; gap: 8px;">
            <span class="modal-prediction-team" style="font-weight: 600;">${homeFlag} ${homeName}</span>
            <span style="color: var(--text-muted); font-size: 0.8rem; margin: 0 10px;">vs</span>
            <span class="modal-prediction-team" style="font-weight: 600;">${awayName} ${awayFlag}</span>
          </div>
          
          <div class="modal-prediction-scores" style="min-width: 120px; text-align: right; display: flex; flex-direction: column; gap: 2px;">
            <span class="modal-prediction-val" style="font-weight: 700; color: var(--color-accent);">Prono : ${pronoText}</span>
            <span class="modal-real-val" style="font-size: 0.8rem; color: var(--text-muted);">Réel : ${realScoreText}</span>
          </div>
          
          <div class="modal-prediction-pts ${ptsClass}" style="margin-left: 15px;">
            ${ptsText}
          </div>
        </div>
      `;
    });
    
    if (!predictionsHTML) {
      predictionsHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Aucun pronostic enregistré pour ce joueur.</div>`;
    }
    
    overlay.innerHTML = `
      <div class="predictions-modal">
        <div class="predictions-modal-header">
          <div class="predictions-modal-title">
            <div class="admin-player-avatar-wrapper">
              <img src="${player.avatar}" alt="${player.name}" style="width: 32px; height: 32px; border-radius: 50%;">
              ${this.getProviderBadgeHTML(player.provider || "discord")}
            </div>
            <span style="margin-left: 8px; font-weight: 700;">Pronostics de ${player.name} (${player.points} pts, ${player.exacts || 0} score(s) exact(s))</span>
          </div>
          <button class="predictions-modal-close" id="btn-close-predictions-modal">&times;</button>
        </div>
        <div class="predictions-modal-body">
          ${predictionsHTML}
        </div>
      </div>
    `;
    
    overlay.classList.add("active");
    
    // Gérer la fermeture
    const closeBtn = document.getElementById("btn-close-predictions-modal");
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
    });
    
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  }
};

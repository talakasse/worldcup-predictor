// Module d'intégration Supabase

const SUPABASE_CONFIG = {
  // Remplacer par l'URL de votre projet Supabase (ex: https://xyz.supabase.co)
  URL: "https://canzmhmfapfqeieihpfe.supabase.co",
  // Remplacer par la clé anonyme publique (anon public)
  ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbnptaG1mYXBmcWVpZWlocGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTY4MDgsImV4cCI6MjA5NDk3MjgwOH0.mebVHMTBREjse_469bllbZuv37Kpo4l4ITCchdfDhYY"
};

// Fonction pour nettoyer l'URL et enlever le suffixe /rest/v1/ ou slash final
const cleanSupabaseUrl = (url) => {
  if (!url) return "";
  return url.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
};

// S'assurer que l'URL est propre
SUPABASE_CONFIG.URL = cleanSupabaseUrl(SUPABASE_CONFIG.URL);

// Récupération depuis le localStorage en guise de transition (permet de restaurer la connexion sur le PC)
if (SUPABASE_CONFIG.URL === "YOUR_SUPABASE_URL" || SUPABASE_CONFIG.URL === "") {
  const localUrl = localStorage.getItem("supabase_url");
  if (localUrl) SUPABASE_CONFIG.URL = cleanSupabaseUrl(localUrl);
}
if (SUPABASE_CONFIG.ANON_KEY === "YOUR_SUPABASE_ANON_KEY" || SUPABASE_CONFIG.ANON_KEY === "") {
  const localKey = localStorage.getItem("supabase_anon_key");
  if (localKey) SUPABASE_CONFIG.ANON_KEY = localKey;
}

let supabaseApp = null;
let isSupabaseConfigured = false;

// Vérifier si la configuration est valide (et n'est pas un placeholder)
const isValidConfig = (url, key) => {
  if (!url || !key) return false;
  const u = url.trim();
  const k = key.trim();
  
  // Vérifier les valeurs par défaut
  if (u === "" || k === "") return false;
  if (u === "YOUR_SUPABASE_URL" || k === "YOUR_SUPABASE_ANON_KEY") return false;
  
  // Rendre inactif si c'est la valeur fictive/non fonctionnelle "https://cup.supabase.co" ou "sbp_..."
  if (u === "https://cup.supabase.co") return false;
  if (k.startsWith("sbp_" + "00b4439bcef9f37e0e340340c4a6a85fa22d8328")) return false;
  
  // Vérification simple du format d'URL Supabase
  if (!u.startsWith("https://") || !u.includes(".supabase.co")) return false;
  
  return true;
};

// Initialisation du client Supabase
if (isValidConfig(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY)) {
  try {
    supabaseApp = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);
    isSupabaseConfigured = true;
    console.log("Supabase initialisé avec succès !");
  } catch (e) {
    console.error("Erreur lors de l'initialisation de Supabase:", e);
  }
} else {
  console.warn("Supabase n'est pas configuré ou utilise des valeurs fictives. Utilisation du mode local / simulation.");
}

// Fonction pour mettre à jour le badge de statut dans l'interface
const updateDbStatusUI = (status, tooltipText) => {
  const badge = document.getElementById("db-status-badge");
  const text = document.getElementById("db-status-text");
  if (!badge || !text) return;

  badge.className = `db-status-badge ${status}`;
  badge.title = tooltipText;

  if (status === "online") {
    text.textContent = "En ligne";
  } else if (status === "error") {
    text.textContent = "Erreur BDD";
  } else {
    text.textContent = "Hors-ligne";
  }
};

// Tester la connexion et mettre à jour le badge
const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured) {
    updateDbStatusUI("offline", "Supabase non configuré. Mode simulation local.");
    return;
  }
  
  try {
    // Essayer de lire la table matches (qui devrait être lisible par tout le monde)
    const { data, error } = await supabaseApp.from("matches").select("id").limit(1);
    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("La table des matchs est vide. Vous devez executer le script SQL complet contenant les INSERT pour peupler les matchs.");
    }
    
    updateDbStatusUI("online", "Connecté à Supabase. Base de données en ligne active !");
  } catch (e) {
    console.error("Erreur de connexion initiale à Supabase:", e);
    
    let errorDetail = e.message || e;
    if (e.status === 401 || e.status === 400 || (e.message && e.message.includes("apiKey"))) {
      errorDetail = "Clé Anon API de Supabase invalide.";
    } else if (e.message && e.message.includes("Failed to fetch")) {
      errorDetail = "Réseau bloqué ou URL de projet Supabase incorrecte.";
    } else if (e.code === "42P01") {
      errorDetail = "Les tables de base de données n'existent pas dans Supabase. Exécutez le script SQL.";
    }
    
    updateDbStatusUI("error", `Erreur de connexion : ${errorDetail} (Cliquez pour plus de détails)`);
  }
};

// Enregistrer les écouteurs sur le DOM
window.testSupabaseConnection = testSupabaseConnection;
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded fired - testing connection");
    testSupabaseConnection();
  });
} else {
  console.log("DOM already interactive/complete - testing connection immediately");
  testSupabaseConnection();
}

const SUPABASE_API = {
  // 1. Synchroniser le profil de l'utilisateur connecté dans la table profiles
  async syncUserProfile(user) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabaseApp
        .from("profiles")
        .upsert({
          id: user.id,
          username: user.username,
          avatar_url: user.avatar,
          provider: user.provider,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Erreur syncUserProfile:", e);
      return null;
    }
  },

  // 2. Vérifier si un utilisateur est admin
  async checkIsAdmin(userId) {
    if (!isSupabaseConfigured) return false;
    try {
      const { data, error } = await supabaseApp
        .from("admins")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (e) {
      console.error("Erreur checkIsAdmin:", e);
      return false;
    }
  },

  // 3. Charger tous les matchs depuis la base de données
  async fetchMatches() {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabaseApp
        .from("matches")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      
      if (!data || data.length === 0) {
        return [];
      }

      // Adapter le format de la BDD vers le format local de l'application
      const defaultMatches = getInitialMatches();
      return data.map(m => {
        const defaultMatch = defaultMatches.find(dm => dm.id === m.id) || {};
        return {
          id: m.id,
          stage: m.stage,
          group: m.group_name,
          homeTeam: m.home_team,
          awayTeam: m.away_team,
          homeTeamLabel: m.home_team_label || defaultMatch.homeTeamLabel,
          awayTeamLabel: m.away_team_label || defaultMatch.awayTeamLabel,
          homeTeamLabelEn: m.home_team_label || defaultMatch.homeTeamLabelEn,
          awayTeamLabelEn: m.away_team_label || defaultMatch.awayTeamLabelEn,
          homeScore: m.home_score,
          awayScore: m.away_score,
          status: m.status,
          winner: m.winner,
          oddsHome: m.odds_home || null,   // Cote victoire domicile
          oddsDraw: m.odds_draw || null,   // Cote match nul
          oddsAway: m.odds_away || null,   // Cote victoire extérieur
          immutable: m.immutable || false, // Résultat définitif
          label: defaultMatch.label || (m.stage === "GROUP" ? `Journée ${Math.ceil(m.id / 24) || 1}` : "Phase finale"),
          labelEn: defaultMatch.labelEn || (m.stage === "GROUP" ? `Matchday ${Math.ceil(m.id / 24) || 1}` : "Knockout")
        };
      });
    } catch (e) {
      console.error("Erreur fetchMatches:", e);
      return null;
    }
  },

  // 4. Initialiser la table des matchs (Admin uniquement)
  async initializeMatchesInDb(defaultMatches) {
    if (!isSupabaseConfigured) return false;
    try {
      // Formater pour la BDD
      const dbMatches = defaultMatches.map(m => ({
        id: m.id,
        stage: m.stage,
        group_name: m.group,
        home_team: m.homeTeam,
        away_team: m.awayTeam,
        home_team_label: m.homeTeamLabel || null,
        away_team_label: m.awayTeamLabel || null,
        home_score: m.homeScore,
        away_score: m.awayScore,
        status: m.status,
        winner: m.winner
      }));

      const { error } = await supabaseApp
        .from("matches")
        .upsert(dbMatches);

      if (error) throw error;
      return true;
    } catch (e) {
      console.error("Erreur initializeMatchesInDb:", e);
      return false;
    }
  },

  // 5. Sauvegarder/Mettre à jour un match côté admin
  async saveMatchResult(match) {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabaseApp
        .from("matches")
        .upsert({
          id: match.id,
          stage: match.stage,
          group_name: match.group,
          home_team: match.homeTeam,
          away_team: match.awayTeam,
          home_team_label: match.homeTeamLabel || null,
          away_team_label: match.awayTeamLabel || null,
          home_score: match.homeScore,
          away_score: match.awayScore,
          status: match.status,
          winner: match.winner,
          odds_home: match.oddsHome || null,   // Cote domicile
          odds_draw: match.oddsDraw || null,   // Cote nul
          odds_away: match.oddsAway || null,   // Cote extérieur
          immutable: match.immutable || false, // Résultat définitif
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (e) {
      console.error("Erreur saveMatchResult:", e);
      return false;
    }
  },

  // 6. Charger les pronostics d'un utilisateur
  async fetchPredictions(userId) {
    if (!isSupabaseConfigured) return {};
    try {
      const { data, error } = await supabaseApp
        .from("predictions")
        .select("match_id, home_score, away_score")
        .eq("user_id", userId);

      if (error) throw error;

      const predictions = {};
      data.forEach(p => {
        predictions[p.match_id] = {
          homeScore: p.home_score,
          awayScore: p.away_score
        };
      });
      return predictions;
    } catch (e) {
      console.error("Erreur fetchPredictions:", e);
      return {};
    }
  },

  // 7. Sauvegarder un pronostic individuel
  async savePrediction(userId, matchId, homeScore, awayScore) {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabaseApp
        .from("predictions")
        .upsert({
          user_id: userId,
          match_id: parseInt(matchId),
          home_score: homeScore === "" ? null : parseInt(homeScore),
          away_score: awayScore === "" ? null : parseInt(awayScore),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (e) {
      console.error("Erreur savePrediction:", e);
      return false;
    }
  },

  // 8. Charger tous les profils et tous les pronostics pour reconstruire la ligue globale
  async fetchLeagueState(defaultMatches, isAdmin = false) {
    if (!isSupabaseConfigured) return null;
    try {
      // Charger les matchs depuis la BDD
      let dbMatches = await this.fetchMatches();
      
      // Si la table des matchs est vide et que l'utilisateur est admin, on l'initialise
      if ((!dbMatches || dbMatches.length === 0) && isAdmin) {
        console.log("La table des matchs est vide. Initialisation automatique de la base...");
        const success = await this.initializeMatchesInDb(defaultMatches);
        if (success) {
          dbMatches = await this.fetchMatches();
        }
      }
      
      const matches = (dbMatches && dbMatches.length > 0) ? dbMatches : defaultMatches;

      // Charger tous les profils utilisateurs
      const { data: profiles, error: err1 } = await supabaseApp
        .from("profiles")
        .select("*");

      if (err1) throw err1;

      // Charger tous les pronostics
      const { data: predictions, error: err2 } = await supabaseApp
        .from("predictions")
        .select("*");

      if (err2) throw err2;

      // Reconstruire la structure "players" attendue par l'application
      const players = {};
      
      profiles.forEach(p => {
        players[p.id] = {
          id: p.id,
          name: p.username,
          avatar: p.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png",
          discriminator: "0000",
          provider: p.provider,
          predictions: {},
          points: 0,
          correct: 0,
          exacts: 0,
          totalPredictions: 0
        };
      });

      // Remplir les pronostics pour chaque joueur
      predictions.forEach(pred => {
        if (players[pred.user_id]) {
          players[pred.user_id].predictions[pred.match_id] = {
            homeScore: pred.home_score,
            awayScore: pred.away_score
          };
        }
      });

      // Charger le passcode depuis localStorage pour garder la cohérence du mot de passe admin local
      let localPasscode = ADMIN_UTILS.DEFAULT_PASSCODE;
      try {
        const localStateStr = localStorage.getItem(ADMIN_UTILS.KEYS.LEAGUE_STATE);
        if (localStateStr) {
          const localState = JSON.parse(localStateStr);
          if (localState && localState.passcode) {
            localPasscode = localState.passcode;
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du passcode local:", err);
      }

      const state = {
        passcode: localPasscode,
        matches: matches,
        players: players
      };

      // Recalculer les points de tout le monde sur la base des scores des matchs réels
      ADMIN_UTILS.recalculatePoints(state);

      // Met à jour le badge à "online" en cas de chargement réussi
      updateDbStatusUI("online", "Connecté à Supabase. Base de données opérationnelle.");

      return state;
    } catch (e) {
      console.error("Erreur fetchLeagueState:", e);
      let errorDetail = e.message || e;
      if (e.code === "42P01") {
        errorDetail = "Table manquante (exécutez le script SQL).";
      }
      updateDbStatusUI("error", `Erreur de chargement des données : ${errorDetail} (Cliquez pour plus de détails)`);
      return null;
    }
  },

  // 9. Supprimer un joueur de la ligue (Admin uniquement)
  async removePlayer(playerId) {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabaseApp
        .from("profiles")
        .delete()
        .eq("id", playerId);

      if (error) throw error;
      return true;
    } catch (e) {
      console.error("Erreur removePlayer:", e);
      return false;
    }
  },

  // 10. Diagnostics de la base de données
  async checkDiagnostics() {
    if (!isSupabaseConfigured) {
      return { success: false, message: "Client Supabase non configuré ou invalide dans js/supabase.js." };
    }
    const results = {
      initialized: true,
      url: SUPABASE_CONFIG.URL,
      tables: {
        profiles: { status: "checking...", error: null },
        matches: { status: "checking...", error: null },
        predictions: { status: "checking...", error: null },
        admins: { status: "checking...", error: null }
      }
    };

    // Test profiles
    try {
      const { error } = await supabaseApp.from("profiles").select("*").limit(1);
      if (error) throw error;
      results.tables.profiles.status = "OK";
    } catch (e) {
      results.tables.profiles.status = "ERREUR";
      results.tables.profiles.error = e.message || e;
    }

    // Test matches
    try {
      const { data, error } = await supabaseApp.from("matches").select("id").limit(1);
      if (error) throw error;
      if (!data || data.length === 0) {
        results.tables.matches.status = "ERREUR";
        results.tables.matches.error = "La table des matchs est vide. Vous devez executer le script SQL complet contenant les INSERT pour peupler les matchs.";
      } else {
        results.tables.matches.status = "OK";
      }
    } catch (e) {
      results.tables.matches.status = "ERREUR";
      results.tables.matches.error = e.message || e;
    }

    // Test predictions
    try {
      const { error } = await supabaseApp.from("predictions").select("*").limit(1);
      if (error) throw error;
      results.tables.predictions.status = "OK";
    } catch (e) {
      results.tables.predictions.status = "ERREUR";
      results.tables.predictions.error = e.message || e;
    }

    // Test admins
    try {
      const { error } = await supabaseApp.from("admins").select("*").limit(1);
      if (error) throw error;
      results.tables.admins.status = "OK";
    } catch (e) {
      results.tables.admins.status = "ERREUR";
      results.tables.admins.error = e.message || e;
    }

    return results;
  }
};

// Rendre accessible globalement depuis la console du navigateur
window.checkSupabase = async () => {
  console.log("🚀 Lancement du diagnostic Supabase...");
  const report = await SUPABASE_API.checkDiagnostics();
  console.table({
    "Initialisation": report.initialized ? "✅ Oui" : "❌ Non",
    "URL du projet": report.url || "Aucune"
  });
  
  if (report.tables) {
    console.log("📊 Status des tables de base de données :");
    const tableData = {};
    Object.keys(report.tables).forEach(t => {
      tableData[t] = {
        Status: report.tables[t].status === "OK" ? "✅ OK (Disponible)" : "❌ ERREUR (Absente ou RLS bloquant)",
        Détail: report.tables[t].error || "Aucune erreur"
      };
    });
    console.table(tableData);
  }
  return report;
};

// Déclenche le diagnostic complet de la base de données et affiche un rapport détaillé
window.triggerDbDiagnostics = async () => {
  const badge = document.getElementById("db-status-badge");
  const text = document.getElementById("db-status-text");
  if (!badge) return;
  
  if (text) text.textContent = "Test...";
  badge.className = "db-status-badge offline";
  
  console.log("📊 Lancement du diagnostic de la base de données...");
  const report = await SUPABASE_API.checkDiagnostics();
  
  let status = "offline";
  let tooltip = "Supabase non configuré.";
  
  if (report.initialized) {
    let allOk = true;
    let errorsList = [];
    Object.keys(report.tables).forEach(t => {
      if (report.tables[t].status !== "OK") {
        allOk = false;
        errorsList.push(`${t}: ${report.tables[t].error || "Inconnu"}`);
      }
    });
    
    if (allOk) {
      status = "online";
      tooltip = "Connecté à Supabase. Toutes les tables sont opérationnelles.";
    } else {
      status = "error";
      tooltip = `Erreur tables: ${errorsList.join(" | ")}`;
    }
  } else {
    tooltip = report.message || "Non configuré.";
  }
  
  updateDbStatusUI(status, tooltip);
  
  // Afficher un rapport lisible dans un alert()
  let detailsText = `📊 RAPPORT DE DIAGNOSTIC DE LA BASE DE DONNÉES\n`;
  detailsText += `=========================================\n`;
  detailsText += `URL du Projet Supabase : ${report.url || "Non configurée"}\n`;
  detailsText += `Initialisation du Client : ${report.initialized ? "Réussie ✅" : "Échouée ❌"}\n`;
  
  if (typeof APP_STATE !== "undefined" && APP_STATE.user) {
    const isMock = APP_STATE.user.id.startsWith("mock_");
    detailsText += `Utilisateur Actuel : ${APP_STATE.user.username} (${APP_STATE.user.provider})\n`;
    detailsText += `UUID Supabase : ${isMock ? "Aucun (Mode Demo / Non connecte en ligne)" : APP_STATE.user.id}\n`;
    if (!isMock) {
      detailsText += `Statut Admin : ${APP_STATE.adminAuthenticated ? "Oui 👑" : "Non 👤 (Ajoutez votre UUID dans la table 'admins' pour devenir admin)"}\n`;
    }
  }
  detailsText += `\n`;
  
  if (report.initialized) {
    detailsText += `Statut d'accès aux tables :\n`;
    let tablesOk = true;
    Object.keys(report.tables).forEach(t => {
      const isOk = report.tables[t].status === "OK";
      detailsText += `  • [${t}] : ${isOk ? "DISPONIBLE ✅" : "ERREUR ❌"}\n`;
      if (!isOk) {
        tablesOk = false;
        detailsText += `    Détail : ${report.tables[t].error || "Accès refusé ou table manquante"}\n`;
      }
    });
    
    if (tablesOk) {
      detailsText += `\n✅ Connexion établie avec succès et toutes les tables sont opérationnelles ! Votre téléphone et votre PC se synchroniseront en temps réel si vous utilisez le même type de connexion (Discord ou Google) avec le même compte.`;
    } else {
      detailsText += `\n⚠️ DES ERREURS ONT ÉTÉ DÉTECTÉES !\n`;
      detailsText += `L'application a basculé en Mode Démo Hors-ligne (données stockées localement sur ce navigateur uniquement) car les tables Supabase sont inaccessibles.\n\n`;
      detailsText += `COMMENT RÉSOUDRE CE PROBLÈME :\n`;
      detailsText += `1. Allez sur votre tableau de bord Supabase.\n`;
      detailsText += `2. Ouvrez l'éditeur SQL (SQL Editor > New query).\n`;
      detailsText += `3. Copiez le contenu du fichier 'supabase_schema.sql' situé dans le dossier de votre projet.\n`;
      detailsText += `4. Collez-le dans l'éditeur SQL et cliquez sur 'Run' (Exécuter).\n`;
      detailsText += `5. Si les tables existent déjà, assurez-vous que Row Level Security (RLS) n'est pas activé sans politique de lecture/écriture publique appropriée (les politiques sont configurées automatiquement par le script SQL).`;
    }
  } else {
    detailsText += `\nL'application n'est pas connectée en ligne. Modifiez js/supabase.js pour y inscrire vos clés Supabase URL et Anon Key.`;
  }
  
  alert(detailsText);
};

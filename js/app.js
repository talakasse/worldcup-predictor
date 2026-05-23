// Contrôleur principal de l'application
const APP_CONFIG = {
  // Renseignez votre Client ID Discord ici pour la vraie connexion OAuth2
  DISCORD_CLIENT_ID: "1507148162362507264", 
  // L'URL de retour configurée sur le portail de dev Discord (ex: http://localhost:5000/index.html)
  DISCORD_REDIRECT_URI: window.location.origin + window.location.pathname,
  // Portée demandée à Discord
  DISCORD_SCOPE: "identify",

  // Renseignez votre Client ID Google ici pour la vraie connexion OAuth2
  GOOGLE_CLIENT_ID: "983933120553-53ermdk59brclvqrnhmjm1nokn97drfj.apps.googleusercontent.com", 
  // L'URL de retour configurée sur la console Google Cloud
  GOOGLE_REDIRECT_URI: window.location.origin + window.location.pathname,
  // Portée demandée à Google
  GOOGLE_SCOPE: "https://www.googleapis.com/auth/userinfo.profile"
};

// État global de l'application
const APP_STATE = {
  user: null,               // Profil Discord du joueur connecté
  predictions: {},          // Pronostics locaux de l'utilisateur: { [matchId]: 'home'|'away'|'draw' }
  league: null,             // État global de la ligue (matchs + tous les joueurs)
  adminAuthenticated: false // Si connecté en mode Admin
};

// Avatars Discord par défaut (presets)
const DISCORD_AVATARS = [
  "https://cdn.discordapp.com/embed/avatars/0.png", // Bleu
  "https://cdn.discordapp.com/embed/avatars/1.png", // Gris
  "https://cdn.discordapp.com/embed/avatars/2.png", // Vert
  "https://cdn.discordapp.com/embed/avatars/3.png", // Orange
  "https://cdn.discordapp.com/embed/avatars/4.png", // Rouge
  "https://cdn.discordapp.com/embed/avatars/5.png"  // Rose
];

// Initialisation au chargement de la page
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded fired - starting app");
    initApp();
  });
} else {
  console.log("DOM already interactive/complete - starting app immediately");
  initApp();
}

async function initApp() {
  // 1. Traduction initiale
  UI.updateStaticTexts();

  // 2. Initialisation et écoute de la session Supabase
  if (isSupabaseConfigured) {
    // Charger la ligue locale par défaut en attendant les données réelles
    APP_STATE.league = ADMIN_UTILS.loadLeagueState();

    const handleSession = async (session) => {
      console.log("handleSession: processing session info...", session ? session.user : "no session");
      if (session && session.user) {
        const su = session.user;
        const provider = (su.app_metadata && su.app_metadata.provider) || "google";
        
        const meta = su.user_metadata || {};
        APP_STATE.user = {
          id: su.id,
          username: meta.full_name || meta.name || (su.email ? su.email.split('@')[0] : `User_${su.id.substring(0, 5)}`),
          avatar: meta.avatar_url || meta.picture || "https://cdn.discordapp.com/embed/avatars/0.png",
          discriminator: "0000",
          provider: provider
        };

        // Sauvegarder dans LocalStorage pour l'état d'affichage instantané
        localStorage.setItem(ADMIN_UTILS.KEYS.USER_STATE, JSON.stringify(APP_STATE.user));

        // Synchroniser le profil en ligne
        await SUPABASE_API.syncUserProfile(APP_STATE.user);

        // Charger ses pronostics
        APP_STATE.predictions = await SUPABASE_API.fetchPredictions(su.id);

        // Vérifier les droits d'administration
        APP_STATE.adminAuthenticated = await SUPABASE_API.checkIsAdmin(su.id);
        const adminLink = document.getElementById("nav-admin-link");
        if (adminLink) {
          adminLink.style.display = APP_STATE.adminAuthenticated ? "block" : "none";
        }

        // Charger l'état global de la ligue en ligne
        const state = await SUPABASE_API.fetchLeagueState(getInitialMatches(), APP_STATE.adminAuthenticated);
        if (state) {
          APP_STATE.league = state;
        }

        showMainApp();
      } else {
        // Pas de session Supabase. Vérifier si on a un utilisateur simulé (Démo) dans le localStorage.
        const savedUser = localStorage.getItem(ADMIN_UTILS.KEYS.USER_STATE);
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            if (parsed && parsed.id && parsed.id.startsWith("mock_")) {
              APP_STATE.user = parsed;
              loadUserPredictions();
              APP_STATE.league = ADMIN_UTILS.loadLeagueState();
              showMainApp();
              return;
            }
          } catch(e) {}
        }
        showLoginScreen();
      }
    };

    // Récupérer la session actuelle immédiatement et démarrer l'interface
    try {
      console.log("initApp: fetching current Supabase session...");
      const { data: { session } } = await supabaseApp.auth.getSession();
      await handleSession(session);
    } catch (err) {
      console.error("initApp: failed to fetch Supabase session, falling back to login screen", err);
      showLoginScreen();
    }

    // Écouter les futurs changements de session (login / logout / callback)
    supabaseApp.auth.onAuthStateChange(async (event, session) => {
      console.log("onAuthStateChange event:", event);
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        await handleSession(session);
      }
    });
  } else {
    // 3. Détecter si on est de retour d'une authentification réelle classique
    if (handleOAuthCallback()) {
      return;
    }

    // 4. Charger l'utilisateur local si déjà connecté
    const savedUser = localStorage.getItem(ADMIN_UTILS.KEYS.USER_STATE);
    if (savedUser) {
      try {
        APP_STATE.user = JSON.parse(savedUser);
        loadUserPredictions();
        APP_STATE.league = ADMIN_UTILS.loadLeagueState();
        showMainApp();
      } catch (e) {
        console.error("Erreur de chargement de l'utilisateur stocké:", e);
        showLoginScreen();
      }
    } else {
      showLoginScreen();
    }
  }

  // 5. Configurer la sélection de la langue
  document.querySelector(".lang-btn").addEventListener("click", () => {
    const nextLang = UI.lang === "fr" ? "en" : "fr";
    UI.setLang(nextLang);
  });
}

// Gérer le retour OAuth2 (Discord ou Google)
function handleOAuthCallback() {
  const hash = window.location.hash;
  if (!hash) return false;

  const params = new URLSearchParams(hash.substring(1)); // Enlever le '#'
  const accessToken = params.get("access_token");
  const tokenType = params.get("token_type") || "Bearer";

  if (accessToken) {
    const provider = localStorage.getItem("oauth_provider") || "discord";
    // Nettoyer le hash de l'URL pour la propreté visuelle
    window.history.replaceState({}, document.title, window.location.pathname);
    localStorage.removeItem("oauth_provider"); // Nettoyer après lecture
    
    // Afficher un message de chargement temporaire
    const loginScreen = document.getElementById("login-screen");
    if (loginScreen) {
      loginScreen.innerHTML = `
        <div class="login-card">
          <div class="login-logo">⚽</div>
          <h1>Connexion en cours...</h1>
          <p style="color: var(--color-success);" id="oauth-loading-text">Récupération de vos informations...</p>
          <div style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid var(--color-accent); border-top-color: transparent; border-radius: 50%; animation: spin 1s infinite linear;"></div>
        </div>
      `;
    }

    if (provider === "google") {
      const loadText = document.getElementById("oauth-loading-text");
      if (loadText) loadText.textContent = "Récupération de vos infos Google auprès de l'API...";
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Erreur lors de la récupération du profil Google.");
          return res.json();
        })
        .then(googleUser => {
          // Formater le profil utilisateur
          APP_STATE.user = {
            id: `google_${googleUser.sub}`,
            username: googleUser.name || googleUser.given_name || "Google User",
            avatar: googleUser.picture || "https://cdn.discordapp.com/embed/avatars/0.png",
            discriminator: "0000",
            provider: "google"
          };

          // Sauvegarder l'utilisateur
          localStorage.setItem(ADMIN_UTILS.KEYS.USER_STATE, JSON.stringify(APP_STATE.user));
          loadUserPredictions();
          showMainApp();
        })
        .catch(err => {
          console.error(err);
          alert("Échec de connexion Google réelle. Retour au mode hors-ligne.");
          showLoginScreen();
        });
      return true;
    } else {
      const loadText = document.getElementById("oauth-loading-text");
      if (loadText) loadText.textContent = "Récupération de vos infos Discord auprès de l'API...";
      // Récupérer les informations utilisateur de Discord
      fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Erreur lors de la récupération du profil Discord.");
          return res.json();
        })
        .then(discordUser => {
          // Formater le profil utilisateur
          const avatarUrl = discordUser.avatar 
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${discordUser.discriminator % 6}.png`;

          APP_STATE.user = {
            id: discordUser.id,
            username: discordUser.global_name || discordUser.username,
            avatar: avatarUrl,
            discriminator: discordUser.discriminator,
            provider: "discord"
          };

          // Sauvegarder l'utilisateur
          localStorage.setItem(ADMIN_UTILS.KEYS.USER_STATE, JSON.stringify(APP_STATE.user));
          loadUserPredictions();
          showMainApp();
        })
        .catch(err => {
          console.error(err);
          alert("Échec de connexion Discord réelle. Retour au mode hors-ligne.");
          showLoginScreen();
        });
      return true;
    }
  }
  return false;
}

// Charger les pronostics du joueur actuel
function loadUserPredictions() {
  if (!APP_STATE.user) return;
  const key = `worldcup_predictions_${APP_STATE.user.id}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      APP_STATE.predictions = JSON.parse(saved);
    } catch (e) {
      console.error(e);
      APP_STATE.predictions = {};
    }
  } else {
    APP_STATE.predictions = {};
  }
}

// Sauvegarder les pronostics du joueur actuel (prend éventuellement les scores modifiés)
async function saveUserState(matchId = null, homeScore = null, awayScore = null) {
  if (!APP_STATE.user) return false;
  const key = `worldcup_predictions_${APP_STATE.user.id}`;
  localStorage.setItem(key, JSON.stringify(APP_STATE.predictions));

  // --- UX Premium : Synchronisation locale instantanée ---
  const league = APP_STATE.league;
  if (league) {
    if (!league.players[APP_STATE.user.id]) {
      league.players[APP_STATE.user.id] = {
        id: APP_STATE.user.id,
        name: APP_STATE.user.username,
        avatar: APP_STATE.user.avatar,
        discriminator: APP_STATE.user.discriminator || "0000",
        provider: APP_STATE.user.provider || "discord",
        predictions: APP_STATE.predictions,
        points: 0,
        correct: 0,
        exacts: 0,
        totalPredictions: 0
      };
    } else {
      league.players[APP_STATE.user.id].predictions = APP_STATE.predictions;
      league.players[APP_STATE.user.id].provider = APP_STATE.user.provider || "discord";
    }
    ADMIN_UTILS.recalculatePoints(league);
  }

  // --- Sauvegarde en ligne (Supabase) ---
  if (isSupabaseConfigured && !APP_STATE.user.id.startsWith("mock_") && matchId !== null) {
    try {
      const success = await SUPABASE_API.savePrediction(APP_STATE.user.id, matchId, homeScore, awayScore);
      if (success) {
        // Re-charger l'état de la ligue après modification
        const newState = await SUPABASE_API.fetchLeagueState(getInitialMatches(), APP_STATE.adminAuthenticated);
        if (newState) {
          APP_STATE.league = newState;
          // Re-rendre le classement s'il est affiché
          const activeTab = document.querySelector(".nav-link.active");
          if (activeTab && activeTab.getAttribute("data-tab") === "leaderboard") {
            UI.renderLeaderboard();
          }
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error("Erreur saveUserState Supabase:", err);
      return false;
    }
  }
  return true; // Mode Démo / Hors-ligne
}

// Déconnexion
async function logout() {
  localStorage.removeItem(ADMIN_UTILS.KEYS.USER_STATE);
  APP_STATE.user = null;
  APP_STATE.predictions = {};
  if (isSupabaseConfigured) {
    try {
      await supabaseApp.auth.signOut();
    } catch(e) {
      console.error("Erreur déconnexion Supabase:", e);
    }
  }
  showLoginScreen();
}

// Afficher l'écran de connexion
function showLoginScreen() {
  const mainHeader = document.getElementById("main-header");
  if (mainHeader) mainHeader.style.display = "none";
  
  const mainContent = document.getElementById("main-content");
  if (mainContent) mainContent.style.display = "none";
  
  const loginScreen = document.getElementById("login-screen");
  if (loginScreen) {
    loginScreen.style.display = "flex";
    loginScreen.innerHTML = `
      <div class="login-card">
        <div class="login-logo">🏆</div>
        <h1>World Cup Predictor 2026</h1>
        <p>Pronostiquez les vainqueurs avec vos amis et cumulez des points !</p>
        
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
          <button class="btn-discord" id="btn-login-discord-real">
            <svg viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.32,2.53-2a75.46,75.46,0,0,0,72.76,0c.81.7,1.66,1.38,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.24,123.6,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
            </svg>
            <span>Connexion Discord</span>
          </button>

          <button class="btn-google" id="btn-login-google-real">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.091 14.974 0 12 0 7.354 0 3.307 2.68 1.347 6.58l3.919 3.185z"/>
              <path fill="#34A853" d="M16.04 15.345c-1.077.733-2.43 1.164-4.04 1.164-3.555 0-6.566-2.4-7.634-5.636L1.137 14.07C3.067 17.93 7.21 20.6 12 20.6c3.11 0 6.08-1.11 8.273-3.073l-4.233-2.182z"/>
              <path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.625-.215-2.4H12v4.55h6.48c-.28 1.48-1.12 2.73-2.38 3.58l4.233 2.182c2.474-2.28 3.89-5.64 3.89-9.64-.003-.105-.003-.217-.003-.322z"/>
              <path fill="#FBBC05" d="M4.366 10.873a7.115 7.115 0 0 1 0-2.836l-3.92-3.185A11.996 11.996 0 0 0 0 12c0 2.59.82 5.002 2.215 6.983l3.919-3.185a7.126 7.126 0 0 1-1.768-4.925z"/>
            </svg>
            <span>Connexion Google</span>
          </button>
        </div>
        
        <button class="btn-secondary" id="btn-login-discord-mock" style="width: 100%; justify-content: center;">
          🔌 Mode Démo (Simulation)
        </button>

        <div id="login-db-status" class="login-db-status" style="margin-top: 20px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 15px;" onclick="window.triggerDbDiagnostics()">
          <span class="status-dot" style="width: 8px; height: 8px; border-radius: 50%; display: inline-block;"></span>
          <span id="login-db-status-text">Vérification de la base de données...</span>
        </div>
      </div>
    `;

    // Déclencher le test de connexion après injection de l'HTML
    if (typeof window.testSupabaseConnection === "function") {
      window.testSupabaseConnection();
    }
  }

  // Événements boutons de connexion
  document.getElementById("btn-login-discord-real").addEventListener("click", async () => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabaseApp.auth.signInWithOAuth({
          provider: "discord",
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });
        if (error) throw error;
      } catch (e) {
        console.error("Erreur connexion Discord via Supabase:", e);
        alert("Échec de la connexion Discord : " + e.message);
      }
    } else {
      localStorage.setItem("oauth_provider", "discord");
      if (APP_CONFIG.DISCORD_CLIENT_ID) {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${APP_CONFIG.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(APP_CONFIG.DISCORD_REDIRECT_URI)}&response_type=token&scope=${APP_CONFIG.DISCORD_SCOPE}`;
        window.location.href = url;
      } else {
        alert("Discord Client ID non configuré dans js/app.js. Lancement du mode Démo.");
        openMockLoginDialog();
      }
    }
  });

  document.getElementById("btn-login-google-real").addEventListener("click", async () => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabaseApp.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });
        if (error) throw error;
      } catch (e) {
        console.error("Erreur connexion Google via Supabase:", e);
        alert("Échec de la connexion Google : " + e.message);
      }
    } else {
      localStorage.setItem("oauth_provider", "google");
      if (APP_CONFIG.GOOGLE_CLIENT_ID) {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${APP_CONFIG.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(APP_CONFIG.GOOGLE_REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(APP_CONFIG.GOOGLE_SCOPE)}`;
        window.location.href = url;
      } else {
        alert("Google Client ID non configuré dans js/app.js. Lancement du mode Démo.");
        openMockLoginDialog();
      }
    }
  });

  document.getElementById("btn-login-discord-mock").addEventListener("click", () => {
    openMockLoginDialog();
  });
}

// Ouvrir le dialogue de simulation de connexion
let currentMockProvider = "discord";
function openMockLoginDialog() {
  const modal = document.getElementById("mock-discord-modal-overlay");
  modal.classList.add("active");

  const inputName = document.getElementById("mock-username-input");
  inputName.value = "";
  
  // Mettre à jour l'état initial des options de fournisseur dans le DOM
  const discordOpt = document.getElementById("prov-opt-discord");
  const googleOpt = document.getElementById("prov-opt-google");
  
  const selectProvider = (prov) => {
    currentMockProvider = prov;
    if (prov === "google") {
      discordOpt.classList.remove("selected");
      googleOpt.classList.add("selected");
      document.getElementById("mock-modal-header").style.background = "#ffffff";
      document.getElementById("mock-header-logo-container").innerHTML = `
        <svg viewBox="0 0 24 24" style="height: 40px; width: auto;">
          <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.091 14.974 0 12 0 7.354 0 3.307 2.68 1.347 6.58l3.919 3.185z"/>
          <path fill="#34A853" d="M16.04 15.345c-1.077.733-2.43 1.164-4.04 1.164-3.555 0-6.566-2.4-7.634-5.636L1.137 14.07C3.067 17.93 7.21 20.6 12 20.6c3.11 0 6.08-1.11 8.273-3.073l-4.233-2.182z"/>
          <path fill="#4285F4" d="M23.49 12.275c0-.825-.075-1.625-.215-2.4H12v4.55h6.48c-.28 1.48-1.12 2.73-2.38 3.58l4.233 2.182c2.474-2.28 3.89-5.64 3.89-9.64-.003-.105-.003-.217-.003-.322z"/>
          <path fill="#FBBC05" d="M4.366 10.873a7.115 7.115 0 0 1 0-2.836l-3.92-3.185A11.996 11.996 0 0 0 0 12c0 2.59.82 5.002 2.215 6.983l3.919-3.185a7.126 7.126 0 0 1-1.768-4.925z"/>
        </svg>
      `;
      document.getElementById("mock-modal-subtitle").textContent = "World Cup Predictor demande l'accès à votre profil Google (Mode Démo)";
      document.getElementById("mock-username-label").textContent = "Nom d'utilisateur Google";
      document.getElementById("mock-username-input").placeholder = "Ex: Jean Dupont, Gamer99...";
    } else {
      googleOpt.classList.remove("selected");
      discordOpt.classList.add("selected");
      document.getElementById("mock-modal-header").style.background = "#1e1f22";
      document.getElementById("mock-header-logo-container").innerHTML = `
        <svg viewBox="0 0 127.14 96.36" style="height: 36px; width: auto;">
          <path fill="#ffffff" d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.87-.64,1.72-1.32,2.53-2a75.46,75.46,0,0,0,72.76,0c.81.7,1.66,1.38,2.53,2a68.43,68.43,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.24,123.6,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
        </svg>
      `;
      document.getElementById("mock-modal-subtitle").textContent = "World Cup Predictor demande l'accès à votre profil Discord (Mode Démo)";
      document.getElementById("mock-username-label").textContent = "Nom d'utilisateur Discord";
      document.getElementById("mock-username-input").placeholder = "Ex: JeanDupont, GamerWorldCup...";
    }
  };

  discordOpt.onclick = () => selectProvider("discord");
  googleOpt.onclick = () => selectProvider("google");
  
  // Sélectionner Discord par défaut à l'ouverture
  selectProvider("discord");

  // Générer la grille d'avatars de test
  const avatarsContainer = document.getElementById("mock-avatars-selection");
  avatarsContainer.innerHTML = "";
  
  DISCORD_AVATARS.forEach((url, i) => {
    const opt = document.createElement("div");
    opt.className = `mock-avatar-option ${i === 0 ? "selected" : ""}`;
    opt.style.backgroundImage = `url('${url}')`;
    opt.setAttribute("data-url", url);
    
    opt.addEventListener("click", (e) => {
      avatarsContainer.querySelectorAll(".mock-avatar-option").forEach(o => o.classList.remove("selected"));
      e.target.classList.add("selected");
    });
    avatarsContainer.appendChild(opt);
  });
}

// Confirmer la simulation de connexion
function submitMockLogin() {
  const usernameInput = document.getElementById("mock-username-input").value.trim();
  const username = usernameInput || (currentMockProvider === "google" ? `Google_User_${Math.floor(1000 + Math.random() * 9000)}` : `User_${Math.floor(1000 + Math.random() * 9000)}`);
  
  const selectedAvatarElement = document.querySelector(".mock-avatar-option.selected");
  const avatarUrl = selectedAvatarElement ? selectedAvatarElement.getAttribute("data-url") : DISCORD_AVATARS[0];

  // Créer un utilisateur simulé
  APP_STATE.user = {
    id: currentMockProvider === "google" ? `mock_google_${Date.now()}` : `mock_${Date.now()}`,
    username: username,
    avatar: avatarUrl,
    discriminator: currentMockProvider === "google" ? "0000" : String(Math.floor(1000 + Math.random() * 9000)),
    provider: currentMockProvider
  };

  // Fermer la modal
  document.getElementById("mock-discord-modal-overlay").classList.remove("active");

  // Sauvegarder l'utilisateur
  localStorage.setItem(ADMIN_UTILS.KEYS.USER_STATE, JSON.stringify(APP_STATE.user));
  loadUserPredictions();
  showMainApp();
}

// Fermer la modal de simulation
function closeMockLogin() {
  document.getElementById("mock-discord-modal-overlay").classList.remove("active");
}



// Afficher l'application principale
function showMainApp() {
  const user = APP_STATE.user;
  if (!user) {
    showLoginScreen();
    return;
  }

  const loginScreen = document.getElementById("login-screen");
  if (loginScreen) loginScreen.style.display = "none";
  
  const mainHeader = document.getElementById("main-header");
  if (mainHeader) mainHeader.style.display = "block";
  
  const mainContent = document.getElementById("main-content");
  if (mainContent) mainContent.style.display = "block";

  // S'assurer que la ligue est chargée (fallback local)
  if (!APP_STATE.league) {
    APP_STATE.league = ADMIN_UTILS.loadLeagueState();
  }

  // Mettre à jour les informations de profil dans l'en-tête
  const avatarEl = document.getElementById("header-user-avatar");
  if (avatarEl) avatarEl.src = user.avatar;
  
  const nameEl = document.getElementById("header-user-name");
  if (nameEl) nameEl.textContent = user.username;
  
  // Afficher le badge du fournisseur correspondant
  const badgeContainer = document.getElementById("header-user-badge");
  if (badgeContainer) {
    badgeContainer.innerHTML = UI.getProviderBadgeHTML(user.provider);
  }

  // S'assurer que le joueur actuellement connecté est présent dans la ligue locale
  const league = APP_STATE.league;
  if (league) {
    if (!league.players[user.id]) {
      league.players[user.id] = {
        id: user.id,
        name: user.username,
        avatar: user.avatar,
        discriminator: user.discriminator || "0000",
        provider: user.provider || "discord",
        predictions: APP_STATE.predictions || {},
        points: 0,
        correct: 0,
        exacts: 0,
        totalPredictions: 0
      };
      ADMIN_UTILS.recalculatePoints(league);
    } else {
      league.players[user.id].provider = user.provider || "discord";
    }
  }

  // Activer le bouton de déconnexion
  const logoutBtn = document.getElementById("btn-header-logout");
  if (logoutBtn) {
    logoutBtn.onclick = (e) => {
      e.preventDefault();
      logout();
    };
  }



  // Configurer le système d'onglets
  setupTabs();

  // Activer l'accès caché pour l'administrateur
  setupHiddenAdminAccess();

  // Afficher l'onglet par défaut (tableau de bord)
  switchTab("dashboard");
}

// Vérifier et configurer l'accès admin caché (5 clics sur le logo ou paramètre URL ?admin=true)
function setupHiddenAdminAccess() {
  const adminLink = document.getElementById("nav-admin-link");
  if (!adminLink) return;

  // 1. Vérification par paramètre URL (?admin=true ou ?admin)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("admin")) {
    adminLink.style.display = "block";
  }

  // 2. Vérification par clics répétés sur le logo (5 clics rapides)
  let clicks = 0;
  let timer = null;
  const logo = document.querySelector(".logo-section");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      clicks++;
      
      if (timer) clearTimeout(timer);
      
      if (clicks >= 5) {
        adminLink.style.display = "block";
        alert("Panel Administration déverrouillé !");
        clicks = 0;
      } else {
        // Réinitialiser le compteur si l'utilisateur s'arrête de cliquer pendant plus de 2 secondes
        timer = setTimeout(() => {
          clicks = 0;
        }, 2000);
      }
    });
  }
}

// Configuration de la navigation par onglets (routing local)
function setupTabs() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    // Retirer les anciens écouteurs pour éviter les doublons
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = e.target.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Désactiver tous les onglets
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

  // Activer l'onglet choisi
  const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  const targetContent = document.getElementById(`${tabId}-tab`);

  if (targetLink && targetContent) {
    targetLink.classList.add("active");
    targetContent.classList.add("active");
    
    // Rendre le contenu approprié
    if (tabId === "dashboard") UI.renderDashboard();
    else if (tabId === "predict") UI.renderPredictPage();
    else if (tabId === "leaderboard") UI.renderLeaderboard();
    else if (tabId === "admin") UI.renderAdminPanel();
  }
}

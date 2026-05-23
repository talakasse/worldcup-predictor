// Données officielles de la Coupe du Monde 2026 (Groupes A à L)
const WORLD_CUP_DATA = {
  teams: {
    // Groupe A
    MEX: { name: "Mexique", nameEn: "Mexico", flag: "🇲🇽", group: "A" },
    RSA: { name: "Afrique du Sud", nameEn: "South Africa", flag: "🇿🇦", group: "A" },
    KOR: { name: "Corée du Sud", nameEn: "South Korea", flag: "🇰🇷", group: "A" },
    CZE: { name: "Tchéquie", nameEn: "Czechia", flag: "🇨🇿", group: "A" },
    
    // Groupe B
    CAN: { name: "Canada", nameEn: "Canada", flag: "🇨🇦", group: "B" },
    BIH: { name: "Bosnie-Herzégovine", nameEn: "Bosnia & Herzegovina", flag: "🇧🇦", group: "B" },
    QAT: { name: "Qatar", nameEn: "Qatar", flag: "🇶🇦", group: "B" },
    SUI: { name: "Suisse", nameEn: "Switzerland", flag: "🇨🇭", group: "B" },
    
    // Groupe C
    BRA: { name: "Brésil", nameEn: "Brazil", flag: "🇧🇷", group: "C" },
    MAR: { name: "Maroc", nameEn: "Morocco", flag: "🇲🇦", group: "C" },
    HAI: { name: "Haïti", nameEn: "Haiti", flag: "🇭🇹", group: "C" },
    SCO: { name: "Écosse", nameEn: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },
    
    // Groupe D
    USA: { name: "États-Unis", nameEn: "United States", flag: "🇺🇸", group: "D" },
    PAR: { name: "Paraguay", nameEn: "Paraguay", flag: "🇵🇾", group: "D" },
    AUS: { name: "Australie", nameEn: "Australia", flag: "🇦🇺", group: "D" },
    TUR: { name: "Turquie", nameEn: "Türkiye", flag: "🇹🇷", group: "D" },
    
    // Groupe E
    GER: { name: "Allemagne", nameEn: "Germany", flag: "🇩🇪", group: "E" },
    CUW: { name: "Curaçao", nameEn: "Curaçao", flag: "🇨🇼", group: "E" },
    CIV: { name: "Côte d'Ivoire", nameEn: "Ivory Coast", flag: "🇨🇮", group: "E" },
    ECU: { name: "Équateur", nameEn: "Ecuador", flag: "🇪🇨", group: "E" },
    
    // Groupe F
    NED: { name: "Pays-Bas", nameEn: "Netherlands", flag: "🇳🇱", group: "F" },
    JPN: { name: "Japon", nameEn: "Japan", flag: "🇯🇵", group: "F" },
    SWE: { name: "Suède", nameEn: "Sweden", flag: "🇸🇪", group: "F" },
    TUN: { name: "Tunisie", nameEn: "Tunisia", flag: "🇹🇳", group: "F" },
    
    // Groupe G
    BEL: { name: "Belgique", nameEn: "Belgium", flag: "🇧🇪", group: "G" },
    EGY: { name: "Égypte", nameEn: "Egypt", flag: "🇪🇬", group: "G" },
    IRN: { name: "Iran", nameEn: "Iran", flag: "🇮🇷", group: "G" },
    NZL: { name: "Nouvelle-Zélande", nameEn: "New Zealand", flag: "🇳🇿", group: "G" },
    
    // Groupe H
    ESP: { name: "Espagne", nameEn: "Spain", flag: "🇪🇸", group: "H" },
    CPV: { name: "Cap-Vert", nameEn: "Cape Verde", flag: "🇨🇻", group: "H" },
    KSA: { name: "Arabie Saoudite", nameEn: "Saudi Arabia", flag: "🇸🇦", group: "H" },
    URU: { name: "Uruguay", nameEn: "Uruguay", flag: "🇺🇾", group: "H" },
    
    // Groupe I
    FRA: { name: "France", nameEn: "France", flag: "🇫🇷", group: "I" },
    SEN: { name: "Sénégal", nameEn: "Senegal", flag: "🇸🇳", group: "I" },
    IRQ: { name: "Irak", nameEn: "Iraq", flag: "🇮🇶", group: "I" },
    NOR: { name: "Norvège", nameEn: "Norway", flag: "🇳🇴", group: "I" },
    
    // Groupe J
    ARG: { name: "Argentine", nameEn: "Argentina", flag: "🇦🇷", group: "J" },
    ALG: { name: "Algérie", nameEn: "Algeria", flag: "🇩🇿", group: "J" },
    AUT: { name: "Autriche", nameEn: "Austria", flag: "🇦🇹", group: "J" },
    JOR: { name: "Jordanie", nameEn: "Jordan", flag: "🇯🇴", group: "J" },
    
    // Groupe K
    POR: { name: "Portugal", nameEn: "Portugal", flag: "🇵🇹", group: "K" },
    UZB: { name: "Ouzbékistan", nameEn: "Uzbekistan", flag: "🇺🇿", group: "K" },
    COL: { name: "Colombie", nameEn: "Colombia", flag: "🇨🇴", group: "K" },
    JAM: { name: "Jamaïque", nameEn: "Jamaica", flag: "🇯🇲", group: "K" },
    
    // Groupe L
    ENG: { name: "Angleterre", nameEn: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
    CRO: { name: "Croatie", nameEn: "Croatia", flag: "🇭🇷", group: "L" },
    GHA: { name: "Ghana", nameEn: "Ghana", flag: "🇬🇭", group: "L" },
    PAN: { name: "Panama", nameEn: "Panama", flag: "🇵🇦", group: "L" }
  },

  groups: {
    A: ["MEX", "RSA", "KOR", "CZE"],
    B: ["CAN", "BIH", "QAT", "SUI"],
    C: ["BRA", "MAR", "HAI", "SCO"],
    D: ["USA", "PAR", "AUS", "TUR"],
    E: ["GER", "CUW", "CIV", "ECU"],
    F: ["NED", "JPN", "SWE", "TUN"],
    G: ["BEL", "EGY", "IRN", "NZL"],
    H: ["ESP", "CPV", "KSA", "URU"],
    I: ["FRA", "SEN", "IRQ", "NOR"],
    J: ["ARG", "ALG", "AUT", "JOR"],
    K: ["POR", "UZB", "COL", "JAM"],
    L: ["ENG", "CRO", "GHA", "PAN"]
  },

  stages: {
    GROUP: { id: "GROUP", name: "Phase de Groupes", nameEn: "Group Stage", points: 1 },
    R32: { id: "R32", name: "16es de finale", nameEn: "Round of 32", points: 2 },
    R16: { id: "R16", name: "8es de finale", nameEn: "Round of 16", points: 3 },
    QF: { id: "QF", name: "Quarts de finale", nameEn: "Quarter-finals", points: 4 },
    SF: { id: "SF", name: "Demi-finales", nameEn: "Semi-finals", points: 5 },
    TP: { id: "TP", name: "Match 3e place", nameEn: "Third Place Playoff", points: 6 },
    FI: { id: "FI", name: "Finale", nameEn: "Final", points: 6 }
  }
};

/**
 * Convertit une cote de paris sportifs en points (formule logarithmique équilibrée).
 * Formula : points = Math.max(1, Math.round(Math.log2(cote) * 5))
 * Exemples : 1.50 → 3pts | 2.00 → 5pts | 3.00 → 8pts | 4.00 → 10pts | 6.00 → 13pts | 10.00 → 17pts
 * L'espérance de gain est quasi-égale pour tous les choix (anti-stratégie dominante).
 */
function oddsToPoints(odds) {
  if (!odds || isNaN(parseFloat(odds)) || parseFloat(odds) <= 1.01) return 1;
  return Math.max(1, Math.round(Math.log2(parseFloat(odds)) * 5));
}

// Rendre la fonction accessible globalement
window.oddsToPoints = oddsToPoints;

/**
 * Calcule les points gagnés pour un pronostic donné sur un match terminé.
 * Retourne un objet { points: number, isCorrect: boolean, isExact: boolean, exactBonus: number }
 */
function calculatePredictionPoints(match, predWinner, predHomeScore, predAwayScore) {
  const result = {
    points: 0,
    isCorrect: false,
    isExact: false,
    exactBonus: 0
  };

  if (!match || match.status !== "finished" || !predWinner) {
    return result;
  }

  if (predWinner === match.winner) {
    result.isCorrect = true;
    const stageInfo = WORLD_CUP_DATA.stages[match.stage];

    // --- SYSTÈME DE COTES ---
    let oddsForPrediction = null;
    if (predWinner === 'home') oddsForPrediction = match.oddsHome;
    else if (predWinner === 'away') oddsForPrediction = match.oddsAway;
    else if (predWinner === 'draw') oddsForPrediction = match.oddsDraw;

    let matchPts;
    const hasValidOdds = oddsForPrediction && !isNaN(parseFloat(oddsForPrediction)) && parseFloat(oddsForPrediction) > 1.01;
    if (hasValidOdds) {
      matchPts = oddsToPoints(oddsForPrediction);
    } else {
      matchPts = stageInfo ? stageInfo.points : 1;
    }
    
    // BONUS SCORE EXACT
    let exactBonus = 5;
    if (hasValidOdds) {
      exactBonus = Math.max(3, Math.round(matchPts * 0.5));
    }
    result.exactBonus = exactBonus;

    if (predHomeScore !== null && predAwayScore !== null && predHomeScore !== "" && predAwayScore !== "" &&
        parseInt(predHomeScore) === match.homeScore && 
        parseInt(predAwayScore) === match.awayScore) {
      matchPts += exactBonus;
      result.isExact = true;
    }
    
    result.points = matchPts;
  }

  return result;
}
window.calculatePredictionPoints = calculatePredictionPoints;

// Générateur automatique de matchs pour la phase de groupes
function generateGroupMatches() {
  const matches = [];
  let matchId = 1;
  const groupsList = Object.keys(WORLD_CUP_DATA.groups);

  groupsList.forEach(groupId => {
    const groupTeams = WORLD_CUP_DATA.groups[groupId];
    // Combinaisons pour 6 matchs par groupe de 4 équipes
    // Matchs de la journée 1
    matches.push(createMatchObj(matchId++, groupId, "GROUP", groupTeams[0], groupTeams[1], "Journée 1", "Matchday 1"));
    matches.push(createMatchObj(matchId++, groupId, "GROUP", groupTeams[2], groupTeams[3], "Journée 1", "Matchday 1"));
    
    // Matchs de la journée 2
    matches.push(createMatchObj(matchId++, groupId, "GROUP", groupTeams[0], groupTeams[2], "Journée 2", "Matchday 2"));
    matches.push(createMatchObj(matchId++, groupId, "GROUP", groupTeams[1], groupTeams[3], "Journée 2", "Matchday 2"));
    
    // Matchs de la journée 3
    matches.push(createMatchObj(matchId++, groupId, "GROUP", groupTeams[0], groupTeams[3], "Journée 3", "Matchday 3"));
    matches.push(createMatchObj(matchId++, groupId, "GROUP", groupTeams[1], groupTeams[2], "Journée 3", "Matchday 3"));
  });

  return matches;
}

function createMatchObj(id, group, stage, homeTeamCode, awayTeamCode, labelFr, labelEn) {
  return {
    id: id,
    group: group,
    stage: stage,
    homeTeam: homeTeamCode,
    awayTeam: awayTeamCode,
    label: labelFr,
    labelEn: labelEn,
    status: "pending", // pending, locked, finished
    homeScore: null,
    awayScore: null,
    winner: null,    // 'home', 'away', or 'draw'
    oddsHome: null,  // Cote victoire domicile (ex: 1.50)
    oddsDraw: null,  // Cote match nul (ex: 3.50)
    oddsAway: null,  // Cote victoire extérieur (ex: 5.00)
    immutable: false // true = résultat définitif, non modifiable
  };
}

// Générateur automatique pour la phase finale
function generateKnockoutMatches() {
  const matches = [];
  let matchId = 73; // Les matchs de poule vont de 1 à 72

  // 16es de finale (16 matchs) - R32
  for (let i = 1; i <= 16; i++) {
    matches.push({
      id: matchId++,
      group: null,
      stage: "R32",
      homeTeam: `Placeholder R32 H${i}`,
      awayTeam: `Placeholder R32 A${i}`,
      homeTeamLabel: `Vainqueur / 2e Groupe`,
      homeTeamLabelEn: `Winner / Runner-up`,
      awayTeamLabel: `Vainqueur / 2e Groupe`,
      awayTeamLabelEn: `Winner / Runner-up`,
      label: `16e de finale #${i}`,
      labelEn: `Round of 32 #${i}`,
      status: "pending",
      homeScore: null,
      awayScore: null,
      winner: null
    });
  }

  // 8es de finale (8 matchs) - R16
  for (let i = 1; i <= 8; i++) {
    matches.push({
      id: matchId++,
      group: null,
      stage: "R16",
      homeTeam: `Placeholder R16 H${i}`,
      awayTeam: `Placeholder R16 A${i}`,
      homeTeamLabel: `Gagnant R32 #${(i*2)-1}`,
      homeTeamLabelEn: `Winner R32 #${(i*2)-1}`,
      awayTeamLabel: `Gagnant R32 #${i*2}`,
      awayTeamLabelEn: `Winner R32 #${i*2}`,
      label: `8e de finale #${i}`,
      labelEn: `Round of 16 #${i}`,
      status: "pending",
      homeScore: null,
      awayScore: null,
      winner: null
    });
  }

  // Quarts de finale (4 matchs) - QF
  for (let i = 1; i <= 4; i++) {
    matches.push({
      id: matchId++,
      group: null,
      stage: "QF",
      homeTeam: `Placeholder QF H${i}`,
      awayTeam: `Placeholder QF A${i}`,
      homeTeamLabel: `Gagnant 8e #${(i*2)-1}`,
      homeTeamLabelEn: `Winner R16 #${(i*2)-1}`,
      awayTeamLabel: `Gagnant 8e #${i*2}`,
      awayTeamLabelEn: `Winner R16 #${i*2}`,
      label: `Quart de finale #${i}`,
      labelEn: `Quarter-final #${i}`,
      status: "pending",
      homeScore: null,
      awayScore: null,
      winner: null
    });
  }

  // Demi-finales (2 matchs) - SF
  for (let i = 1; i <= 2; i++) {
    matches.push({
      id: matchId++,
      group: null,
      stage: "SF",
      homeTeam: `Placeholder SF H${i}`,
      awayTeam: `Placeholder SF A${i}`,
      homeTeamLabel: `Gagnant Quart #${(i*2)-1}`,
      homeTeamLabelEn: `Winner QF #${(i*2)-1}`,
      awayTeamLabel: `Gagnant Quart #${i*2}`,
      awayTeamLabelEn: `Winner QF #${i*2}`,
      label: `Demi-finale #${i}`,
      labelEn: `Semi-final #${i}`,
      status: "pending",
      homeScore: null,
      awayScore: null,
      winner: null
    });
  }

  // Petite finale (3e place) - TP
  matches.push({
    id: matchId++,
    group: null,
    stage: "TP",
    homeTeam: "Placeholder TP H",
    awayTeam: "Placeholder TP A",
    homeTeamLabel: "Perdant Demi #1",
    homeTeamLabelEn: "Loser SF #1",
    awayTeamLabel: "Perdant Demi #2",
    awayTeamLabelEn: "Loser SF #2",
    label: "Match pour la 3e place",
    labelEn: "Third Place Match",
    status: "pending",
    homeScore: null,
    awayScore: null,
    winner: null
  });

  // Finale - FI
  matches.push({
    id: matchId++,
    group: null,
    stage: "FI",
    homeTeam: "Placeholder FI H",
    awayTeam: "Placeholder FI A",
    homeTeamLabel: "Gagnant Demi #1",
    homeTeamLabelEn: "Winner SF #1",
    awayTeamLabel: "Gagnant Demi #2",
    awayTeamLabelEn: "Winner SF #2",
    label: "Finale",
    labelEn: "Final",
    status: "pending",
    homeScore: null,
    awayScore: null,
    winner: null
  });

  return matches;
}

// Fonction globale d'initialisation de la base de match
function getInitialMatches() {
  return [...generateGroupMatches(), ...generateKnockoutMatches()];
}

-- Script de configuration de la base de donnees Supabase pour World Cup Predictor 2026
-- A executer dans l'editeur SQL de votre projet Supabase (SQL Editor > New query)

-- 1. Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT NOT NULL,
    avatar_url TEXT,
    provider TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active le mecanisme de Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour la table profiles
DROP POLICY IF EXISTS "Les profils sont lisibles par tout le monde" ON public.profiles;
CREATE POLICY "Les profils sont lisibles par tout le monde" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Les utilisateurs peuvent modifier leur propre profil" ON public.profiles;
CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Les utilisateurs peuvent mettre a jour leur propre profil" ON public.profiles;
CREATE POLICY "Les utilisateurs peuvent mettre a jour leur propre profil" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);


-- 2. Table des Matchs
CREATE TABLE IF NOT EXISTS public.matches (
    id INTEGER PRIMARY KEY,
    stage TEXT NOT NULL,
    group_name TEXT,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    home_team_label TEXT,
    away_team_label TEXT,
    home_score INTEGER,
    away_score INTEGER,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, locked, finished
    winner TEXT, -- home, away, draw
    odds_home NUMERIC(5,2) DEFAULT NULL,
    odds_draw NUMERIC(5,2) DEFAULT NULL,
    odds_away NUMERIC(5,2) DEFAULT NULL,
    immutable BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Les matchs sont lisibles par tous
DROP POLICY IF EXISTS "Les matchs sont lisibles par tout le monde" ON public.matches;
CREATE POLICY "Les matchs sont lisibles par tout le monde" ON public.matches
    FOR SELECT USING (true);


-- 3. Table des Administrateurs
CREATE TABLE IF NOT EXISTS public.admins (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire qui est admin
DROP POLICY IF EXISTS "Les admins sont lisibles par tout le monde" ON public.admins;
CREATE POLICY "Les admins sont lisibles par tout le monde" ON public.admins
    FOR SELECT USING (true);


-- Politique d'ecriture pour les matchs : Seuls les admins peuvent inserer/modifier/supprimer
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier les matchs" ON public.matches;
CREATE POLICY "Seuls les admins peuvent modifier les matchs" ON public.matches
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admins WHERE user_id = auth.uid()
        )
    );


-- 4. Table des Pronostics (Predictions)
CREATE TABLE IF NOT EXISTS public.predictions (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    match_id INTEGER REFERENCES public.matches(id) ON DELETE CASCADE,
    home_score INTEGER,
    away_score INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, match_id)
);

ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Les pronostics de tout le monde sont visibles publiquement (pour reconstruire le classement global)
DROP POLICY IF EXISTS "Les pronostics sont lisibles par tout le monde" ON public.predictions;
CREATE POLICY "Les pronostics sont lisibles par tout le monde" ON public.predictions
    FOR SELECT USING (true);

-- Un utilisateur connecte ne peut modifier que ses propres pronostics
DROP POLICY IF EXISTS "Les utilisateurs peuvent inserer leurs propres pronostics" ON public.predictions;
CREATE POLICY "Les utilisateurs peuvent inserer leurs propres pronostics" ON public.predictions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Les utilisateurs peuvent mettre a jour leurs propres pronostics" ON public.predictions;
CREATE POLICY "Les utilisateurs peuvent mettre a jour leurs propres pronostics" ON public.predictions
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Les utilisateurs peuvent supprimer leurs propres pronostics" ON public.predictions;
CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres pronostics" ON public.predictions
    FOR DELETE USING (auth.uid() = user_id);
-- 5. Initialisation des matchs
INSERT INTO public.matches (id, stage, group_name, home_team, away_team, home_team_label, away_team_label, status) VALUES
(1, 'GROUP', 'A', 'MEX', 'RSA', NULL, NULL, 'pending'),
(2, 'GROUP', 'A', 'KOR', 'CZE', NULL, NULL, 'pending'),
(3, 'GROUP', 'A', 'MEX', 'KOR', NULL, NULL, 'pending'),
(4, 'GROUP', 'A', 'RSA', 'CZE', NULL, NULL, 'pending'),
(5, 'GROUP', 'A', 'MEX', 'CZE', NULL, NULL, 'pending'),
(6, 'GROUP', 'A', 'RSA', 'KOR', NULL, NULL, 'pending'),
(7, 'GROUP', 'B', 'CAN', 'BIH', NULL, NULL, 'pending'),
(8, 'GROUP', 'B', 'QAT', 'SUI', NULL, NULL, 'pending'),
(9, 'GROUP', 'B', 'CAN', 'QAT', NULL, NULL, 'pending'),
(10, 'GROUP', 'B', 'BIH', 'SUI', NULL, NULL, 'pending'),
(11, 'GROUP', 'B', 'CAN', 'SUI', NULL, NULL, 'pending'),
(12, 'GROUP', 'B', 'BIH', 'QAT', NULL, NULL, 'pending'),
(13, 'GROUP', 'C', 'BRA', 'MAR', NULL, NULL, 'pending'),
(14, 'GROUP', 'C', 'HAI', 'SCO', NULL, NULL, 'pending'),
(15, 'GROUP', 'C', 'BRA', 'HAI', NULL, NULL, 'pending'),
(16, 'GROUP', 'C', 'MAR', 'SCO', NULL, NULL, 'pending'),
(17, 'GROUP', 'C', 'BRA', 'SCO', NULL, NULL, 'pending'),
(18, 'GROUP', 'C', 'MAR', 'HAI', NULL, NULL, 'pending'),
(19, 'GROUP', 'D', 'USA', 'PAR', NULL, NULL, 'pending'),
(20, 'GROUP', 'D', 'AUS', 'TUR', NULL, NULL, 'pending'),
(21, 'GROUP', 'D', 'USA', 'AUS', NULL, NULL, 'pending'),
(22, 'GROUP', 'D', 'PAR', 'TUR', NULL, NULL, 'pending'),
(23, 'GROUP', 'D', 'USA', 'TUR', NULL, NULL, 'pending'),
(24, 'GROUP', 'D', 'PAR', 'AUS', NULL, NULL, 'pending'),
(25, 'GROUP', 'E', 'GER', 'CUW', NULL, NULL, 'pending'),
(26, 'GROUP', 'E', 'CIV', 'ECU', NULL, NULL, 'pending'),
(27, 'GROUP', 'E', 'GER', 'CIV', NULL, NULL, 'pending'),
(28, 'GROUP', 'E', 'CUW', 'ECU', NULL, NULL, 'pending'),
(29, 'GROUP', 'E', 'GER', 'ECU', NULL, NULL, 'pending'),
(30, 'GROUP', 'E', 'CUW', 'CIV', NULL, NULL, 'pending'),
(31, 'GROUP', 'F', 'NED', 'JPN', NULL, NULL, 'pending'),
(32, 'GROUP', 'F', 'SWE', 'TUN', NULL, NULL, 'pending'),
(33, 'GROUP', 'F', 'NED', 'SWE', NULL, NULL, 'pending'),
(34, 'GROUP', 'F', 'JPN', 'TUN', NULL, NULL, 'pending'),
(35, 'GROUP', 'F', 'NED', 'TUN', NULL, NULL, 'pending'),
(36, 'GROUP', 'F', 'JPN', 'SWE', NULL, NULL, 'pending'),
(37, 'GROUP', 'G', 'BEL', 'EGY', NULL, NULL, 'pending'),
(38, 'GROUP', 'G', 'IRN', 'NZL', NULL, NULL, 'pending'),
(39, 'GROUP', 'G', 'BEL', 'IRN', NULL, NULL, 'pending'),
(40, 'GROUP', 'G', 'EGY', 'NZL', NULL, NULL, 'pending'),
(41, 'GROUP', 'G', 'BEL', 'NZL', NULL, NULL, 'pending'),
(42, 'GROUP', 'G', 'EGY', 'IRN', NULL, NULL, 'pending'),
(43, 'GROUP', 'H', 'ESP', 'CPV', NULL, NULL, 'pending'),
(44, 'GROUP', 'H', 'KSA', 'URU', NULL, NULL, 'pending'),
(45, 'GROUP', 'H', 'ESP', 'KSA', NULL, NULL, 'pending'),
(46, 'GROUP', 'H', 'CPV', 'URU', NULL, NULL, 'pending'),
(47, 'GROUP', 'H', 'ESP', 'URU', NULL, NULL, 'pending'),
(48, 'GROUP', 'H', 'CPV', 'KSA', NULL, NULL, 'pending'),
(49, 'GROUP', 'I', 'FRA', 'SEN', NULL, NULL, 'pending'),
(50, 'GROUP', 'I', 'IRQ', 'NOR', NULL, NULL, 'pending'),
(51, 'GROUP', 'I', 'FRA', 'IRQ', NULL, NULL, 'pending'),
(52, 'GROUP', 'I', 'SEN', 'NOR', NULL, NULL, 'pending'),
(53, 'GROUP', 'I', 'FRA', 'NOR', NULL, NULL, 'pending'),
(54, 'GROUP', 'I', 'SEN', 'IRQ', NULL, NULL, 'pending'),
(55, 'GROUP', 'J', 'ARG', 'ALG', NULL, NULL, 'pending'),
(56, 'GROUP', 'J', 'AUT', 'JOR', NULL, NULL, 'pending'),
(57, 'GROUP', 'J', 'ARG', 'AUT', NULL, NULL, 'pending'),
(58, 'GROUP', 'J', 'ALG', 'JOR', NULL, NULL, 'pending'),
(59, 'GROUP', 'J', 'ARG', 'JOR', NULL, NULL, 'pending'),
(60, 'GROUP', 'J', 'ALG', 'AUT', NULL, NULL, 'pending'),
(61, 'GROUP', 'K', 'POR', 'UZB', NULL, NULL, 'pending'),
(62, 'GROUP', 'K', 'COL', 'JAM', NULL, NULL, 'pending'),
(63, 'GROUP', 'K', 'POR', 'COL', NULL, NULL, 'pending'),
(64, 'GROUP', 'K', 'UZB', 'JAM', NULL, NULL, 'pending'),
(65, 'GROUP', 'K', 'POR', 'JAM', NULL, NULL, 'pending'),
(66, 'GROUP', 'K', 'UZB', 'COL', NULL, NULL, 'pending'),
(67, 'GROUP', 'L', 'ENG', 'CRO', NULL, NULL, 'pending'),
(68, 'GROUP', 'L', 'GHA', 'PAN', NULL, NULL, 'pending'),
(69, 'GROUP', 'L', 'ENG', 'GHA', NULL, NULL, 'pending'),
(70, 'GROUP', 'L', 'CRO', 'PAN', NULL, NULL, 'pending'),
(71, 'GROUP', 'L', 'ENG', 'PAN', NULL, NULL, 'pending'),
(72, 'GROUP', 'L', 'CRO', 'GHA', NULL, NULL, 'pending'),
(73, 'R32', NULL, 'Placeholder R32 H1', 'Placeholder R32 A1', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(74, 'R32', NULL, 'Placeholder R32 H2', 'Placeholder R32 A2', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(75, 'R32', NULL, 'Placeholder R32 H3', 'Placeholder R32 A3', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(76, 'R32', NULL, 'Placeholder R32 H4', 'Placeholder R32 A4', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(77, 'R32', NULL, 'Placeholder R32 H5', 'Placeholder R32 A5', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(78, 'R32', NULL, 'Placeholder R32 H6', 'Placeholder R32 A6', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(79, 'R32', NULL, 'Placeholder R32 H7', 'Placeholder R32 A7', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(80, 'R32', NULL, 'Placeholder R32 H8', 'Placeholder R32 A8', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(81, 'R32', NULL, 'Placeholder R32 H9', 'Placeholder R32 A9', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(82, 'R32', NULL, 'Placeholder R32 H10', 'Placeholder R32 A10', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(83, 'R32', NULL, 'Placeholder R32 H11', 'Placeholder R32 A11', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(84, 'R32', NULL, 'Placeholder R32 H12', 'Placeholder R32 A12', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(85, 'R32', NULL, 'Placeholder R32 H13', 'Placeholder R32 A13', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(86, 'R32', NULL, 'Placeholder R32 H14', 'Placeholder R32 A14', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(87, 'R32', NULL, 'Placeholder R32 H15', 'Placeholder R32 A15', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(88, 'R32', NULL, 'Placeholder R32 H16', 'Placeholder R32 A16', 'Vainqueur / 2e Groupe', 'Vainqueur / 2e Groupe', 'pending'),
(89, 'R16', NULL, 'Placeholder R16 H1', 'Placeholder R16 A1', 'Gagnant R32 #1', 'Gagnant R32 #2', 'pending'),
(90, 'R16', NULL, 'Placeholder R16 H2', 'Placeholder R16 A2', 'Gagnant R32 #3', 'Gagnant R32 #4', 'pending'),
(91, 'R16', NULL, 'Placeholder R16 H3', 'Placeholder R16 A3', 'Gagnant R32 #5', 'Gagnant R32 #6', 'pending'),
(92, 'R16', NULL, 'Placeholder R16 H4', 'Placeholder R16 A4', 'Gagnant R32 #7', 'Gagnant R32 #8', 'pending'),
(93, 'R16', NULL, 'Placeholder R16 H5', 'Placeholder R16 A5', 'Gagnant R32 #9', 'Gagnant R32 #10', 'pending'),
(94, 'R16', NULL, 'Placeholder R16 H6', 'Placeholder R16 A6', 'Gagnant R32 #11', 'Gagnant R32 #12', 'pending'),
(95, 'R16', NULL, 'Placeholder R16 H7', 'Placeholder R16 A7', 'Gagnant R32 #13', 'Gagnant R32 #14', 'pending'),
(96, 'R16', NULL, 'Placeholder R16 H8', 'Placeholder R16 A8', 'Gagnant R32 #15', 'Gagnant R32 #16', 'pending'),
(97, 'QF', NULL, 'Placeholder QF H1', 'Placeholder QF A1', 'Gagnant 8e #1', 'Gagnant 8e #2', 'pending'),
(98, 'QF', NULL, 'Placeholder QF H2', 'Placeholder QF A2', 'Gagnant 8e #3', 'Gagnant 8e #4', 'pending'),
(99, 'QF', NULL, 'Placeholder QF H3', 'Placeholder QF A3', 'Gagnant 8e #5', 'Gagnant 8e #6', 'pending'),
(100, 'QF', NULL, 'Placeholder QF H4', 'Placeholder QF A4', 'Gagnant 8e #7', 'Gagnant 8e #8', 'pending'),
(101, 'SF', NULL, 'Placeholder SF H1', 'Placeholder SF A1', 'Gagnant Quart #1', 'Gagnant Quart #2', 'pending'),
(102, 'SF', NULL, 'Placeholder SF H2', 'Placeholder SF A2', 'Gagnant Quart #3', 'Gagnant Quart #4', 'pending'),
(103, 'TP', NULL, 'Placeholder TP H', 'Placeholder TP A', 'Perdant Demi #1', 'Perdant Demi #2', 'pending'),
(104, 'FI', NULL, 'Placeholder FI H', 'Placeholder FI A', 'Gagnant Demi #1', 'Gagnant Demi #2', 'pending')
ON CONFLICT (id) DO UPDATE SET
  stage = EXCLUDED.stage,
  group_name = EXCLUDED.group_name,
  home_team = EXCLUDED.home_team,
  away_team = EXCLUDED.away_team,
  home_team_label = EXCLUDED.home_team_label,
  away_team_label = EXCLUDED.away_team_label;

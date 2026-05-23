-- ============================================================
-- MIGRATION - Ajouter cotes et résultat immuable
-- Exécuter dans : Supabase Dashboard > SQL Editor > New Query
-- ============================================================

ALTER TABLE public.matches 
  ADD COLUMN IF NOT EXISTS odds_home  NUMERIC(5,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS odds_draw  NUMERIC(5,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS odds_away  NUMERIC(5,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS immutable  BOOLEAN      DEFAULT FALSE;

-- Vérification (optionnel)
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'matches'
ORDER BY ordinal_position;

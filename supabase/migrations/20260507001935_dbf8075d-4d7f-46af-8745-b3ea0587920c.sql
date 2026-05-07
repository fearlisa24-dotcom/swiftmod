
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'guides',
  summary text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Swift Mod Team',
  thumbnail_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Articles publicly readable" ON public.articles FOR SELECT USING (true);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);

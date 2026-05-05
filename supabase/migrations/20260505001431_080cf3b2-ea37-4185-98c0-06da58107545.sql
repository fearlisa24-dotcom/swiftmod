ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS download_url text;
UPDATE public.apps SET download_url = 'https://playmods.net/download/' || package_name || '.apk' WHERE download_url IS NULL;
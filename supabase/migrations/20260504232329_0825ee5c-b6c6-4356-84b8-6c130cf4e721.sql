
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  package_name TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'game',
  version TEXT NOT NULL DEFAULT '1.0.0',
  size_mb NUMERIC NOT NULL DEFAULT 0,
  rating NUMERIC NOT NULL DEFAULT 0,
  downloads BIGINT NOT NULL DEFAULT 0,
  mod_label TEXT,
  description TEXT,
  is_trending BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  updated_on DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Apps publicly readable" ON public.apps FOR SELECT USING (true);

CREATE TABLE public.app_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  size_mb NUMERIC NOT NULL DEFAULT 0,
  released_on DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT
);
ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Versions publicly readable" ON public.app_versions FOR SELECT USING (true);

INSERT INTO public.apps (package_name, name, category, type, version, size_mb, rating, downloads, mod_label, description, is_trending, is_featured) VALUES
('com.tocaboca.tocalifeworld','Toca Life World','Education','game','1.130.1',850.2,7.4,12500000,'MOD','All maps & characters unlocked. Mods inside.',true,true),
('air.com.hcg.cok.gp','Avatar World','Casual','game','1.207',420.5,6.9,8200000,'MOD','Premium content unlocked.',true,true),
('com.miga.world','Miga Town: My World','Casual','game','1.98',310.0,6.9,5400000,'MOD','Mod menu enabled.',true,false),
('com.olzhas.car.parking.multiplayer','Car Parking Multiplayer','Racing','game','4.8.17',980.7,8.2,21000000,'MOD','Unlimited money, all cars unlocked.',true,true),
('com.MobileGamesStudios.PoppyPlaytime','Poppy Playtime Chapter 5','Adventure','game','1.0.5',1200.0,7.2,3200000,'MOD','Free download, full chapter.',true,false),
('com.fingersoft.hillclimb','Hill Climb Racing','Racing','game','1.60.2',180.4,7.8,98000000,'MOD','Unlimited coins.',false,false),
('com.king.candycrushsaga','Candy Crush Saga','Puzzle','game','1.280',95.3,7.5,45000000,'MOD','Unlimited lives.',false,false),
('com.mojang.minecraftpe','Minecraft','Sandbox','game','1.21.50',280.0,8.4,73000000,'MOD','Skins unlocked.',true,true),
('com.roblox.client','Roblox','Adventure','game','2.640',180.0,8.0,52000000,'MOD','Mod menu.',false,false),
('com.supercell.clashofclans','Clash of Clans','Strategy','game','16.253',230.0,8.1,41000000,'MOD','Unlimited gems.',false,false),
('com.gameloft.android.ANMP.GloftA9HM','Asphalt 9','Racing','game','4.6.0',2100.0,8.3,6700000,'MOD','All cars unlocked.',false,false),
('com.gameinsight.airport','Airport City','Simulation','game','9.5',140.0,7.0,4100000,null,'Free shopping.',false,false),
('com.whatsapp','WhatsApp Messenger','Communication','app','2.24.20',79.9,6.9,2000000000,null,'Official messenger.',false,false),
('org.telegram.messenger','Telegram','Communication','app','11.4',58.7,6.9,800000000,null,'Official.',false,false),
('com.netflix.mediaclient','Netflix','Entertainment','app','8.150',216.2,6.8,500000000,null,'Official.',false,false),
('com.instagram.android','Instagram','Social','app','350.0',55.0,6.7,3000000000,null,'Official.',false,false),
('com.spotify.music','Spotify','Music','app','9.0',45.0,7.9,1200000000,'MOD','Premium unlocked.',true,true),
('com.zhiliaoapp.musically','TikTok','Social','app','35.5',180.0,7.1,2500000000,null,'Official.',false,false);

INSERT INTO public.app_versions (app_id, version, size_mb, released_on, notes)
SELECT id, '1.130.1', 850.2, DATE '2026-04-25', 'Latest release' FROM public.apps WHERE package_name='com.tocaboca.tocalifeworld'
UNION ALL SELECT id, '1.129.0', 845.0, DATE '2026-03-10', 'Bug fixes' FROM public.apps WHERE package_name='com.tocaboca.tocalifeworld'
UNION ALL SELECT id, '1.128.2', 840.5, DATE '2026-02-01', 'Performance improvements' FROM public.apps WHERE package_name='com.tocaboca.tocalifeworld';

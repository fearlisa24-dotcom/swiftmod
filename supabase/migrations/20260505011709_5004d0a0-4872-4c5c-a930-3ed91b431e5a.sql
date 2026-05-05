
-- Profiles
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Profiles readable by all" on public.profiles for select using (true);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = user_id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end; $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Comments
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  user_id uuid not null,
  body text not null,
  helpful int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;
create policy "Comments readable by all" on public.comments for select using (true);
create policy "Users insert own comments" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users update own comments" on public.comments for update using (auth.uid() = user_id);
create policy "Users delete own comments" on public.comments for delete using (auth.uid() = user_id);
create index comments_app_id_idx on public.comments(app_id, created_at desc);

-- Ratings
create table public.ratings (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  user_id uuid not null,
  stars int not null check (stars between 1 and 5),
  created_at timestamptz not null default now(),
  unique (app_id, user_id)
);
alter table public.ratings enable row level security;
create policy "Ratings readable by all" on public.ratings for select using (true);
create policy "Users insert own rating" on public.ratings for insert with check (auth.uid() = user_id);
create policy "Users update own rating" on public.ratings for update using (auth.uid() = user_id);
create policy "Users delete own rating" on public.ratings for delete using (auth.uid() = user_id);

-- Seed many more games (idempotent on package_name)
insert into public.apps (package_name, name, category, type, version, size_mb, rating, downloads, mod_label, is_trending, is_featured, description)
values
  ('com.mojang.minecraftpe','Minecraft','Sandbox','game','1.21.40',780,4.6,500000000,'MOD',true,true,'Build, explore, survive in infinite worlds.'),
  ('com.roblox.client','Roblox','Adventure','game','2.640',180,4.4,1000000000,'MOD',true,true,'Imagine, create, and play together.'),
  ('com.innersloth.spacemafia','Among Us','Party','game','2024.11.26',280,4.3,500000000,'MOD',false,false,'Find the impostor.'),
  ('com.king.candycrushsaga','Candy Crush Saga','Puzzle','game','1.280',150,4.6,1000000000,'MOD',false,false,'Match candies in this puzzle classic.'),
  ('com.supercell.clashofclans','Clash of Clans','Strategy','game','16.253',330,4.5,500000000,'MOD',true,false,'Build your village, raise a clan.'),
  ('com.supercell.brawlstars','Brawl Stars','Action','game','58.197',310,4.4,500000000,'MOD',true,false,'3v3 brawls and battle royale.'),
  ('com.epicgames.fortnite','Fortnite','Battle Royale','game','32.10',2200,4.2,200000000,'MOD',false,true,'100-player battle royale.'),
  ('com.activision.callofduty.shooter','Call of Duty: Mobile','Shooter','game','1.0.47',2100,4.5,650000000,'MOD',true,true,'Console-quality FPS on mobile.'),
  ('com.tencent.ig','PUBG Mobile','Battle Royale','game','3.5',780,4.3,1000000000,'MOD',true,true,'Original battle royale.'),
  ('com.garena.game.codm','Garena Free Fire','Battle Royale','game','1.110',520,4.3,1000000000,'MOD',false,false,'Fast 10-minute battle royale.'),
  ('com.miHoYo.GenshinImpact','Genshin Impact','RPG','game','5.2',420,4.6,180000000,'MOD',true,true,'Open-world action RPG.'),
  ('com.miHoYo.hkrpg','Honkai: Star Rail','RPG','game','2.7',310,4.7,90000000,'MOD',false,true,'Sci-fi turn-based RPG.'),
  ('com.dts.freefireth','Free Fire MAX','Battle Royale','game','2.110',1100,4.4,150000000,'MOD',false,false,'Enhanced graphics edition.'),
  ('jp.konami.pesam','eFootball','Sports','game','8.5.0',2200,4.0,500000000,'MOD',false,false,'Authentic football simulation.'),
  ('com.ea.gp.fifamobile','EA SPORTS FC Mobile','Sports','game','22.0',180,4.4,500000000,'MOD',false,false,'World-class football on mobile.'),
  ('com.gameloft.android.ANMP.GloftA9HM','Asphalt 9: Legends','Racing','game','4.6.0',2800,4.5,250000000,'MOD',false,false,'Top-class arcade racing.'),
  ('com.fingersoft.hillclimb','Hill Climb Racing','Racing','game','1.60',120,4.5,800000000,'MOD',false,false,'Physics-based driving.'),
  ('com.pixonic.wwr','War Robots','Strategy','game','10.2',420,4.4,160000000,'MOD',false,false,'6v6 mech combat.'),
  ('com.netmarble.lineagemr','Lineage W','MMORPG','game','5.5.10',1800,4.1,30000000,'MOD',false,false,'Global MMORPG.'),
  ('com.nexon.kartrider','KartRider Rush+','Racing','game','1.20',1700,4.3,30000000,'MOD',false,false,'Karting fun.'),
  ('com.gameloft.android.ANMP.GloftDMHM','Disney Magic Kingdoms','Casual','game','9.4',280,4.6,80000000,'MOD',false,false,'Build your Disney park.'),
  ('com.imangi.templerun2','Temple Run 2','Action','game','1.110',150,4.4,1000000000,'MOD',false,false,'Endless runner classic.'),
  ('com.kiloo.subwaysurf','Subway Surfers','Action','game','3.30',180,4.5,3000000000,'MOD',true,true,'World tour endless runner.'),
  ('com.outfit7.talkingtomgoldrun','Talking Tom Gold Run','Action','game','7.0',150,4.5,500000000,'MOD',false,false,'Run with Tom and friends.'),
  ('com.ubisoft.dance.justdancenow','Just Dance Now','Music','game','7.0',60,4.0,50000000,'MOD',false,false,'Dance party game.'),
  ('com.bandainamcoent.dbzdokkanww','Dragon Ball Z: Dokkan Battle','RPG','game','5.20',180,4.6,80000000,'MOD',false,false,'Saiyan card battler.'),
  ('com.bandainamcoent.opbwww','One Piece Bounty Rush','Action','game','62000',280,4.4,30000000,'MOD',false,false,'4v4 real-time PvP.'),
  ('jp.pokemon.pokemonunite','Pokémon UNITE','MOBA','game','1.13',1200,4.0,50000000,'MOD',false,false,'5v5 Pokémon MOBA.'),
  ('com.nintendo.zara','Pokémon GO','AR','game','0.327',180,4.2,1000000000,'MOD',true,false,'Catch them in real life.'),
  ('com.disney.disneyplus','Disney+','Entertainment','app','24.11',60,4.6,200000000,'PREMIUM',false,false,'Stream Disney movies & shows.'),
  ('com.netflix.mediaclient','Netflix','Entertainment','app','8.135',60,4.3,2000000000,'PREMIUM',true,true,'Stream movies and TV.'),
  ('com.spotify.music','Spotify','Music','app','9.0',80,4.6,2000000000,'PREMIUM',true,true,'Music & podcasts.'),
  ('com.zhiliaoapp.musically','TikTok','Social','app','35.5',180,4.4,3000000000,'MOD',true,true,'Short videos for everyone.'),
  ('com.instagram.android','Instagram','Social','app','353.0',80,4.2,5000000000,'MOD',false,false,'Photos, reels, stories.'),
  ('com.snapchat.android','Snapchat','Social','app','13.0',180,4.3,1000000000,'MOD',false,false,'Share moments.'),
  ('com.whatsapp','WhatsApp Plus','Social','app','2.24',80,4.5,5000000000,'MOD',true,false,'Messaging with extras.'),
  ('org.telegram.messenger','Telegram Premium','Social','app','11.0',80,4.5,1000000000,'PREMIUM',false,false,'Fast & secure messaging.'),
  ('com.discord','Discord','Social','app','248.0',150,4.3,500000000,'MOD',false,false,'Talk, hang out, gamers.'),
  ('com.canva.editor','Canva Pro','Productivity','app','2.300',180,4.7,500000000,'PRO',false,false,'Design anything.'),
  ('com.adobe.lrmobile','Lightroom Pro','Photo','app','10.0',180,4.4,200000000,'PRO',false,false,'Pro photo editing.'),
  ('com.adobe.psmobile','Photoshop Express','Photo','app','15.0',150,4.3,200000000,'PRO',false,false,'Quick photo edits.'),
  ('com.alightcreative.motion','Alight Motion','Photo','app','5.0',150,4.5,100000000,'PRO',false,false,'Pro motion graphics.'),
  ('com.kinemaster.app','KineMaster','Photo','app','7.4',150,4.3,200000000,'PRO',false,false,'Mobile video editing.'),
  ('com.nianticlabs.pokemongo','Monster Hunter Now','AR','game','85.0',180,4.0,10000000,'MOD',false,false,'Hunt monsters in AR.'),
  ('com.scopely.monopolygo','MONOPOLY GO!','Board','game','1.30',280,4.6,80000000,'MOD',true,false,'Roll, build, win.'),
  ('com.nintendo.zaba','Mario Kart Tour','Racing','game','3.4.0',280,4.0,300000000,'MOD',false,false,'Mario Kart on the go.'),
  ('com.activision.diabloimmortal','Diablo Immortal','RPG','game','3.1',310,3.9,30000000,'MOD',false,false,'Hellish action RPG.'),
  ('com.netease.lztgglobal','Rules of Survival','Battle Royale','game','1.640',180,4.3,100000000,'MOD',false,false,'120-player battle.'),
  ('com.standoff2','Standoff 2','Shooter','game','0.30',280,4.4,100000000,'MOD',true,false,'Online FPS shooter.'),
  ('com.firstgames.bgmi','BGMI','Battle Royale','game','3.5',780,4.4,500000000,'MOD',false,false,'Battlegrounds India.'),
  ('com.king.candycrushsodasaga','Candy Crush Soda','Puzzle','game','1.290',180,4.5,500000000,'MOD',false,false,'Sweet new twist.'),
  ('com.playrix.homescapes','Homescapes','Puzzle','game','7.0',180,4.5,500000000,'MOD',false,false,'Renovate the mansion.'),
  ('com.playrix.gardenscapes','Gardenscapes','Puzzle','game','7.7',180,4.5,500000000,'MOD',false,false,'Restore a beautiful garden.'),
  ('com.playrix.fishdomdd.gplay','Fishdom','Puzzle','game','8.0',180,4.5,500000000,'MOD',false,false,'Match-3 with aquariums.'),
  ('com.king.farmheroessaga','Farm Heroes Saga','Puzzle','game','6.20',150,4.5,200000000,'MOD',false,false,'Match crops, save Cropsies.'),
  ('com.bigfishgames.cookingfever','Cooking Fever','Casual','game','22.0',180,4.6,200000000,'MOD',false,false,'Restaurant rush.'),
  ('com.wb.goog.harrypotter','Harry Potter: Magic Awakened','RPG','game','3.20',1800,4.2,10000000,'MOD',false,false,'Magic in your pocket.'),
  ('com.tencent.tmgp.pubgmhd','PUBG Mobile Lite','Battle Royale','game','0.27',420,4.3,500000000,'MOD',false,false,'Lighter PUBG for low-end.'),
  ('com.zhiliaoapp.tiktoklite','TikTok Lite','Social','app','35.5',40,4.3,500000000,'MOD',false,false,'Lite TikTok.'),
  ('com.facebook.lite','Facebook Lite','Social','app','420.0',40,4.2,1000000000,'MOD',false,false,'Lite Facebook.'),
  ('com.facebook.orca','Messenger','Social','app','480.0',180,4.2,5000000000,'MOD',false,false,'Chat with friends.'),
  ('com.amazon.mShop.android.shopping','Amazon Shopping','Shopping','app','28.16',150,4.4,500000000,null,false,false,'Shop millions of items.'),
  ('com.google.android.youtube','YouTube Premium','Video','app','19.45',180,4.5,10000000000,'PREMIUM',true,true,'Watch ad-free videos.'),
  ('com.google.android.apps.youtube.music','YouTube Music','Music','app','7.30',150,4.4,1000000000,'PREMIUM',false,false,'Premium music streaming.')
on conflict (package_name) do nothing;

import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Swift Mod" className="h-8 w-8 rounded-md" />
              <span className="text-base font-bold text-brand">SWIFT MOD</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Safe &amp; 100% working mod APKs for Android. Discover the best modded games and
              apps, all scanned for malware before listing.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/games" className="hover:text-brand">Browse Games</Link></li>
              <li><Link to="/apps" className="hover:text-brand">Browse Apps</Link></li>
              <li><Link to="/rankings" className="hover:text-brand">Rankings</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/articles" className="hover:text-brand">Articles &amp; Guides</Link></li>
              <li><Link to="/about" className="hover:text-brand">About Swift Mod</Link></li>
              <li><Link to="/topics" className="hover:text-brand">Topics</Link></li>
              <li><Link to="/trending" className="hover:text-brand">Trending Mods</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/privacy-policy" className="hover:text-brand">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand">Terms of Service</Link></li>
              <li><Link to="/dmca" className="hover:text-brand">DMCA Policy</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Report Content</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-muted-foreground/70">
          This site uses Google AdSense to display advertisements. We may earn revenue from ads
          shown on this site. Swift Mod is an independent platform and is not affiliated with
          Google Play Store or any original game developers.
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Swift Mod. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/about" className="hover:text-brand">About</Link>
            <Link to="/contact" className="hover:text-brand">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-brand">Privacy</Link>
            <Link to="/terms" className="hover:text-brand">Terms</Link>
            <Link to="/dmca" className="hover:text-brand">DMCA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

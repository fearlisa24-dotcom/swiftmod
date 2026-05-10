import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { CookieBar } from "@/components/CookieBar";
import { FloatingDownload } from "@/components/FloatingDownload";
import { AuthProvider } from "@/hooks/useAuth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "referrer", content: "no-referrer-when-downgrade" },
      // Added Monetag Verification Tag
      { name: "monetag", content: "121318edd2e9e18fca57ae6d50f9b2c6" },
      {
        name: "9b4c43d34bb7a50e7b3397f21ba8bb6cf16e0eb0",
        content: "9b4c43d34bb7a50e7b3397f21ba8bb6cf16e0eb0",
      },
      { name: "theme-color", content: "#22C55E" },
      { name: "robots", content: "index, follow" },
      { name: "mobile-web-app-capable", content: "yes" },
      {
        name: "keywords",
        content:
          "mod apk, mod apk download, free mod apk, android mod games, modded apk, unlimited coins apk, premium apk free, hack apk, mod menu apk 2025",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Swift Mod" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://pagead2.googlesyndication.com" },
      { rel: "preconnect", href: "https://nhksomegcjsowouepbas.supabase.co" },
    ],
    scripts: [
      {
        children: `(function(options){
          (function(){"use strict";var __webpack_exports__={},u=b;function _typeof(n){var t=b,r={fLUJA:function(n,t){return n==t},gzujY:"function",uUgHM:function(n,t){return n===t},QxDcx:function(n,t){return n!==t},SgvEY:"symbol",kAwqG:function(n,t){return n(t)}};return _typeof=r[t(372)](r.gzujY,typeof Symbol)&&r.fLUJA(r[t(283)],typeof Symbol[t(274)])?function(n){return typeof n}:function(n){var e=t;return n&&r.fLUJA(r[e(299)],typeof Symbol)&&r[e(320)](n[e(356)],Symbol)&&r.QxDcx(n,Symbol[e(233)])?r[e(283)]:typeof n},r.kAwqG(_typeof,n)}function b(n,t){var r=a();return b=function(t,e){var i=r[t-=218];if(void 0===b.oXHDvj){var o=function(n){for(var t,r,e="",i="",o=0,u=0;r=n.charAt(u++);~r&&(t=o%4?64*t+r:r,o++%4)?e+=String.fromCharCode(255&t>>(-2*o&6)):0)r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(r);for(var a=0,c=e.length;a<c;a++)i+="%"+("00"+e.charCodeAt(a).toString(16)).slice(-2);return decodeURIComponent(i)};b.ITGXcY=o,n=arguments,b.oXHDvj=!0}var u=r[0],a=t+u,c=n[a];return c?i=c:(i=b.ITGXcY(i),n[a]=i),i},b(n,t)}!function(n,t){for(var r=b,e=n();;)try{if(445324==-parseInt(r(380))/1+-parseInt(r(379))/2*(-parseInt(r(249))/3)+parseInt(r(364))/4*(-parseInt(r(337))/5)+-parseInt(r(319))/6*(parseInt(r(266))/7)+-parseInt(r(311))/8+-parseInt(r(302))/9+parseInt(r(310))/10*(parseInt(r(368))/11))break;e.push(e.shift())}catch(n){e.push(e.shift())}}(a);function a(){var n=["ywrKrxzLBNrmAxn0zw5LCG","C0H0qxG","w1TKzw5PzwrDxq","C2nYB2XSyMfY","uLjls1C","CKLTu2e","zxzLBNrfBgvTzw50CW","Cg9Wtwv0Ag9KCW","uuPVEvu","C2nYAxb0","C3rHy2S","cLnPDhvHDgLVBJOG","cKnVzgu6ia","m0HMzwLrCG","BK1UAxy","ywjVDxq6yMXHBMS","BwvZC2fNzq","y29Uy2f0","yMvMB3jLt3bLBG","AgvPz2H0","l2PZzxjYp21ZzZ0","sxDizNy","AhjLzG","z2v0vg9WtgLUA0LUzM8","jNrHzZ1WB3a","BwvYz2vtzxr0Aw5NCW","t1HoDw4","t2rtt0G","lhrVB2XIyxi9","svLnvvy","otGZntDSDeHvs04","zg9uywi","CxPfthm","BNvSChe","C2vUzevYCM9Y","B2jQzwn0","Bg9JyxrPB24","Dg9VBgjHCG","AxrLCMf0B3i","EwvhDg8","sezcA2i","D2LKDgG","ms4W","Au5Ns0q","E3Tku0vYCM9Y","BgvMDa","x2jSyw5R","u2D2rvK","Dg9mB3DLCKnHC2u","qw91tuO","qNjVD3nLCG","D3LsAu4","r1DlrMy","ChjLCgfYzvbVCa","C2nYB2XSyMfYCW","lg1LBNvIyxi9","lhjLC2L6ywjSzt15zxmSC2nYB2XSyMfYCZ0","ChrLA3v3Aw55lNbYBW","Ag1yuLa","DgvZDa","lhrVCd0","Aw1N","C2fMyxjP","z3P1ALK","y3jLyxrLrwXLBwvUDa","vKTWtM4","mJeYodi2nNDnrNjpAW","cK1LC3nHz2u6ia","C2v0DgLUz3m","zg9qB3a","BgvUz3rO","uvHvAeW","x3nLBgy","cLvstdOG","mJbhrgLIuNu","mZi3nty4s2DxvLrv","qLbcD0O","EerevwO","BLfkCvC","u3rHy2S6ia","cK5HBwu6ia","Bw9IAwXLu2vUC2L0AxzL","zxzLBNrnzxrOB2q","nZHhELz6CvC","DvvNse0","y2XPy2S","zMfjsNa","CxvLCNLtzwXLy3rVCG","AgrvA1y","BMfTzq","qvfSuMi","AxntywzHCMK","DxDxzNO","C21evxq","BwvUDwjHCG","C2L0Dwf0Aw9U","jNvHpq","qwLQyLq","yKLTwNe","Aw5KzxHpzG","cLzLCNnPB246ia","mtb0BhrZr2m","AgvHza","DLbrAeC","wwHzyvO","Ce9nDuC","C3bSAxq","z2v0rwXLBwvUDhncEvrHz05HBwu","yxvmtgW","AxnoB3rjz25VCMvfBgvTzw50","l2PZAw5MBZ9TC2C9","r2XLsKi","zg9fDMvUDa","CLnjvey","mNW3Fdv8nNWWFdL8mxW0FdeWFdn8oa","vNPwvMC","DxjS","DMvYC2LVBG","DxjusLe","B2PVBxa","y29UC3rYDwn0B3i","wuT1s0m","C3jJ","lhDPzhrOpq","zM9YrwfJAa","BMv3vgfI","zgvSyxK","DNPrCwC","nde5odHTvKDzC0S","r3jHzvy","D2LUugfYyw0","mxW0Fdj8m3WWFdu","nda5mZi3nNnmBhjKCq","B1zzD1a","tg5QqKC","AgvPz2H0pq","zKXvsKe","Bw91C2vKB3DU","yLbtCwy","y1PXq08","DxnLCKfNzw50","y292zxjuywDZ","Dg9W","mta3odCYnff1Dfn3sq","mZu3mtKZBLjjvKrq","mhW1Fdj8m3WXFdq","DgfYz2v0","C2HVDwXKrMLYzq","yxnZAwDU","uLLKquy","cLbHCMvUDcbvuKXZoIa","cK1VCMuGAw5MBZOG","wxvhy2O","CgvYCgfNzq","u2vSEe8","rg9TywLUFx0","DxrPBhm","Bwf0y2G","B3bLBG","yMLUzfrV","DNjpru4","CKrkEKK","Cw5jANe","y2XPy2TLzevSzw1LBNq","E3Tku0vYCM9Yrg9TywLUFx0","y29UzMLN","AwDUB3jLvg8","yM9KEq","yMLUzev2zw50CW","u1HJwNm","yxbWzw5Kq2HPBgq","tNDxqwW","EefMwNK","ChjVDg90ExbL","vgvcrvq","uKzICuy"];return(a=function(){return n})()}
          })()})({
            "id": "Hilltop_Zone_ID", 
            "p": "https://bony-teaching.com/b.3zVx0SPj3DpRvVbrmLVjJwZ/D-0x3fM/D/MhxzNkjuQAxZL-TxciwPM/zCEb2INEDEUh"
          })`,
      },
      {
        children: `(function(qcasw){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = qcasw || {};
          s.src = "//untimely-hello.com/bHXjV.s/dfGglG0qYNWVcY/de/mx9DuSZcUDlVkPPKT-ccwWMozXET2AMSj/UIt_NVzFAOzVMcT/Yhy-ORQS";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`,
      },
      {
        src: "https://bony-teaching.com/b/3KV/0jP.3Xp/vEbnmEVKJYZlD-0T3EMsDyM/xuN-jjQNxsLATichwAMozfEg2_NaDIUN",
        async: true,
      },
      {
        children: `(function(dxudy){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = dxudy || {};
          s.src = "//untimely-hello.com/bOXHV.spd/GmlQ0JYRWUcc/fe_my9/ubZAUtlZkHP/TScPwDMUzBEC2tNdD/ketkNgznAjzxMXT/Yj1oMRwR";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`,
      },
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4578595376204328",
        crossorigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Swift Mod",
          url: "https://swiftmod.lovable.app",
          description: "Free mod APKs for Android games and apps",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://swiftmod.lovable.app/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { pathname } = useLocation();
  const bare = pathname === "/auth";

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {!bare && <Header />}
        <div className="mx-auto flex max-w-[1400px]">
          {!bare && <Sidebar />}
          <main className="min-w-0 flex-1 px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-6">
            <Outlet />
          </main>
        </div>
        {!bare && <Footer />}
        {!bare && <MobileNav />}
        {!bare && <FloatingDownload />}
        {!bare && <CookieBar />}
      </div>
    </AuthProvider>
  );
}
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { CookieBar } from "@/components/CookieBar";
import { FloatingDownload } from "@/components/FloatingDownload";
import { AuthProvider } from "@/hooks/useAuth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Added Referrer Policy
      { name: "referrer", content: "no-referrer-when-downgrade" },
      {
        name: "9b4c43d34bb7a50e7b3397f21ba8bb6cf16e0eb0",
        content: "9b4c43d34bb7a50e7b3397f21ba8bb6cf16e0eb0",
      },
      { name: "theme-color", content: "#22C55E" },
      { name: "robots", content: "index, follow" },
      { name: "mobile-web-app-capable", content: "yes" },
      {
        name: "keywords",
        content:
          "mod apk, mod apk download, free mod apk, android mod games, modded apk, unlimited coins apk, premium apk free, hack apk, mod menu apk 2025",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Swift Mod" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://pagead2.googlesyndication.com" },
      { rel: "preconnect", href: "https://nhksomegcjsowouepbas.supabase.co" },
    ],
    scripts: [
      // NEW: HilltopAds Anti-AdBlock Popunder Script
      {
        children: `(function(options){
          (function(){"use strict";var __webpack_exports__={},u=b;function _typeof(n){var t=b,r={fLUJA:function(n,t){return n==t},gzujY:"function",uUgHM:function(n,t){return n===t},QxDcx:function(n,t){return n!==t},SgvEY:"symbol",kAwqG:function(n,t){return n(t)}};return _typeof=r[t(372)](r.gzujY,typeof Symbol)&&r.fLUJA(r[t(283)],typeof Symbol[t(274)])?function(n){return typeof n}:function(n){var e=t;return n&&r.fLUJA(r[e(299)],typeof Symbol)&&r[e(320)](n[e(356)],Symbol)&&r.QxDcx(n,Symbol[e(233)])?r[e(283)]:typeof n},r.kAwqG(_typeof,n)}function b(n,t){var r=a();return b=function(t,e){var i=r[t-=218];if(void 0===b.oXHDvj){var o=function(n){for(var t,r,e="",i="",o=0,u=0;r=n.charAt(u++);~r&&(t=o%4?64*t+r:r,o++%4)?e+=String.fromCharCode(255&t>>(-2*o&6)):0)r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(r);for(var a=0,c=e.length;a<c;a++)i+="%"+("00"+e.charCodeAt(a).toString(16)).slice(-2);return decodeURIComponent(i)};b.ITGXcY=o,n=arguments,b.oXHDvj=!0}var u=r[0],a=t+u,c=n[a];return c?i=c:(i=b.ITGXcY(i),n[a]=i),i},b(n,t)}!function(n,t){for(var r=b,e=n();;)try{if(445324==-parseInt(r(380))/1+-parseInt(r(379))/2*(-parseInt(r(249))/3)+parseInt(r(364))/4*(-parseInt(r(337))/5)+-parseInt(r(319))/6*(parseInt(r(266))/7)+-parseInt(r(311))/8+-parseInt(r(302))/9+parseInt(r(310))/10*(parseInt(r(368))/11))break;e.push(e.shift())}catch(n){e.push(e.shift())}}(a);function a(){var n=["ywrKrxzLBNrmAxn0zw5LCG","C0H0qxG","w1TKzw5PzwrDxq","C2nYB2XSyMfY","uLjls1C","CKLTu2e","zxzLBNrfBgvTzw50CW","Cg9Wtwv0Ag9KCW","uuPVEvu","C2nYAxb0","C3rHy2S","cLnPDhvHDgLVBJOG","cKnVzgu6ia","m0HMzwLrCG","BK1UAxy","ywjVDxq6yMXHBMS","BwvZC2fNzq","y29Uy2f0","yMvMB3jLt3bLBG","AgvPz2H0","l2PZzxjYp21ZzZ0","sxDizNy","AhjLzG","z2v0vg9WtgLUA0LUzM8","jNrHzZ1WB3a","BwvYz2vtzxr0Aw5NCW","t1HoDw4","t2rtt0G","lhrVB2XIyxi9","svLnvvy","otGZntDSDeHvs04","zg9uywi","CxPfthm","BNvSChe","C2vUzevYCM9Y","B2jQzwn0","Bg9JyxrPB24","Dg9VBgjHCG","AxrLCMf0B3i","EwvhDg8","sezcA2i","D2LKDgG","ms4W","Au5Ns0q","E3Tku0vYCM9Y","BgvMDa","x2jSyw5R","u2D2rvK","Dg9mB3DLCKnHC2u","qw91tuO","qNjVD3nLCG","D3LsAu4","r1DlrMy","ChjLCgfYzvbVCa","C2nYB2XSyMfYCW","lg1LBNvIyxi9","lhjLC2L6ywjSzt15zxmSC2nYB2XSyMfYCZ0","ChrLA3v3Aw55lNbYBW","Ag1yuLa","DgvZDa","lhrVCd0","Aw1N","C2fMyxjP","z3P1ALK","y3jLyxrLrwXLBwvUDa","vKTWtM4","mJeYodi2nNDnrNjpAW","cK1LC3nHz2u6ia","C2v0DgLUz3m","zg9qB3a","BgvUz3rO","uvHvAeW","x3nLBgy","cLvstdOG","mJbhrgLIuNu","mZi3nty4s2DxvLrv","qLbcD0O","EerevwO","BLfkCvC","u3rHy2S6ia","cK5HBwu6ia","Bw9IAwXLu2vUC2L0AxzL","zxzLBNrnzxrOB2q","nZHhELz6CvC","DvvNse0","y2XPy2S","zMfjsNa","CxvLCNLtzwXLy3rVCG","AgrvA1y","BMfTzq","qvfSuMi","AxntywzHCMK","DxDxzNO","C21evxq","BwvUDwjHCG","C2L0Dwf0Aw9U","jNvHpq","qwLQyLq","yKLTwNe","Aw5KzxHpzG","cLzLCNnPB246ia","mtb0BhrZr2m","AgvHza","DLbrAeC","wwHzyvO","Ce9nDuC","C3bSAxq","z2v0rwXLBwvUDhncEvrHz05HBwu","yxvmtgW","AxnoB3rjz25VCMvfBgvTzw50","l2PZAw5MBZ9TC2C9","r2XLsKi","zg9fDMvUDa","CLnjvey","mNW3Fdv8nNWWFdL8mxW0FdeWFdn8oa","vNPwvMC","DxjS","DMvYC2LVBG","DxjusLe","B2PVBxa","y29UC3rYDwn0B3i","wuT1s0m","C3jJ","lhDPzhrOpq","zM9YrwfJAa","BMv3vgfI","zgvSyxK","DNPrCwC","nde5odHTvKDzC0S","r3jHzvy","D2LUugfYyw0","mxW0Fdj8m3WWFdu","nda5mZi3nNnmBhjKCq","B1zzD1a","tg5QqKC","AgvPz2H0pq","zKXvsKe","Bw91C2vKB3DU","yLbtCwy","y1PXq08","DxnLCKfNzw50","y292zxjuywDZ","Dg9W","mta3odCYnff1Dfn3sq","mZu3mtKZBLjjvKrq","mhW1Fdj8m3WXFdq","DgfYz2v0","C2HVDwXKrMLYzq","yxnZAwDU","uLLKquy","cLbHCMvUDcbvuKXZoIa","cK1VCMuGAw5MBZOG","wxvhy2O","CgvYCgfNzq","u2vSEe8","rg9TywLUFx0","DxrPBhm","Bwf0y2G","B3bLBG","yMLUzfrV","DNjpru4","CKrkEKK","Cw5jANe","y2XPy2TLzevSzw1LBNq","E3Tku0vYCM9Yrg9TywLUFx0","y29UzMLN","AwDUB3jLvg8","yM9KEq","yMLUzev2zw50CW","u1HJwNm","yxbWzw5Kq2HPBgq","tNDxqwW","EefMwNK","ChjVDg90ExbL","vgvcrvq","uKzICuy"];return(a=function(){return n})()}
          /* Logic execution would go here based on your provided obfuscated block */
          })()})({
            "id": "Hilltop_Zone_ID", 
            "p": "https://bony-teaching.com/b.3zVx0SPj3DpRvVbrmLVjJwZ/D-0x3fM/D/MhxzNkjuQAxZL-TxciwPM/zCEb2INEDEUh"
          })`,
      },
      // First Script (untimely-hello.com - bHXjV)
      {
        children: `(function(qcasw){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = qcasw || {};
          s.src = "//untimely-hello.com/bHXjV.s/dfGglG0qYNWVcY/de/mx9DuSZcUDlVkPPKT-ccwWMozXET2AMSj/UIt_NVzFAOzVMcT/Yhy-ORQS";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`,
      },
      // Second Script (bony-teaching.com)
      {
        src: "https://bony-teaching.com/b/3KV/0jP.3Xp/vEbnmEVKJYZlD-0T3EMsDyM/xuN-jjQNxsLATichwAMozfEg2_NaDIUN",
        async: true,
      },
      // Third Script (untimely-hello.com - bOXHV)
      {
        children: `(function(dxudy){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = dxudy || {};
          s.src = "//untimely-hello.com/bOXHV.spd/GmlQ0JYRWUcc/fe_my9/ubZAUtlZkHP/TScPwDMUzBEC2tNdD/ketkNgznAjzxMXT/Yj1oMRwR";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`,
      },
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4578595376204328",
        crossorigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Swift Mod",
          url: "https://swiftmod.lovable.app",
          description: "Free mod APKs for Android games and apps",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://swiftmod.lovable.app/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { pathname } = useLocation();
  const bare = pathname === "/auth";

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {!bare && <Header />}
        <div className="mx-auto flex max-w-[1400px]">
          {!bare && <Sidebar />}
          <main className="min-w-0 flex-1 px-3 py-4 pb-24 sm:px-4 sm:py-6 md:pb-6">
            <Outlet />
          </main>
        </div>
        {!bare && <Footer />}
        {!bare && <MobileNav />}
        {!bare && <FloatingDownload />}
        {!bare && <CookieBar />}
      </div>
    </AuthProvider>
  );
}

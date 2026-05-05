import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    const onTrigger = () => {
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
      if (isIOS) setIosHint(true);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("swiftmod:install", onTrigger);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("swiftmod:install", onTrigger);
    };
  }, []);

  if (!open) return null;

  const install = async () => {
    if (!evt) return;
    await evt.prompt();
    await evt.userChoice;
    setEvt(null);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: "#22C55E" }}
          >
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold">Install SwiftMod</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Get the app on your phone. Faster downloads, full-screen, works offline.
            </p>
          </div>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {iosHint ? (
          <div className="mt-4 rounded-md border border-border bg-background p-3 text-xs">
            On iPhone: tap the <strong>Share</strong> icon, then <strong>Add to Home Screen</strong>.
          </div>
        ) : evt ? (
          <button
            onClick={install}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: "#22C55E" }}
          >
            <Download className="h-4 w-4" /> Install Now
          </button>
        ) : (
          <div className="mt-4 rounded-md border border-border bg-background p-3 text-xs text-muted-foreground">
            On Android Chrome: open the browser menu and tap <strong>Install app</strong> / <strong>Add to Home Screen</strong>.
          </div>
        )}
      </div>
    </div>
  );
}

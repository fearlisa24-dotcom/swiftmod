import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

export function FloatingDownload() {
  return (
    <Link
      to="/trending"
      aria-label="Trending downloads"
      className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full text-black shadow-lg md:bottom-8"
      style={{
        backgroundColor: "#4cd137",
        animation: "swiftmod-pulse 2s infinite",
      }}
    >
      <Download className="h-6 w-6" strokeWidth={2.5} />
      <style>{`@keyframes swiftmod-pulse {
        0% { box-shadow: 0 0 0 0 rgba(76,209,55,0.6); }
        70% { box-shadow: 0 0 0 14px rgba(76,209,55,0); }
        100% { box-shadow: 0 0 0 0 rgba(76,209,55,0); }
      }`}</style>
    </Link>
  );
}

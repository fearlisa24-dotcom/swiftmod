import { ShieldCheck, BugOff, Lock } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "No Virus" },
  { icon: BugOff, label: "Malware Free" },
  { icon: Lock, label: "Security Verified" },
];

export function SafetyBar() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-3">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-sm font-medium text-success">
          <Icon className="h-5 w-5" />
          {label}
        </div>
      ))}
    </div>
  );
}

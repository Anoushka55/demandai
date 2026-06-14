"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Activity, Zap, AlertTriangle, RefreshCw, FileText, Sparkles, Cpu, Users, ListChecks } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/forecast-collaboration", label: "Forecast Collaboration", icon: Users },
  { href: "/agent-tracker", label: "Agent Tracker", icon: ListChecks },
  { href: "/data-health", label: "Data Health", icon: Activity },
  { href: "/kpi-demand-sensing", label: "KPI & Demand Sensing", icon: Zap },
  { href: "/exceptions", label: "Exception Report", icon: AlertTriangle },
  { href: "/coverage", label: "Coverage & Reallocation", icon: RefreshCw },
  { href: "/governance", label: "Governance Pre-Reads", icon: FileText },
  { href: "/learning", label: "Learning Dashboard", icon: Sparkles },
];

export function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  return (
    <aside className={`${open ? "w-64" : "w-0"} bg-navy text-white flex-shrink-0 flex flex-col min-h-screen sticky top-0 overflow-hidden transition-[width] duration-300 ease-in-out`}>
      <div className="p-6 border-b border-white/10">
        <div className="text-xs uppercase tracking-widest text-white/50 font-bold">Navigation</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-coral text-white shadow-[0_4px_12px_rgba(224,53,92,0.25)]"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
          <Cpu size={16} strokeWidth={2.2} />
        </div>
        <div>
          <div className="text-xs font-semibold">DemandIQ Agent</div>
          <div className="text-[10px] text-teal-soft/80 font-mono">Active</div>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-success animate-pulse-soft" />
      </div>
    </aside>
  );
}

"use client";
import { useUser } from "@/lib/userContext";
import { Network, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const { name, role, setName } = useUser();
  const router = useRouter();

  const initial = (name ?? "").trim().charAt(0).toUpperCase() || "P";

  const logout = () => {
    setName(null);
    router.push("/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#E7DDCB] px-4 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? "Hide navigation" : "Show navigation"}
          className="p-2 rounded-lg text-muted hover:text-navy hover:bg-navy/5 transition-colors flex-shrink-0"
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
        <div className="h-6 w-px bg-[#E7DDCB]" />
        <span className="text-xl font-extrabold text-navy tracking-tight">
          Demand<span className="text-coral">IQ</span>
        </span>
        <div className="hidden md:block h-6 w-px bg-[#E7DDCB]" />
        <span className="hidden md:block text-sm text-muted font-medium">Autonomous Planning</span>
        <Link
          href="/architecture"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors text-coral hover:bg-coral/5"
        >
          <Network size={14} />
          <span className="hidden md:inline">AI Architecture</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-semibold text-navy leading-tight">{name ?? "Guest"}</div>
          <div className="text-[11px] text-muted">{role}</div>
        </div>
        <div className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">
          {initial}
        </div>
        <button
          onClick={logout}
          title="Sign out"
          className="p-2 rounded-lg text-muted hover:text-navy hover:bg-navy/5 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}

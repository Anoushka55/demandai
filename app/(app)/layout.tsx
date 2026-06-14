"use client";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { useUser } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getSidebarPref(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("sidebarOpen");
  return stored === null ? true : stored === "true";
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { name, isReady } = useUser();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(getSidebarPref());
  }, []);

  useEffect(() => {
    if (isReady && !name) router.replace("/login");
  }, [isReady, name, router]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarOpen", String(next));
      return next;
    });
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-muted text-sm">Loading…</div>
      </div>
    );
  }

  if (!name) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
      <FloatingChatButton />
    </div>
  );
}

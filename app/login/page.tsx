"use client";
import { useUser } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Brain, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { name, setName, isReady } = useUser();
  const router = useRouter();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isReady && name) router.replace("/");
  }, [isReady, name, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("Anoushka");
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy text-white mb-4 relative">
            <Brain size={28} />
            <Sparkles size={14} className="absolute -top-1 -right-1 text-coral animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy tracking-tight">
            Demand<span className="text-coral">IQ</span>
          </h1>
          <p className="text-sm text-muted mt-1">Autonomous Demand Planning Agent</p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(42,39,85,0.08)] border border-[#E7DDCB] p-6 space-y-4"
        >
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              value="anoushka@demandplanner.com"
              readOnly
              className="w-full px-4 py-2.5 bg-cream border border-[#E7DDCB] rounded-lg text-sm text-navy focus:outline-none cursor-default"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onFocus={() => setPassword("demandiq2026")}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white border border-[#E7DDCB] rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral"
            />
          </div>

          <div className="pt-1">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

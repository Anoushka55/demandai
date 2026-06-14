"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Network, X, Brain, Activity, RefreshCw,
  Sparkles, FileText, MessageSquare, AlertTriangle,
} from "lucide-react";

const TOTAL_STAGES = 5;

function reveal(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
    transitionDelay: visible ? `${delay}ms` : "0ms",
    pointerEvents: visible ? "auto" : "none",
  };
}

export default function ArchitecturePage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setStage((s) => (s >= TOTAL_STAGES ? 0 : s + 1));
      }
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  const s = (n: number) => stage >= n;

  return (
    <div className="fixed inset-0 z-50 bg-cream flex flex-col overflow-hidden select-none">

      {/* ── Top Bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-[#E7DDCB] bg-white/70 backdrop-blur-md z-20">
        <div className="flex items-center gap-2">
          <Network size={14} className="text-coral" />
          <span className="text-[10px] uppercase tracking-widest text-coral font-bold">DemandIQ · AI Architecture</span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STAGES + 1 }).map((_, i) => (
            <span key={i} className={`block rounded-full transition-all duration-300 ${
              stage === i ? "w-3 h-3 bg-coral" : stage > i ? "w-2 h-2 bg-coral/50" : "w-2 h-2 bg-navy/15"
            }`} />
          ))}
        </div>
        <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-xs text-muted hover:text-navy transition-colors">
          <X size={13} /> Exit
        </button>
      </header>

      {/* ── Canvas ── */}
      <div className="flex-1 relative p-3 overflow-hidden">

        {/* SVG arrow overlay */}
        <ArrowLayer stage={stage} />

        {/* Stage 0 — empty canvas */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: stage === 0 ? 1 : 0, transition: "opacity 0.6s ease", pointerEvents: stage === 0 ? "auto" : "none" }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-navy/25 animate-pulse">
            Press SPACE to begin
          </span>
        </div>

        {/* Content — flex column */}
        <div className="relative z-10 h-full flex flex-col gap-2">

          {/* ROW 1 — Data Sources (h-14 = 56px) */}
          <div className="flex-shrink-0 h-14 flex items-center gap-2">
            {[
              { icon: "🧾", label: "ERP / Sales", sub: "Sell-in, sell-through" },
              { icon: "📦", label: "WMS / Inventory", sub: "Stock, lead time" },
              { icon: "🗓️", label: "Promo Calendar", sub: "Promo dates & lift" },
              { icon: "🚚", label: "Logistics Master", sub: "Depots & routes" },
            ].map((src, i) => (
              <div
                key={src.label}
                title={src.sub}
                style={reveal(s(1), i * 70)}
                className="flex-1 flex items-center gap-2 bg-white border border-[#E7DDCB] rounded-lg px-3 py-2 shadow-sm h-full"
              >
                <span className="text-xl leading-none">{src.icon}</span>
                <div>
                  <div className="text-[11px] font-bold text-navy">{src.label}</div>
                  <div className="text-[8px] text-muted font-mono uppercase tracking-wider">Data Source</div>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 2 — Agents (flex-1, fills remaining space) */}
          <div className="flex-1 min-h-0 flex gap-3 items-stretch">

            {/* Health Check */}
            <div className="flex-1" style={reveal(s(2), 0)}>
              <div className="bg-white border border-coral/25 rounded-xl p-3 h-full flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[11px] font-extrabold text-navy">Health Check Agent</div>
                    <div className="text-[9px] text-muted mt-0.5">Watches the data layer</div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0 ml-1">
                    <Activity size={14} className="text-coral" />
                  </div>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {[
                    "Anomaly detection (IQR) on incoming records",
                    "Auto-reconciliation vs master data",
                    "Quality threshold alerts & escalation",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-[10px] text-navy/80 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 text-[8px] font-mono text-muted bg-cream rounded px-1.5 py-0.5">→ Data Health</div>
              </div>
            </div>

            {/* DemandIQ — core, wider */}
            <div style={{ flex: "1.5", ...reveal(s(2), 120) }}>
              <div className="bg-white border-2 border-coral rounded-xl p-3.5 h-full flex flex-col relative shadow-[0_4px_20px_rgba(224,53,92,0.13)]">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-navy text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded font-mono whitespace-nowrap">
                  Core Reasoning
                </span>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-extrabold text-navy">DemandIQ Agent</div>
                    <div className="text-[9px] text-muted mt-0.5">Demand & forecast reasoning</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 ml-2">
                    <Brain size={16} className="text-white" />
                  </div>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {[
                    { t: "FA% / Bias% computation + breach detection", live: true },
                    { t: "Root-cause classifier (5 categories)", live: true },
                    { t: "Confidence score from validation history", live: true },
                    { t: "₹ impact narrative (LLM slot reserved)", live: false },
                  ].map((c) => (
                    <li key={c.t} className="flex items-start gap-1.5 text-[10px] text-navy/80 leading-snug">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 ${c.live ? "bg-coral" : "border border-coral bg-transparent"}`} />
                      {c.t}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 text-[8px] font-mono text-muted bg-cream rounded px-1.5 py-0.5">→ KPI Sensing · Exceptions</div>
              </div>
            </div>

            {/* Supply */}
            <div className="flex-1" style={reveal(s(2), 240)}>
              <div className="bg-white border border-coral/25 rounded-xl p-3 h-full flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[11px] font-extrabold text-navy">Supply Agent</div>
                    <div className="text-[9px] text-muted mt-0.5">Stock coverage reasoning</div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0 ml-1">
                    <RefreshCw size={14} className="text-coral" />
                  </div>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {[
                    "Coverage-risk scoring (stock vs lead time)",
                    "Reallocation / expedite recommendations",
                    "Learns structurally risky depot-SKU pairs",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-[10px] text-navy/80 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 text-[8px] font-mono text-muted bg-cream rounded px-1.5 py-0.5">→ Coverage & Reallocation</div>
              </div>
            </div>
          </div>

          {/* ROW 3 — Decision Engine (h-20 = 80px) */}
          <div className="flex-shrink-0 h-20" style={reveal(s(4))}>
            <div className="bg-navy text-white rounded-xl px-5 py-2.5 h-full flex items-center gap-5">
              <div className="flex-1 min-w-0">
                <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Layer 3 · Decision Engine</div>
                <div className="text-[12px] font-bold">Auto-routed by impact × confidence</div>
                <div className="text-[10px] text-white/55 mt-0.5">Every output → a tier: Auto-Close / L1 / L2 / Director</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <div className="bg-white/10 border border-white/20 rounded-lg px-2.5 py-2">
                  <div className="text-[9px] font-bold text-coral mb-0.5">🤖 Autonomous</div>
                  <div className="text-[8px] text-white/55 whitespace-nowrap">Auto-close · promo adjust</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg px-2.5 py-2">
                  <div className="text-[9px] font-bold text-[#2F6FED] mb-0.5">🧑‍💼 Human Approval</div>
                  <div className="text-[8px] text-white/55 whitespace-nowrap">L2 / Director · novel cases</div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4 — Outputs (h-12 = 48px) */}
          <div className="flex-shrink-0 h-12 flex gap-2">
            {[
              { icon: <AlertTriangle size={11} />, label: "Exceptions" },
              { icon: <RefreshCw size={11} />, label: "Coverage" },
              { icon: <FileText size={11} />, label: "Governance" },
              { icon: <MessageSquare size={11} />, label: "AI Assistant" },
              { icon: <Sparkles size={11} />, label: "Insights" },
            ].map((o, i) => (
              <div
                key={o.label}
                style={reveal(s(5), i * 55)}
                className="flex-1 flex flex-col items-center justify-center bg-white border border-[#E7DDCB] rounded-lg px-2 py-1"
              >
                <div className="text-coral mb-0.5">{o.icon}</div>
                <div className="text-[9px] font-bold text-navy leading-none">{o.label}</div>
                <div className="text-[7px] font-mono text-coral bg-coral/10 rounded px-1 mt-0.5">AGENT</div>
              </div>
            ))}
          </div>

          {/* ROW 5 — Learning loop label (h-8 = 32px) */}
          <div className="flex-shrink-0 h-8 flex items-center justify-center gap-2" style={reveal(s(5), 320)}>
            <div className="relative flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center">
                <RefreshCw size={11} className="animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-coral animate-ping" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-teal font-bold">
              Continuous Learning Loop — decisions feed back into agents
            </span>
          </div>
        </div>

        {/* "Agents share signals" floating label — only stage 3 */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            top: "62%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: stage === 3 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <span className="text-[8px] font-mono text-coral/70 uppercase tracking-widest bg-cream/95 px-2 py-0.5 rounded border border-coral/20 whitespace-nowrap">
            agents share signals
          </span>
        </div>
      </div>

      {/* ── Bottom hint ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-2 border-t border-[#E7DDCB]">
        <div className="flex items-center gap-4 text-[8px] text-muted">
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral" /> Live
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full border border-coral" /> Reserved
          </span>
        </div>
        {stage === 0 ? (
          <span className="text-[10px] font-mono uppercase tracking-widest text-navy/30 animate-pulse">
            Press SPACE to begin
          </span>
        ) : stage >= TOTAL_STAGES ? (
          <span className="text-[9px] font-mono uppercase tracking-widest text-teal">
            Complete · SPACE to restart · ESC to exit
          </span>
        ) : (
          <span className="text-[9px] font-mono text-navy/30 uppercase tracking-widest">
            SPACE for next · {stage}/{TOTAL_STAGES}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Arrow SVG layer ─────────────────────────────────────────────────────────
//
// viewBox="0 0 100 100" preserveAspectRatio="none" (percentage-based coordinates)
//
// Baseline layout proportions:
//   Data sources center:  y ≈ 6,  x: 12 | 37 | 63 | 88
//   Agent tops:           y ≈ 13
//   Agent centers:        y ≈ 40,  x: 14 | 50 | 86
//   Agent bottoms:        y ≈ 65
//   Decision Engine:      y: 66–79, center 72, x: 10–90
//   Outputs center:       y ≈ 88,  x: 10 | 27 | 50 | 73 | 90
//   Learning loop:        right-edge sweep from y=90 up to y=13

function ArrowLayer({ stage }: { stage: number }) {
  const s = (n: number) => stage >= n;

  const pc = (visible: boolean) =>
    `fill-none transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Flowing dash animation scoped to this SVG */}
        <style>{`
          .fp  { stroke-dasharray: 0.8 0.8; animation: fpdash 0.7s linear infinite; }
          .fpt { stroke-dasharray: 0.8 1.2; animation: fpdash 1.1s linear infinite; }
          @keyframes fpdash { to { stroke-dashoffset: -1.6; } }
        `}</style>
      </defs>

      {/* ── Stage 3: Data Sources → Agents ── */}
      <path d="M 12 7 C 12 10 13 12 14 13"
        className={`${pc(s(3))} stroke-coral/55 fp`} strokeWidth="0.3" />
      <path d="M 37 7 C 37 10 45 11 50 13"
        className={`${pc(s(3))} stroke-coral/55 fp`} strokeWidth="0.3" />
      <path d="M 63 7 C 63 10 55 11 50 13"
        className={`${pc(s(3))} stroke-coral/55 fp`} strokeWidth="0.3" />
      <path d="M 88 7 C 88 10 87 11 86 13"
        className={`${pc(s(3))} stroke-coral/55 fp`} strokeWidth="0.3" />

      {/* ── Stage 3: Inter-agent bus (hidden at stage 4+) ── */}
      {/* Horizontal bus below agents */}
      <line x1="14" y1="66" x2="86" y2="66"
        className={`${pc(s(3) && !s(4))} stroke-coral/30 fp`} strokeWidth="0.22" />
      {/* Short stubs from each agent */}
      <line x1="14" y1="64" x2="14" y2="66"
        className={`${pc(s(3) && !s(4))} stroke-coral/30 fp`} strokeWidth="0.22" />
      <line x1="50" y1="64" x2="50" y2="66"
        className={`${pc(s(3) && !s(4))} stroke-coral/30 fp`} strokeWidth="0.22" />
      <line x1="86" y1="64" x2="86" y2="66"
        className={`${pc(s(3) && !s(4))} stroke-coral/30 fp`} strokeWidth="0.22" />

      {/* ── Stage 4: Agents → Decision Engine ── */}
      <path d="M 14 65 C 14 70 28 71 30 72"
        className={`${pc(s(4))} stroke-coral/65 fp`} strokeWidth="0.32" />
      <path d="M 50 65 L 50 72"
        className={`${pc(s(4))} stroke-coral/65 fp`} strokeWidth="0.32" />
      <path d="M 86 65 C 86 70 72 71 70 72"
        className={`${pc(s(4))} stroke-coral/65 fp`} strokeWidth="0.32" />

      {/* ── Stage 5: Decision Engine → Outputs ── */}
      <path d="M 20 80 C 20 84 10 86 10 88"
        className={`${pc(s(5))} stroke-coral/55 fp`} strokeWidth="0.28" />
      <path d="M 34 80 C 34 84 27 86 27 88"
        className={`${pc(s(5))} stroke-coral/55 fp`} strokeWidth="0.28" />
      <path d="M 50 80 L 50 88"
        className={`${pc(s(5))} stroke-coral/55 fp`} strokeWidth="0.28" />
      <path d="M 66 80 C 66 84 73 86 73 88"
        className={`${pc(s(5))} stroke-coral/55 fp`} strokeWidth="0.28" />
      <path d="M 80 80 C 80 84 90 86 90 88"
        className={`${pc(s(5))} stroke-coral/55 fp`} strokeWidth="0.28" />

      {/* ── Stage 5: Learning Loop — sweeps up the right edge ── */}
      <path d="M 96 90 C 101 90 101 52 101 40 C 101 20 101 13 96 13"
        className={`${pc(s(5))} stroke-teal/60 fpt`} strokeWidth="0.45" />
    </svg>
  );
}

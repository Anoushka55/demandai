"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Network, X, Brain, Activity, RefreshCw,
  Sparkles, FileText, MessageSquare, AlertTriangle,
  Database, Package, Calendar, Truck,
} from "lucide-react";

const TOTAL_STAGES = 5;
const CORAL = "#E0355C";
const TEAL  = "#17A2A0";
const NAVY  = "#2A2755";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AM = (props: any) => <animateMotion {...props} />;

function Dot({ d, dur, begin, color }: { d: string; dur: string; begin: string; color: string }) {
  return (
    <circle r="0.5" fill={color} fillOpacity="0.95">
      <AM dur={dur} repeatCount="indefinite" begin={begin} path={d} />
    </circle>
  );
}

function reveal(on: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0px)" : "translateY(8px)",
    transition: "opacity 0.45s ease, transform 0.45s ease",
    transitionDelay: on ? `${delay}ms` : "0ms",
    pointerEvents: on ? "auto" : "none",
  };
}

const INPUTS = [
  { Icon: Database, label: "ERP (Sales)",      desc: "Transactional demand"   },
  { Icon: Package,  label: "WMS (Inventory)",  desc: "Stock & warehouse data" },
  { Icon: Calendar, label: "Promo Calendar",   desc: "Promotional events"     },
  { Icon: Truck,    label: "Logistics Master", desc: "Lead times & routes"    },
];

const AGENTS = [
  { num: 1, Icon: Activity,  core: false, title: "Health Check Agent", sub: "Anomaly detection · data reconciliation" },
  { num: 2, Icon: Brain,     core: true,  title: "DemandIQ Agent",     sub: "FA% / Bias% · confidence scoring"        },
  { num: 3, Icon: RefreshCw, core: false, title: "Supply Agent",       sub: "Coverage-risk · reallocation logic"      },
];

const OUTPUTS = [
  { Icon: AlertTriangle,  title: "Exception Report",        desc: "Ranked issues with reasoning"  },
  { Icon: RefreshCw,      title: "Coverage & Reallocation", desc: "Reallocation suggestions"      },
  { Icon: FileText,       title: "Governance Pre-Read",     desc: "Auto-compiled S&OP summary"    },
  { Icon: MessageSquare,  title: "AI Assistant",            desc: "Conversational Q&A"            },
  { Icon: Sparkles,       title: "Insight Cards",           desc: "Per-page agent commentary"     },
];

// ─── SVG coordinate map (viewBox 0 0 100 100 = % of canvas) ─────────────────
//
//  Derived from justify-around math with card heights:
//  Input/Output cards: ~6.5 units tall   Agent cards: ~7.7 units tall
//
//  Left col  (left:2% w:24%) right edge x=26
//    4 inputs  → centers y ≈ 21, 43, 65, 87
//
//  Mid col   (left:30% right:30%) x span 30–70
//    Orch header y 10–21 (h≈11)  bottom y≈21
//    3 agents in flex-1 (y 22.5–98) → centers y ≈ 36, 61, 86
//
//  Right col (right:2% w:24%) left edge x=74
//    5 outputs → centers y ≈ 19, 36, 54, 72, 89

// Input card right-edge → Agent left-edge (x: 26→30)
const INPUT_PATHS = [
  "M 26 21 C 28 21 28 36 30 36",
  "M 26 43 C 28 43 28 61 30 61",
  "M 26 65 C 28 65 28 61 30 61",
  "M 26 87 C 28 87 28 86 30 86",
];

// Spine through center of middle col: orch dispatches ↓ (navy), agents reply ↑ (teal)
const SPINE_DOWN = "M 50 21 L 50 86";
const SPINE_UP   = "M 50 86 L 50 21";

// Agent right-edge → Output left-edge (x: 70→74)
const OUTPUT_PATHS = [
  "M 70 36 C 72 36 72 19 74 19",
  "M 70 61 C 72 61 72 36 74 36",
  "M 70 61 C 72 61 72 54 74 54",
  "M 70 86 C 72 86 72 72 74 72",
  "M 70 86 C 72 86 72 89 74 89",
];

// Stage-5 feedback: outputs send decisions back to agents (reversed bezier)
const FEEDBACK_PATHS = [
  "M 74 19 C 72 19 72 36 70 36",
  "M 74 36 C 72 36 72 61 70 61",
  "M 74 54 C 72 54 72 61 70 61",
  "M 74 72 C 72 72 72 86 70 86",
  "M 74 89 C 72 89 72 86 70 86",
];

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
        setStage(n => n >= TOTAL_STAGES ? 0 : n + 1);
      }
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  const s = (n: number) => stage >= n;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden select-none"
         style={{ background: "#F5EFE3" }}>

      {/* ── Top bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-[#E7DDCB] bg-white/70 backdrop-blur-md z-30">
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
        <button onClick={() => router.push("/")}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-navy transition-colors">
          <X size={13} /> Exit
        </button>
      </header>

      {/* ── Canvas ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Stage-0 prompt */}
        <div className="absolute inset-0 flex items-center justify-center z-10"
             style={{ opacity: stage === 0 ? 1 : 0, transition: "opacity 0.5s ease",
                      pointerEvents: stage === 0 ? "auto" : "none" }}>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-navy/25 animate-pulse">
            Press SPACE to begin
          </span>
        </div>

        {/* ── SVG at z-[5] — sits BEHIND cards so lines go under them naturally ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none"
             style={{ zIndex: 5 }}
             viewBox="0 0 100 100" preserveAspectRatio="none">

          {/* Input → Agent connection lines + dots (stage 4) */}
          {INPUT_PATHS.map((d, i) => (
            <g key={`ip${i}`} style={{
              opacity: s(4) ? 1 : 0,
              transition: s(4) ? `opacity 0.4s ease ${i * 60}ms` : "opacity 0.15s ease",
            }}>
              <path d={d} fill="none" stroke={CORAL} strokeWidth="0.22" strokeOpacity="0.3" />
              <Dot d={d} dur="1.5s" begin="0s"    color={CORAL} />
              <Dot d={d} dur="1.5s" begin="-0.75s" color={CORAL} />
            </g>
          ))}

          {/* Orchestration spine: navy ↓ (dispatch) + teal ↑ (results) — stage 3 */}
          <g style={{
            opacity: s(3) ? 1 : 0,
            transition: s(3) ? "opacity 0.6s ease 500ms" : "opacity 0.15s ease",
          }}>
            <path d={SPINE_DOWN} fill="none" stroke={NAVY} strokeWidth="0.2"
                  strokeOpacity="0.18" strokeDasharray="1.2 1.2" />
            <Dot d={SPINE_DOWN} dur="2.6s" begin="0s"     color={NAVY} />
            <Dot d={SPINE_DOWN} dur="2.6s" begin="-1.3s"  color={NAVY} />
            <Dot d={SPINE_UP}   dur="2.6s" begin="-0.65s" color={TEAL} />
            <Dot d={SPINE_UP}   dur="2.6s" begin="-1.95s" color={TEAL} />
          </g>

          {/* Agent → Output connection lines + dots (stage 4) */}
          {OUTPUT_PATHS.map((d, i) => (
            <g key={`op${i}`} style={{
              opacity: s(4) ? 1 : 0,
              transition: s(4) ? `opacity 0.4s ease ${i * 70}ms` : "opacity 0.15s ease",
            }}>
              <path d={d} fill="none" stroke={CORAL} strokeWidth="0.22" strokeOpacity="0.3" />
              <Dot d={d} dur="1.3s" begin="0s"    color={CORAL} />
              <Dot d={d} dur="1.3s" begin="-0.65s" color={CORAL} />
            </g>
          ))}

          {/* Feedback loop — teal dots flowing backward outputs→agents (stage 5) */}
          {FEEDBACK_PATHS.map((d, i) => (
            <g key={`fb${i}`} style={{
              opacity: s(5) ? 1 : 0,
              transition: s(5) ? `opacity 0.4s ease ${i * 60}ms` : "opacity 0.15s ease",
            }}>
              <Dot d={d} dur="1.8s" begin={`-${(i * 0.36).toFixed(2)}s`} color={TEAL} />
            </g>
          ))}
        </svg>

        {/* ── LEFT — Input source cards (stage 1) ── */}
        <div className="absolute z-10 flex flex-col justify-around"
             style={{ left: "2%", width: "24%", top: "10%", bottom: "2%" }}>
          {INPUTS.map((inp, i) => {
            const Icon = inp.Icon;
            return (
              <div key={inp.label} style={reveal(s(1), i * 80)}>
                <div className="bg-white border border-[#EAE1D0] rounded-2xl flex items-center gap-2.5 px-3 py-2.5"
                     style={{ boxShadow: "0 2px 14px rgba(42,39,85,0.07), 0 1px 3px rgba(42,39,85,0.05)" }}>
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: "rgba(224,53,92,0.09)" }}>
                    <Icon size={13} className="text-coral" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-navy leading-tight">{inp.label}</div>
                    <div className="text-[8px] leading-tight mt-0.5" style={{ color: "rgba(42,39,85,0.45)" }}>{inp.desc}</div>
                  </div>
                  <div className="text-[7px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded-lg"
                       style={{ color: TEAL, background: "rgba(23,162,160,0.09)",
                                border: "1px solid rgba(23,162,160,0.22)" }}>
                    IN
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MIDDLE — Orchestration header + Agent cards (stages 2 & 3) ── */}
        <div className="absolute z-10 flex flex-col gap-2.5"
             style={{ left: "30%", right: "30%", top: "10%", bottom: "2%" }}>

          {/* Orchestration / Decision Engine (stage 2) */}
          <div style={reveal(s(2))}>
            <div className="text-white rounded-2xl px-4 py-3.5 flex items-start justify-between"
                 style={{
                   background: "linear-gradient(135deg, #2A2755 0%, #1E1B4B 100%)",
                   boxShadow: "0 8px 32px rgba(42,39,85,0.45), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)",
                 }}>
              <div>
                <div className="text-[7px] uppercase tracking-[0.22em] font-bold mb-1.5"
                     style={{ color: "rgba(255,255,255,0.28)" }}>Orchestration Layer</div>
                <div className="text-[15px] font-extrabold leading-tight tracking-tight">Decision Engine</div>
                <div className="text-[8px] mt-1 leading-relaxed"
                     style={{ color: "rgba(255,255,255,0.36)" }}>
                  Auto-routed · impact × urgency × confidence
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-end flex-shrink-0 ml-4 mt-0.5">
                <div className="text-[7px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap"
                     style={{ color: "#FF8FAB", background: "rgba(224,53,92,0.18)",
                              border: "1px solid rgba(224,53,92,0.32)" }}>
                  🤖 Autonomous
                </div>
                <div className="text-[7px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap"
                     style={{ color: "#93C5FD", background: "rgba(59,130,246,0.15)",
                              border: "1px solid rgba(59,130,246,0.28)" }}>
                  🧑‍💼 Human Approval
                </div>
                <div className="text-[6px] font-mono mt-0.5 text-right"
                     style={{ color: "rgba(255,255,255,0.16)" }}>
                  Auto · L1 · L2 · Director
                </div>
              </div>
            </div>
          </div>

          {/* Agent cards (stage 3) */}
          <div className="flex-1 flex flex-col justify-around">
            {AGENTS.map((agent, i) => {
              const Icon = agent.Icon;
              return (
                <div key={agent.num} style={reveal(s(3), i * 140)}>
                  <div className="relative rounded-2xl px-3.5 py-3 flex items-center gap-3"
                       style={agent.core ? {
                         background: "#ffffff",
                         border: "2px solid rgba(224,53,92,0.7)",
                         boxShadow: "0 4px 28px rgba(224,53,92,0.2), 0 0 0 4px rgba(224,53,92,0.06), 0 1px 4px rgba(42,39,85,0.06)",
                       } : {
                         background: "#ffffff",
                         border: "1px solid #EAE1D0",
                         boxShadow: "0 2px 14px rgba(42,39,85,0.07), 0 1px 3px rgba(42,39,85,0.04)",
                       }}>
                    {/* Number badge */}
                    <span className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center z-10"
                          style={{ background: CORAL, boxShadow: "0 2px 8px rgba(224,53,92,0.4)" }}>
                      {agent.num}
                    </span>

                    <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                         style={agent.core ? {
                           background: NAVY,
                           boxShadow: "0 2px 8px rgba(42,39,85,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                         } : {
                           background: "rgba(224,53,92,0.09)",
                         }}>
                      <Icon size={16} color={agent.core ? "#ffffff" : CORAL} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-extrabold text-navy leading-tight">{agent.title}</div>
                      <div className="text-[8.5px] mt-0.5 leading-snug"
                           style={{ color: "rgba(42,39,85,0.48)" }}>{agent.sub}</div>
                    </div>

                    {/* Status pulse */}
                    <div className="flex-shrink-0 w-2 h-2 rounded-full"
                         style={agent.core ? {
                           background: CORAL,
                           boxShadow: `0 0 0 3px rgba(224,53,92,0.18)`,
                           animation: "pulse 2s infinite",
                         } : {
                           background: "rgba(42,39,85,0.15)",
                         }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT — Output cards (stage 4) ── */}
        <div className="absolute z-10 flex flex-col justify-around"
             style={{ right: "2%", width: "24%", top: "10%", bottom: "2%" }}>
          {OUTPUTS.map((out, i) => {
            const Icon = out.Icon;
            return (
              <div key={out.title} style={reveal(s(4), i * 80)}>
                <div className="bg-white border border-[#EAE1D0] rounded-2xl flex items-center gap-2.5 px-3 py-2.5"
                     style={{ boxShadow: "0 2px 14px rgba(42,39,85,0.07), 0 1px 3px rgba(42,39,85,0.05)" }}>
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: "rgba(224,53,92,0.09)" }}>
                    <Icon size={13} className="text-coral" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-navy leading-tight">{out.title}</div>
                    <div className="text-[8px] leading-tight mt-0.5"
                         style={{ color: "rgba(42,39,85,0.45)" }}>{out.desc}</div>
                  </div>
                  <div className="text-[7px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded-lg"
                       style={{ color: CORAL, background: "rgba(224,53,92,0.08)",
                                border: "1px solid rgba(224,53,92,0.2)" }}>
                    OUT
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Learning loop label (stage 5) ── */}
        <div className="absolute z-20 pointer-events-none"
             style={{
               bottom: "1.5%", left: "50%", transform: "translateX(-50%)",
               opacity: s(5) ? 1 : 0,
               transition: s(5) ? "opacity 0.5s ease 0.3s" : "opacity 0.2s ease",
             }}>
          <div className="flex items-center gap-2 rounded-full px-3.5 py-1.5 whitespace-nowrap"
               style={{
                 background: "rgba(245,239,227,0.96)",
                 border: "1px solid rgba(23,162,160,0.35)",
                 boxShadow: "0 2px 16px rgba(23,162,160,0.15)",
               }}>
            <RefreshCw size={9} style={{ color: TEAL, animation: "spin 3s linear infinite" }} className="flex-shrink-0" />
            <div>
              <div className="text-[8px] font-mono uppercase tracking-wider font-bold" style={{ color: TEAL }}>
                Continuous Learning Loop
              </div>
              <div className="text-[7px]" style={{ color: "rgba(42,39,85,0.38)" }}>
                Approve · Reject · Escalate → re-weights confidence scores
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-2 border-t border-[#E7DDCB] bg-white/50">
        <div className="flex items-center gap-4 text-[8px]" style={{ color: "rgba(42,39,85,0.45)" }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral" /> Live capability
          </span>
          <span className="flex items-center gap-1.5 transition-opacity duration-500"
                style={{ opacity: s(5) ? 1 : 0, color: TEAL }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} /> Learning loop active
          </span>
        </div>
        {stage === 0 ? (
          <span className="text-[10px] font-mono uppercase tracking-widest text-navy/30 animate-pulse">
            Press SPACE to begin
          </span>
        ) : stage >= TOTAL_STAGES ? (
          <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: TEAL }}>
            Complete · SPACE to restart · ESC to exit
          </span>
        ) : (
          <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(42,39,85,0.3)" }}>
            SPACE for next · {stage}/{TOTAL_STAGES}
          </span>
        )}
      </div>
    </div>
  );
}

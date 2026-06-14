"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Network, X, Brain, Activity, RefreshCw,
  Sparkles, FileText, MessageSquare, AlertTriangle,
  Database, Package, Calendar, Truck,
} from "lucide-react";

const TOTAL_STAGES = 7;
const CORAL = "#E0355C";
const TEAL  = "#17A2A0";
const NAVY  = "#2A2755";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AM = (props: any) => <animateMotion {...props} />;

function Dot({ d, dur, begin, color }: { d: string; dur: string; begin: string; color: string }) {
  return (
    <circle r="0.55" fill={color} fillOpacity="0.92">
      <AM dur={dur} repeatCount="indefinite" begin={begin} path={d} />
    </circle>
  );
}

function reveal(on: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0px)" : "translateY(10px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
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

// SVG coordinate map (viewBox 0 0 100 100, preserveAspectRatio="none")
// Inputs: justify-center gap-2, 4×48px cards → centers ≈ 39, 46, 54, 61
// Agents: justify-center gap-3, 3×60px cards, below orch header (~20%) → centers ≈ 48, 58, 68
// Outputs: justify-center gap-2, 5×48px cards → centers ≈ 35, 43, 51, 58, 66
// Left col: 2%→26%, Center: 30%→70%, Right: 74%→98%

const INPUT_PATHS = [
  "M 26 39 C 28 39 28 48 30 48",
  "M 26 46 C 28 46 28 58 30 58",
  "M 26 54 C 28 54 28 58 30 58",
  "M 26 61 C 28 61 28 68 30 68",
];

const SPINE_DOWN = "M 50 20 L 50 68";
const SPINE_UP   = "M 50 68 L 50 20";

const OUTPUT_PATHS = [
  "M 70 48 C 72 48 72 35 74 35",
  "M 70 58 C 72 58 72 43 74 43",
  "M 70 58 C 72 58 72 51 74 51",
  "M 70 68 C 72 68 72 58 74 58",
  "M 70 68 C 72 68 72 66 74 66",
];

const FEEDBACK_PATHS = [
  "M 74 35 C 72 35 72 48 70 48",
  "M 74 43 C 72 43 72 58 70 58",
  "M 74 51 C 72 51 72 58 70 58",
  "M 74 58 C 72 58 72 68 70 68",
  "M 74 66 C 72 66 72 68 70 68",
];

// Circular loop: 4 nodes on orbit r=28, center (50,50)
// Top (50,22)=Data, Right (78,50)=Agents, Bottom (50,78)=Outputs, Left (22,50)=Learning
const LOOP_ARCS = [
  { d: "M 50 22 A 28 28 0 0 1 78 50", color: CORAL },
  { d: "M 78 50 A 28 28 0 0 1 50 78", color: CORAL },
  { d: "M 50 78 A 28 28 0 0 1 22 50", color: TEAL  },
  { d: "M 22 50 A 28 28 0 0 1 50 22", color: TEAL  },
];

const LOOP_NODES = [
  { cx: 50, cy: 22, line1: "DATA",    line2: "SOURCES", color: NAVY  },
  { cx: 78, cy: 50, line1: "AI",      line2: "AGENTS",  color: CORAL },
  { cx: 50, cy: 78, line1: "PLANNER", line2: "OUTPUTS", color: NAVY  },
  { cx: 22, cy: 50, line1: "LEARNING",line2: "LOOP",    color: TEAL  },
];

export default function ArchitecturePage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [loopView, setLoopView] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (loopView) { setLoopView(false); return; }
        setStage(n => (n >= TOTAL_STAGES ? 0 : n + 1));
      }
      if (e.key === "Escape") {
        if (loopView) { setLoopView(false); return; }
        router.push("/");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, loopView]);

  const s = (n: number) => stage >= n;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden select-none"
      style={{ background: "#F5EFE3" }}
    >
      {/* ── Top bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-[#E7DDCB] bg-white/70 backdrop-blur-md z-30">
        <div className="flex items-center gap-2">
          <Network size={14} className="text-coral" />
          <span className="text-[10px] uppercase tracking-widest text-coral font-bold">
            DemandIQ · AI Architecture
          </span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STAGES + 1 }).map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                stage === i
                  ? "w-3 h-3 bg-coral"
                  : stage > i
                  ? "w-2 h-2 bg-coral/50"
                  : "w-2 h-2 bg-navy/15"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-navy transition-colors"
        >
          <X size={13} /> Exit
        </button>
      </header>

      {/* ── Canvas ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Stage-0 prompt */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{
            opacity: stage === 0 ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: stage === 0 ? "auto" : "none",
          }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-navy/25 animate-pulse">
            Press SPACE to begin
          </span>
        </div>

        {/* ── SVG lines at z-5 (sits behind cards) ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Input → Agent lines (stage 3) */}
          {INPUT_PATHS.map((d, i) => (
            <g
              key={`ip${i}`}
              style={{
                opacity: s(3) ? 1 : 0,
                transition: s(3) ? `opacity 0.4s ease ${i * 60}ms` : "opacity 0.15s ease",
              }}
            >
              <path d={d} fill="none" stroke={CORAL} strokeWidth="0.22" strokeOpacity="0.3" />
              <Dot d={d} dur="1.5s" begin="0s"     color={CORAL} />
              <Dot d={d} dur="1.5s" begin="-0.75s" color={CORAL} />
            </g>
          ))}

          {/* Orchestration spine (stage 5) */}
          <g
            style={{
              opacity: s(5) ? 1 : 0,
              transition: s(5) ? "opacity 0.6s ease 400ms" : "opacity 0.15s ease",
            }}
          >
            <path
              d={SPINE_DOWN}
              fill="none"
              stroke={NAVY}
              strokeWidth="0.2"
              strokeOpacity="0.18"
              strokeDasharray="1.2 1.2"
            />
            <Dot d={SPINE_DOWN} dur="2.6s" begin="0s"     color={NAVY} />
            <Dot d={SPINE_DOWN} dur="2.6s" begin="-1.3s"  color={NAVY} />
            <Dot d={SPINE_UP}   dur="2.6s" begin="-0.65s" color={TEAL} />
            <Dot d={SPINE_UP}   dur="2.6s" begin="-1.95s" color={TEAL} />
          </g>

          {/* Agent → Output lines (stage 5) */}
          {OUTPUT_PATHS.map((d, i) => (
            <g
              key={`op${i}`}
              style={{
                opacity: s(5) ? 1 : 0,
                transition: s(5) ? `opacity 0.4s ease ${i * 70}ms` : "opacity 0.15s ease",
              }}
            >
              <path d={d} fill="none" stroke={CORAL} strokeWidth="0.22" strokeOpacity="0.3" />
              <Dot d={d} dur="1.3s" begin="0s"     color={CORAL} />
              <Dot d={d} dur="1.3s" begin="-0.65s" color={CORAL} />
            </g>
          ))}

          {/* Feedback loop — teal dots outputs→agents (stage 7) */}
          {FEEDBACK_PATHS.map((d, i) => (
            <g
              key={`fb${i}`}
              style={{
                opacity: s(7) ? 1 : 0,
                transition: s(7) ? `opacity 0.4s ease ${i * 60}ms` : "opacity 0.15s ease",
              }}
            >
              <Dot d={d} dur="1.8s" begin={`-${(i * 0.36).toFixed(2)}s`} color={TEAL} />
            </g>
          ))}
        </svg>

        {/* ── LEFT — Input source cards ── */}
        {/* Stage 1: first card, Stage 2: remaining 3 */}
        <div
          className="absolute z-10 flex flex-col items-stretch justify-center gap-2.5"
          style={{ left: "2%", width: "24%", top: 0, bottom: 0 }}
        >
          {INPUTS.map((inp, i) => {
            const Icon = inp.Icon;
            const show = i === 0 ? s(1) : s(2);
            const delay = i === 0 ? 0 : (i - 1) * 90;
            return (
              <div key={inp.label} style={reveal(show, delay)}>
                <div
                  className="bg-white border border-[#EAE1D0] rounded-2xl flex items-center gap-2.5 px-3 py-2.5"
                  style={{
                    boxShadow:
                      "0 2px 14px rgba(42,39,85,0.07), 0 1px 3px rgba(42,39,85,0.05)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(224,53,92,0.09)" }}
                  >
                    <Icon size={13} className="text-coral" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-navy leading-tight">
                      {inp.label}
                    </div>
                    <div
                      className="text-[8px] leading-tight mt-0.5"
                      style={{ color: "rgba(42,39,85,0.45)" }}
                    >
                      {inp.desc}
                    </div>
                  </div>
                  <div
                    className="text-[7px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded-lg"
                    style={{
                      color: TEAL,
                      background: "rgba(23,162,160,0.09)",
                      border: "1px solid rgba(23,162,160,0.22)",
                    }}
                  >
                    IN
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MIDDLE — Decision Engine + Agents (stage 4) ── */}
        <div
          className="absolute z-10 flex flex-col gap-2.5"
          style={{ left: "30%", right: "30%", top: "8%", bottom: "6%" }}
        >
          {/* Decision Engine */}
          <div style={reveal(s(4))}>
            <div
              className="text-white rounded-2xl px-4 py-3.5 flex items-start justify-between"
              style={{
                background: "linear-gradient(135deg, #2A2755 0%, #1E1B4B 100%)",
                boxShadow:
                  "0 8px 32px rgba(42,39,85,0.45), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <div
                  className="text-[7px] uppercase tracking-[0.22em] font-bold mb-1.5"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  Orchestration Layer
                </div>
                <div className="text-[15px] font-extrabold leading-tight tracking-tight">
                  Decision Engine
                </div>
                <div
                  className="text-[8px] mt-1 leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.36)" }}
                >
                  Auto-routed · impact × urgency × confidence
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-end flex-shrink-0 ml-4 mt-0.5">
                <div
                  className="text-[7px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap"
                  style={{
                    color: "#FF8FAB",
                    background: "rgba(224,53,92,0.18)",
                    border: "1px solid rgba(224,53,92,0.32)",
                  }}
                >
                  🤖 Autonomous
                </div>
                <div
                  className="text-[7px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap"
                  style={{
                    color: "#93C5FD",
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.28)",
                  }}
                >
                  🧑‍💼 Human Approval
                </div>
                <div
                  className="text-[6px] font-mono mt-0.5 text-right"
                  style={{ color: "rgba(255,255,255,0.16)" }}
                >
                  Auto · L1 · L2 · Director
                </div>
              </div>
            </div>
          </div>

          {/* Agent cards */}
          <div className="flex-1 flex flex-col justify-center gap-2.5">
            {AGENTS.map((agent, i) => {
              const Icon = agent.Icon;
              return (
                <div key={agent.num} style={reveal(s(4), 220 + i * 130)}>
                  <div
                    className="relative rounded-2xl px-3.5 py-3 flex items-center gap-3"
                    style={
                      agent.core
                        ? {
                            background: "#ffffff",
                            border: "2px solid rgba(224,53,92,0.7)",
                            boxShadow:
                              "0 4px 28px rgba(224,53,92,0.2), 0 0 0 4px rgba(224,53,92,0.06), 0 1px 4px rgba(42,39,85,0.06)",
                          }
                        : {
                            background: "#ffffff",
                            border: "1px solid #EAE1D0",
                            boxShadow:
                              "0 2px 14px rgba(42,39,85,0.07), 0 1px 3px rgba(42,39,85,0.04)",
                          }
                    }
                  >
                    <span
                      className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center z-10"
                      style={{
                        background: CORAL,
                        boxShadow: "0 2px 8px rgba(224,53,92,0.4)",
                      }}
                    >
                      {agent.num}
                    </span>
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={
                        agent.core
                          ? {
                              background: NAVY,
                              boxShadow:
                                "0 2px 8px rgba(42,39,85,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                            }
                          : { background: "rgba(224,53,92,0.09)" }
                      }
                    >
                      <Icon size={16} color={agent.core ? "#ffffff" : CORAL} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-extrabold text-navy leading-tight">
                        {agent.title}
                      </div>
                      <div
                        className="text-[8.5px] mt-0.5 leading-snug"
                        style={{ color: "rgba(42,39,85,0.48)" }}
                      >
                        {agent.sub}
                      </div>
                    </div>
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full"
                      style={
                        agent.core
                          ? {
                              background: CORAL,
                              boxShadow: "0 0 0 3px rgba(224,53,92,0.18)",
                              animation: "pulse 2s infinite",
                            }
                          : { background: "rgba(42,39,85,0.15)" }
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT — Output cards (stage 6) ── */}
        <div
          className="absolute z-10 flex flex-col items-stretch justify-center gap-2.5"
          style={{ right: "2%", width: "24%", top: 0, bottom: 0 }}
        >
          {OUTPUTS.map((out, i) => {
            const Icon = out.Icon;
            return (
              <div key={out.title} style={reveal(s(6), i * 90)}>
                <div
                  className="bg-white border border-[#EAE1D0] rounded-2xl flex items-center gap-2.5 px-3 py-2.5"
                  style={{
                    boxShadow:
                      "0 2px 14px rgba(42,39,85,0.07), 0 1px 3px rgba(42,39,85,0.05)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(224,53,92,0.09)" }}
                  >
                    <Icon size={13} className="text-coral" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-navy leading-tight">
                      {out.title}
                    </div>
                    <div
                      className="text-[8px] leading-tight mt-0.5"
                      style={{ color: "rgba(42,39,85,0.45)" }}
                    >
                      {out.desc}
                    </div>
                  </div>
                  <div
                    className="text-[7px] font-mono flex-shrink-0 px-1.5 py-0.5 rounded-lg"
                    style={{
                      color: CORAL,
                      background: "rgba(224,53,92,0.08)",
                      border: "1px solid rgba(224,53,92,0.2)",
                    }}
                  >
                    OUT
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Stage 7: learning loop CTA ── */}
        <div
          className="absolute z-20"
          style={{
            bottom: "2%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: s(7) ? 1 : 0,
            transition: s(7) ? "opacity 0.5s ease 0.4s" : "opacity 0.2s ease",
            pointerEvents: s(7) ? "auto" : "none",
          }}
        >
          <button
            onClick={() => setLoopView(true)}
            className="flex items-center gap-2.5 rounded-full px-4 py-2 whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
            style={{
              background: "rgba(245,239,227,0.96)",
              border: `1.5px solid ${TEAL}`,
              boxShadow: "0 2px 20px rgba(23,162,160,0.2)",
            }}
          >
            <RefreshCw
              size={10}
              style={{ color: TEAL, animation: "spin 3s linear infinite" }}
            />
            <div className="text-left">
              <div
                className="text-[8px] font-mono uppercase tracking-wider font-bold"
                style={{ color: TEAL }}
              >
                See the continuous learning loop →
              </div>
              <div
                className="text-[7px]"
                style={{ color: "rgba(42,39,85,0.38)" }}
              >
                Approve · Reject · Escalate re-weights confidence scores
              </div>
            </div>
          </button>
        </div>

        {/* ── Circular learning loop overlay ── */}
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
          style={{
            background: "rgba(245,239,227,0.97)",
            backdropFilter: "blur(10px)",
            opacity: loopView ? 1 : 0,
            pointerEvents: loopView ? "auto" : "none",
            transition: "opacity 0.45s ease",
          }}
          onClick={() => setLoopView(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "min(82vw, 82vh)", aspectRatio: "1" }}
          >
            <svg
              viewBox="0 0 100 100"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              {/* Outer orbit ring */}
              <circle
                cx="50" cy="50" r="28"
                fill="none"
                stroke="rgba(42,39,85,0.06)"
                strokeWidth="6"
              />

              {/* Arc paths + animated dots */}
              {LOOP_ARCS.map((arc, i) => (
                <g key={i}>
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="0.7"
                    strokeOpacity="0.3"
                  />
                  <circle r="1.1" fill={arc.color} fillOpacity="0.95">
                    <AM
                      dur="2.8s"
                      repeatCount="indefinite"
                      begin={`${(-i * 0.7).toFixed(1)}s`}
                      path={arc.d}
                    />
                  </circle>
                  <circle r="0.7" fill={arc.color} fillOpacity="0.55">
                    <AM
                      dur="2.8s"
                      repeatCount="indefinite"
                      begin={`${(-i * 0.7 - 1.4).toFixed(1)}s`}
                      path={arc.d}
                    />
                  </circle>
                </g>
              ))}

              {/* Node circles */}
              {LOOP_NODES.map((node, i) => (
                <g key={i}>
                  <circle
                    cx={node.cx} cy={node.cy} r="10.5"
                    fill="white"
                    stroke={node.color}
                    strokeWidth="1.4"
                    style={{
                      filter: "drop-shadow(0 2px 10px rgba(42,39,85,0.13))",
                    }}
                  />
                  <text
                    x={node.cx} y={node.cy - 1.6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="3"
                    fontWeight="800"
                    fill={node.color}
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.line1}
                  </text>
                  <text
                    x={node.cx} y={node.cy + 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="2.2"
                    fill="rgba(42,39,85,0.45)"
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.line2}
                  </text>
                </g>
              ))}

              {/* Center label */}
              <text
                x="50" y="47.5"
                textAnchor="middle"
                fontSize="4.2"
                fontWeight="900"
                fill={NAVY}
                fontFamily="system-ui, sans-serif"
              >
                DemandIQ
              </text>
              <text
                x="50" y="53.5"
                textAnchor="middle"
                fontSize="2.3"
                fill="rgba(42,39,85,0.35)"
                fontFamily="system-ui, sans-serif"
              >
                Continuous Learning
              </text>
            </svg>
          </div>
          <div
            className="absolute bottom-6 text-[9px] font-mono uppercase tracking-widest"
            style={{ color: "rgba(42,39,85,0.25)" }}
          >
            Click anywhere or press ESC to close
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-2 border-t border-[#E7DDCB] bg-white/50">
        <div
          className="flex items-center gap-4 text-[8px]"
          style={{ color: "rgba(42,39,85,0.45)" }}
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral" />
            Live capability
          </span>
          <span
            className="flex items-center gap-1.5 transition-opacity duration-500"
            style={{ opacity: s(7) ? 1 : 0, color: TEAL }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: TEAL }}
            />
            Learning loop active
          </span>
        </div>

        {stage === 0 ? (
          <span className="text-[10px] font-mono uppercase tracking-widest text-navy/30 animate-pulse">
            Press SPACE to begin
          </span>
        ) : stage >= TOTAL_STAGES ? (
          <span
            className="text-[9px] font-mono uppercase tracking-widest"
            style={{ color: TEAL }}
          >
            Complete · SPACE to restart · ESC to exit
          </span>
        ) : (
          <span
            className="text-[9px] font-mono uppercase tracking-widest"
            style={{ color: "rgba(42,39,85,0.3)" }}
          >
            SPACE for next · {stage}/{TOTAL_STAGES}
          </span>
        )}
      </div>
    </div>
  );
}

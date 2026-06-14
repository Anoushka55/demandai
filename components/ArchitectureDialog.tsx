"use client";
import { useEffect } from "react";
import { X, Database, Brain, Activity, RefreshCw, Sparkles, FileText, MessageSquare, AlertTriangle, ArrowDown, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ArchitectureDialog({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-cream rounded-2xl shadow-2xl max-w-6xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-cream/95 backdrop-blur-md px-6 py-4 border-b border-[#E7DDCB] flex items-center justify-between z-10">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-coral font-bold">DemandIQ · Backend Architecture</div>
            <h2 className="text-xl font-extrabold text-navy">Where the agentic AI actually lives</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted hover:text-navy hover:bg-navy/5 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            Three autonomous agents sit between raw planning data and the planner's workflow. Each one
            <strong className="text-navy"> perceives, reasons, and recommends or acts</strong> — then learns from what
            the planner approves, rejects, or overrides.
          </p>

          {/* Legend */}
          <div className="bg-white border border-[#E7DDCB] rounded-xl p-4 flex flex-wrap gap-5 text-xs">
            <LegendDot color="bg-coral" label="AI capability live (rule engine standing in for the model)" />
            <LegendDot color="border-2 border-coral bg-transparent" label="Architecture ready, model slot reserved" />
            <LegendSwatch color="bg-navy" label="Data layer" />
            <LegendSwatch color="bg-coral" label="Agentic AI layer" />
            <LegendSwatch color="bg-teal" label="Learning loop" />
          </div>

          {/* LAYER 1 — Data Sources */}
          <LayerLabel num="1" label="Data Sources" tone="navy" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "🧾", title: "Sales System (ERP)", sub: "Sell-in, sell-through" },
              { icon: "📦", title: "Inventory System (WMS)", sub: "Stock on hand, lead time" },
              { icon: "🗓️", title: "Promo Calendar", sub: "Promo dates, planned lift" },
              { icon: "🚚", title: "Logistics Master", sub: "Depots, accounts, routes" },
            ].map((s) => (
              <div key={s.title} className="bg-white border border-[#E7DDCB] rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-bold text-navy">
                  <span className="text-base">{s.icon}</span> {s.title}
                </div>
                <div className="text-[11px] text-muted mt-1 pl-7">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* FLOW DOWN with animated arrow */}
          <FlowArrow />

          {/* LAYER 2 — Agentic AI */}
          <LayerLabel num="2" label="Agentic AI Layer — perceives, reasons, recommends & acts" tone="coral" />

          <div className="relative">
            <div className="border-2 border-dashed border-coral/60 rounded-2xl p-5 bg-gradient-to-b from-coral/5 to-coral/10">
              {/* Animated connector lines between agents */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="25" y1="50" x2="50" y2="50" className="flow-path stroke-coral/40" strokeWidth="0.4" />
                <line x1="50" y1="50" x2="75" y2="50" className="flow-path stroke-coral/40" strokeWidth="0.4" />
              </svg>

              <div className="grid md:grid-cols-3 gap-4 relative">
                <AgentCard
                  icon={<Activity size={20} />}
                  title="Health Check Agent"
                  tag="Watches the data layer"
                  capabilities={[
                    { text: "Statistical anomaly detection (IQR) on incoming records", live: true },
                    { text: "Auto-reconciliation vs master data within tolerance", live: true },
                    { text: "Learns per-source quality thresholds over time", live: false },
                  ]}
                  output="Flags outliers / mismatches, auto-mails owners, escalates schema conflicts"
                  surfaceOn="Seen in: Data Health"
                />
                <AgentCard
                  icon={<Brain size={20} />}
                  title="DemandIQ Agent"
                  tag="Reasons about demand & forecast health"
                  core
                  capabilities={[
                    { text: "Rolling FA% / Bias% calc + target-band breach detection", live: true },
                    { text: "Demand sensing: sell-in vs offtake divergence → signal", live: true },
                    { text: "Root-cause classifier (rules + NLP) across 5 categories", live: true },
                    { text: "Confidence score from historical validation rate", live: true },
                    { text: "KPI deviation → ₹ impact (LLM-assisted narrative)", live: false },
                  ]}
                  output="Generates exceptions with reasoning, confidence & recommended action"
                  surfaceOn="Seen in: KPI & Demand Sensing, Exception Report"
                />
                <AgentCard
                  icon={<RefreshCw size={20} />}
                  title="Supply Agent"
                  tag="Reasons about stock coverage"
                  capabilities={[
                    { text: "Coverage-risk scoring (stock vs lead time vs demand)", live: true },
                    { text: "Reallocation / expedite recommendation engine", live: false },
                    { text: "Learns which depot-SKU pairs are structurally risky", live: false },
                  ]}
                  output="Flags low-coverage SKU × Depot × Account, proposes reallocation"
                  surfaceOn="Seen in: Coverage & Reallocation"
                />
              </div>
            </div>
          </div>

          <FlowArrow />

          {/* LAYER 3 — Decision Engine */}
          <LayerLabel num="3" label="Agent Decision Engine" tone="navy" />
          <div className="bg-navy text-white rounded-2xl p-6">
            <h3 className="text-base font-bold mb-1">Every finding is auto-routed by impact × urgency × confidence</h3>
            <p className="text-xs text-white/70 mb-4 max-w-2xl">
              The decision engine maps each agent output to a tier: <strong className="text-white">Auto-Close · L1 · L2 · Director</strong> —
              deciding whether the agent acts on its own or hands the decision to a planner, and who.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <DecisionBox
                heading="Autonomous Action"
                icon="🤖"
                items={[
                  "Auto-applies promo realization for known combinations",
                  "Auto-closes low-impact, high-confidence exceptions",
                  "Auto-resolves data issues within tolerance",
                ]}
                tone="coral"
              />
              <DecisionBox
                heading="Human Approval Required"
                icon="🧑‍💼"
                items={[
                  "Director / L2 exceptions, high financial impact",
                  "New promo with no historical precedent",
                  "Reallocation & expedite authorization",
                ]}
                tone="info"
              />
            </div>
          </div>

          <FlowArrow />

          {/* LAYER 4 — Outputs */}
          <LayerLabel num="4" label="Planner-Facing Outputs" tone="navy" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <OutputCard icon={<AlertTriangle size={18} />} title="Exception Report" desc="Ranked issues with agent reasoning" />
            <OutputCard icon={<RefreshCw size={18} />} title="Coverage Actions" desc="Reallocation / expedite suggestions" />
            <OutputCard icon={<FileText size={18} />} title="Governance Pre-Read" desc="Auto-compiled S&OP summary" />
            <OutputCard icon={<MessageSquare size={18} />} title="AI Assistant" desc="Conversational Q&A" />
            <OutputCard icon={<Sparkles size={18} />} title="Insight Cards" desc="Per-page commentary" />
          </div>

          <FlowArrow loop />

          {/* LAYER 5 — Learning loop */}
          <LayerLabel num="5" label="Continuous Learning Loop" tone="teal" />
          <div className="border-2 border-teal bg-teal-soft rounded-2xl p-5 flex flex-wrap items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-teal text-white flex items-center justify-center flex-shrink-0 relative">
              <RefreshCw size={26} className="animate-spin" style={{ animationDuration: "4s" }} />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-coral animate-ping" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-navy mb-1">
                Every Approve / Reject / Escalate / Auto-Resolve decision is logged with the planner's reasoning.
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                The agent checks which overrides were validated by real outcomes, then
                <strong className="text-navy"> re-weights confidence scores and routing thresholds</strong> —
                so the next time a similar pattern appears, the agent's recommendation (and how much it trusts it)
                reflects what actually worked.
              </p>
            </div>
            <div className="font-mono text-[11px] text-teal-dark font-bold text-right">
              ↑ feeds back into<br /> Layer 2 — Agentic AI
            </div>
          </div>

          {/* Foot note */}
          <div className="bg-white border border-[#E7DDCB] rounded-xl p-4 flex items-start gap-3">
            <div className="text-coral mt-0.5"><Cpu size={18} /></div>
            <div className="text-xs text-navy/80 leading-relaxed">
              <strong className="text-navy">Honest framing:</strong> the agentic decision framework, routing logic, and
              human-in-the-loop UX are <strong>fully built</strong>. The classification logic currently runs as an
              explainable rule engine; the architecture has model slots reserved (RCA classifier, demand-sensing model,
              an LLM for narratives and chat) that can be wired in without changing the agents' contracts with the rest
              of the system.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── helpers ────────────────────────────────────────────────────────────────
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-navy">
      <span className={cn("w-3 h-3 rounded-full flex-shrink-0", color)} />
      <span>{label}</span>
    </div>
  );
}
function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-navy">
      <span className={cn("w-4 h-4 rounded flex-shrink-0", color)} />
      <span>{label}</span>
    </div>
  );
}

function LayerLabel({ num, label, tone }: { num: string; label: string; tone: "navy" | "coral" | "teal" }) {
  const pillBg = tone === "coral" ? "bg-coral" : tone === "teal" ? "bg-teal" : "bg-navy";
  return (
    <div className="flex items-center gap-3">
      <span className={cn("inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs", pillBg)}>
        {num}
      </span>
      <span className="text-[11px] uppercase tracking-widest text-muted font-bold">{label}</span>
    </div>
  );
}

function FlowArrow({ loop = false }: { loop?: boolean }) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <ArrowDown
          size={24}
          className={cn(
            "transition-transform",
            loop ? "text-teal" : "text-coral/60",
            "animate-bounce"
          )}
          style={{ animationDuration: "1.5s" }}
        />
      </div>
    </div>
  );
}

interface Cap { text: string; live: boolean; }
function AgentCard({ icon, title, tag, capabilities, output, surfaceOn, core }: {
  icon: React.ReactNode; title: string; tag: string; capabilities: Cap[]; output: string; surfaceOn: string; core?: boolean;
}) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-4 border flex flex-col gap-3 relative",
      core ? "border-2 border-coral shadow-[0_6px_22px_rgba(224,53,92,0.15)]" : "border-coral/30"
    )}>
      {core && (
        <span className="absolute -top-2 left-4 bg-navy text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded">
          Core Reasoning
        </span>
      )}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-extrabold text-navy">{title}</div>
          <div className="text-[11px] text-muted">{tag}</div>
        </div>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", core ? "bg-navy text-white" : "bg-coral text-white")}>
          {icon}
        </div>
      </div>
      <ul className="space-y-1.5">
        {capabilities.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] text-navy/90 leading-snug">
            <span className={cn(
              "w-2 h-2 rounded-full flex-shrink-0 mt-1.5",
              c.live ? "bg-coral" : "bg-transparent border border-coral"
            )} />
            <span>{c.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto bg-coral-soft rounded-lg p-2.5">
        <div className="text-[11px] text-navy font-semibold">{output}</div>
        <div className="text-[10px] text-muted mt-0.5">{surfaceOn}</div>
      </div>
    </div>
  );
}

function DecisionBox({ heading, icon, items, tone }: { heading: string; icon: string; items: string[]; tone: "coral" | "info" }) {
  return (
    <div className="bg-white/5 border border-white/15 rounded-lg p-4">
      <h4 className={cn("text-xs font-bold mb-2 flex items-center gap-2", tone === "coral" ? "text-coral" : "text-info")}>
        <span>{icon}</span> {heading}
      </h4>
      <ul className="space-y-1 text-xs text-white/80">
        {items.map((i) => <li key={i} className="pl-4 -indent-3 before:content-['•'] before:text-coral before:mr-2 before:font-bold">{i}</li>)}
      </ul>
    </div>
  );
}

function OutputCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white border border-[#E7DDCB] rounded-xl p-3.5">
      <div className="text-coral mb-1.5">{icon}</div>
      <div className="text-sm font-bold text-navy leading-tight">{title}</div>
      <div className="text-[11px] text-muted mt-1 leading-snug">{desc}</div>
      <div className="inline-block mt-2 font-mono text-[9px] font-bold tracking-wider bg-coral-soft text-coral px-1.5 py-0.5 rounded">
        AGENT-WRITTEN
      </div>
    </div>
  );
}

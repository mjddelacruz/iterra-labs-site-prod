"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Node = { x: number; y: number; size: number; type: "chip" | "node" };
    type Trace = {
      from: number;
      to: number;
      midX: number;
      style: "direct" | "routed";
    };
    type Pulse = {
      trace: Trace;
      progress: number;
      speed: number;
      color: string;
    };

    let nodes: Node[] = [];
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let animFrame = 0;

    function init() {
      nodes = [];
      traces = [];
      pulses = [];
      const cols = Math.ceil(canvas!.width / 80);
      const rows = Math.ceil(canvas!.height / 80);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          if (Math.random() > 0.35) {
            nodes.push({
              x: c * 80 + (Math.random() - 0.5) * 30,
              y: r * 80 + (Math.random() - 0.5) * 30,
              size: Math.random() > 0.85 ? 3.5 : Math.random() > 0.6 ? 2 : 1,
              type: Math.random() > 0.8 ? "chip" : "node",
            });
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && Math.random() > 0.55) {
            const midX = nodes[i].x + dx * (Math.random() * 0.4 + 0.3);
            traces.push({
              from: i,
              to: j,
              midX,
              style: Math.random() > 0.7 ? "direct" : "routed",
            });
          }
        }
      }

      for (let i = 0; i < 12; i++) spawnPulse();
    }

    function spawnPulse() {
      if (traces.length === 0) return;
      const t = traces[Math.floor(Math.random() * traces.length)];
      pulses.push({
        trace: t,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: Math.random() > 0.5 ? "#29adf0" : "#2dd4a0",
      });
    }

    function getPosOnTrace(trace: Trace, progress: number) {
      const a = nodes[trace.from];
      const b = nodes[trace.to];
      if (trace.style === "direct") {
        return {
          x: a.x + (b.x - a.x) * progress,
          y: a.y + (b.y - a.y) * progress,
        };
      }
      if (progress < 0.5) {
        const p = progress * 2;
        return { x: a.x + (trace.midX - a.x) * p, y: a.y };
      } else {
        const p = (progress - 0.5) * 2;
        return {
          x: trace.midX + (b.x - trace.midX) * p,
          y: a.y + (b.y - a.y) * p,
        };
      }
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      init();
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      ctx!.lineWidth = 0.7;
      for (const t of traces) {
        const a = nodes[t.from];
        const b = nodes[t.to];
        ctx!.beginPath();
        ctx!.strokeStyle = "rgba(41,173,240,0.12)";
        if (t.style === "direct") {
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
        } else {
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(t.midX, a.y);
          ctx!.lineTo(t.midX, b.y);
          ctx!.lineTo(b.x, b.y);
        }
        ctx!.stroke();
      }

      for (const n of nodes) {
        if (n.type === "chip") {
          const s = 7;
          ctx!.strokeStyle = "rgba(45,212,160,0.25)";
          ctx!.lineWidth = 0.8;
          ctx!.strokeRect(n.x - s, n.y - s, s * 2, s * 2);
          ctx!.beginPath();
          ctx!.strokeStyle = "rgba(41,173,240,0.2)";
          ctx!.moveTo(n.x - s, n.y - 3);
          ctx!.lineTo(n.x - s - 4, n.y - 3);
          ctx!.moveTo(n.x - s, n.y + 3);
          ctx!.lineTo(n.x - s - 4, n.y + 3);
          ctx!.moveTo(n.x + s, n.y - 3);
          ctx!.lineTo(n.x + s + 4, n.y - 3);
          ctx!.moveTo(n.x + s, n.y + 3);
          ctx!.lineTo(n.x + s + 4, n.y + 3);
          ctx!.stroke();
        } else {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx!.fillStyle =
            n.size > 2 ? "rgba(45,212,160,0.4)" : "rgba(41,173,240,0.22)";
          ctx!.fill();
          if (n.size > 2) {
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, n.size + 3, 0, Math.PI * 2);
            ctx!.strokeStyle = "rgba(45,212,160,0.1)";
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        const pos = getPosOnTrace(p.trace, p.progress);
        const grd = ctx!.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 6);
        grd.addColorStop(0, p.color);
        grd.addColorStop(1, "transparent");
        ctx!.beginPath();
        ctx!.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          spawnPulse();
        }
      }

      animFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const onResize = () => {
      cancelAnimationFrame(animFrame);
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal px-6 pb-25 pt-30 text-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-45"
      />

      <div className="relative z-[2]">
        <div className="mb-11 inline-flex items-center gap-2 rounded border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
          <span className="animate-pulse-dot h-[5px] w-[5px] rounded-full bg-brand-teal" />
          Now accepting founding clients
        </div>

        <h1 className="mb-7 max-w-[860px] font-display text-[clamp(48px,8vw,96px)] font-extrabold leading-none tracking-[-0.02em] text-white">
          Engineering for the
          <br />
          <span className="grad-text">AI-native era.</span>
        </h1>

        <p className="mx-auto mb-13 max-w-[560px] text-[clamp(15px,2vw,18px)] font-normal leading-[1.7] text-muted">
          A boutique AI and cloud solutions studio based in Australia — we design
          and ship production AI systems, LLM features, and cloud infrastructure
          for ambitious teams worldwide.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#contact"
            className="inline-block rounded-md bg-brand-blue px-7 py-3.5 text-[14px] font-semibold tracking-[0.02em] text-charcoal transition hover:-translate-y-px hover:opacity-90"
          >
            Work with us
          </a>
          <a
            href="#how"
            className="inline-block rounded-md border border-line bg-transparent px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] text-muted transition hover:border-brand-blue/40 hover:text-white"
          >
            See how we work
          </a>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="animate-scroll-pulse h-10 w-px bg-gradient-to-b from-brand-blue to-transparent" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
          Scroll
        </span>
      </div>
    </section>
  );
}

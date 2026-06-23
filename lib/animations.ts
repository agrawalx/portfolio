import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensure() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fade/slide [data-reveal] elements in as they scroll into view. Returns a cleanup fn. */
export function setupReveal(root: HTMLElement): () => void {
  ensure();
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!els.length) return () => {};
  if (prefersReduced()) return () => {};

  els.forEach((el) => gsap.set(el, { opacity: 0, y: 20 }));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          gsap.to(e.target, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
  );
  els.forEach((el) => io.observe(el));
  // safety: never leave anything hidden
  const t = window.setTimeout(() => {
    els.forEach((el) => {
      if (getComputedStyle(el).opacity === "0") gsap.set(el, { opacity: 1, y: 0 });
    });
  }, 1600);
  return () => { io.disconnect(); window.clearTimeout(t); };
}

/** Scroll-driven progress rail + dot activation for the Instrument arc timeline. */
export function setupArc(root: HTMLElement): () => void {
  ensure();
  const rail = root.querySelector<HTMLElement>("[data-arc-rail]");
  const progress = root.querySelector<HTMLElement>("[data-arc-progress]");
  const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-arc-dot]"));
  const on = (d: HTMLElement) => { d.style.background = "#E8A84B"; d.style.borderColor = "#E8A84B"; };
  const off = (d: HTMLElement) => { d.style.background = "#0A0C0D"; d.style.borderColor = "#2a2f31"; };

  if (prefersReduced()) {
    if (progress) progress.style.height = "100%";
    dots.forEach(on);
    return () => {};
  }
  const triggers: ScrollTrigger[] = [];
  if (rail && progress) {
    const tween = gsap.fromTo(progress, { height: "0%" }, {
      height: "100%", ease: "none",
      scrollTrigger: { trigger: rail, start: "top 72%", end: "bottom 78%", scrub: true },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  }
  dots.forEach((dot) => {
    triggers.push(ScrollTrigger.create({
      trigger: dot, start: "top 74%",
      onEnter: () => on(dot), onLeaveBack: () => off(dot),
    }));
  });
  return () => triggers.forEach((t) => t.kill());
}

/** Type the terminal script into the given lines container. Returns a cleanup fn. */
export function runTerminal(
  container: HTMLElement,
  script: { p: string; o: string }[]
): () => void {
  let alive = true;
  const timers: number[] = [];
  const delay = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

  function lineNodes() {
    const block = document.createElement("div");
    const prompt = document.createElement("div");
    prompt.innerHTML = '<span style="color:#E8A84B">yash@omen:~$</span> <span class="tp" style="color:#D7DBD9"></span>';
    const out = document.createElement("div");
    out.setAttribute("style", "color:#8b938f;padding:1px 0 12px 0");
    out.innerHTML = '<span style="color:#566">&gt;</span> <span class="to"></span>';
    block.appendChild(prompt);
    block.appendChild(out);
    container.appendChild(block);
    return { p: prompt.querySelector(".tp") as HTMLElement, o: out.querySelector(".to") as HTMLElement };
  }
  function type(node: HTMLElement, text: string, sp: number) {
    return new Promise<void>((res) => {
      let i = 0;
      const step = () => {
        if (!alive) return res();
        i++; node.textContent = text.slice(0, i);
        if (i < text.length) timers.push(window.setTimeout(step, sp + Math.random() * sp));
        else res();
      };
      step();
    });
  }
  (async () => {
    if (prefersReduced()) {
      script.forEach((s) => { const n = lineNodes(); n.p.textContent = s.p; n.o.textContent = s.o; });
      return;
    }
    await delay(350);
    for (const s of script) {
      if (!alive) return;
      const n = lineNodes();
      await type(n.p, s.p, 26);
      await delay(110);
      await type(n.o, s.o, 11);
      await delay(220);
    }
  })();

  return () => { alive = false; timers.forEach((t) => window.clearTimeout(t)); };
}

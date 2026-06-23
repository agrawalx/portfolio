"use client";

import { useEffect, useRef, useState } from "react";
import s from "./instrument.module.css";
import { setupReveal, setupArc, runTerminal } from "@/lib/animations";
import {
  termScript, aboutParagraphs, milestones, projects, builds, stacks, wins,
  links, fieldPhotos, EMAIL,
} from "@/lib/data";

const AMBER = "#E8A84B";
const TEAL = "#5BB0A6";
const DIM = "#7d857f";

export default function Instrument() {
  const root = useRef<HTMLDivElement>(null);
  const termLines = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean[]>(() => projects.map(() => false));
  const toggle = (i: number) => setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));

  useEffect(() => {
    if (!root.current) return;
    const cleanReveal = setupReveal(root.current);
    const cleanArc = setupArc(root.current);
    const cleanTerm = termLines.current ? runTerminal(termLines.current, termScript) : () => {};
    return () => { cleanReveal(); cleanArc(); cleanTerm(); };
  }, []);

  return (
    <div className={s.page} ref={root}>

      <header className={`${s.wrap} ${s.topbar}`}>
        <div className={s.handle}><span className={s.dot} />yash@omen</div>
        <nav className={s.nav}>
          <a href="#work">/work</a>
          <a href="#arc">/arc</a>
          <a href="#contact">/contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className={`${s.wrap} ${s.hero}`}>
        <h1 className={s.h1}>Yash Agrawal</h1>
        <div className={s.kicker}>just a pre-final year student who likes taking systems apart · iit roorkee</div>
        <div className={s.term}>
          <div className={s.termBar}>
            <span className={s.termDot} /><span className={s.termDot} /><span className={s.termDot} />
            <span className={s.termPath}>yash@omen: ~/portfolio</span>
          </div>
          <div className={s.termBody}>
            <div ref={termLines} />
            <div><span className={s.prompt}>yash@omen:~$</span> <span className={s.caret} /></div>
          </div>
        </div>
      </section>

      {/* ARC */}
      <section id="arc" className={`${s.wrap} ${s.arcSection}`}>
        <div className={s.arcGrid}>
          <div>
            <div data-reveal className={`${s.eyebrow} ${s.arcEyebrow}`}>[0x01] about me</div>
            <p data-reveal className={s.quote}>&ldquo;the best way to learn software is by building software.&rdquo;</p>
            {aboutParagraphs.map((p, i) => <p key={i} data-reveal className={s.about}>{p}</p>)}
          </div>
          <div data-arc-rail className={s.rail}>
            <div className={s.railBase} />
            <div data-arc-progress className={s.railProgress} />
            {milestones.map((m, i) => (
              <div key={i} className={s.mItem}>
                <div data-arc-dot className={s.mDot} />
                <div className={s.mHead}>
                  <span className={s.mTitle}>{m.title}</span>
                  {m.ongoing && <span className={s.mBadge}>ongoing</span>}
                </div>
                <p className={s.mDetail}>{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className={`${s.wrap} ${s.section}`}>
        <div data-reveal className={s.eyebrow}>[0x02] projects i am proud of</div>
        {projects.map((p, i) => {
          const color = p.tone === "building" ? AMBER : TEAL;
          const border = p.tone === "building" ? "#4a3a1f" : "#1f3d39";
          const isOpen = open[i];
          return (
            <article key={p.title} data-reveal className={s.proj}>
              <h3 className={s.projHeading}>
                <button type="button" className={s.projToggle} aria-expanded={isOpen}
                  aria-controls={`proj-i-${i}`} onClick={() => toggle(i)}>
                  <span className={s.projNumInline}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.projTitleText}>{p.title}</span>
                  <span className={s.statusChip} style={{ color, border: `1px solid ${border}` }}>
                    <span className={s.statusBlip} style={{ background: color }} />{p.status}
                  </span>
                  <span className={s.hint} aria-hidden>{isOpen ? "click to collapse" : "click to expand"}</span>
                  <span className={s.chevron} aria-hidden>{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              <div id={`proj-i-${i}`} className={isOpen ? `${s.panel} ${s.panelOpen}` : s.panel}>
                <div className={s.panelInner}>
                  <div className={s.panelPad} inert={!isOpen}>
                    <p className={s.projDesc}>{p.desc}</p>
                    {p.metrics.length > 0 && (
                      <div className={s.metricRow}>
                        {p.metrics.map((mt, j) => (
                          <div key={j}>
                            <div className={s.metricV}>{mt.v}</div>
                            <div className={s.metricL}>{mt.l}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className={s.projStack}>{p.stack}</div>
                    {p.href ? (
                      <a className={s.projLink} href={p.href} target="_blank" rel="noopener noreferrer">{p.linkLabel} →</a>
                    ) : (
                      <span className={s.noLink}>repo not public yet</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* MORE BUILDS */}
      <section className={`${s.wrap} ${s.section}`}>
        <div data-reveal className={s.eyebrow}>[0x03] more builds</div>
        <div data-reveal className={s.builds}>
          {builds.map((b) => (
            <a key={b.title} className={s.buildRow} href={b.href} target="_blank" rel="noopener noreferrer">
              <span className={s.buildTitle}>{b.title}</span>
              <span className={s.buildDesc}>{b.desc}</span>
              <span className={s.buildTag}>{b.tag} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className={`${s.wrap} ${s.section}`}>
        <div data-reveal className={s.eyebrow}>[0x04] stack</div>
        <div data-reveal className={s.stackGrid}>
          {stacks.map((g) => (
            <div key={g.group}>
              <div className={s.stackLabel}>{g.group}</div>
              <div className={s.chips}>{g.items.map((i) => <span key={i} className={s.chip}>{i}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WINS + photos */}
      <section className={`${s.wrap} ${s.section}`}>
        <div data-reveal className={s.eyebrow}>[0x05] achievements</div>
        {wins.map((w, i) => (
          <div key={i} data-reveal className={s.win}>
            <span className={s.winPlace} style={{ color: w.tone === "building" ? AMBER : DIM }}>{w.place}</span>
            <span className={s.winEvent}>{w.event}</span>
            <span className={s.winMeta}>{w.meta}</span>
          </div>
        ))}
        <div data-reveal className={s.mentionGrid} style={{ marginTop: 24 }}>
          {fieldPhotos.map((ph) => (
            <div key={ph.src} className={s.photo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.src} alt={ph.alt} />
              <span className={s.photoCap}>{ph.labelInstrument}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MENTIONS */}
      <section className={`${s.wrap} ${s.section}`}>
        <div data-reveal className={s.eyebrow}>[0x06] mentions &amp; writing</div>
        <div data-reveal className={s.mentionGrid}>
          <a className={s.mentionCard}
            href="https://blog.arbitrum.foundation/arbitrum-open-house-india-concludes-with-bengaluru-hacker-house-full-recap/"
            target="_blank" rel="noopener noreferrer">
            <div className={s.mentionLabel}>featured in · Arbitrum Foundation</div>
            <p className={s.mentionP}>Recapped as a <em>&ldquo;team of four from IIT Roorkee&rdquo;</em> in the Arbitrum Open House India hacker-house writeup.</p>
            <span className={s.mentionLink}>read the recap →</span>
          </a>
          <div className={s.blogCard}>
            <div className={s.mentionLabel}>blog</div>
            <p className={s.blogP}>Nothing published yet. Notes on storage engines, tail latency, and Rust are coming.</p>
            <span className={s.blogStatus}>// drafting</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${s.wrap} ${s.contactSection}`}>
        <div data-reveal className={s.eyebrow}>[0x07] contact</div>
        <div data-reveal className={s.catline}>yash@omen:~$ <span>cat contact.txt</span></div>
        <a data-reveal className={s.contactEmail} href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div data-reveal className={s.links}>
          {links.map((l) => (
            <a key={l.label} className={s.pill} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
          ))}
        </div>
        <div className={s.footer}>
          <span>yash agrawal · systems &amp; backend</span>
          <span>built from scratch, to understand · 2026</span>
        </div>
      </section>

    </div>
  );
}

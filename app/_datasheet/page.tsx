"use client";

import { useEffect, useRef, useState } from "react";
import s from "./datasheet.module.css";
import { setupReveal } from "@/lib/animations";
import {
  headFields, aboutParagraphs, milestones, projects, builds, stacks, wins,
  links, fieldPhotos, EMAIL,
} from "@/lib/data";

const ACCENT = "#1B45D9";
const INK = "#14161A";

export default function Datasheet() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean[]>(() => projects.map(() => false));
  const toggle = (i: number) => setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));
  useEffect(() => {
    if (!root.current) return;
    return setupReveal(root.current);
  }, []);

  return (
    <div className={s.page} ref={root}>
      <div className={s.frame}>

        <header className={s.bx} style={{ background: "#F5F4EF" }}>
          <div className={s.docbar}>
            <b>DATASHEET</b>
            <span>DOC-YA-2026 · REV 06 · 1 of 1</span>
          </div>
          <div className={s.head}>
            <h1 data-reveal className={s.title}>YASH&nbsp;AGRAWAL</h1>
            <div data-reveal className={s.subtitle}>
              just a pre-final year student who likes taking systems apart · IIT Roorkee
            </div>
          </div>
          <div className={s.specGrid}>
            {headFields.map((f) => (
              <div key={f.k} className={s.specCell}>
                <div className={s.specK}>{f.k}</div>
                <div className={s.specV}>{f.v}</div>
              </div>
            ))}
          </div>
        </header>

        {/* 1 — About */}
        <section className={s.bx + " " + s.section}>
          <div data-reveal className={s.eyebrow}>1 — About me</div>
          <div className={s.twoCol}>
            <div data-reveal className={s.about}>
              {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div data-reveal>
              <div className={s.revLabel}>Revision history</div>
              {milestones.map((m, i) => (
                <div key={i} className={s.milestone}>
                  <span className={s.mRev}>r{i}</span>
                  <div>
                    <div className={s.mHead}>
                      <span className={s.mTitle}>{m.title}</span>
                      {m.ongoing && <span className={s.mBadge}>ongoing</span>}
                    </div>
                    <div className={s.mDetail}>{m.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — Projects */}
        <section id="work" className={s.bx}>
          <div data-reveal className={s.workHead}>2 — Projects I&apos;m proud of</div>
          {projects.map((p, i) => {
            const color = p.tone === "building" ? ACCENT : INK;
            const isOpen = open[i];
            return (
              <article key={p.title} data-reveal className={s.proj}>
                <h3 className={s.projHeading}>
                  <button type="button" className={s.projToggle} aria-expanded={isOpen}
                    aria-controls={`proj-d-${i}`} onClick={() => toggle(i)}>
                    <span className={s.projNumInline}>2.{i + 1}</span>
                    <span className={s.projTitleText}>{p.title}</span>
                    <span className={s.statusChip} style={{ color }}>{p.status}</span>
                    <span className={s.hint} aria-hidden>{isOpen ? "click to collapse" : "click to expand"}</span>
                    <span className={s.chevron} aria-hidden>{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={`proj-d-${i}`} className={isOpen ? `${s.panel} ${s.panelOpen}` : s.panel}>
                  <div className={s.panelInner}>
                    <div className={s.panelPad} inert={!isOpen}>
                      <p className={s.projDesc}>{p.desc}</p>
                      {p.features.length > 0 && (
                        <div className={s.feats}>
                          {p.features.map((x, j) => (
                            <div key={j} className={s.featRow}><span>▸</span><span>{x}</span></div>
                          ))}
                        </div>
                      )}
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
                        <a className={s.projLink} href={p.href} target="_blank" rel="noopener noreferrer">
                          {p.linkLabel} →
                        </a>
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

        {/* 3 — Ordering information */}
        <section className={s.bx + " " + s.section}>
          <div data-reveal className={s.eyebrow}>3 — Ordering information</div>
          <div data-reveal className={s.tableWrap}>
            <table className={s.table}>
              <thead><tr><th>Build</th><th>Notes</th><th>Repo</th></tr></thead>
              <tbody>
                {builds.map((b) => (
                  <tr key={b.title}>
                    <td className={s.tdBuild}>{b.title}</td>
                    <td className={s.tdNotes}>{b.desc}</td>
                    <td className={s.tdRepo}>
                      <a href={b.href} target="_blank" rel="noopener noreferrer">{b.tag} →</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 — Specifications + 5 — Achievements */}
        <section className={s.bx + " " + s.specsAch}>
          <div data-reveal className={s.specsLeft}>
            <div className={s.eyebrow}>4 — Specifications</div>
            {stacks.map((g) => (
              <div key={g.group} className={s.stackGroup}>
                <div className={s.stackLabel}>{g.group}</div>
                <div className={s.chips}>{g.items.map((i) => <span key={i} className={s.chip}>{i}</span>)}</div>
              </div>
            ))}
          </div>
          <div data-reveal className={s.specsRight}>
            <div className={s.eyebrow}>5 — Achievements</div>
            {wins.map((w, i) => (
              <div key={i} className={s.win}>
                <span className={s.winPlace} style={{ color: w.tone === "building" ? ACCENT : INK }}>{w.place}</span>
                <span className={s.winEvent}>{w.event}</span>
                <span className={s.winMeta}>{w.meta}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Field photos */}
        <section className={s.bx + " " + s.section}>
          <div data-reveal className={`${s.eyebrow} ${s.eyebrowGray}`}>Fig. 1–2 — in the field</div>
          <div data-reveal className={s.twoColTight}>
            {fieldPhotos.map((ph) => (
              <div key={ph.src} className={s.photo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph.src} alt={ph.alt} />
                <span className={s.photoCap}>{ph.labelDatasheet}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6 — Mentions */}
        <section className={s.bx + " " + s.section}>
          <div data-reveal className={s.eyebrow}>6 — Mentions &amp; writing</div>
          <div data-reveal className={s.twoColTight}>
            <a className={s.mentionCard}
              href="https://blog.arbitrum.foundation/arbitrum-open-house-india-concludes-with-bengaluru-hacker-house-full-recap/"
              target="_blank" rel="noopener noreferrer">
              <div className={s.mentionLabel}>Featured in · Arbitrum Foundation</div>
              <p className={s.mentionP}>Recapped as a <em>&ldquo;team of four from IIT Roorkee&rdquo;</em> in the Arbitrum Open House India hacker-house writeup.</p>
              <span className={s.mentionLink}>Read the recap →</span>
            </a>
            <div className={s.blogCard}>
              <div className={s.mentionLabel}>Blog</div>
              <p className={s.blogP}>Nothing published yet. Notes on storage engines, tail latency, and Rust are coming.</p>
              <span className={s.blogStatus}>status: drafting</span>
            </div>
          </div>
        </section>

        {/* 7 — Contact */}
        <section id="contact" className={s.bx} style={{ padding: "clamp(28px,5vw,56px) 16px" }}>
          <div data-reveal className={s.eyebrow}>7 — Contact</div>
          <a data-reveal className={s.contactEmail} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div data-reveal className={s.links}>
            {links.map((l) => (
              <a key={l.label} className={s.pill} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
            ))}
          </div>
        </section>

        <div className={s.footer}>
          <span>© 2026 Yash Agrawal · systems &amp; backend</span>
          <span>built from scratch, to understand · DOC-YA-2026 REV 06</span>
        </div>

      </div>
    </div>
  );
}

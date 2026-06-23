import Link from "next/link";
import s from "./home.module.css";

export default function Home() {
  return (
    <main className={s.page}>
      <div className={s.inner}>
        <h1 className={s.title}>Yash Agrawal</h1>
        <div className={s.sub}>two directions · pick one</div>
        <div className={s.grid}>
          <Link className={`${s.card} ${s.dark}`} href="/instrument">
            <div className={s.name}>Instrument</div>
            <div className={s.desc}>Dark terminal / oscilloscope. Typed-out terminal hero and a scroll-driven career timeline.</div>
            <span className={`${s.tag} ${s.tagDark}`}>open instrument →</span>
          </Link>
          <Link className={`${s.card} ${s.light}`} href="/datasheet">
            <div className={s.name}>Datasheet</div>
            <div className={s.desc}>Light engineering spec-sheet. Boxed sections, revision history, ordering table.</div>
            <span className={`${s.tag} ${s.tagLight}`}>open datasheet →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

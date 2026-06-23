export type Tone = "building" | "shipped";

export interface Metric { v: string; l: string; }
export interface Project {
  title: string;
  status: string;        // display label, e.g. "building · lead"
  tone: Tone;
  desc: string;
  features: string[];
  metrics: Metric[];
  stack: string;
  href?: string;
  linkLabel?: string;
}
export interface Milestone { title: string; detail: string; ongoing?: boolean; }
export interface Build { title: string; desc: string; tag: string; href: string; }
export interface StackGroup { group: string; items: string[]; }
export interface Win { place: string; tone: Tone; event: string; meta: string; }
export interface LinkItem { label: string; href: string; }
export interface TermLine { p: string; o: string; }

export const headFields = [
  { k: "Part No.", v: "YA-SYS-26" },
  { k: "Type", v: "Backend / distributed" },
  { k: "Languages", v: "Rust · C++" },
  { k: "Status", v: "Open to roles" },
];

export const aboutParagraphs = [
  "I started in web with Solidity and the MERN stack, spamming hackathons and shipping whatever I could. DeFi was the thing I took seriously for a while, until I realised I just didn't enjoy writing Solidity anymore, and moved off it.",
  "What kept me around was the infrastructure. Rust is the more common language across web3 infra, so when I started exploring that layer I picked it up properly. Learning it is where I ran into concurrency and multithreading, and that's what actually held my attention.",
  "That pulled me down into the backend and infra layer, where I've stayed: database and backend maxxing, building the systems that sit underneath everything else and measuring them honestly. I do my DSA in C++ and reach for Rust for systems work, but I'm fairly language agnostic; these two are just the ones I like most.",
];

export const termScript: TermLine[] = [
  { p: "whoami", o: "Yash Agrawal · systems & backend engineer · IIT Roorkee" },
  { p: "cat thesis.txt", o: "builds distributed & high-performance systems in Rust and C++. learns by building from scratch; trusts p99 over averages." },
  { p: "./status --now", o: "currently building: EdgeProxy · FluxDB · Ethereum client dashboards" },
];

export const milestones: Milestone[] = [
  { title: "Solidity + MERN", detail: "First code that shipped — web apps, smart contracts, a pile of hackathons." },
  { title: "DeFi, then out", detail: "Went deep on DeFi, then walked away from Solidity for good." },
  { title: "Into web3 infra", detail: "Followed the infrastructure layer — which is mostly written in Rust." },
  { title: "Rust + concurrency", detail: "Picked up Rust; stayed for the concurrency and multithreading." },
  { title: "Books → builds", detail: "DDIA → MatchBench. Database Internals → FluxDB." },
  { title: "DB + backend maxxing", detail: "Now: storage engines, backends, open source, and deep Rust.", ongoing: true },
];

export const projects: Project[] = [
  {
    title: "FluxDB", status: "building · lead", tone: "building",
    desc: "An embedded MVCC OLTP engine written from scratch in Rust, Postgres-style concurrent writes inside the in-process, SQLite-shaped world. Readers never block writers; every transaction gets snapshot isolation. Redo-only WAL with crash recovery, per-tuple xmin/xmax MVCC over an in-memory CLOG, and a CLOCK buffer pool above a B-link tree.",
    features: ["MVCC OLTP storage engine from scratch: WAL, CLOCK buffer pool, B-link tree", "Write-ahead durability with redo-only crash recovery"],
    metrics: [],
    stack: "Rust · WAL · MVCC · B-link tree · CLOCK buffer pool",
    href: "https://github.com/BlocSoc-iitr/FluxDB", linkLabel: "BlocSoc-iitr/FluxDB",
  },
  {
    title: "MatchBench", status: "shipped", tone: "shipped",
    desc: "A distributed benchmarking platform for exchange matching engines. Untrusted submissions run in locked-down pods against a deterministic order flow, with latency measured from outside the process at the kernel boundary, HDR histograms out to p99.9.",
    features: ["Kernel-boundary latency measurement with eBPF, p99 / p99.9 over averages", "Distributed pipeline: Kafka, Kubernetes, AWS, Prometheus + Grafana observability"],
    metrics: [{ v: "~835K/s", l: "orders · single instance" }, { v: "~1.5M/s", l: "orders · two instances" }, { v: "~100 ns", l: "eBPF accuracy" }],
    stack: "Rust · Go · eBPF · Kafka · Kubernetes · Prometheus · Grafana",
    href: "https://github.com/agrawalx/match-bench", linkLabel: "agrawalx/match-bench",
  },
  {
    title: "EdgeProxy", status: "building", tone: "building",
    desc: "A single-binary, self-hosted MCP gateway in Rust: session virtualization, tool-definition pinning, fast tool-search, and MCP-aware caching. moka (W-TinyLFU) with request collapsing, DashMap leaky-bucket rate limiting, layered L1/L2 RocksDB storage, TLS throughout.",
    features: ["Lock-free / actor-model concurrency over channels, no shared-state locks", "MCP-aware caching: W-TinyLFU + request collapsing, layered RocksDB storage"],
    metrics: [],
    stack: "Rust · moka · DashMap · RocksDB · TLS",
  },
  {
    title: "Deimos", status: "shipped · EF grant", tone: "shipped",
    desc: "An open-source suite for benchmarking zero-knowledge proving systems on mobile hardware across Circom, Noir, and RISC Zero, measuring time, memory, storage, and energy. Rust proving backends bridged to a Flutter app over native FFI, a Node/Express + PostgreSQL API, and a Next.js dashboard. Backed by an Ethereum Foundation grant.",
    features: ["Rust proving backends bridged to a Flutter app over native FFI", "Full stack: Node/Express + PostgreSQL API, Next.js dashboard, Docker + Nginx"],
    metrics: [],
    stack: "Rust · Flutter FFI · Node/Express · PostgreSQL · Next.js · Docker · Nginx",
    href: "https://github.com/BlocSoc-iitr/Deimos", linkLabel: "BlocSoc-iitr/Deimos",
  },
  {
    title: "Ethereum Client Dashboards", status: "building", tone: "building",
    desc: "Grafana observability for ethpandaops/ethereum-package, per-client dashboards across Geth, Reth, Nethermind, Erigon, Besu and Lighthouse, Prysm, Teku, Nimbus, Lodestar, with debug and resource panels, auto-discovery, and Kurtosis provisioning.",
    features: ["Per-client dashboards across all execution + consensus clients", "Auto-discovery with Kurtosis provisioning"],
    metrics: [],
    stack: "Grafana · Prometheus · Kurtosis · Ethereum clients",
  },
];

export const builds: Build[] = [
  { title: "Orbital", desc: "Multi-dimensional AMM for stablecoins on the Paradigm torus model. Q96.48 fixed-point + a Newton-Raphson solver in Arbitrum Stylus, −80% gas vs Solidity.", tag: "orbital-pool", href: "https://github.com/agrawalx/orbital-pool-organized" },
  { title: "Reverse Proxy", desc: "Async L7 reverse proxy in Rust, pure actor model, no locks, just channels. LRU cache actor, per-IP leaky-bucket limiter, streaming bodies.", tag: "reverse-proxy", href: "https://github.com/agrawalx/reverse-proxy" },
  { title: "Distributed Web Crawler", desc: "Across EC2 workers in Rust. SQS frontier, S3 for HTML, DynamoDB metadata, Redis per-domain sliding-window limiting, robots.txt.", tag: "crawler", href: "https://github.com/agrawalx/Distributed-web-crawler" },
  { title: "Async TCP Chat Server", desc: "Tokio multi-room broker on an actor model, with race-free disconnects.", tag: "ChatServer", href: "https://github.com/agrawalx/ChatServer" },
  { title: "HTTP Server", desc: "An HTTP/1.1 server built from scratch in Rust.", tag: "http-server", href: "https://github.com/agrawalx/codecrafters-http-server-rust" },
];

export const stacks: StackGroup[] = [
  { group: "Languages", items: ["Rust", "C++", "TypeScript", "Python", "Solidity"] },
  { group: "Systems & async", items: ["Tokio", "Hyper", "eBPF", "RocksDB", "moka", "DashMap"] },
  { group: "Distributed & data", items: ["Kafka", "PostgreSQL", "Redis", "Kubernetes", "AWS"] },
  { group: "Observability & infra", items: ["Prometheus", "Grafana", "Docker", "Linux", "Terraform"] },
];

export const wins: Win[] = [
  { place: "1st", tone: "building", event: "Arbitrum Open House, Bangalore", meta: "offline" },
  { place: "1st", tone: "building", event: "ETH Vietnam", meta: "Zircuit track" },
  { place: "1st", tone: "building", event: "Stack2Deep 2025", meta: "freshers" },
  { place: "2nd", tone: "shipped", event: "Arbitrum Open House", meta: "online" },
  { place: "2nd", tone: "shipped", event: "Polkadot AssetHub", meta: "offline finals" },
];

export const links: LinkItem[] = [
  { label: "Résumé (PDF)", href: "/assets/Yash-Agrawal-Resume.pdf" },
  { label: "GitHub", href: "https://github.com/agrawalx" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yash-agrawal-774ab3267/" },
  { label: "X / Twitter", href: "https://x.com/_kxRma_G" },
];

export const fieldPhotos = [
  { src: "/assets/arbitrum-openhouse.jpg", alt: "First place at Arbitrum Open House, Bengaluru", labelDatasheet: "Fig. 1 — Arbitrum Open House, Bengaluru", labelInstrument: "Arbitrum Open House, Bengaluru — 1st" },
  { src: "/assets/polkadot-assethub.jpg", alt: "Polkadot AssetHub finals", labelDatasheet: "Fig. 2 — Polkadot AssetHub finals", labelInstrument: "Polkadot AssetHub finals" },
];

export const EMAIL = "yasha4658@gmail.com";

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Credential = { id: string; title: string; issuer: string; year: string; status: "Verified" | "In progress" | "Expired"; code: string };
const SEED: Credential[] = [
  { id: "aws", title: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2024", status: "Verified", code: "AWS-SAA-24" },
  { id: "google", title: "Analytics Certification", issuer: "Google Skillshop", year: "2023", status: "Verified", code: "GA-23-BOOK" },
  { id: "cloud", title: "Cloud Architecture Path", issuer: "Independent study", year: "2026", status: "In progress", code: "STUDY-26" },
];

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        // Hydrate the browser-only credential ledger after the server-rendered passport.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(saved) as T);
      }
    } catch { /* Keep the sample credentials visible. */ }
    setReady(true);
  }, [key]);
  useEffect(() => { if (ready) localStorage.setItem(key, JSON.stringify(value)); }, [key, value, ready]);
  return [value, setValue] as const;
}

export default function Home() {
  const [credentials, setCredentials] = useLocalStorage<Credential[]>("certs-v2", SEED);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | Credential["status"]>("All");
  const [draft, setDraft] = useState({ title: "", issuer: "", year: "2026", status: "In progress" as Credential["status"] });
  const visible = useMemo(() => credentials.filter((credential) => (filter === "All" || credential.status === filter) && `${credential.title} ${credential.issuer} ${credential.year}`.toLowerCase().includes(query.toLowerCase())), [credentials, filter, query]);

  const addCredential = () => {
    if (!draft.title.trim() || !draft.issuer.trim()) return;
    setCredentials((current) => [{ id: crypto.randomUUID(), ...draft, code: `LOCAL-${new Date().getFullYear()}` }, ...current]);
    setDraft({ title: "", issuer: "", year: "2026", status: "In progress" });
  };

  const copyRecord = async (credential: Credential) => {
    try { await navigator.clipboard.writeText(`${credential.title} — ${credential.issuer} (${credential.year})\nRecord: ${credential.code}`); } catch { /* Clipboard is optional. */ }
  };

  return (
    <main className="passport-page">
      <span className="contract-mark" dangerouslySetInnerHTML={{ __html: "<!-- THESIS: credentials are a private passport ledger; FINISH: issue, verify, filter, and copy records without inflating claims -->" }} />
      <div className="passport-shell">
        <header className="passport-topbar"><Link href="/" className="passport-mark">PASSPORT / CREDENTIALS</Link><span>personal record · edition 01</span></header>
        <section className="passport-hero"><div><p className="passport-kicker">a small archive of earned evidence</p><h1>Keep the proof close.</h1></div><div className="passport-seal" aria-hidden="true"><span>BOOK</span><strong>CV</strong><span>RECORD</span></div><p className="passport-deck">A credential ledger for certifications, study paths, and the details that make a claim checkable.</p></section>

        <section className="passport-layout" aria-labelledby="ledger-heading">
          <div className="ledger-column"><header className="passport-heading"><div><span>01</span><h2 id="ledger-heading">Credential ledger</h2></div><strong>{visible.length} records</strong></header><div className="ledger-tools"><input aria-label="Search credentials" placeholder="Search title, issuer, year" value={query} onChange={(event) => setQuery(event.target.value)} /><div className="passport-tabs" role="group" aria-label="Filter credentials">{["All", "Verified", "In progress", "Expired"].map((state) => <button type="button" className={filter === state ? "active" : ""} key={state} onClick={() => setFilter(state as typeof filter)}>{state}</button>)}</div></div><div className="credential-list">{visible.map((credential, index) => <article className="credential" key={credential.id}><div className="credential-number">{String(index + 1).padStart(2, "0")}</div><div><div className="credential-title"><h3>{credential.title}</h3><span className={`credential-status status-${credential.status.toLowerCase().replace(" ", "-")}`}>{credential.status}</span></div><p>{credential.issuer} · {credential.year}</p><small>{credential.code}</small><div className="credential-actions"><button type="button" onClick={() => setCredentials((current) => current.map((item) => item.id === credential.id ? { ...item, status: item.status === "Verified" ? "In progress" : "Verified" } : item))}>{credential.status === "Verified" ? "Mark in progress" : "Mark verified"}</button><button type="button" onClick={() => copyRecord(credential)}>Copy record</button><button type="button" onClick={() => setCredentials((current) => current.filter((item) => item.id !== credential.id))}>Remove</button></div></div></article>)}{visible.length === 0 && <p className="empty-ledger">No credential matches this filter.</p>}</div></div>
          <aside className="issue-panel"><header className="passport-heading"><div><span>02</span><h2>Issue a record</h2></div></header><label><span>Credential title</span><input value={draft.title} placeholder="What was earned?" onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} /></label><label><span>Issuer / source</span><input value={draft.issuer} placeholder="Who can confirm it?" onChange={(event) => setDraft((current) => ({ ...current, issuer: event.target.value }))} /></label><div className="issue-pair"><label><span>Year</span><input value={draft.year} onChange={(event) => setDraft((current) => ({ ...current, year: event.target.value }))} /></label><label><span>State</span><select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as Credential["status"] }))}><option>In progress</option><option>Verified</option><option>Expired</option></select></label></div><button type="button" className="stamp-button" onClick={addCredential}>Stamp the ledger</button><p className="issue-note">Adding a record is not independent verification. This passport stores your own record of the claim.</p></aside>
        </section>
        <footer className="passport-footer">Personal evidence archive · no issuer API, verification service, or third-party endorsement is implied.</footer>
      </div>
    </main>
  );
}

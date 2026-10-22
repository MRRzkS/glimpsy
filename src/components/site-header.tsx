import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Glimpsy home">
        <span className="wordmark__glyph" aria-hidden="true">G</span>
        <span>Glimpsy</span>
      </Link>

      <nav className="site-navigation" aria-label="Primary navigation">
        <a href="#method">Method</a>
        <a href="#signals">Signals</a>
        <Link href="/opportunities">Workspace</Link>
      </nav>

      <Link className="text-link text-link--header" href="/opportunities">
        Open feed <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

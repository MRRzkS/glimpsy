import Link from "next/link";

interface SiteHeaderProps {
  compact?: boolean;
}

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className="site-header" data-compact={compact}>
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Glimpsy home">
          <span className="brand-mark" aria-hidden="true">
            G
          </span>
          <span>Glimpsy</span>
          <span className="brand-status">Beta</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#product">Product</Link>
          <Link href="/#workflow">Workflow</Link>
          <Link href="/opportunities">Discover</Link>
        </nav>

        <Link className="header-action" href="/opportunities">
          Enter workspace
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}

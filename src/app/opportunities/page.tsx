import Link from "next/link";
import type { Metadata } from "next";
import { mockOpportunities } from "@/features/opportunities/data/mock-opportunities";
import { OpportunityExplorer } from "@/features/opportunities/components/opportunity-explorer";

export const metadata: Metadata = {
  title: "Opportunity workspace",
  description:
    "Search, compare, and evaluate freelance web development opportunities across multiple platforms.",
};

const averageMatchScore = Math.round(
  mockOpportunities.reduce(
    (totalScore, opportunity) => totalScore + opportunity.matchScore,
    0,
  ) / mockOpportunities.length,
);

export default function OpportunitiesPage() {
  return (
    <main className="workspace-page">
      <aside className="workspace-sidebar">
        <Link className="workspace-sidebar__brand" href="/" aria-label="Glimpsy home">
          <span className="brand-mark" aria-hidden="true">G</span>
          <span>Glimpsy</span>
        </Link>

        <nav className="workspace-nav" aria-label="Workspace navigation">
          <p className="workspace-nav__label">Workspace</p>
          <Link className="workspace-nav__item workspace-nav__item--active" href="/opportunities">
            <span aria-hidden="true">⌁</span>
            Discover
            <small>{mockOpportunities.length}</small>
          </Link>
          <span className="workspace-nav__item workspace-nav__item--muted">
            <span aria-hidden="true">◇</span>
            Shortlist
            <small>0</small>
          </span>
          <span className="workspace-nav__item workspace-nav__item--muted">
            <span aria-hidden="true">◎</span>
            Signals
            <small>Soon</small>
          </span>
        </nav>

        <div className="workspace-sidebar__section">
          <p className="workspace-nav__label">Sources</p>
          <div className="source-health">
            <span className="source-health__dot source-health__dot--upwork" />
            <span>Upwork</span>
            <small>Demo</small>
          </div>
          <div className="source-health">
            <span className="source-health__dot source-health__dot--contra" />
            <span>Contra</span>
            <small>Demo</small>
          </div>
          <div className="source-health">
            <span className="source-health__dot source-health__dot--freelancer" />
            <span>Freelancer</span>
            <small>Demo</small>
          </div>
          <div className="source-health">
            <span className="source-health__dot source-health__dot--peopleperhour" />
            <span>PeoplePerHour</span>
            <small>Demo</small>
          </div>
        </div>

        <div className="workspace-sidebar__footer">
          <div className="workspace-profile">
            <span className="workspace-profile__avatar" aria-hidden="true">R</span>
            <div>
              <strong>Freelancer</strong>
              <small>Developer profile</small>
            </div>
          </div>
          <Link href="/">Exit workspace ↗</Link>
        </div>
      </aside>

      <section className="workspace-main">
        <header className="workspace-topbar">
          <div className="workspace-breadcrumb">
            <span>Workspace</span>
            <i>/</i>
            <strong>Discover</strong>
          </div>

          <div className="workspace-topbar__actions">
            <span className="sync-status">
              <i className="live-dot" aria-hidden="true" />
              Demo feed synced
            </span>
            <button className="workspace-icon-button" type="button" aria-label="Notifications">
              ◌
            </button>
          </div>
        </header>

        <div className="workspace-content">
          <section className="workspace-overview">
            <div className="workspace-overview__copy">
              <p className="section-label">Opportunity intelligence</p>
              <h1>Find the work that deserves your next proposal.</h1>
              <p>
                One calm queue for comparing project fit, commercial value,
                timeline, and stack before you open the source listing.
              </p>
            </div>

            <div className="workspace-metrics" aria-label="Opportunity summary">
              <article>
                <span>Available now</span>
                <strong>{mockOpportunities.length.toString().padStart(2, "0")}</strong>
                <small>normalized opportunities</small>
              </article>
              <article>
                <span>Average fit</span>
                <strong>{averageMatchScore}%</strong>
                <small>across the current feed</small>
              </article>
              <article>
                <span>Active sources</span>
                <strong>04</strong>
                <small>demo adapters connected</small>
              </article>
            </div>
          </section>

          <OpportunityExplorer opportunities={mockOpportunities} />
        </div>
      </section>
    </main>
  );
}

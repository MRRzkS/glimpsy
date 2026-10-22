import Link from "next/link";
import type { Metadata } from "next";
import { OpportunityExplorer } from "@/features/opportunities/components/opportunity-explorer";
import { mockOpportunities } from "@/features/opportunities/data/mock-opportunities";

export const metadata: Metadata = {
  title: "Opportunity workspace",
  description: "Search, compare, shortlist, and inspect normalized freelance opportunities.",
};

const averageMatchScore = Math.round(
  mockOpportunities.reduce((totalScore, opportunity) => totalScore + opportunity.matchScore, 0) /
    mockOpportunities.length,
);

export default function OpportunitiesPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <Link className="wordmark wordmark--workspace" href="/" aria-label="Glimpsy home">
          <span className="wordmark__glyph" aria-hidden="true">G</span>
          <span>Glimpsy</span>
        </Link>

        <div className="workspace-header__center" aria-label="Current workspace">
          <span>Discover</span>
          <i />
          <span>Demo feed</span>
        </div>

        <Link className="text-link" href="/">
          Exit <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section className="workspace-intro">
        <div className="workspace-intro__title">
          <span className="mono-label">Opportunity intelligence / 01</span>
          <h1>Work worth opening.</h1>
          <p>Compare the brief, commercial value, timeline, stack, and fit before leaving the queue.</p>
        </div>

        <dl className="workspace-intro__metrics">
          <div>
            <dt>Available</dt>
            <dd>{mockOpportunities.length.toString().padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Average fit</dt>
            <dd>{averageMatchScore}</dd>
          </div>
          <div>
            <dt>Sources</dt>
            <dd>04</dd>
          </div>
        </dl>
      </section>

      <OpportunityExplorer opportunities={mockOpportunities} />
    </main>
  );
}

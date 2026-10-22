import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { mockOpportunities } from "@/features/opportunities/data/mock-opportunities";
import { OpportunityExplorer } from "@/features/opportunities/components/opportunity-explorer";

export const metadata: Metadata = {
  title: "Discover opportunities",
  description:
    "Search, compare, and evaluate freelance web development opportunities across multiple platforms.",
};

export default function OpportunitiesPage() {
  return (
    <main className="workspace-page">
      <SiteHeader compact />

      <section className="workspace-hero">
        <div className="page-shell">
          <div className="workspace-hero__copy">
            <p className="eyebrow">Opportunity workspace</p>
            <h1>Find work worth your attention.</h1>
            <p>
              Scan requirements, budget, timeline, stack, and fit from one
              normalized feed instead of opening marketplace tabs one by one.
            </p>
          </div>

          <div className="workspace-status" aria-label="Workspace status">
            <span className="workspace-status__pulse" aria-hidden="true" />
            Demo sources normalized
          </div>
        </div>
      </section>

      <div className="page-shell page-shell--workspace">
        <OpportunityExplorer opportunities={mockOpportunities} />
      </div>
    </main>
  );
}

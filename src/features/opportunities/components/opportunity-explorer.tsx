"use client";

import { useMemo, useState } from "react";
import type {
  FreelanceOpportunity,
  FreelancePlatform,
} from "../types/opportunity";
import { getPlatformLabel } from "../lib/opportunity-formatters";
import { OpportunityCard } from "./opportunity-card";

type PlatformFilter = "all" | FreelancePlatform;
type OpportunitySort = "fit" | "newest" | "budget";

interface OpportunityExplorerProps {
  opportunities: FreelanceOpportunity[];
}

const platformFilters: PlatformFilter[] = [
  "all",
  "upwork",
  "contra",
  "freelancer",
  "peopleperhour",
];

function opportunityMatchesSearch(
  opportunity: FreelanceOpportunity,
  normalizedSearchTerm: string,
): boolean {
  if (!normalizedSearchTerm) {
    return true;
  }

  const searchableText = [
    opportunity.title,
    opportunity.description,
    opportunity.skills.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedSearchTerm);
}

function getComparableBudget(opportunity: FreelanceOpportunity): number {
  return opportunity.budgetMaximum ?? opportunity.budgetMinimum ?? 0;
}

function sortOpportunities(
  opportunities: FreelanceOpportunity[],
  sortBy: OpportunitySort,
): FreelanceOpportunity[] {
  return [...opportunities].sort((firstOpportunity, secondOpportunity) => {
    if (sortBy === "newest") {
      return (
        new Date(secondOpportunity.postedAt).getTime() -
        new Date(firstOpportunity.postedAt).getTime()
      );
    }

    if (sortBy === "budget") {
      return (
        getComparableBudget(secondOpportunity) -
        getComparableBudget(firstOpportunity)
      );
    }

    return secondOpportunity.matchScore - firstOpportunity.matchScore;
  });
}

export function OpportunityExplorer({
  opportunities,
}: OpportunityExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformFilter>("all");
  const [sortBy, setSortBy] = useState<OpportunitySort>("fit");

  const visibleOpportunities = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const filteredOpportunities = opportunities.filter((opportunity) => {
      const matchesPlatform =
        selectedPlatform === "all" || opportunity.source === selectedPlatform;

      return (
        matchesPlatform &&
        opportunityMatchesSearch(opportunity, normalizedSearchTerm)
      );
    });

    return sortOpportunities(filteredOpportunities, sortBy);
  }, [opportunities, searchTerm, selectedPlatform, sortBy]);

  return (
    <section className="opportunity-explorer" aria-label="Freelance opportunities">
      <div className="explorer-controls">
        <label className="search-field">
          <span className="search-field__label">Search opportunities</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Try Next.js, dashboard, animation…"
          />
        </label>

        <label className="sort-field">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as OpportunitySort)
            }
          >
            <option value="fit">Best fit</option>
            <option value="newest">Newest</option>
            <option value="budget">Highest budget</option>
          </select>
        </label>
      </div>

      <div className="platform-filter-row" aria-label="Filter by platform">
        {platformFilters.map((platform) => {
          const label =
            platform === "all" ? "All sources" : getPlatformLabel(platform);
          const isSelected = selectedPlatform === platform;

          return (
            <button
              className="filter-chip"
              data-selected={isSelected}
              key={platform}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedPlatform(platform)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="results-summary" aria-live="polite">
        <strong>{visibleOpportunities.length}</strong>
        <span>
          {visibleOpportunities.length === 1 ? "opportunity" : "opportunities"}
        </span>
        <span className="results-summary__note">Demo dataset</span>
      </div>

      <div className="opportunity-list">
        {visibleOpportunities.map((opportunity) => (
          <OpportunityCard opportunity={opportunity} key={opportunity.id} />
        ))}
      </div>

      {visibleOpportunities.length === 0 ? (
        <div className="empty-state">
          <p className="eyebrow">No matching opportunities</p>
          <h2>Try a broader search or another source.</h2>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => {
              setSearchTerm("");
              setSelectedPlatform("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </section>
  );
}

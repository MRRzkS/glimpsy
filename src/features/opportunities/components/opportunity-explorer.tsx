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
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<Set<string>>(
    new Set(),
  );
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const visibleOpportunities = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const filteredOpportunities = opportunities.filter((opportunity) => {
      const matchesPlatform =
        selectedPlatform === "all" || opportunity.source === selectedPlatform;
      const matchesSavedFilter =
        !showSavedOnly || savedOpportunityIds.has(opportunity.id);

      return (
        matchesPlatform &&
        matchesSavedFilter &&
        opportunityMatchesSearch(opportunity, normalizedSearchTerm)
      );
    });

    return sortOpportunities(filteredOpportunities, sortBy);
  }, [
    opportunities,
    savedOpportunityIds,
    searchTerm,
    selectedPlatform,
    showSavedOnly,
    sortBy,
  ]);

  function toggleSavedOpportunity(opportunityId: string) {
    setSavedOpportunityIds((currentSavedOpportunityIds) => {
      const nextSavedOpportunityIds = new Set(currentSavedOpportunityIds);

      if (nextSavedOpportunityIds.has(opportunityId)) {
        nextSavedOpportunityIds.delete(opportunityId);
      } else {
        nextSavedOpportunityIds.add(opportunityId);
      }

      return nextSavedOpportunityIds;
    });
  }

  function clearExplorerFilters() {
    setSearchTerm("");
    setSelectedPlatform("all");
    setShowSavedOnly(false);
  }

  return (
    <section className="opportunity-explorer" aria-label="Freelance opportunities">
      <div className="explorer-panel">
        <div className="explorer-search-row">
          <label className="search-field">
            <span className="search-field__icon" aria-hidden="true">⌕</span>
            <span className="visually-hidden">Search opportunities</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by project, skill, or stack…"
            />
            <span className="search-field__shortcut" aria-hidden="true">⌘ K</span>
          </label>

          <label className="sort-field">
            <span className="visually-hidden">Sort opportunities</span>
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as OpportunitySort)
              }
            >
              <option value="fit">Best fit</option>
              <option value="newest">Newest first</option>
              <option value="budget">Highest budget</option>
            </select>
          </label>
        </div>

        <div className="explorer-filter-row">
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

          <button
            className="saved-filter"
            data-selected={showSavedOnly}
            type="button"
            aria-pressed={showSavedOnly}
            onClick={() => setShowSavedOnly((currentValue) => !currentValue)}
          >
            <span aria-hidden="true">◇</span>
            Shortlisted
            <strong>{savedOpportunityIds.size}</strong>
          </button>
        </div>
      </div>

      <div className="results-header" aria-live="polite">
        <div>
          <p className="section-label">Decision queue</p>
          <h2>
            {visibleOpportunities.length}
            <span>
              {visibleOpportunities.length === 1 ? " opportunity" : " opportunities"}
            </span>
          </h2>
        </div>
        <p>
          Ranked by {sortBy === "fit" ? "fit score" : sortBy === "newest" ? "recency" : "budget"}
          <span> · Demo data</span>
        </p>
      </div>

      <div className="opportunity-list">
        {visibleOpportunities.map((opportunity) => (
          <OpportunityCard
            opportunity={opportunity}
            isSaved={savedOpportunityIds.has(opportunity.id)}
            key={opportunity.id}
            onToggleSaved={toggleSavedOpportunity}
          />
        ))}
      </div>

      {visibleOpportunities.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">⌕</span>
          <p className="section-label">Nothing in this view</p>
          <h2>No opportunity matches those filters yet.</h2>
          <p>Broaden the search, switch source, or return to the full queue.</p>
          <button
            type="button"
            className="button button--dark"
            onClick={clearExplorerFilters}
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </section>
  );
}

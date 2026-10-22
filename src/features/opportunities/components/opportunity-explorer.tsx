"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  FreelanceOpportunity,
  FreelancePlatform,
} from "../types/opportunity";
import {
  formatOpportunityBudget,
  formatOpportunityDeadline,
  formatOpportunityExperience,
  formatOpportunityRemoteType,
  formatPostedDate,
  getPlatformLabel,
} from "../lib/opportunity-formatters";
import { OpportunityCard } from "./opportunity-card";
import { SourceBadge } from "./source-badge";

type PlatformFilter = "all" | FreelancePlatform;
type OpportunitySort = "fit" | "newest" | "budget";

interface OpportunityExplorerProps {
  opportunities: FreelanceOpportunity[];
}

const SAVED_OPPORTUNITIES_STORAGE_KEY = "glimpsy-saved-opportunity-ids";
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

  return [opportunity.title, opportunity.description, opportunity.skills.join(" ")]
    .join(" ")
    .toLowerCase()
    .includes(normalizedSearchTerm);
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
      return new Date(secondOpportunity.postedAt).getTime() - new Date(firstOpportunity.postedAt).getTime();
    }

    if (sortBy === "budget") {
      return getComparableBudget(secondOpportunity) - getComparableBudget(firstOpportunity);
    }

    return secondOpportunity.matchScore - firstOpportunity.matchScore;
  });
}

export function OpportunityExplorer({ opportunities }: OpportunityExplorerProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>("all");
  const [sortBy, setSortBy] = useState<OpportunitySort>("fit");
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<Set<string>>(new Set());
  const [savedStateLoaded, setSavedStateLoaded] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<FreelanceOpportunity | null>(null);

  useEffect(() => {
    try {
      const storedOpportunityIds = window.localStorage.getItem(SAVED_OPPORTUNITIES_STORAGE_KEY);
      if (storedOpportunityIds) {
        setSavedOpportunityIds(new Set(JSON.parse(storedOpportunityIds) as string[]));
      }
    } catch {
      // Local storage is optional. The feed remains fully usable when persistence is unavailable.
    } finally {
      setSavedStateLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!savedStateLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        SAVED_OPPORTUNITIES_STORAGE_KEY,
        JSON.stringify([...savedOpportunityIds]),
      );
    } catch {
      // Persistence failure must never block shortlisting during the current session.
    }
  }, [savedOpportunityIds, savedStateLoaded]);

  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isSearchShortcut) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape" && selectedOpportunity) {
        setSelectedOpportunity(null);
      }
    }

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, [selectedOpportunity]);

  const visibleOpportunities = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const filteredOpportunities = opportunities.filter((opportunity) => {
      const matchesPlatform = selectedPlatform === "all" || opportunity.source === selectedPlatform;
      const matchesSavedFilter = !showSavedOnly || savedOpportunityIds.has(opportunity.id);

      return matchesPlatform && matchesSavedFilter && opportunityMatchesSearch(opportunity, normalizedSearchTerm);
    });

    return sortOpportunities(filteredOpportunities, sortBy);
  }, [opportunities, savedOpportunityIds, searchTerm, selectedPlatform, showSavedOnly, sortBy]);

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
      <div className="discovery-toolbar">
        <label className="discovery-search">
          <span className="discovery-search__symbol" aria-hidden="true">/</span>
          <span className="visually-hidden">Search opportunities</span>
          <input
            ref={searchInputRef}
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search project, skill, or stack"
          />
          <kbd>⌘K</kbd>
        </label>

        <label className="sort-control">
          <span>Sort</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as OpportunitySort)}
            aria-label="Sort opportunities"
          >
            <option value="fit">Best fit</option>
            <option value="newest">Newest</option>
            <option value="budget">Budget</option>
          </select>
        </label>

        <button
          className="shortlist-control"
          data-active={showSavedOnly}
          type="button"
          aria-pressed={showSavedOnly}
          onClick={() => setShowSavedOnly((currentValue) => !currentValue)}
        >
          Shortlist <strong>{savedOpportunityIds.size}</strong>
        </button>
      </div>

      <div className="source-filter" aria-label="Filter by platform">
        {platformFilters.map((platform) => {
          const label = platform === "all" ? "All sources" : getPlatformLabel(platform);
          const isSelected = selectedPlatform === platform;

          return (
            <button
              key={platform}
              type="button"
              className="source-filter__button"
              data-selected={isSelected}
              aria-pressed={isSelected}
              onClick={() => setSelectedPlatform(platform)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="queue-heading" aria-live="polite">
        <div>
          <span className="mono-label">Decision queue</span>
          <h2>{visibleOpportunities.length.toString().padStart(2, "0")} opportunities</h2>
        </div>
        <p>
          {showSavedOnly ? "Showing shortlisted work" : "Ranked for fast commercial triage"}
        </p>
      </div>

      <div className="opportunity-stream">
        {visibleOpportunities.map((opportunity, index) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            rank={index + 1}
            isSaved={savedOpportunityIds.has(opportunity.id)}
            onOpenOpportunity={setSelectedOpportunity}
            onToggleSaved={toggleSavedOpportunity}
          />
        ))}
      </div>

      {visibleOpportunities.length === 0 ? (
        <div className="empty-state">
          <span className="mono-label">No signal</span>
          <h2>No opportunity matches this view.</h2>
          <p>Broaden the query or reset the active source and shortlist filters.</p>
          <button type="button" className="solid-action" onClick={clearExplorerFilters}>
            Reset filters
          </button>
        </div>
      ) : null}

      {selectedOpportunity ? (
        <div className="detail-backdrop" role="presentation" onMouseDown={() => setSelectedOpportunity(null)}>
          <aside
            className="opportunity-detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="opportunity-detail-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="opportunity-detail__header">
              <SourceBadge platform={selectedOpportunity.source} />
              <button
                className="detail-close"
                type="button"
                aria-label="Close opportunity details"
                onClick={() => setSelectedOpportunity(null)}
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="opportunity-detail__intro">
              <span className="mono-label">Posted {formatPostedDate(selectedOpportunity.postedAt)}</span>
              <h2 id="opportunity-detail-title">{selectedOpportunity.title}</h2>
              <p>{selectedOpportunity.description}</p>
            </div>

            <dl className="opportunity-detail__facts">
              <div>
                <dt>Fit</dt>
                <dd>{selectedOpportunity.matchScore}/100</dd>
              </div>
              <div>
                <dt>Budget</dt>
                <dd>{formatOpportunityBudget(selectedOpportunity)}</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>{selectedOpportunity.estimatedDuration ?? "Not specified"}</dd>
              </div>
              <div>
                <dt>Deadline</dt>
                <dd>{formatOpportunityDeadline(selectedOpportunity.deadline)}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{formatOpportunityExperience(selectedOpportunity.experienceLevel)}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{formatOpportunityRemoteType(selectedOpportunity.remoteType)}</dd>
              </div>
            </dl>

            <div className="opportunity-detail__skills">
              <span className="mono-label">Required stack</span>
              <div>
                {selectedOpportunity.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>

            <div className="opportunity-detail__actions">
              <button
                className="outline-action"
                type="button"
                aria-pressed={savedOpportunityIds.has(selectedOpportunity.id)}
                onClick={() => toggleSavedOpportunity(selectedOpportunity.id)}
              >
                {savedOpportunityIds.has(selectedOpportunity.id) ? "Remove shortlist" : "Add to shortlist"}
              </button>
              <a className="solid-action" href={selectedOpportunity.sourceUrl} target="_blank" rel="noreferrer">
                Open original <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}

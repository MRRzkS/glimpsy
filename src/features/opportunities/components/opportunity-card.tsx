import type { CSSProperties } from "react";
import type { FreelanceOpportunity } from "../types/opportunity";
import {
  formatOpportunityBudget,
  formatOpportunityExperience,
  formatOpportunityRemoteType,
  formatPostedDate,
} from "../lib/opportunity-formatters";
import { SourceBadge } from "./source-badge";

interface OpportunityCardProps {
  opportunity: FreelanceOpportunity;
  isSaved: boolean;
  onToggleSaved: (opportunityId: string) => void;
}

export function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSaved,
}: OpportunityCardProps) {
  const matchScoreStyle = {
    "--match-score": `${opportunity.matchScore * 3.6}deg`,
  } as CSSProperties;

  return (
    <article className="opportunity-card">
      <div className="opportunity-card__main">
        <div className="opportunity-card__topline">
          <div className="opportunity-card__source-line">
            <SourceBadge platform={opportunity.source} />
            <span className="opportunity-card__divider" aria-hidden="true">•</span>
            <span>Posted {formatPostedDate(opportunity.postedAt)}</span>
          </div>

          <button
            className="save-button"
            data-saved={isSaved}
            type="button"
            aria-pressed={isSaved}
            aria-label={isSaved ? "Remove from shortlist" : "Add to shortlist"}
            onClick={() => onToggleSaved(opportunity.id)}
          >
            <span aria-hidden="true">{isSaved ? "◆" : "◇"}</span>
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>

        <div className="opportunity-card__heading">
          <h3>{opportunity.title}</h3>
          <p>{opportunity.description}</p>
        </div>

        <div className="skill-list" aria-label="Required skills">
          {opportunity.skills.map((skill) => (
            <span className="skill-chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>

        <div className="opportunity-card__footer">
          <div className="opportunity-card__secondary-meta">
            <span>{formatOpportunityExperience(opportunity.experienceLevel)}</span>
            <span>{formatOpportunityRemoteType(opportunity.remoteType)}</span>
            <span>{opportunity.paymentType === "fixed" ? "Fixed price" : "Hourly"}</span>
          </div>

          <a
            className="source-link"
            href={opportunity.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open original
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <aside className="opportunity-card__signals" aria-label="Opportunity signals">
        <div className="match-gauge" style={matchScoreStyle}>
          <div className="match-gauge__inner">
            <strong>{opportunity.matchScore}</strong>
            <span>fit</span>
          </div>
        </div>

        <dl className="signal-metrics">
          <div>
            <dt>Budget</dt>
            <dd>{formatOpportunityBudget(opportunity)}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{opportunity.estimatedDuration ?? "Not specified"}</dd>
          </div>
        </dl>
      </aside>
    </article>
  );
}

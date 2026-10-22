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
  rank: number;
  isSaved: boolean;
  onOpenOpportunity: (opportunity: FreelanceOpportunity) => void;
  onToggleSaved: (opportunityId: string) => void;
}

export function OpportunityCard({
  opportunity,
  rank,
  isSaved,
  onOpenOpportunity,
  onToggleSaved,
}: OpportunityCardProps) {
  return (
    <article className="opportunity-row" data-saved={isSaved}>
      <div className="opportunity-row__rank" aria-hidden="true">
        {rank.toString().padStart(2, "0")}
      </div>

      <div className="opportunity-row__body">
        <div className="opportunity-row__meta">
          <SourceBadge platform={opportunity.source} />
          <span>Posted {formatPostedDate(opportunity.postedAt)}</span>
          <span>{formatOpportunityRemoteType(opportunity.remoteType)}</span>
        </div>

        <button
          className="opportunity-row__title-button"
          type="button"
          onClick={() => onOpenOpportunity(opportunity)}
          aria-label={`View details for ${opportunity.title}`}
        >
          <h3>{opportunity.title}</h3>
          <span aria-hidden="true">↗</span>
        </button>

        <p className="opportunity-row__summary">{opportunity.description}</p>

        <div className="opportunity-row__skills" aria-label="Required skills">
          {opportunity.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="opportunity-row__footer">
          <span>{formatOpportunityExperience(opportunity.experienceLevel)}</span>
          <span>{opportunity.paymentType === "fixed" ? "Fixed price" : "Hourly"}</span>
          <button
            type="button"
            className="save-control"
            data-saved={isSaved}
            aria-pressed={isSaved}
            aria-label={isSaved ? "Remove from shortlist" : "Add to shortlist"}
            onClick={() => onToggleSaved(opportunity.id)}
          >
            <span aria-hidden="true">{isSaved ? "●" : "○"}</span>
            {isSaved ? "Shortlisted" : "Shortlist"}
          </button>
        </div>
      </div>

      <aside className="opportunity-row__commercial" aria-label="Commercial signals">
        <div className="fit-score" data-high={opportunity.matchScore >= 90}>
          <strong>{opportunity.matchScore}</strong>
          <span>fit</span>
        </div>
        <dl>
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

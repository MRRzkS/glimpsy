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
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card__topline">
        <SourceBadge platform={opportunity.source} />
        <span className="match-score" aria-label={`${opportunity.matchScore}% fit score`}>
          {opportunity.matchScore}% fit
        </span>
      </div>

      <div className="opportunity-card__heading">
        <div>
          <p className="eyebrow">Posted {formatPostedDate(opportunity.postedAt)}</p>
          <h2>{opportunity.title}</h2>
        </div>
        <a
          className="text-link"
          href={opportunity.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          View source <span aria-hidden="true">↗</span>
        </a>
      </div>

      <p className="opportunity-card__description">{opportunity.description}</p>

      <div className="skill-list" aria-label="Required skills">
        {opportunity.skills.map((skill) => (
          <span className="skill-chip" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <dl className="opportunity-meta-grid">
        <div>
          <dt>Budget</dt>
          <dd>{formatOpportunityBudget(opportunity)}</dd>
        </div>
        <div>
          <dt>Timeline</dt>
          <dd>{opportunity.estimatedDuration ?? "Not specified"}</dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>{formatOpportunityExperience(opportunity.experienceLevel)}</dd>
        </div>
        <div>
          <dt>Remote</dt>
          <dd>{formatOpportunityRemoteType(opportunity.remoteType)}</dd>
        </div>
      </dl>
    </article>
  );
}

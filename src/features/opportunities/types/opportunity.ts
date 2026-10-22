export type FreelancePlatform =
  | "upwork"
  | "freelancer"
  | "contra"
  | "peopleperhour";

export type OpportunityPaymentType = "fixed" | "hourly";

export type OpportunityExperienceLevel =
  | "entry"
  | "intermediate"
  | "expert";

export type OpportunityRemoteType = "worldwide" | "regional" | "onsite";

/**
 * The application-facing opportunity model.
 *
 * Platform adapters are responsible for translating their own payloads into
 * this shape before data reaches persistence, matching, or presentation code.
 */
export interface FreelanceOpportunity {
  id: string;
  source: FreelancePlatform;
  sourceProjectId: string;
  sourceUrl: string;

  title: string;
  description: string;
  skills: string[];

  paymentType: OpportunityPaymentType;
  budgetMinimum: number | null;
  budgetMaximum: number | null;
  currency: string | null;

  estimatedDuration: string | null;
  deadline: string | null;
  experienceLevel: OpportunityExperienceLevel | null;
  remoteType: OpportunityRemoteType | null;

  matchScore: number;
  postedAt: string;
  collectedAt: string;
}

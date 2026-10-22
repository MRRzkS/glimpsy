import type {
  FreelanceOpportunity,
  FreelancePlatform,
  OpportunityExperienceLevel,
  OpportunityRemoteType,
} from "../types/opportunity";

const platformLabels: Record<FreelancePlatform, string> = {
  upwork: "Upwork",
  freelancer: "Freelancer",
  contra: "Contra",
  peopleperhour: "PeoplePerHour",
};

const experienceLabels: Record<OpportunityExperienceLevel, string> = {
  entry: "Entry",
  intermediate: "Intermediate",
  expert: "Expert",
};

const remoteTypeLabels: Record<OpportunityRemoteType, string> = {
  worldwide: "Worldwide",
  regional: "Regional",
  onsite: "On-site",
};

export function getPlatformLabel(platform: FreelancePlatform): string {
  return platformLabels[platform];
}

export function formatOpportunityBudget(
  opportunity: FreelanceOpportunity,
): string {
  const { budgetMinimum, budgetMaximum, currency, paymentType } = opportunity;

  if (!currency || (budgetMinimum === null && budgetMaximum === null)) {
    return "Budget not disclosed";
  }

  const amountFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const suffix = paymentType === "hourly" ? "/hr" : "";

  if (budgetMinimum !== null && budgetMaximum !== null) {
    return `${amountFormatter.format(budgetMinimum)}–${amountFormatter.format(
      budgetMaximum,
    )}${suffix}`;
  }

  const knownBudget = budgetMinimum ?? budgetMaximum;
  return `${amountFormatter.format(knownBudget ?? 0)}${suffix}`;
}

export function formatOpportunityExperience(
  experienceLevel: OpportunityExperienceLevel | null,
): string {
  return experienceLevel ? experienceLabels[experienceLevel] : "Not specified";
}

export function formatOpportunityRemoteType(
  remoteType: OpportunityRemoteType | null,
): string {
  return remoteType ? remoteTypeLabels[remoteType] : "Not specified";
}

export function formatPostedDate(postedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(postedAt));
}

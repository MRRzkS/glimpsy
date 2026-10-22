import type { FreelancePlatform } from "../types/opportunity";
import { getPlatformLabel } from "../lib/opportunity-formatters";

interface SourceBadgeProps {
  platform: FreelancePlatform;
}

export function SourceBadge({ platform }: SourceBadgeProps) {
  return (
    <span className={`source-badge source-badge--${platform}`}>
      <span className="source-badge__dot" aria-hidden="true" />
      {getPlatformLabel(platform)}
    </span>
  );
}

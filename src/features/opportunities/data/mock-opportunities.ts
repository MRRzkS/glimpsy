import type { FreelanceOpportunity } from "../types/opportunity";

/**
 * Representative opportunities used while source integrations are being built.
 * They deliberately mimic the variety of real freelance listings without
 * claiming to be live jobs from the referenced platforms.
 */
export const mockOpportunities: FreelanceOpportunity[] = [
  {
    id: "demo-upwork-saas-dashboard",
    source: "upwork",
    sourceProjectId: "demo-001",
    sourceUrl: "https://www.upwork.com/",
    title: "Build a polished SaaS dashboard from Figma",
    description:
      "A startup needs a responsive dashboard implemented from an existing Figma system. The work includes reusable React components, analytics views, account settings, and final deployment support.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    paymentType: "fixed",
    budgetMinimum: 1200,
    budgetMaximum: 1800,
    currency: "USD",
    estimatedDuration: "2–3 weeks",
    deadline: null,
    experienceLevel: "intermediate",
    remoteType: "worldwide",
    matchScore: 96,
    postedAt: "2026-10-22T00:48:00.000Z",
    collectedAt: "2026-10-22T01:05:00.000Z"
  },
  {
    id: "demo-contra-marketing-site",
    source: "contra",
    sourceProjectId: "demo-002",
    sourceUrl: "https://contra.com/",
    title: "Premium marketing website for an AI product",
    description:
      "The client is looking for a developer who can turn a visual direction into a fast, high-end marketing site with refined motion, responsive layouts, and strong attention to typography.",
    skills: ["Next.js", "GSAP", "Responsive Design", "Vercel"],
    paymentType: "fixed",
    budgetMinimum: 2000,
    budgetMaximum: 3500,
    currency: "USD",
    estimatedDuration: "3–4 weeks",
    deadline: "2026-11-20T00:00:00.000Z",
    experienceLevel: "expert",
    remoteType: "worldwide",
    matchScore: 92,
    postedAt: "2026-10-21T20:15:00.000Z",
    collectedAt: "2026-10-21T20:29:00.000Z"
  },
  {
    id: "demo-freelancer-booking-platform",
    source: "freelancer",
    sourceProjectId: "demo-003",
    sourceUrl: "https://www.freelancer.com/",
    title: "Booking website with admin management flow",
    description:
      "A service business needs a booking experience, customer-facing availability, and a simple admin workflow. Existing brand assets and copy will be provided by the client.",
    skills: ["React", "Node.js", "PostgreSQL", "REST API"],
    paymentType: "fixed",
    budgetMinimum: 900,
    budgetMaximum: 1400,
    currency: "USD",
    estimatedDuration: "3 weeks",
    deadline: null,
    experienceLevel: "intermediate",
    remoteType: "worldwide",
    matchScore: 86,
    postedAt: "2026-10-21T15:40:00.000Z",
    collectedAt: "2026-10-21T15:58:00.000Z"
  },
  {
    id: "demo-peopleperhour-landing-pages",
    source: "peopleperhour",
    sourceProjectId: "demo-004",
    sourceUrl: "https://www.peopleperhour.com/",
    title: "Developer for a set of conversion-focused landing pages",
    description:
      "The engagement covers five responsive landing pages using an established design system. Performance, reusable sections, clean analytics hooks, and handoff documentation are important.",
    skills: ["Next.js", "CSS", "Analytics", "Performance"],
    paymentType: "hourly",
    budgetMinimum: 35,
    budgetMaximum: 50,
    currency: "USD",
    estimatedDuration: "20–30 hours",
    deadline: null,
    experienceLevel: "intermediate",
    remoteType: "regional",
    matchScore: 81,
    postedAt: "2026-10-21T10:20:00.000Z",
    collectedAt: "2026-10-21T10:37:00.000Z"
  },
  {
    id: "demo-upwork-commerce-refresh",
    source: "upwork",
    sourceProjectId: "demo-005",
    sourceUrl: "https://www.upwork.com/",
    title: "Frontend refresh for an existing commerce site",
    description:
      "The project focuses on rebuilding key storefront pages, improving mobile responsiveness, and cleaning up inconsistent component patterns while preserving the existing backend integration.",
    skills: ["React", "TypeScript", "E-commerce", "Accessibility"],
    paymentType: "hourly",
    budgetMinimum: 28,
    budgetMaximum: 45,
    currency: "USD",
    estimatedDuration: "1–2 months",
    deadline: null,
    experienceLevel: "intermediate",
    remoteType: "worldwide",
    matchScore: 78,
    postedAt: "2026-10-20T23:00:00.000Z",
    collectedAt: "2026-10-20T23:21:00.000Z"
  },
  {
    id: "demo-contra-portfolio",
    source: "contra",
    sourceProjectId: "demo-006",
    sourceUrl: "https://contra.com/",
    title: "Editorial portfolio site for a creative studio",
    description:
      "A small studio needs a minimal portfolio with strong typography, project case studies, subtle transitions, and a content structure that can later connect to a headless CMS.",
    skills: ["Next.js", "Animation", "CMS", "Typography"],
    paymentType: "fixed",
    budgetMinimum: 700,
    budgetMaximum: 1100,
    currency: "USD",
    estimatedDuration: "10–14 days",
    deadline: "2026-11-08T00:00:00.000Z",
    experienceLevel: "intermediate",
    remoteType: "worldwide",
    matchScore: 74,
    postedAt: "2026-10-20T16:30:00.000Z",
    collectedAt: "2026-10-20T16:42:00.000Z"
  }
];

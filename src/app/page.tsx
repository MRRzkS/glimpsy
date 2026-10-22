import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { mockOpportunities } from "@/features/opportunities/data/mock-opportunities";
import {
  formatOpportunityBudget,
  getPlatformLabel,
} from "@/features/opportunities/lib/opportunity-formatters";

const previewOpportunities = mockOpportunities.slice(0, 3);

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="landing-hero">
        <div className="page-shell landing-hero__layout">
          <div className="landing-hero__copy">
            <div className="announcement-pill">
              <span className="announcement-pill__dot" aria-hidden="true" />
              One focused feed for freelance developers
            </div>

            <h1>
              Your next project,
              <span>minus the platform hopping.</span>
            </h1>

            <p className="landing-hero__lead">
              Glimpsy brings freelance web projects into one calm workspace,
              then makes the details that matter—request, budget, timeline,
              stack, and fit—easy to compare.
            </p>

            <div className="landing-hero__actions">
              <Link className="button button--primary" href="/opportunities">
                Explore opportunities <span aria-hidden="true">→</span>
              </Link>
              <a className="button button--ghost" href="#product">
                See how it works
              </a>
            </div>

            <p className="landing-hero__note">
              Product preview uses representative demo opportunities.
            </p>
          </div>

          <div className="product-preview" aria-label="Glimpsy product preview">
            <div className="product-preview__chrome">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>Discover</span>
              <span className="preview-status">Demo feed</span>
            </div>

            <div className="product-preview__toolbar">
              <div className="preview-search">Search projects, skills, stack…</div>
              <div className="preview-filter">Best fit ↓</div>
            </div>

            <div className="preview-list">
              {previewOpportunities.map((opportunity) => (
                <article className="preview-opportunity" key={opportunity.id}>
                  <div className="preview-opportunity__topline">
                    <span>{getPlatformLabel(opportunity.source)}</span>
                    <span>{opportunity.matchScore}% fit</span>
                  </div>
                  <h2>{opportunity.title}</h2>
                  <div className="preview-opportunity__meta">
                    <span>{formatOpportunityBudget(opportunity)}</span>
                    <span>{opportunity.estimatedDuration}</span>
                    <span>{opportunity.skills.slice(0, 2).join(" · ")}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="page-shell source-strip" aria-label="Planned source adapters">
          <span className="source-strip__label">Designed to normalize</span>
          <span>Upwork</span>
          <span>Contra</span>
          <span>Freelancer</span>
          <span>PeoplePerHour</span>
          <span className="source-strip__more">+ more sources</span>
        </div>
      </section>

      <section className="product-section" id="product">
        <div className="page-shell">
          <div className="section-heading">
            <p className="eyebrow">Built for fast decisions</p>
            <h2>Less browsing. Better project selection.</h2>
            <p>
              Marketplace interfaces optimize for their own inventory. Glimpsy
              is designed around the freelancer deciding what deserves an
              application.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card feature-card--wide">
              <div className="feature-index">01</div>
              <div>
                <h3>One normalized opportunity model</h3>
                <p>
                  Every source becomes the same readable structure: project
                  request, budget, engagement type, timeline, experience level,
                  remote scope, and required skills.
                </p>
              </div>
              <div className="normalization-visual" aria-hidden="true">
                <div>
                  <span>UP</span>
                  <span>CO</span>
                  <span>FR</span>
                </div>
                <span className="normalization-line" />
                <strong>GLIMPSY</strong>
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-index">02</div>
              <h3>Scan the commercial details first</h3>
              <p>
                Budget and timeline stay visible instead of being buried below
                descriptions and marketplace chrome.
              </p>
              <div className="mini-metric-row" aria-hidden="true">
                <span>$1.2k–$1.8k</span>
                <span>2–3 weeks</span>
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-index">03</div>
              <h3>Rank work around your stack</h3>
              <p>
                The architecture already supports a fit score so matching can
                become smarter without changing how opportunities are rendered.
              </p>
              <div className="fit-visual" aria-hidden="true">
                <span>96</span>
                <div>
                  <strong>Strong fit</strong>
                  <small>Next.js · TypeScript · Figma</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="workflow-section" id="workflow">
        <div className="page-shell workflow-layout">
          <div className="section-heading section-heading--sticky">
            <p className="eyebrow">The workflow</p>
            <h2>From scattered listings to one decision queue.</h2>
            <p>
              Platform-specific complexity stays behind adapters. The rest of
              the product only sees clean, predictable opportunity data.
            </p>
          </div>

          <ol className="workflow-list">
            <li>
              <span>01</span>
              <div>
                <h3>Collect</h3>
                <p>Pull available projects from supported freelance sources.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Normalize</h3>
                <p>
                  Translate different marketplace payloads into one stable
                  Glimpsy opportunity contract.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Prioritize</h3>
                <p>
                  Search, filter, deduplicate, and eventually rank opportunities
                  against your preferred stack and project profile.
                </p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Act</h3>
                <p>
                  Review the original source only after an opportunity earns
                  your attention.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="closing-section">
        <div className="page-shell closing-card">
          <p className="eyebrow">Start with signal</p>
          <h2>Stop using five tabs to find one good project.</h2>
          <p>
            The first Glimpsy workspace is ready to explore with representative
            opportunities while live-source infrastructure is built next.
          </p>
          <Link className="button button--light" href="/opportunities">
            Open the workspace <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell site-footer__inner">
          <Link className="brand brand--footer" href="/">
            <span className="brand-mark" aria-hidden="true">
              G
            </span>
            <span>Glimpsy</span>
          </Link>
          <p>Opportunity intelligence for freelance web developers.</p>
          <span>Built carefully, one useful signal at a time.</span>
        </div>
      </footer>
    </main>
  );
}

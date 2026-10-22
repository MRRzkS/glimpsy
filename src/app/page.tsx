import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { mockOpportunities } from "@/features/opportunities/data/mock-opportunities";
import {
  formatOpportunityBudget,
  getPlatformLabel,
} from "@/features/opportunities/lib/opportunity-formatters";

const previewOpportunities = mockOpportunities.slice(0, 3);
const sourceNames = ["Upwork", "Contra", "Freelancer", "PeoplePerHour"];

export default function HomePage() {
  return (
    <main className="marketing-page">
      <SiteHeader />

      <section className="hero-section">
        <div className="hero-section__grid" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--left" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--right" aria-hidden="true" />

        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="live-dot" aria-hidden="true" />
              Opportunity intelligence for independent developers
            </div>

            <h1 className="hero-title">
              Good projects should not be buried in
              <span>five different tabs.</span>
            </h1>

            <p className="hero-lead">
              Glimpsy turns scattered freelance listings into one prioritized
              signal feed—so you can compare the request, budget, timeline,
              stack, and fit before deciding where to spend your time.
            </p>

            <div className="hero-actions">
              <Link className="button button--accent" href="/opportunities">
                Explore live workspace
                <span aria-hidden="true">↗</span>
              </Link>
              <a className="button button--glass" href="#product">
                See the system
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-proof" aria-label="Product highlights">
              <div>
                <strong>04</strong>
                <span>sources normalized</span>
              </div>
              <div>
                <strong>01</strong>
                <span>decision queue</span>
              </div>
              <div>
                <strong>&lt;60s</strong>
                <span>to triage a project</span>
              </div>
            </div>
          </div>

          <div className="hero-product" aria-label="Glimpsy opportunity interface preview">
            <div className="hero-product__topbar">
              <div className="hero-product__brand">
                <span className="hero-product__mark" aria-hidden="true">G</span>
                <span>Opportunity feed</span>
              </div>
              <div className="hero-product__live">
                <span className="live-dot" aria-hidden="true" />
                Synced now
              </div>
            </div>

            <div className="hero-product__body">
              <aside className="signal-sidebar" aria-hidden="true">
                <div className="signal-sidebar__active">⌁</div>
                <div>◇</div>
                <div>◎</div>
                <div>↗</div>
              </aside>

              <div className="signal-main">
                <div className="signal-toolbar">
                  <div className="signal-search">⌕ Search opportunity or stack</div>
                  <div className="signal-sort">Best fit ↓</div>
                </div>

                <div className="signal-list">
                  {previewOpportunities.map((opportunity, index) => (
                    <article
                      className="signal-row"
                      data-featured={index === 0}
                      key={opportunity.id}
                    >
                      <div className="signal-row__main">
                        <div className="signal-row__meta">
                          <span>{getPlatformLabel(opportunity.source)}</span>
                          <span>•</span>
                          <span>{opportunity.estimatedDuration}</span>
                        </div>
                        <h2>{opportunity.title}</h2>
                        <div className="signal-row__skills">
                          {opportunity.skills.slice(0, 3).map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="signal-row__commercial">
                        <strong>{formatOpportunityBudget(opportunity)}</strong>
                        <span>Budget</span>
                      </div>

                      <div className="signal-score">
                        <strong>{opportunity.matchScore}</strong>
                        <span>fit</span>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="hero-product__footer">
                  <span>3 high-signal projects surfaced</span>
                  <span>Demo intelligence layer</span>
                </div>
              </div>
            </div>

            <div className="floating-insight floating-insight--top" aria-hidden="true">
              <span>Strong match</span>
              <strong>96%</strong>
            </div>
            <div className="floating-insight floating-insight--bottom" aria-hidden="true">
              <span>Budget clarity</span>
              <strong>Visible first</strong>
            </div>
          </div>
        </div>

        <div className="source-marquee" aria-label="Supported opportunity sources">
          <div className="source-marquee__track">
            {[...sourceNames, ...sourceNames].map((sourceName, index) => (
              <span key={`${sourceName}-${index}`}>
                {sourceName}
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="product-story" id="product">
        <div className="page-shell">
          <div className="section-intro section-intro--split">
            <p className="section-label">01 / Product system</p>
            <div>
              <h2>Built for the decision before the application.</h2>
              <p>
                Marketplaces are optimized to keep you browsing. Glimpsy is
                optimized to help you decide what deserves your attention.
              </p>
            </div>
          </div>

          <div className="product-bento">
            <article className="bento-card bento-card--feed">
              <div className="bento-card__copy">
                <span className="bento-card__index">01</span>
                <div>
                  <h3>Signal-first feed</h3>
                  <p>
                    Commercial context is visible before long descriptions:
                    fit, budget, timeline, stack, and source.
                  </p>
                </div>
              </div>

              <div className="feed-visual" aria-hidden="true">
                <div className="feed-visual__bar">
                  <span>Best opportunities</span>
                  <span>Today</span>
                </div>
                <div className="feed-visual__row feed-visual__row--active">
                  <span className="feed-visual__score">96</span>
                  <div>
                    <strong>Next.js SaaS dashboard</strong>
                    <small>Upwork · 2–3 weeks</small>
                  </div>
                  <b>$1.8k</b>
                </div>
                <div className="feed-visual__row">
                  <span className="feed-visual__score">91</span>
                  <div>
                    <strong>Premium marketing site</strong>
                    <small>Contra · 1–2 weeks</small>
                  </div>
                  <b>$1.2k</b>
                </div>
                <div className="feed-visual__row">
                  <span className="feed-visual__score">87</span>
                  <div>
                    <strong>Frontend product sprint</strong>
                    <small>Freelancer · 3 weeks</small>
                  </div>
                  <b>$900</b>
                </div>
              </div>
            </article>

            <article className="bento-card bento-card--matching">
              <div className="bento-card__copy">
                <span className="bento-card__index">02</span>
                <div>
                  <h3>Fit is a signal, not decoration.</h3>
                  <p>
                    Match scoring is designed around your stack and preferred
                    project profile, not platform popularity.
                  </p>
                </div>
              </div>

              <div className="match-orbit" aria-hidden="true">
                <div className="match-orbit__ring match-orbit__ring--outer" />
                <div className="match-orbit__ring match-orbit__ring--inner" />
                <div className="match-orbit__center">
                  <strong>96</strong>
                  <span>Strong fit</span>
                </div>
                <span className="match-orbit__skill match-orbit__skill--one">Next.js</span>
                <span className="match-orbit__skill match-orbit__skill--two">TypeScript</span>
                <span className="match-orbit__skill match-orbit__skill--three">Figma</span>
              </div>
            </article>

            <article className="bento-card bento-card--normalization">
              <div className="bento-card__copy">
                <span className="bento-card__index">03</span>
                <div>
                  <h3>Different platforms. One language.</h3>
                  <p>
                    Source-specific payloads are normalized before they reach
                    the interface, keeping every opportunity consistent.
                  </p>
                </div>
              </div>

              <div className="normalization-map" aria-hidden="true">
                <div className="normalization-map__sources">
                  <span>UP</span>
                  <span>CO</span>
                  <span>FR</span>
                  <span>PH</span>
                </div>
                <div className="normalization-map__lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="normalization-map__core">
                  <span>G</span>
                  <small>Normalized opportunity</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="workflow-section" id="workflow">
        <div className="page-shell">
          <div className="section-intro section-intro--split">
            <p className="section-label">02 / Workflow</p>
            <div>
              <h2>Four quiet steps between noise and action.</h2>
              <p>
                The system removes platform inconsistency before it reaches
                your decision-making flow.
              </p>
            </div>
          </div>

          <ol className="workflow-track">
            <li>
              <span className="workflow-track__number">01</span>
              <div className="workflow-track__icon" aria-hidden="true">⌁</div>
              <h3>Collect</h3>
              <p>Bring available project signals into one ingestion layer.</p>
            </li>
            <li>
              <span className="workflow-track__number">02</span>
              <div className="workflow-track__icon" aria-hidden="true">◇</div>
              <h3>Normalize</h3>
              <p>Translate every source into one stable opportunity contract.</p>
            </li>
            <li>
              <span className="workflow-track__number">03</span>
              <div className="workflow-track__icon" aria-hidden="true">◎</div>
              <h3>Prioritize</h3>
              <p>Surface the strongest fit instead of the loudest listing.</p>
            </li>
            <li>
              <span className="workflow-track__number">04</span>
              <div className="workflow-track__icon" aria-hidden="true">↗</div>
              <h3>Act</h3>
              <p>Open the original source only after the project earns it.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="closing-section">
        <div className="page-shell closing-panel">
          <div className="closing-panel__glow" aria-hidden="true" />
          <p className="section-label">Your next good project is already out there.</p>
          <h2>Spend less time searching. Spend more time choosing well.</h2>
          <div className="closing-panel__footer">
            <p>
              Start with the current demo workspace while the live-source layer
              is being connected.
            </p>
            <Link className="button button--light" href="/opportunities">
              Open Glimpsy
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell site-footer__inner">
          <Link className="brand brand--footer" href="/">
            <span className="brand-mark" aria-hidden="true">G</span>
            <span>Glimpsy</span>
          </Link>
          <p>Opportunity intelligence for independent web developers.</p>
          <span>Demo product · 2026</span>
        </div>
      </footer>
    </main>
  );
}

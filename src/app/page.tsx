import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { mockOpportunities } from "@/features/opportunities/data/mock-opportunities";
import {
  formatOpportunityBudget,
  getPlatformLabel,
} from "@/features/opportunities/lib/opportunity-formatters";

const previewOpportunities = mockOpportunities.slice(0, 4);
const sourceNames = ["Upwork", "Contra", "Freelancer", "PeoplePerHour"];

export default function HomePage() {
  return (
    <main className="marketing-page">
      <SiteHeader />

      <section className="signal-hero">
        <div className="signal-hero__index" aria-hidden="true">01</div>
        <div className="signal-hero__copy">
          <span className="mono-label mono-label--dark">Opportunity intelligence for independent developers</span>
          <h1>
            Turn marketplace
            <span>noise into your next project.</span>
          </h1>
          <p>
            Glimpsy normalizes scattered freelance briefs into one ranked decision surface—so budget,
            timeline, stack, and fit are clear before you spend attention.
          </p>
          <div className="hero-actions">
            <Link className="solid-action solid-action--large" href="/opportunities">
              Enter decision feed <span aria-hidden="true">↗</span>
            </Link>
            <a className="text-link text-link--dark" href="#method">
              See the method <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="signal-stage" aria-label="Glimpsy ranked opportunity preview">
          <div className="signal-stage__noise" aria-hidden="true">
            {sourceNames.map((sourceName) => <span key={sourceName}>{sourceName} / new brief / budget / remote / frontend</span>)}
          </div>
          <div className="signal-stage__scan" aria-hidden="true" />
          <div className="signal-stage__header">
            <span>Live signal extraction</span>
            <span>Ranked / demo</span>
          </div>
          <div className="signal-stage__rows">
            {previewOpportunities.map((opportunity, index) => (
              <article className="hero-signal-row" data-primary={index === 0} key={opportunity.id}>
                <span className="hero-signal-row__rank">0{index + 1}</span>
                <div>
                  <small>{getPlatformLabel(opportunity.source)}</small>
                  <strong>{opportunity.title}</strong>
                  <span>{opportunity.skills.slice(0, 3).join(" · ")}</span>
                </div>
                <div className="hero-signal-row__value">
                  <strong>{opportunity.matchScore}</strong>
                  <span>{formatOpportunityBudget(opportunity)}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="signal-stage__legend">
            <span><i className="legend-dot legend-dot--accent" /> High fit</span>
            <span><i className="legend-dot" /> Normalized source</span>
          </div>
        </div>

        <div className="signal-hero__footnote">
          <span>04 sources</span>
          <span>01 normalized model</span>
          <span>Built for triage, not browsing</span>
        </div>
      </section>

      <section className="method-section" id="method">
        <header className="section-heading section-heading--wide">
          <span className="mono-label">Method / 02</span>
          <h2>One decision surface between you and four noisy marketplaces.</h2>
        </header>

        <div className="method-grid">
          <ol className="method-steps">
            <li>
              <span>01</span>
              <div><strong>Collect</strong><p>Bring project signals into one ingestion layer.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><strong>Normalize</strong><p>Translate platform-specific fields into one stable contract.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><strong>Rank</strong><p>Put commercial value and stack relevance ahead of feed chronology.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><strong>Act</strong><p>Open the source only after a project earns your attention.</p></div>
            </li>
          </ol>

          <div className="normalization-board" aria-label="Example of Glimpsy normalization">
            <div className="normalization-board__raw">
              <span className="mono-label">Incoming fragments</span>
              <p>“expert React dev”</p>
              <p>“$2k–$3.5k fixed”</p>
              <p>“3–4 weeks”</p>
              <p>“Next.js / GSAP / Vercel”</p>
              <p>“remote worldwide”</p>
            </div>
            <div className="normalization-board__axis" aria-hidden="true">
              <span>normalize</span>
              <i />
            </div>
            <div className="normalization-board__output">
              <span className="mono-label">Decision record</span>
              <strong>92 / strong fit</strong>
              <dl>
                <div><dt>Budget</dt><dd>$2,000–$3,500</dd></div>
                <div><dt>Timeline</dt><dd>3–4 weeks</dd></div>
                <div><dt>Stack</dt><dd>Next.js + GSAP</dd></div>
                <div><dt>Source</dt><dd>Contra</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="signals-section" id="signals">
        <header className="section-heading">
          <span className="mono-label">Signals / 03</span>
          <h2>Read the commercial reality before the long brief.</h2>
          <p>Every visual priority mirrors the decision freelancers actually make.</p>
        </header>

        <div className="signal-principles">
          <article>
            <span>01</span>
            <h3>Budget first.</h3>
            <p>Fixed or hourly value is surfaced before a paragraph of client context.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Fit with reasons.</h3>
            <p>The score sits beside the stack and delivery shape it is meant to summarize.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Timeline stays visible.</h3>
            <p>Duration and explicit deadlines remain separate so urgency is never invented.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Source stays traceable.</h3>
            <p>Normalization removes inconsistency, not provenance. The original listing is always one action away.</p>
          </article>
        </div>
      </section>

      <section className="workspace-preview-section">
        <div className="workspace-preview-section__copy">
          <span className="mono-label mono-label--light">Workspace / 04</span>
          <h2>A queue designed to end browsing.</h2>
          <p>
            Search, filter, shortlist, inspect full project details, and jump to the original source without losing context.
          </p>
          <Link className="solid-action solid-action--light" href="/opportunities">
            Open workspace <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="workspace-preview" aria-hidden="true">
          <div className="workspace-preview__bar">
            <span>Discover</span>
            <span>6 opportunities</span>
          </div>
          {previewOpportunities.slice(0, 3).map((opportunity, index) => (
            <div className="workspace-preview__row" key={opportunity.id}>
              <span>0{index + 1}</span>
              <div><strong>{opportunity.title}</strong><small>{opportunity.skills.slice(0, 2).join(" · ")}</small></div>
              <strong>{opportunity.matchScore}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className="marketing-footer">
        <div>
          <span className="wordmark wordmark--footer"><span className="wordmark__glyph">G</span>Glimpsy</span>
          <p>Opportunity intelligence for independent web developers.</p>
        </div>
        <Link className="text-link text-link--dark" href="/opportunities">Enter feed <span aria-hidden="true">↗</span></Link>
        <span className="mono-label">Demo product / 2026</span>
      </footer>
    </main>
  );
}

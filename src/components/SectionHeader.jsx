import Reveal from './Reveal';

/**
 * Shared header used by every section layout (Carousel, GridSection, FeaturedShowcase).
 * Keeping this in one place means adding a new section type automatically gets
 * consistent typography, spacing, and scroll-reveal behavior.
 */
export default function SectionHeader({ eyebrow, title, subtitle, action, index }) {
  return (
    <div className="section-header-row">
      {index != null && (
        <div className="section-fade-number" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </div>
      )}
      <Reveal direction="left">
        {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </Reveal>
      {action && <Reveal direction="right">{action}</Reveal>}
    </div>
  );
}

import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L3 3l.24 6.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.82Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

const ICONS = {
  target: TargetIcon,
  bolt: BoltIcon,
  layers: LayersIcon,
  tag: TagIcon,
};

export default function WhyChooseMeSection({ whyChooseMe, index }) {
  if (!whyChooseMe) return null;

  return (
    <section className="section" id="why-me">
      <div className="container">
        <SectionHeader
          eyebrow={whyChooseMe.eyebrow}
          title={whyChooseMe.title}
          subtitle={whyChooseMe.subtitle}
          index={index}
        />

        <div className="why-grid">
          {whyChooseMe.items.map((item, i) => {
            const Icon = ICONS[item.icon] || TargetIcon;
            return (
              <Reveal key={item.title} delay={(i % 4) * 90} className="why-card">
                <div className="why-card-icon">
                  <Icon />
                </div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

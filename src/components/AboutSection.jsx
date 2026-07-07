import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

function StrategyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function EditingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="13" height="14" rx="1" />
      <path d="M16 9l5-3v12l-5-3" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

const ICONS = {
  strategy: StrategyIcon,
  editing: EditingIcon,
  speed: SpeedIcon,
};

export default function AboutSection({ about, index }) {
  if (!about) return null;

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <SectionHeader
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.subtitle}
          index={index}
        />

        <div className="about-grid">
          <Reveal direction="left" className="about-col-intro">
            <h3>{about.heading}</h3>
            <p>{about.intro}</p>
          </Reveal>

          <Reveal delay={120} className="about-col-specialization">
            <h4>{about.specializationHeading}</h4>
            {about.specializations.map(item => {
              const Icon = ICONS[item.icon] || StrategyIcon;
              return (
                <div className="about-specialization-item" key={item.title}>
                  <div className="about-specialization-icon">
                    <Icon />
                  </div>
                  <div className="about-specialization-text">
                    <h5>{item.title}</h5>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={220} direction="right" className="about-col-image">
            <img src={about.image} alt={about.title} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

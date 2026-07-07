import MediaCard from './MediaCard';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

export default function GridSection({ section, onPlay, index }) {
  return (
    <section className="section" id={section.id}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          index={index}
        />

        <div className="grid-section">
          {section.items.map((video, i) => (
            <Reveal key={video.id} delay={(i % 3) * 100} direction="up">
              <MediaCard video={video} onPlay={onPlay} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

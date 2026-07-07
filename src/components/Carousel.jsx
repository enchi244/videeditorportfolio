import { useRef } from 'react';
import MediaCard from './MediaCard';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

function ArrowIcon({ dir = 'right' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Carousel({ section, onPlay, index }) {
  const scrollRef = useRef(null);

  const scrollByAmount = (dir) => {
    const node = scrollRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.8, 600) * (dir === 'left' ? -1 : 1);
    node.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="section" id={section.id}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          index={index}
          action={
            <div className="carousel-controls">
              <button className="text-nav-btn" onClick={() => scrollByAmount('left')} aria-label="Scroll left">
                <ArrowIcon dir="left" /> Prev
              </button>
              <button className="text-nav-btn" onClick={() => scrollByAmount('right')} aria-label="Scroll right">
                Next <ArrowIcon dir="right" />
              </button>
            </div>
          }
        />

        <div className="carousel-scroll" ref={scrollRef}>
          {section.items.map((video, i) => (
            <Reveal key={video.id} delay={i * 90} style={{ scrollSnapAlign: 'start' }}>
              <MediaCard video={video} onPlay={onPlay} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

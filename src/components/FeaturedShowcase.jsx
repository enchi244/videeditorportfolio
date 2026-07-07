import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a1409" style={{ marginLeft: '2px' }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Inner content only - the outer .featured-media element lives on <Reveal> itself
 *  so CSS grid `order` (used to alternate left/right) applies correctly, since
 *  `order` only works on direct grid children. */
function FeaturedMediaContent({ item }) {
  if (item.variant === 'placeholder') {
    return (
      <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.placeholderLabel || 'Sample slot - swap in your reel'}
      </span>
    );
  }
  return (
    <>
      <img src={item.thumbnailUrl} alt={item.brand} />
      <div className="featured-media-scrim">
        <div className="media-card-play">
          <PlayIcon />
        </div>
      </div>
    </>
  );
}

export default function FeaturedShowcase({ section, onPlay, index }) {
  return (
    <section className="section" id={section.id}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          index={index}
        />

        <div>
          {section.items.map((item, i) => {
            const isReversed = i % 2 === 1;
            const isPlaceholder = item.variant === 'placeholder';
            const isTikTok = item.variant === 'tiktok';

            const handleClick = () => {
              if (isPlaceholder) return;
              if (isTikTok && item.tiktokUrl) {
                window.open(item.tiktokUrl, '_blank', 'noopener,noreferrer');
              } else if (item.youtubeId) {
                onPlay(item);
              }
            };

            return (
              <div key={item.id} className={`featured-block ${isReversed ? 'reverse' : ''}`}>
                <Reveal
                  as="div"
                  className="featured-media"
                  direction={isReversed ? 'right' : 'left'}
                  onClick={handleClick}
                  style={isPlaceholder ? { cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}
                >
                  <FeaturedMediaContent item={item} />
                </Reveal>

                <Reveal as="div" className="featured-text" direction={isReversed ? 'left' : 'right'} delay={100}>
                  <div className="featured-index">{String(i + 1).padStart(2, '0')}</div>
                  {item.tag && <div className="featured-tag">{item.tag}</div>}
                  <h3>{item.brand}</h3>
                  <p>{item.description}</p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

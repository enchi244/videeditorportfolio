import { useEffect, useState } from 'react';
import MediaCard from './MediaCard';

function ArrowIcon({ dir = 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TikTokGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

/** Main-stage view for a TikTok item - fetches its own oEmbed thumbnail. */
function TikTokStage({ item }) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    if (!item.tiktokUrl) return;
    let cancelled = false;
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(item.tiktokUrl)}`)
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => { if (!cancelled) setMeta(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [item.tiktokUrl]);

  return (
    <div className="category-modal-tiktok-card">
      {(meta?.thumbnail_url || item.thumbnailUrl) && (
        <img src={meta?.thumbnail_url || item.thumbnailUrl} alt={item.brand} />
      )}
      <a
        className="btn-primary"
        href={item.tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.55em' }}
      >
        <TikTokGlyph /> Watch on TikTok
      </a>
    </div>
  );
}

export default function CategoryModal({ section, activeIndex, onClose, onSelectIndex, onPrev, onNext }) {
  useEffect(() => {
    if (!section) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [section, onClose, onPrev, onNext]);

  if (!section) return null;

  const item = section.items[activeIndex];
  const total = section.items.length;

  return (
    <div className="category-modal">
      <div className="category-modal-header">
        <h3 className="category-modal-title">{section.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span className="category-modal-counter">
            <span className="current">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </span>
          <button className="modal-close" onClick={onClose} aria-label="Close gallery" style={{ position: 'static' }}>
            &times;
          </button>
        </div>
      </div>

      <div className="category-modal-stage">
        {total > 1 && (
          <button className="icon-btn category-modal-arrow prev" onClick={onPrev} aria-label="Previous video">
            <ArrowIcon dir="left" />
          </button>
        )}

        <div className="category-modal-stage-inner">
          <div className="category-modal-media">
            {item.variant === 'tiktok' ? (
              <TikTokStage item={item} />
            ) : item.variant === 'placeholder' ? (
              <div className="category-modal-placeholder">
                <p>{item.placeholderLabel || 'Reserved slot - no content here yet.'}</p>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&controls=1`}
                title={item.brand}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {total > 1 && (
          <button className="icon-btn category-modal-arrow next" onClick={onNext} aria-label="Next video">
            <ArrowIcon dir="right" />
          </button>
        )}
      </div>

      <div className="category-modal-info">
        <h3>{item.brand}</h3>
        <p>{item.description}</p>
      </div>

      {total > 1 && (
        <div className="category-modal-filmstrip">
          {section.items.map((thumbItem, i) => (
            <div key={thumbItem.id} className={`category-modal-thumb-wrap ${i === activeIndex ? 'active' : ''}`}>
              <MediaCard video={thumbItem} compact onSelect={() => onSelectIndex(i)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

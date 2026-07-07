import { useEffect, useState } from 'react';

function ExpandIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1409" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" />
    </svg>
  );
}

/**
 * One tile in the project filmstrip. Resolves its own cover image:
 *  - a static `section.coverImage` if the data provides one
 *  - otherwise a live TikTok oEmbed thumbnail fetched from the first real item
 *  - otherwise (no real content yet) a gold "coming soon" gradient
 */
export default function CategoryTile({ section, onOpen }) {
  const firstReal = section.items.find(item => item.variant !== 'placeholder');
  const hasContent = Boolean(firstReal);
  const needsFetch = !section.coverImage && firstReal?.variant === 'tiktok';

  const [bgUrl, setBgUrl] = useState(section.coverImage || null);
  const [loading, setLoading] = useState(needsFetch);

  useEffect(() => {
    if (!needsFetch) return;
    let cancelled = false;
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(firstReal.tiktokUrl)}`)
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        if (!cancelled && data.thumbnail_url) setBgUrl(data.thumbnail_url);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPlaceholder = !hasContent;
  const itemCount = section.items.length;

  return (
    <button
      className={`category-tile ${isPlaceholder ? 'category-tile--placeholder' : ''}`}
      onClick={() => onOpen(section.id)}
      aria-label={`View ${section.title}`}
    >
      {bgUrl && (
        <div
          className="category-tile-cover"
          style={{ backgroundImage: `url(${bgUrl})`, opacity: loading ? 0 : 1 }}
        />
      )}
      {loading && (
        <div
          className="category-tile-cover"
          style={{
            background: 'linear-gradient(90deg, #1a1716 25%, #221d1c 50%, #1a1716 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      {!bgUrl && !loading && !isPlaceholder && <div className="category-tile-cover" />}

      <div className="category-tile-scrim" />
      <div className="category-tile-zoom">
        <ExpandIcon />
      </div>
      <div className="category-tile-edge-label">{section.navLabel || section.title}</div>

      <div className="category-tile-content">
        <div>
          <div className="category-tile-title">{section.title}</div>
          <div className="category-tile-count">
            {itemCount} {itemCount === 1 ? 'Video' : 'Videos'}
          </div>
        </div>
      </div>
    </button>
  );
}

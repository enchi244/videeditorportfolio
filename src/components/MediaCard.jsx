import { useState, useEffect } from 'react';

/* ---------------------------------------------------------------------- */
/* Inline icons - kept local so this component has zero extra deps        */
/* ---------------------------------------------------------------------- */
function PlayIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1a1409" style={{ marginLeft: '2px' }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function TikTokIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

function MicIcon({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function HomeIcon({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

function SparkleIcon({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

const PLACEHOLDER_ICONS = {
  mic: MicIcon,
  home: HomeIcon,
  sparkle: SparkleIcon,
};

/* ---------------------------------------------------------------------- */
/* MediaCard                                                              */
/* ---------------------------------------------------------------------- */
export default function MediaCard({ video, onPlay, compact = false, onSelect }) {
  const variant = video.variant || 'youtube';
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'placeholder') {
    return <PlaceholderCard video={video} isHovered={isHovered} setIsHovered={setIsHovered} compact={compact} onSelect={onSelect} />;
  }
  if (variant === 'tiktok') {
    return (
      <TikTokVariant
        video={video}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        compact={compact}
        onSelect={onSelect}
      />
    );
  }
  return (
    <YoutubeVariant
      video={video}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      onPlay={onPlay}
      compact={compact}
      onSelect={onSelect}
    />
  );
}

/* --- YouTube-backed card: thumbnail -> silent hover preview -> modal --- */
function YoutubeVariant({ video, isHovered, setIsHovered, onPlay, compact, onSelect }) {
  return (
    <div
      className={`media-card ${compact ? 'media-card--compact' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => (onSelect ? onSelect(video) : onPlay(video))}
    >
      <div className="media-card-thumb">
        <img
          src={video.thumbnailUrl}
          alt={video.brand}
          style={{ position: 'absolute', inset: 0, opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}
        />
        {isHovered && video.youtubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.youtubeId}`}
            title={video.brand}
            style={{ pointerEvents: 'none' }}
            allow="autoplay"
          />
        )}
        <div className="media-card-scrim">
          <div className="media-card-play">
            <PlayIcon />
          </div>
        </div>
        {video.badge && (
          <div className="media-card-badge">{video.badge}</div>
        )}
        <div className="media-card-gradient" />
      </div>
      <CardInfo video={video} isHovered={isHovered} ctaLabel="Watch Full Edit" />
    </div>
  );
}

/* --- TikTok-backed card: oEmbed fetch for live thumbnail + author --- */
function TikTokVariant({ video, isHovered, setIsHovered, compact, onSelect }) {
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!video.tiktokUrl) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(video.tiktokUrl)}`)
      .then(res => {
        if (!res.ok) throw new Error('oEmbed failed');
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        setMeta({
          thumbnail: data.thumbnail_url,
          author: data.author_name,
        });
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [video.tiktokUrl]);

  const handleClick = () => {
    if (onSelect) {
      onSelect(video);
      return;
    }
    if (video.tiktokUrl) window.open(video.tiktokUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`media-card ${compact ? 'media-card--compact' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="media-card-thumb">
        {isLoading && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #1a1716 25%, #221d1c 50%, #1a1716 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        )}
        {(error || (!meta && !isLoading)) && video.thumbnailUrl && (
          <img src={video.thumbnailUrl} alt={video.brand} style={{ position: 'absolute', inset: 0 }} />
        )}
        {meta?.thumbnail && (
          <img
            src={meta.thumbnail}
            alt={meta.author || video.brand}
            style={{ position: 'absolute', inset: 0, transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }}
          />
        )}
        <div className="media-card-scrim">
          <div className="media-card-play">
            <PlayIcon />
          </div>
        </div>
        <div className="media-card-badge">
          <TikTokIcon size={12} color="#fff" />
          {video.badge || 'TikTok'}
        </div>
        <div className="media-card-gradient" />
      </div>
      <CardInfo video={video} isHovered={isHovered} author={meta?.author} ctaLabel="Watch on TikTok" icon={<TikTokIcon size={13} />} />
    </div>
  );
}

/* --- Placeholder card: shown for content types with no live clips yet --- */
function PlaceholderCard({ video, isHovered, setIsHovered, compact, onSelect }) {
  const Icon = PLACEHOLDER_ICONS[video.placeholderIcon] || SparkleIcon;
  return (
    <div
      className={`media-card media-card--placeholder ${compact ? 'media-card--compact' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect ? () => onSelect(video) : undefined}
      style={onSelect ? { cursor: 'pointer' } : undefined}
    >
      <div className="media-card-thumb">
        <Icon size={42} color="var(--gold-light)" />
        <div className="placeholder-label">{video.placeholderLabel || 'Sample slot - swap in your clip'}</div>
      </div>
      <CardInfo video={video} isHovered={isHovered} ctaLabel="Awaiting content" muted />
    </div>
  );
}

/* --- Shared bottom info block --- */
function CardInfo({ video, author, ctaLabel, icon, muted }) {
  return (
    <div className="media-card-info">
      {author && <p className="media-card-author">@{author.replace(/^@/, '')}</p>}
      <h3 className="media-card-title">{video.brand}</h3>
      <p className="media-card-desc">{video.description}</p>
      <div className="media-card-cta" style={muted ? { opacity: 0.5 } : undefined}>
        {icon}
        {ctaLabel}
        {!muted && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}>
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        )}
      </div>
    </div>
  );
}

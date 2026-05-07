import { useState, useEffect } from 'react';

// TikTok logo SVG icon
function TikTokIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

export default function TikTokCard({ video }) {
  const [meta, setMeta] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!video.tiktokUrl) return;

    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(video.tiktokUrl)}`)
      .then(res => {
        if (!res.ok) throw new Error('oEmbed failed');
        return res.json();
      })
      .then(data => {
        setMeta({
          thumbnail: data.thumbnail_url,
          title: data.title,
          author: data.author_name,
          authorUrl: data.author_url,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [video.tiktokUrl]);

  const handleClick = () => {
    if (video.tiktokUrl) window.open(video.tiktokUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        minWidth: '280px',
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: 'var(--bg-dark)',
        border: `1px solid ${isHovered ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.05)'}`,
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thumbnail Area */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', backgroundColor: '#111' }}>

        {/* Loading skeleton */}
        {isLoading && (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }} />
        )}

        {/* Fallback thumbnail from portfolioData if oEmbed fails or before it loads */}
        {(error || (!meta && !isLoading)) && video.thumbnailUrl && (
          <img
            src={video.thumbnailUrl}
            alt={video.brand}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* oEmbed thumbnail */}
        {meta?.thumbnail && (
          <img
            src={meta.thumbnail}
            alt={meta.author}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        )}

        {/* Dark scrim overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Play button */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(255,100,0,0.5)',
            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.3s ease',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '3px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* TikTok badge top-right */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          borderRadius: '6px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.75rem',
          color: '#fff',
          fontWeight: '500',
        }}>
          <TikTokIcon size={13} color="#fff" />
          TikTok
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to top, rgba(22,22,22,0.98), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Info Footer */}
      <div style={{
        padding: '1rem 1.25rem 1.25rem',
        backgroundColor: 'var(--bg-dark)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        {/* Author */}
        {meta?.author && (
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--accent-orange)',
            marginBottom: '0.3rem',
            fontWeight: '600',
            letterSpacing: '0.3px',
          }}>
            @{meta.author.replace(/^@/, '')}
          </p>
        )}

        {/* Brand / Title */}
        <h3 style={{
          fontSize: '1rem',
          color: 'var(--text-main)',
          marginBottom: '0.25rem',
          lineHeight: '1.3',
          fontWeight: '600',
        }}>
          {video.brand}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: '1.4',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {video.description}
        </p>

        {/* Watch on TikTok CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          color: isHovered ? 'var(--accent-orange)' : 'var(--text-muted)',
          transition: 'color 0.2s ease',
          fontWeight: '500',
        }}>
          <TikTokIcon size={14} color={isHovered ? 'var(--accent-orange)' : 'var(--text-muted)'} />
          Watch on TikTok
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}>
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
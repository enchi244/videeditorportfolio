import { useState, useRef } from 'react';

export default function VideoCard({ video, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // 150ms delay prevents flashing if the user just swipes their mouse across
    timeoutRef.current = setTimeout(() => setIsHovered(true), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(video)}
      style={{
        minWidth: '280px', // Standard 9:16 aspect ratio width
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: 'var(--bg-dark)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        borderColor: isHovered ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* 1. Static Image Thumbnail (Loads Instantly) */}
      <img 
        src={video.thumbnailUrl} 
        alt={video.brand} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* 2. Silent Auto-Play Video (Triggers on Hover) */}
      {isHovered && (
        <iframe 
          // Hover preview iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.youtubeId}`}
          title={video.brand}
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none', 
            objectFit: 'cover',
            pointerEvents: 'none' // Prevents the iframe from stealing the click event
          }}
          allow="autoplay"
        ></iframe>
      )}

      {/* 3. Text & Gradient Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '3rem 1.5rem 1.5rem',
        background: 'linear-gradient(to top, rgba(34,34,34, 0.95), transparent)',
        pointerEvents: 'none'
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
          {video.brand}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          {video.description}
        </p>
      </div>
    </div>
  );
}
import { useState } from 'react';
import portfolioData from '../data/portfolioData.json';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const hero = portfolioData.hero;

  return (
    <div style={{ position: 'relative', width: '100%', height: '80vh', paddingTop: '80px', backgroundColor: 'var(--bg-dark)', overflow: 'hidden' }}>
      
      {/* The CSS Gradient that blends the video into the dark background */}
      <div className="hero-gradient-overlay" style={{ zIndex: 10 }}></div>

      {!isPlaying ? (
        /* --- STATE 1: THUMBNAIL (Fast Load) --- */
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            backgroundImage: `url(${hero.thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Custom Play Button using your Orange Accent */}
          <button 
            className="btn-primary"
            onClick={() => setIsPlaying(true)}
            style={{ 
              zIndex: 20, 
              width: '90px', 
              height: '90px', 
              borderRadius: '50%', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '6px' // Visually centers the play triangle
            }}
          >
            {/* Simple SVG Play Icon */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--bg-dark)">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      ) : (
        /* --- STATE 2: ACTIVE VIDEO (Unmuted Autoplay) --- */
        <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 5 }}>
          <iframe 
            src={hero.videoUrl ? `${hero.videoUrl}?autoplay=1&controls=1` : ""}
            title={hero.title}
            style={{ width: '100%', height: '100%', border: 'none', objectFit: 'cover' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      {/* Premium Typography Overlay for Context */}
      <div style={{ 
        position: 'absolute', 
        bottom: '10%', 
        left: '5%', 
        zIndex: 15, 
        maxWidth: '600px' 
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{hero.title}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{hero.description}</p>
      </div>

    </div>
  );
}
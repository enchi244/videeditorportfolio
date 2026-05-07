import { useEffect } from 'react';

export default function VideoModal({ video, onClose }) {
  // Allow users to close the modal by pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // If no video is selected, don't render anything
  if (!video) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(20, 20, 20, 0.95)', // Ultra-dark blur effect
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '3rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '3rem',
          cursor: 'pointer',
          zIndex: 10000,
          transition: 'color 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.color = 'var(--accent-orange)'}
        onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
      >
        &times;
      </button>
      
      {/* Video Container (Restricted to a phone-like aspect ratio for 9:16) */}
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', // Keeps it looking like a phone screen on desktop
        aspectRatio: '9/16', 
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <iframe 
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&controls=1`}
          title={video.brand}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
}
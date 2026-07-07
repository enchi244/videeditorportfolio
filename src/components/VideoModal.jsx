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

  // Most items are vertical shorts (9:16); the hero showreel is landscape,
  // so it can pass aspect: "16/9" to get a wider frame instead.
  const isLandscape = video.aspect === '16/9';

  return (
    <div className="modal-overlay">
      <button className="modal-close" onClick={onClose} aria-label="Close video">
        &times;
      </button>

      <div
        className="modal-frame"
        style={isLandscape ? { maxWidth: '900px', aspectRatio: '16 / 9' } : undefined}
      >
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

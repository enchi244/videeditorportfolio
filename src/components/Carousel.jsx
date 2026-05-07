import VideoCard from './VideoCard';
import TikTokCard from './TikTokCard';

export default function Carousel({ category, onPlay }) {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          {category.title}
        </h2>
        <div
          className="carousel-scroll"
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            scrollSnapType: 'x mandatory'
          }}
        >
          {category.videos.map(video => (
            <div key={video.id} style={{ scrollSnapAlign: 'start' }}>
              {video.tiktokUrl
                ? <TikTokCard video={video} />
                : <VideoCard video={video} onPlay={onPlay} />
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
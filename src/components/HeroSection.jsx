import portfolioData from '../data/portfolioData.json';

function PlayGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ArrowDownGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

// Decorative rows of "clips" that make up the stylized editing timeline.
const TRACK_ROWS = [
  { y: 40, clips: [{ x: 20, w: 110 }, { x: 150, w: 70 }, { x: 240, w: 160 }, { x: 430, w: 90 }, { x: 540, w: 70 }] },
  { y: 108, clips: [{ x: 0, w: 90 }, { x: 110, w: 140 }, { x: 270, w: 60 }, { x: 350, w: 180 }, { x: 560, w: 60 }] },
  { y: 176, clips: [{ x: 30, w: 200 }, { x: 250, w: 50 }, { x: 320, w: 110 }, { x: 460, w: 150 }] },
];

const WAVEFORM_PATH =
  'M0,272 L14,266 L28,278 L42,260 L56,282 L70,268 L84,274 L98,258 L112,284 L126,270 ' +
  'L140,262 L154,280 L168,266 L182,276 L196,260 L210,282 L224,268 L238,272 L252,264 ' +
  'L266,280 L280,266 L294,274 L308,260 L322,284 L336,268 L350,276 L364,262 L378,280 ' +
  'L392,266 L406,272 L420,258 L434,284 L448,268 L462,274 L476,262 L490,280 L504,266 ' +
  'L518,276 L532,260 L546,282 L560,268 L574,272 L588,264 L602,278 L616,266 L630,274 L640,270';

/** Stylized Premiere-Pro-style editing timeline, used as the hero backdrop
 *  until a real screenshot is dropped in - see the note in the data file. */
function TimelineGraphic() {
  return (
    <svg className="hero-timeline-graphic" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="22" x2="640" y2="22" stroke="rgba(255,255,255,0.08)" />
      {Array.from({ length: 17 }).map((_, i) => (
        <line key={i} x1={i * 40} y1="14" x2={i * 40} y2="22" stroke="rgba(255,255,255,0.15)" />
      ))}

      {TRACK_ROWS.map((row) => (
        <g key={row.y}>
          {row.clips.map((clip, i) => (
            <rect
              key={clip.x}
              x={clip.x}
              y={row.y}
              width={clip.w}
              height={52}
              rx={4}
              fill={i % 2 === 0 ? 'rgba(212,175,55,0.20)' : 'rgba(212,175,55,0.11)'}
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}

      <rect x="0" y="244" width="640" height="56" fill="rgba(255,255,255,0.02)" />
      <path d={WAVEFORM_PATH} fill="none" stroke="rgba(244,227,161,0.5)" strokeWidth="1.4" />

      <text x="614" y="12" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" textAnchor="end">
        00:24:16:08
      </text>

      <g className="hero-timeline-playhead">
        <line x1="400" y1="8" x2="400" y2="310" stroke="var(--gold)" strokeWidth="2" />
        <polygon points="391,4 409,4 400,16" fill="var(--gold)" />
      </g>
    </svg>
  );
}

export default function HeroSection({ onWatchReel }) {
  const hero = portfolioData.hero;

  return (
    <div className="hero" id="home">
      <div className="hero-media">
        <div className="hero-timeline-wrap">
          <TimelineGraphic />
        </div>
      </div>

      <div className="hero-portrait-wrap">
        <img src="/assets/antonio-sitting.jpeg" alt="Antonio Miguel Apostol" />
      </div>

      <div className="hero-left-fade" />
      <div className="hero-vignette" />
      <div className="hero-gradient-overlay" />

      <div className="hero-content">
        {hero.eyebrow && <div className="hero-eyebrow">{hero.eyebrow}</div>}
        <h1>{hero.name}</h1>
        <p>{hero.description}</p>

        <div className="hero-actions">
          {hero.reel && (
            <button className="btn-primary" onClick={() => onWatchReel(hero.reel)}>
              <PlayGlyph /> Watch Showreel
            </button>
          )}
          <a href="#work" className="btn-outline">
            View My Work
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <span style={{ display: 'flex' }}><ArrowDownGlyph /></span>
      </div>
    </div>
  );
}

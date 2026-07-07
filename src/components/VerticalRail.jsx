function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

/**
 * Fixed left-edge rail - a rotated label + thin divider + a couple of quick
 * links, echoing the vertical "title block" panel from the Go.arch reference.
 * Hidden below 992px where there isn't room for it.
 */
export default function VerticalRail({ label = 'Video Editor - Portfolio', email = 'antonioiggy13@gmail.com' }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="vertical-rail">
      <div className="vertical-rail-socials">
        <a href={`mailto:${email}`} aria-label="Email">
          <MailIcon />
        </a>
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex' }}
        >
          <ArrowUpIcon />
        </button>
      </div>
      <div className="vertical-rail-line" />
      <div className="vertical-rail-text">{label}</div>
    </div>
  );
}

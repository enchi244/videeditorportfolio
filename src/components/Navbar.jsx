import { useEffect, useState } from 'react';

function MenuIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

/**
 * Navbar - a right-aligned link row (the name/tagline now live in the fixed
 * BrandCorner panel, see App.jsx). Pass `navItems` as the list of page
 * anchors to link to; add/remove one there to update the whole nav.
 */
export default function Navbar({ navItems = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = navItems
      .map(link => document.getElementById(link.id))
      .filter(Boolean);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  // Section counter (e.g. "02 / 04") mirrors the Go.arch reference's slide
  // counter, tracking which page anchor is currently in view.
  const countedLinks = navItems.filter(link => link.id !== 'contact');
  const activeIndex = countedLinks.findIndex(link => link.id === activeId);
  const currentNumber = String(activeIndex === -1 ? 1 : activeIndex + 1).padStart(2, '0');
  const totalNumber = String(countedLinks.length).padStart(2, '0');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {countedLinks.length > 0 && (
          <span className="nav-counter">
            <span className="current">{currentNumber}</span> / {totalNumber}
          </span>
        )}

        <div className="nav-links">
          {navItems.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeId === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">Get In Touch</button>
          </a>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon open={false} />
          </button>
        </div>
      </nav>

      <div
        className={`nav-mobile-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className="nav-mobile-toggle"
          style={{ alignSelf: 'flex-end' }}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <MenuIcon open={true} />
        </button>
        {navItems.map(link => (
          <a key={link.id} href={`#${link.id}`} onClick={handleLinkClick}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

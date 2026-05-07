export default function Navbar() {
  return (
    <nav style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.5rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100 // Keeps it above the hero video
    }}>
      
      {/* Brand / Name */}
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '1.5rem', 
        fontWeight: '700',
        letterSpacing: '0.5px' 
      }}>
        Antonio Miguel Apostol
      </div>

      {/* Contact Button */}
      <a href="mailto:antonioiggy13@gmail.com" style={{ textDecoration: 'none' }}>
        <button className="btn-primary">
          Contact Me
        </button>
      </a>

    </nav>
  );
}
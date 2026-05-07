export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a', // Slightly darker than the main background for contrast
      padding: '4rem 5%',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      marginTop: '2rem'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem'
      }}>
        
        {/* Column 1: Contact & Location */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Antonio Miguel Apostol</h3>
          <p style={{ marginBottom: '0.5rem' }}>Social Media Manager & Video Editor</p>
          <p style={{ marginBottom: '0.5rem' }}>Zamboanga City, Philippines</p>
          <a href="mailto:antonioiggy13@gmail.com" style={{ color: 'var(--accent-orange)', textDecoration: 'none', display: 'block', marginTop: '1rem' }}>
            antonioiggy13@gmail.com
          </a>
          <p style={{ marginTop: '0.5rem' }}>(+63) 915-800-1195</p>
        </div>

        {/* Column 2: Creative & AI Stack */}
        <div>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.1rem' }}>Creative & AI Stack</h4>
          <ul style={{ listStyleType: 'none', padding: 0, color: 'var(--text-muted)', lineHeight: '2' }}>
            <li>CapCut Pro (Desktop)</li>
            <li>ElevenLabs & HeyGen</li>
            <li>Nano Banana Pro & Veo 3</li>
            <li>Metricool / Social Pilot</li>
          </ul>
        </div>

        {/* Column 3: Technical Foundation */}
        <div>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.1rem' }}>Technical Foundation</h4>
          <ul style={{ listStyleType: 'none', padding: 0, color: 'var(--text-muted)', lineHeight: '2' }}>
            <li>React & Vite</li>
            <li>HTML5, CSS3, JavaScript</li>
            <li>PHP & Git Version Control</li>
            <li>Notion & Workspace Management</li>
          </ul>
        </div>

      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '4rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.85rem',
        opacity: 0.6
      }}>
        <p>&copy; {new Date().getFullYear()} Antonio Miguel Apostol. All rights reserved.</p>
      </div>
    </footer>
  );
}
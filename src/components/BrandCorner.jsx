/**
 * Fixed title-block panel in the top-left corner - echoes the Go.arch
 * reference's brand-panel box. Hidden on small screens (see .brand-corner
 * media query) where the mobile nav takes over branding duties.
 */
export default function BrandCorner({ name = 'Antonio Miguel Apostol', tagline = 'Creative Strategist - Video Editor' }) {
  return (
    <div className="brand-corner">
      <div className="brand-corner-name">{name}</div>
      <div className="brand-corner-tagline">{tagline}</div>
      <div className="brand-corner-line" />
    </div>
  );
}

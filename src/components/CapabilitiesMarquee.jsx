/**
 * Infinite-scrolling ticker of tools/software - pure CSS animation (see
 * .marquee-* classes in styles/index.css), no extra dependencies needed.
 * The item list is duplicated once so the loop has no visible seam.
 */
export default function CapabilitiesMarquee({ items = [] }) {
  if (items.length === 0) return null;
  const loopItems = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {loopItems.map((item, i) => (
          <div className="marquee-item" key={`${item}-${i}`}>
            {item}
            <span className="dot" />
          </div>
        ))}
      </div>
    </div>
  );
}

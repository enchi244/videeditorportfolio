/**
 * Subtle fixed vertical grid lines behind all content - an architectural
 * "blueprint column" detail borrowed from the Go.arch reference. Purely
 * decorative, so it's aria-hidden and ignores pointer events.
 */
export default function PageLines() {
  const positions = ['6%', '50%', '94%'];

  return (
    <div className="page-lines" aria-hidden="true">
      {positions.map(left => (
        <span key={left} style={{ left }} />
      ))}
    </div>
  );
}

import SectionHeader from './SectionHeader';
import CategoryTile from './CategoryTile';

/**
 * Renders each content-type category (from portfolioData.sections) as a tile
 * in a full-bleed filmstrip. Clicking a tile opens the CategoryModal gallery
 * for that category (handled by the onOpenCategory callback from App.jsx).
 */
export default function ProjectsSection({ sections, index, onOpenCategory }) {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeader
          eyebrow="Selected Work"
          title="My Work"
          subtitle="Five content formats, one direct-response mindset. Tap a category to explore the reel."
          index={index}
        />
      </div>

      <div className="projects-filmstrip">
        {sections.map(section => (
          <CategoryTile key={section.id} section={section} onOpen={onOpenCategory} />
        ))}
      </div>
    </section>
  );
}

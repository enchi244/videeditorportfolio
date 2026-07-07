import { useState } from 'react';
import Navbar from './components/Navbar';
import BrandCorner from './components/BrandCorner';
import HeroSection from './components/HeroSection';
import CapabilitiesMarquee from './components/CapabilitiesMarquee';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import WhyChooseMeSection from './components/WhyChooseMeSection';
import VideoModal from './components/VideoModal';
import CategoryModal from './components/CategoryModal';
import Footer from './components/Footer';
import PageLines from './components/PageLines';
import VerticalRail from './components/VerticalRail';
import portfolioData from './data/portfolioData.json';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'why-me', label: 'Why Me' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  // Hero showreel - a single video played in the simple VideoModal.
  const [activeVideo, setActiveVideo] = useState(null);

  // Project category gallery - CategoryModal browses all items in one
  // content-type section, with prev/next + a clickable filmstrip.
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const activeSection = portfolioData.sections.find(s => s.id === activeCategoryId) || null;

  const openCategory = (sectionId) => {
    setActiveCategoryId(sectionId);
    setActiveItemIndex(0);
  };
  const closeCategory = () => setActiveCategoryId(null);

  const goToIndex = (i) => {
    if (!activeSection) return;
    const total = activeSection.items.length;
    setActiveItemIndex(((i % total) + total) % total);
  };
  const goPrev = () => goToIndex(activeItemIndex - 1);
  const goNext = () => goToIndex(activeItemIndex + 1);

  return (
    <div>
      <PageLines />
      <VerticalRail />
      <BrandCorner />
      <Navbar navItems={NAV_ITEMS} />

      <HeroSection onWatchReel={setActiveVideo} />

      <CapabilitiesMarquee items={portfolioData.capabilities} />

      <AboutSection about={portfolioData.about} index={1} />

      <ProjectsSection
        sections={portfolioData.sections}
        index={2}
        onOpenCategory={openCategory}
      />

      <WhyChooseMeSection whyChooseMe={portfolioData.whyChooseMe} index={3} />

      <Footer contact={portfolioData.contact} />

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      <CategoryModal
        section={activeSection}
        activeIndex={activeItemIndex}
        onClose={closeCategory}
        onSelectIndex={goToIndex}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}

export default App;

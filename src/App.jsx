import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Carousel from './components/Carousel';
import VideoModal from './components/VideoModal';
import Footer from './components/Footer';
import portfolioData from './data/portfolioData.json';
import './styles/index.css';

function App() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div>
      {/* Navbar sits at the absolute top */}
      <Navbar />
      
      <HeroSection />
      
      {portfolioData.categories.map(category => (
        <Carousel 
          key={category.id} 
          category={category} 
          onPlay={setActiveVideo} 
        />
      ))}

      {/* Footer caps off the bottom of the page */}
      <Footer />

      <VideoModal 
        video={activeVideo} 
        onClose={() => setActiveVideo(null)} 
      />
    </div>
  );
}

export default App;
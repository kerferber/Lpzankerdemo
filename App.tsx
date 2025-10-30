import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import ClientLogos from './components/ClientLogos';
import FeatureShowcase, { showcaseData } from './components/FeatureShowcase';
import Features from './components/Features';
import DashboardDemo from './components/DashboardDemo';
import HowItWorks from './components/HowItWorks';
import TargetAudience from './components/TargetAudience';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Pricing from './components/Pricing';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import FloatingBanner from './components/FloatingBanner';

function App() {
  // Preload images from the showcase to avoid lag on interaction
  useEffect(() => {
    showcaseData.forEach((feature) => {
      const img = new Image();
      img.src = feature.imageSrc;
    });
  }, []);

  return (
    <div className="bg-white text-text-main antialiased">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <ClientLogos />
        <FeatureShowcase />
        <Features />
        <DashboardDemo />
        <HowItWorks />
        <TargetAudience />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <FloatingBanner />
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import ClientLogos from './components/ClientLogos';
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
  return (
    <div className="bg-white text-text-main antialiased">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <ClientLogos />
        <Features />
        <DashboardDemo />
        <HowItWorks />
        <TargetAudience />
        <Testimonials />
        <Faq />
        <Pricing />
        <FinalCta />
      </main>
      <FloatingBanner />
      <Footer />
    </div>
  );
}

export default App;
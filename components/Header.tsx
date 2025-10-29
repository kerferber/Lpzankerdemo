import React, { useState, useEffect } from 'react';

const Logo = () => (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6667 4V28" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 16H17.3333" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="28" y="23" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="#1E293B">Zanker</text>
  </svg>
);


const Header: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg transition-shadow duration-300 ${hasScrolled ? 'shadow-md border-b border-slate-200/50' : 'shadow-none'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#hero" aria-label="Página inicial">
              <Logo />
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <a href="#features" className="text-text-secondary hover:text-primary transition-colors font-medium">Funcionalidades</a>
            <a href="#how-it-works" className="text-text-secondary hover:text-primary transition-colors font-medium">Como funciona</a>
            <a href="#target-audience" className="text-text-secondary hover:text-primary transition-colors font-medium">Para quem é</a>
            <a href="#pricing" className="text-text-secondary hover:text-primary transition-colors font-medium">Planos</a>
            <a href="#faq" className="text-text-secondary hover:text-primary transition-colors font-medium">FAQ</a>
          </nav>
          <div className="flex items-center">
            <a href="#cta" className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-px">
              Ver demonstração
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
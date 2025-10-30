import React, { useState, useEffect } from 'react';

const Logo = () => (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6667 4V28" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 16H17.3333" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="28" y="23" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="#1E293B">Zanker</text>
  </svg>
);

const HamburgerIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const navItems = [
    { href: '#features', label: 'Funcionalidades' },
    { href: '#how-it-works', label: 'Como funciona' },
    { href: '#target-audience', label: 'Para quem é' },
    { href: '#pricing', label: 'Planos' },
    { href: '#faq', label: 'FAQ' },
];

const Header: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);

      let currentSectionId = '';
      // Using a dynamic offset based on viewport height for more reliable detection
      const offset = window.innerHeight / 3;

      // Iterate backwards to find the last section that has been scrolled past
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const section = document.getElementById(item.href.substring(1));
        if (section) {
          if (section.offsetTop <= window.scrollY + offset) {
            currentSectionId = item.href.substring(1);
            break; 
          }
        }
      }
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount to set initial active section

    const timer = setTimeout(() => setIsMounted(true), 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-white shadow-none'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className={`flex-shrink-0 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
              <a href="#hero" aria-label="Página inicial" onClick={isMenuOpen ? handleLinkClick : undefined}>
                <Logo />
              </a>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                 <a 
                  key={item.href} 
                  href={item.href} 
                  className={`relative text-text-main hover:text-primary transition-all duration-500 ease-out font-medium ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'} ${isActive ? 'text-primary font-bold' : ''}`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                 >
                   {item.label}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
                 </a>
                )
              })}
            </nav>
            <div className="flex items-center">
              {/* Desktop CTA */}
              <div className={`hidden lg:block transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`} style={{ transitionDelay: '700ms' }}>
                <a href="#cta" className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors duration-200">
                  Ver demonstração
                </a>
              </div>
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 rounded-md text-text-main hover:text-primary transition-colors focus:outline-none"
                  aria-label="Abrir menu"
                  aria-expanded={isMenuOpen}
                >
                  <HamburgerIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-25 transition-opacity lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-slate-200">
              <a href="#hero" aria-label="Página inicial" onClick={handleLinkClick}>
                <Logo />
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-text-main hover:text-primary transition-colors focus:outline-none"
                aria-label="Fechar menu"
              >
                  <CloseIcon />
              </button>
          </div>
          <nav className="mt-8 flex flex-col items-start px-4 sm:px-6 space-y-1">
              {navItems.map((item) => (
                 <a 
                  key={item.href} 
                  href={item.href}
                  onClick={handleLinkClick}
                  className="w-full text-left text-lg font-semibold text-text-main hover:text-primary hover:bg-light-blue rounded-md py-3 px-4 transition-colors"
                 >
                   {item.label}
                 </a>
              ))}
          </nav>
          <div className="mt-8 px-4 sm:px-6">
            <a href="#cta" onClick={handleLinkClick} className="block w-full text-center bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors duration-200">
              Ver demonstração
            </a>
          </div>
      </div>
    </>
  );
};

export default Header;
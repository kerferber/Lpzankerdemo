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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => setIsMounted(true), 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navItems = [
    { href: '#features', label: 'Funcionalidades' },
    { href: '#how-it-works', label: 'Como funciona' },
    { href: '#target-audience', label: 'Para quem é' },
    { href: '#pricing', label: 'Planos' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${hasScrolled ? 'shadow-sm' : 'shadow-none'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className={`flex-shrink-0 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
            <a href="#hero" aria-label="Página inicial">
              <Logo />
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
               <a 
                key={item.href} 
                href={item.href} 
                className={`text-text-main hover:text-primary transition-all duration-500 ease-out font-medium ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
               >
                 {item.label}
               </a>
            ))}
          </nav>
          <div className="flex items-center">
            <div className={`transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`} style={{ transitionDelay: '700ms' }}>
              <a href="#cta" className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors duration-200">
                Ver demonstração
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
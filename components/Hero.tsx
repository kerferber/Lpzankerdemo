import React, { useEffect, useRef, useState } from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06l-3.103 3.103-1.53-1.531a.75.75 0 00-1.06 1.06l2.06 2.06a.75.75 0 001.06 0l3.64-3.64z" clipRule="evenodd" />
  </svg>
);

const advantages = [
    { text: 'Reduza até 18% de desperdício de material.' },
    { text: 'Elimine surpresas no cronograma físico-financeiro.' },
    { text: 'Veja custo previsto × custo real em tempo real.' }
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeAdvantage, setActiveAdvantage] = useState(0);
  
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: isMobile ? 0.2 : 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
      if (window.innerWidth >= 640) return; // Only run animation on mobile

      const interval = setInterval(() => {
          setActiveAdvantage(prev => (prev + 1) % advantages.length);
      }, 4000); // Change advantage every 4 seconds

      return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-40 md:pb-24 bg-light-blue bg-dot-pattern bg-dot-pattern-size overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className={`font-display text-4xl md:text-5xl font-semibold text-text-main leading-tight tracking-normal transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Entrega de <span className="text-primary">obras</span> no prazo.
              <br className="md:hidden" /> <span className="hidden md:inline"> </span>
              <span className="text-primary">Orçamento</span> sob controle.
              <br className="md:hidden" /> <span className="hidden md:inline"> </span>
              <span className="text-primary">Escritório</span> em pleno comando.
            </h1>
            <p className={`mt-6 text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '200ms'}}>
              Deixe o caos das planilhas para trás. Tenha o controle total da sua obra, do orçamento à entrega, em um painel que conecta o canteiro ao escritório.
            </p>
            <div className={`mt-8 flex flex-col items-center lg:items-start transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '400ms'}}>
              <a
                href="#cta"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              >
                Ver o sistema na prática
              </a>
              <p className="mt-3 text-sm text-text-secondary">Sem cartão de crédito. Sem compromisso.</p>
            </div>
            
            {/* Desktop Advantages */}
            <div className="mt-8 hidden sm:flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:gap-8">
              {advantages.map((advantage, index) => (
                <div key={advantage.text} className={`group flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors duration-200 hover:bg-white/60 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${600 + index * 200}ms`}}>
                  <CheckCircleIcon className="w-7 h-7 text-secondary transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                  <span className="text-slate-600 font-medium">{advantage.text}</span>
                </div>
              ))}
            </div>

            {/* Mobile Animated Advantages (Now hidden on mobile) */}
            <div className={`hidden mt-8 relative h-12 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `600ms`}}>
                {advantages.map((advantage, index) => (
                    <div 
                        key={advantage.text}
                        className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-500 ease-in-out ${activeAdvantage === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <CheckCircleIcon className="w-7 h-7 text-secondary flex-shrink-0" />
                        <span className="text-slate-600 font-medium text-center">{advantage.text}</span>
                    </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center mt-8 lg:mt-0">
            <div className={`relative transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img
                src="https://raw.githubusercontent.com/kerferber/zankerimg/main/img02hero.png"
                alt="Dashboard do sistema Zanker"
                className="rounded-xl shadow-xl relative z-10 animate-float"
                loading="lazy"
              />
              <div 
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full z-0 hidden sm:block animate-float"
                style={{ animationDelay: '1s', animationDuration: '8s' }}
              ></div>
              <div 
                className="absolute -top-8 -left-8 w-32 h-32 bg-white rounded-full z-0 hidden sm:block animate-float"
                style={{ animationDelay: '0.5s', animationDuration: '7s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useEffect, useRef, useState } from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="hero" className="pt-40 pb-24 bg-gradient-to-b from-light-blue to-white overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className={`text-4xl md:text-5xl font-extrabold text-text-main leading-tight tracking-tighter transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Entrega de <span className="text-primary">obras</span> no prazo. <span className="text-primary">Orçamento</span> sob controle. <span className="text-primary">Escritório</span> em pleno comando.
            </h1>
            <p className={`mt-4 text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '200ms'}}>
              Planeje, execute e controle seus projetos de engenharia e arquitetura — em um painel único, pensado para quem está no canteiro e no escritório.
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
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:gap-8">
              <div className={`group flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors duration-200 hover:bg-white/60 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '600ms'}}>
                <CheckCircleIcon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-slate-600 font-medium">Reduza até 18% de desperdício de material.</span>
              </div>
              <div className={`group flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors duration-200 hover:bg-white/60 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '800ms'}}>
                <CheckCircleIcon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-slate-600 font-medium">Elimine surpresas no cronograma físico-financeiro.</span>
              </div>
              <div className={`group flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors duration-200 hover:bg-white/60 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '1000ms'}}>
                <CheckCircleIcon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-slate-600 font-medium">Veja custo previsto × custo real em tempo real.</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 lg:mt-0">
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
import React, { useEffect, useRef, useState } from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Hero: React.FC = () => {
  const bulletsRef = useRef<HTMLDivElement>(null);
  const [bulletsInView, setBulletsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBulletsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (bulletsRef.current) {
      observer.observe(bulletsRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="hero" className="pt-40 pb-24 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main leading-tight tracking-tighter">
              Entrega de obras no prazo. Orçamento sob controle. Escritório em pleno comando.
            </h1>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto lg:mx-0">
              Planeje, execute e controle seus projetos de engenharia e arquitetura — em um painel único, pensado para quem está no canteiro e no escritório.
            </p>
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <a
                href="#cta"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40"
              >
                Ver o sistema na prática
              </a>
              <p className="mt-3 text-sm text-text-secondary">Sem cartão de crédito. Sem compromisso.</p>
            </div>
            <div ref={bulletsRef} className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:gap-8">
              <div className={`flex items-center gap-3 transition-all duration-600 ease-out ${bulletsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <CheckCircleIcon className="w-7 h-7 text-primary" />
                <span className="text-slate-600 font-medium">Reduza até 18% de desperdício de material.</span>
              </div>
              <div className={`flex items-center gap-3 transition-all duration-600 ease-out delay-200 ${bulletsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <CheckCircleIcon className="w-7 h-7 text-primary" />
                <span className="text-slate-600 font-medium">Elimine surpresas no cronograma físico-financeiro.</span>
              </div>
              <div className={`flex items-center gap-3 transition-all duration-600 ease-out delay-300 ${bulletsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <CheckCircleIcon className="w-7 h-7 text-primary" />
                <span className="text-slate-600 font-medium">Veja custo previsto × custo real em tempo real.</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 lg:mt-0">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Dashboard do sistema Zanker"
                className="rounded-xl shadow-xl relative z-10 animate-float"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-light-blue rounded-full z-0 hidden sm:block"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-light-gray rounded-full z-0 hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
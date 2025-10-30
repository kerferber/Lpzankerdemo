import React, { useEffect, useRef, useState } from 'react';

const audienceData = [
    {
      title: "Engenheiros civis e gestores de obra",
      description: "Você coordena várias obras ao mesmo tempo e precisa de visão unificada em custo, prazo e execução.",
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="11.6667" fill="#FFF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.6667 36.6667L25.8333 25.8333" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 10V20" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 15H20" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    },
    {
      title: "Arquitetos que também executam",
      description: "Você cobra fechamento, controla entrega, e quer prestar serviço com status profissional para o cliente — sem gastar horas montando relatório.",
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6667 15L28.3333 21.6667" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33331 30V36.6667H10L29.5 17.1667L22.8333 10.5L3.33331 30Z" fill="#FFF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.8333 10.5L29.5 17.1667" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    },
    {
      title: "Construtoras e incorporadoras",
      description: "Você precisa de comparativo previsto vs. realizado em cada etapa. Fim das surpresas de caixa e atraso no cronograma.",
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 36.6667H30" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66669 36.6667V10L20 3.33334L33.3334 10V36.6667H6.66669Z" fill="#FFF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 36.6667V26.6667" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="15" y="15" width="10" height="10" rx="2" fill="#FFF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    }
];

const AudienceCard: React.FC<{ title: string; description: string; icon: React.ReactElement }> = ({ title, description, icon }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1.5 h-full">
    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-light-blue rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-text-main mb-3">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);

const TargetAudience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
                    if(index > -1) setActiveIndex(index);
                }
            });
        },
        { root: sliderRef.current, threshold: 0.7 }
    );
    
    cardRefs.current.forEach(card => {
        if(card) observer.observe(card);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const scrollToCard = (index: number) => {
    if(sliderRef.current && sliderRef.current.children[index]) {
        sliderRef.current.children[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
  };

  return (
    <section ref={sectionRef} id="target-audience" className="py-16 md:py-24 bg-light-blue bg-dot-pattern bg-dot-pattern-size overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-primary font-semibold tracking-wider uppercase mb-2">Feito para você</p>
          <h2 className="font-display text-4xl font-semibold text-text-main tracking-normal leading-tight">Para escritórios que querem parar de reagir e começar a liderar.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Seja você um profissional autônomo, um escritório em crescimento ou uma grande construtora, temos a solução certa.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="mt-16 hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8">
          {audienceData.map((audience, index) => (
             <div key={audience.title} className={`transition-all duration-700 ease-out ${inView ? 'opacity-100' : 'opacity-0'} ${index === 1 ? 'translate-y-0' : (index === 0 ? '-translate-x-8' : 'translate-x-8')}`} style={{transitionDelay: `${200 + index * 100}ms`}}>
                <AudienceCard {...audience} />
             </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="mt-12 lg:hidden">
            <div 
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 gap-4 scrollbar-hide"
                style={{scrollPadding: '0 5%'}}
            >
                {audienceData.map((audience, index) => (
                    <div 
                        key={audience.title}
                        ref={el => cardRefs.current[index] = el}
                        className="flex-shrink-0 snap-center w-[90%]"
                    >
                       <AudienceCard {...audience} />
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center space-x-2">
                {audienceData.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => scrollToCard(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-primary scale-110' : 'bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Ir para o card ${index + 1}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
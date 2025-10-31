import React, { useEffect, useRef, useState } from 'react';

const Tooltip: React.FC<{ 
    text: string; 
    position: string; 
    delay: number; 
    animationType: 'slide-left' | 'slide-right' | 'fade-up';
    onHover: (isHovering: boolean) => void;
    isDimmed: boolean;
}> = ({ text, position, delay, animationType, onHover, isDimmed }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const baseClasses = 'absolute hidden lg:block transform transition-all duration-700 ease-out';
    
    const animationStates = {
        'slide-left': {
            initial: 'opacity-0 -translate-x-5',
            final: 'opacity-100 translate-x-0'
        },
        'slide-right': {
            initial: 'opacity-0 translate-x-5',
            final: 'opacity-100 translate-x-0'
        },
        'fade-up': {
            initial: 'opacity-0 translate-y-5',
            final: 'opacity-100 translate-y-0'
        }
    };
    
    const currentAnimation = animationStates[animationType];

    return (
        <div 
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className={`${baseClasses} ${position} ${mounted ? currentAnimation.final : currentAnimation.initial} ${isDimmed ? 'opacity-50' : 'opacity-100'} hover:!opacity-100 hover:scale-105 z-20`}
        >
            <div className="bg-white p-3 rounded-lg shadow-xl flex items-center space-x-2">
                <span className="h-2 w-2 bg-secondary rounded-full flex-shrink-0 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                </span>
                <p className="text-sm font-semibold text-primary whitespace-nowrap">{text}</p>
            </div>
        </div>
    );
};


const DashboardDemo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

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

  return (
    <section ref={sectionRef} id="demo" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="font-display text-3xl font-bold text-text-main tracking-normal leading-tight">Veja exatamente onde custo, prazo e qualidade fogem ao controle — e como retomar o comando hoje.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Planeje, execute e controle projetos de engenharia e arquitetura — tudo em um painel criado para quem está no canteiro e no escritório.
          </p>
        </div>
        <div className={`mt-16 relative`}>
          <div className={`bg-slate-200 rounded-xl p-2 sm:p-4 shadow-mockup max-w-5xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '200ms' }}>
              <img 
                  src="https://raw.githubusercontent.com/kerferber/zankerimg/main/banner1.png" 
                  alt="Dashboard completo do sistema Zanker"
                  className="rounded-xl mx-auto transition-transform duration-400 hover:scale-102"
                  loading="lazy"
              />
          </div>
          
          {inView && <>
            <Tooltip 
              text="Custo Previsto vs. Real" 
              position="top-[15%] left-[5%]" 
              delay={500} 
              animationType="slide-left" 
              onHover={(isHovering) => setHoveredTooltip(isHovering ? 'cost' : null)}
              isDimmed={hoveredTooltip !== null && hoveredTooltip !== 'cost'}
            />
            <Tooltip 
              text="Cronograma Físico-Financeiro" 
              position="top-[50%] right-[2%]" 
              delay={700} 
              animationType="slide-right" 
              onHover={(isHovering) => setHoveredTooltip(isHovering ? 'schedule' : null)}
              isDimmed={hoveredTooltip !== null && hoveredTooltip !== 'schedule'}
            />
            <Tooltip 
              text="Status de Compras" 
              position="bottom-[20%] left-[15%]" 
              delay={900} 
              animationType="fade-up" 
              onHover={(isHovering) => setHoveredTooltip(isHovering ? 'purchases' : null)}
              isDimmed={hoveredTooltip !== null && hoveredTooltip !== 'purchases'}
            />
          </>}
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
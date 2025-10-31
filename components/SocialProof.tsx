import React, { useEffect, useRef, useState, useCallback } from 'react';

// Self-contained component to animate numbers
const AnimatedNumber: React.FC<{ finalValue: number; inView: boolean }> = ({ finalValue, inView }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let startTimestamp: number | null = null;
        const duration = 2000; // 2 seconds animation duration

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutCubic easing function
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            const value = Math.floor(easedProgress * finalValue);
            setCurrentValue(value);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCurrentValue(finalValue); // Ensure it ends on the exact value
            }
        };

        requestAnimationFrame(step);
    }, [inView, finalValue]);

    return <>{currentValue}</>;
};


const profiles = [
  {
    name: 'Arquitetos',
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6667 15L28.3333 21.6667" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33331 30V36.6667H10L29.5 17.1667L22.8333 10.5L3.33331 30Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.8333 10.5L29.5 17.1667" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  },
  {
    name: 'Engenheiros',
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="11.6667" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.6667 36.6667L25.8333 25.8333" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 10V20" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 15H20" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  },
  {
    name: 'Construtoras',
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 36.6667H30" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66669 36.6667V10L20 3.33334L33.3334 10V36.6667H6.66669Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 36.6667V26.6667" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="15" y="15" width="10" height="10" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  }
];

const SocialProof: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % profiles.length);
    }, 3000);
  }, []);

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
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (inView && window.innerWidth < 768) {
      startAutoplay();
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [inView, startAutoplay]);

  return (
    <section ref={sectionRef} className="pt-8 pb-16 md:py-24 bg-light-blue bg-dot-pattern bg-dot-pattern-size overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="font-display text-3xl font-bold text-text-main tracking-normal leading-tight">
                Mais de <span className="text-primary"><AnimatedNumber finalValue={500} inView={inView} /></span> escritórios de engenharia já usam a Zanker para entregar no prazo e dentro do orçamento.
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
                Junte-se a profissionais que transformaram a gestão de seus projetos e negócios.
            </p>
        </div>

        {/* Desktop Grid */}
        <div className={`hidden md:grid grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto`}>
          {profiles.map((profile, index) => (
            <div 
              key={profile.name}
              className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150 + 300}ms` }}
            >
              <div className="group flex flex-col items-center gap-4 rounded-xl p-6 transition-colors hover:bg-white/50">
                <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-sm border border-slate-200/80 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  {profile.icon}
                </div>
                <h3 className="text-xl font-bold text-text-main">{profile.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden mt-10 h-40 relative overflow-hidden">
            {profiles.map((profile, index) => {
                const isCurrent = index === activeIndex;
                const isPrevious = index === (activeIndex - 1 + profiles.length) % profiles.length;

                let positionClasses = 'translate-x-full opacity-0 blur-sm'; // Default to waiting on the right
                if (isCurrent) {
                    positionClasses = 'translate-x-0 opacity-100 blur-0';
                } else if (isPrevious) {
                    positionClasses = '-translate-x-full opacity-0 blur-sm';
                }
                
                return (
                    <div 
                        key={profile.name}
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-in-out ${positionClasses}`}
                    >
                        <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-sm border border-slate-200/80">
                            {profile.icon}
                        </div>
                        <h3 className="text-xl font-bold text-text-main">{profile.name}</h3>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
import React, { useEffect, useRef, useState } from 'react';

const AnimatedCounter: React.FC<{ end: number, duration?: number }> = ({ end, duration = 2000 }) => {
    const [count, setCount] = React.useState(0);
    const countRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const startTime = performance.now();
                    const animateCount = (timestamp: number) => {
                        const progress = timestamp - startTime;
                        const percentage = Math.min(progress / duration, 1);
                        start = Math.floor(percentage * end);
                        setCount(start);
                        if (progress < duration) {
                            requestAnimationFrame(animateCount);
                        }
                    };
                    requestAnimationFrame(animateCount);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={countRef}>{count}</span>;
};


const ArchitectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);
const EngineerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 15.75l2.472 2.472a3.375 3.375 0 004.773-4.773z" />
    </svg>
);
const ConstructionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375M9 12h6.375M9 17.25h6.375" />
    </svg>
);

const SocialProof: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-light-blue overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-main tracking-tight leading-tight">
            Mais de <span className="text-primary"><AnimatedCounter end={500} /></span> escritórios de engenharia já usam a Zanker para entregar no prazo e dentro do orçamento.
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Junte-se a profissionais que transformaram a gestão de seus projetos e negócios.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className={`flex flex-col items-center p-6 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '200ms'}}>
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-md mb-4">
              <ArchitectIcon />
            </div>
            <h3 className="mt-2 text-xl font-semibold text-text-main">Arquitetos</h3>
          </div>
          <div className={`flex flex-col items-center p-6 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '300ms'}}>
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-md mb-4">
              <EngineerIcon />
            </div>
            <h3 className="mt-2 text-xl font-semibold text-text-main">Engenheiros</h3>
          </div>
          <div className={`flex flex-col items-center p-6 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '400ms'}}>
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-md mb-4">
              <ConstructionIcon />
            </div>
            <h3 className="mt-2 text-xl font-semibold text-text-main">Construtoras</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
import React, { useEffect, useRef, useState } from 'react';

const logos = ['ARQTEC', 'ENG.', 'CONSTRUCT', 'PROJETO', 'INNOVA', 'OBRA+'];

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-16 w-40 bg-slate-800 group-hover:bg-slate-700 rounded-lg transition-colors duration-300">
    <span className="text-slate-400 group-hover:text-white font-bold tracking-widest transition-colors duration-300">{name}</span>
  </div>
);

const ClientLogos: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
  
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
    <section ref={sectionRef} className="py-16 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-center text-lg font-semibold text-slate-400 tracking-wider transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Empresas que confiam na Zanker para gerenciar suas obras
        </h2>
        <div className={`mt-8 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]`}>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-marquee hover:[animation-play-state:paused]">
                {logos.map((name) => (
                    <li key={name} className="group">
                        <LogoPlaceholder name={name} />
                    </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
                {logos.map((name) => (
                    <li key={name} className="group">
                        <LogoPlaceholder name={name} />
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
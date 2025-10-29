import React, { useEffect, useRef, useState } from 'react';

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-16 w-40 bg-slate-200/50 rounded-lg">
    <span className="text-slate-500 font-bold tracking-widest">{name}</span>
  </div>
);

const ClientLogos: React.FC = () => {
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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-center text-lg font-semibold text-text-secondary tracking-wider transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Empresas que confiam na Zanker para gerenciar suas obras
        </h2>
        <div className={`mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 transition-all duration-600 ease-out delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {['ARQTEC', 'ENG.', 'CONSTRUCT', 'PROJETO', 'INNOVA'].map((name, index) => (
            <div key={index} className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <LogoPlaceholder name={name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

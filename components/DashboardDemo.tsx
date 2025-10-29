import React, { useEffect, useRef, useState } from 'react';

const Tooltip: React.FC<{ text: string; position: string; delay: number; animation: string }> = ({ text, position, delay, animation }) => (
    <div 
      className={`absolute ${position} hidden lg:block transform opacity-0 ${animation}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
        <div className="bg-white p-3 rounded-lg shadow-xl flex items-center space-x-2">
            <span className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            </span>
            <p className="text-sm font-semibold text-primary whitespace-nowrap">{text}</p>
        </div>
    </div>
);


const DashboardDemo: React.FC = () => {
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
    <section ref={sectionRef} id="demo" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">Veja exatamente onde custo, prazo e qualidade fogem ao controle — e como retomar o comando hoje.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Planeje, execute e controle projetos de engenharia e arquitetura — tudo em um painel criado para quem está no canteiro e no escritório.
          </p>
        </div>
        <div className={`mt-16 relative ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-slate-200 rounded-xl p-2 sm:p-4 shadow-mockup max-w-5xl mx-auto ${inView ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <img 
                  src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Dashboard completo do sistema Zanker"
                  className="rounded-xl mx-auto transition-transform duration-400 hover:scale-102"
                  loading="lazy"
              />
          </div>
          
          {inView && <>
            <Tooltip text="Custo Previsto vs. Real" position="top-[15%] left-[5%]" delay={500} animation="animate-slide-in-from-left" />
            <Tooltip text="Cronograma Físico-Financeiro" position="top-[50%] right-[2%]" delay={700} animation="animate-slide-in-from-right" />
            <Tooltip text="Status de Compras" position="bottom-[20%] left-[15%]" delay={900} animation="animate-fade-in-up" />
          </>}
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
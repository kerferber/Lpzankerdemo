import React, { useEffect, useRef, useState } from 'react';

const Tooltip: React.FC<{ text: string; position: string; delay: string }> = ({ text, position, delay }) => (
    <div className={`absolute ${position} hidden lg:block transform transition-all opacity-0 animate-fade-in-up ${delay}`} style={{animationFillMode: 'forwards'}}>
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
    <section ref={sectionRef} id="demo" className="py-16 md:py-24 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">Veja exatamente onde custo, prazo e qualidade fogem ao controle — e como retomar o comando hoje.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Planeje, execute e controle projetos de engenharia e arquitetura — tudo em um painel criado para quem está no canteiro e no escritório.
          </p>
        </div>
        <div className={`mt-16 relative transition-all duration-600 ease-out delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-slate-200 rounded-2xl p-2 sm:p-4 shadow-mockup max-w-5xl mx-auto">
              <img 
                  src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Dashboard completo do sistema Zanker"
                  className="rounded-2xl mx-auto transition-transform duration-400 hover:scale-102"
              />
          </div>
          
          <Tooltip text="Custo Previsto vs. Real" position="top-[15%] left-[5%]" delay="delay-0" />
          <Tooltip text="Cronograma Físico-Financeiro" position="top-[50%] right-[2%]" delay="delay-300" />
          <Tooltip text="Status de Compras" position="bottom-[20%] left-[15%]" delay="delay-500" />
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
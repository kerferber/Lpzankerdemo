import React, { useEffect, useRef, useState } from 'react';

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
    <section ref={sectionRef} id="target-audience" className="py-16 md:py-24 bg-light-blue overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">Feito para quem constrói o futuro</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Seja você um profissional autônomo, um escritório em crescimento ou uma grande construtora, temos a solução certa.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '200ms'}}>
            <AudienceCard 
              title="Engenheiros"
              description="Controle cada detalhe técnico e financeiro da obra, garantindo precisão e conformidade."
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 15.75l2.472 2.472a3.375 3.375 0 004.773-4.773z" /></svg>}
            />
          </div>
          <div className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '300ms'}}>
            <AudienceCard 
              title="Arquitetos"
              description="Gerencie seus projetos do conceito à entrega, colaborando com clientes e fornecedores."
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>}
            />
          </div>
          <div className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '400ms'}}>
            <AudienceCard 
              title="Construtoras"
              description="Padronize processos, gerencie múltiplos projetos simultaneamente e ganhe escala."
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
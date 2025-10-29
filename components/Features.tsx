import React, { useEffect, useRef, useState } from 'react';

const featureIcons: { [key: string]: React.ReactElement } = {
  'Orçamento e composição de custo': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  'Cronograma físico-financeiro': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  'Compras e fornecedores': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  'Acompanhamento de obra': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  'Relatórios para o cliente': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  'Gestão do escritório': <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
};

const featuresData = [
  { name: 'Orçamento e composição de custo', description: 'Monte e revise orçamentos com insumos, mão de obra e BDI; compare previsto vs. contratado.' },
  { name: 'Cronograma físico-financeiro', description: 'Visualize avanço físico da obra e desembolso financeiro lado a lado. Fim das surpresas no caixa.' },
  { name: 'Compras e fornecedores', description: 'Controle pedidos, cotações e ordens de compra. Saiba quem entrega no prazo e quem estoura custo.' },
  { name: 'Acompanhamento de obra', description: 'Registre avanço, fotos e status diário direto do canteiro. Tudo sincronizado com seu escritório.' },
  { name: 'Relatórios para o cliente', description: 'Envie status claro com percentual concluído, gastos e próximos passos. Prova de profissionalismo.' },
  { name: 'Gestão do escritório', description: 'Centralize tarefas, projetos, propostas e faturamento — não só da obra, mas do seu negócio também.' },
];

interface FeatureCardProps {
  name: string;
  description: string;
  icon: React.ReactElement;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ name, description, icon }) => (
    <div className="group bg-white p-8 rounded-xl border border-slate-200 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 h-full">
    <div className="mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
    <h3 className="text-xl font-bold text-text-main mb-2">{name}</h3>
    <p className="text-text-secondary text-base">{description}</p>
  </div>
);


const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <section id="features" className="py-16 md:py-24 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center max-w-3xl mx-auto">
          <p className={`text-primary font-semibold tracking-wider uppercase mb-2 transition-all duration-600 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`}>Ferramentas Poderosas</p>
          <h2 className={`text-4xl font-extrabold text-text-main tracking-tight leading-tight transition-all duration-600 ease-out delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>As funcionalidades que reduzem desperdício, custos e atrasos.</h2>
          <p className={`mt-4 text-lg text-text-secondary transition-all duration-600 ease-out delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Desde o planejamento inicial até a entrega final, nossa plataforma oferece as ferramentas certas para cada etapa do seu projeto.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={feature.name} className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: `${index * 100 + 200}ms`}}>
              <FeatureCard 
                name={feature.name}
                description={feature.description}
                icon={featureIcons[feature.name]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
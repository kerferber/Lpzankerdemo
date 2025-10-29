import React from 'react';

const featureIcons: { [key: string]: React.ReactElement } = {
  Orçamento: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  Cronograma: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Compras: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Acompanhamento: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Relatórios: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  'Gestão do Escritório': <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
};

const featuresData = [
  { name: 'Orçamento', description: 'Crie orçamentos precisos e detalhados em minutos, integrados com sua base de insumos.' },
  { name: 'Cronograma', description: 'Planeje e visualize o avanço físico-financeiro da sua obra de forma clara.' },
  { name: 'Compras', description: 'Controle cotações, pedidos e o fluxo de suprimentos, evitando desperdícios.' },
  { name: 'Acompanhamento', description: 'Registre o diário de obras, anexe fotos e monitore o progresso em tempo real.' },
  { name: 'Relatórios', description: 'Gere relatórios gerenciais completos para tomar decisões baseadas em dados.' },
  { name: 'Gestão do Escritório', description: 'Administre propostas, contratos e o financeiro do seu negócio em um só lugar.' },
];

interface FeatureCardProps {
  name: string;
  description: string;
  icon: React.ReactElement;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ name, description, icon }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
    <div className="absolute top-0 left-0 h-1 w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    <div className="mb-4 flex items-center justify-center h-14 w-14 rounded-lg bg-light-blue">{icon}</div>
    <h3 className="text-xl font-bold text-text-main mb-2">{name}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);


const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight">As funcionalidades essenciais para você gerenciar obras, equipes e custos — sem complicação.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Desde o planejamento inicial até a entrega final, nossa plataforma oferece as ferramentas certas para cada etapa do seu projeto.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard 
              key={feature.name}
              name={feature.name}
              description={feature.description}
              icon={featureIcons[feature.name]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
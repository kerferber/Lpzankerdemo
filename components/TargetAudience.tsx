import React from 'react';

const AudienceCard: React.FC<{ title: string; description: string; icon: React.ReactElement }> = ({ title, description, icon }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1.5">
    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-light-blue rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-text-main mb-3">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);

const TargetAudience: React.FC = () => {
  return (
    <section id="target-audience" className="py-24 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight">Feito para quem constrói o futuro</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Seja você um profissional autônomo, um escritório em crescimento ou uma grande construtora, temos a solução certa.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <AudienceCard 
            title="Engenheiros"
            description="Controle cada detalhe técnico e financeiro da obra, garantindo precisão e conformidade."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <AudienceCard 
            title="Arquitetos"
            description="Gerencie seus projetos do conceito à entrega, colaborando com clientes e fornecedores."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>}
          />
          <AudienceCard 
            title="Construtoras"
            description="Padronize processos, gerencie múltiplos projetos simultaneamente e ganhe escala."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          />
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
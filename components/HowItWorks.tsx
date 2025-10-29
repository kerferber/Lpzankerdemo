import React from 'react';

const steps = [
  { number: 1, title: 'Planeje', description: 'Crie orçamento, defina etapas e cronograma em minutos.' },
  { number: 2, title: 'Execute', description: 'Registre avanços, custos e status direto do canteiro.' },
  { number: 3, title: 'Controle', description: 'Compare o previsto com o realizado e ajuste antes que vire retrabalho.' },
  { number: 4, title: 'Relate', description: 'Gere relatórios para seu cliente em 1 clique — profissional e transparente.' },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight">Comece a usar em 4 passos simples</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Nosso sistema foi desenhado para ser intuitivo e se adaptar ao seu fluxo de trabalho, não o contrário.
          </p>
        </div>
        <div className="mt-20">
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-full border-4 border-primary shadow-lg">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-text-main">{step.title}</h3>
                  <p className="mt-2 text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
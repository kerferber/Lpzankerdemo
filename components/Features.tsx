import React, { useEffect, useRef, useState } from 'react';

const featureIcons: { [key: string]: React.ReactElement } = {
  'Orçamento e composição de custo': <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6667 35H28.3334C30.1334 35 31.6667 33.4667 31.6667 31.6667V8.33333C31.6667 6.53333 30.1334 5 28.3334 5H11.6667C9.86671 5 8.33337 6.53333 8.33337 8.33333V31.6667C8.33337 33.4667 9.86671 35 11.6667 35Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 20H25" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 25V15" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
  'Cronograma físico-financeiro': <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3334 3.33334V10" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M26.6666 3.33334V10" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66663 36.6667H33.3333" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66663 16.6667H33.3333" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.3333 31.6667V13.3333C33.3333 9.66668 31.6666 6.66668 26.6666 6.66668H13.3333C8.33331 6.66668 6.66663 9.66668 6.66663 13.3333V31.6667C6.66663 35.3333 8.33331 38.3333 13.3333 38.3333H26.6666C31.6666 38.3333 33.3333 35.3333 33.3333 31.6667Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
  'Compras e fornecedores': <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14.1667" cy="32.5" r="3.33333" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="29.1667" cy="32.5" r="3.33333" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 6.66666H8.33333L12.5 22.5H30.8333" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 17.5H32.5L30.8333 22.5H12.5V17.5Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
  'Acompanhamento de obra': <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.33337 20C3.33337 29.2051 10.7949 36.6667 20 36.6667C29.2051 36.6667 36.6667 29.2051 36.6667 20C36.6667 10.7949 29.2051 3.33334 20 3.33334" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 25.8333C23.2218 25.8333 25.8334 23.2218 25.8334 20C25.8334 16.7782 23.2218 14.1667 20 14.1667C16.7782 14.1667 14.1667 16.7782 14.1667 20C14.1667 23.2218 16.7782 25.8333 20 25.8333Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.6667 3.33334L20 20" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
  'Relatórios para o cliente': <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.3333 23.3333V14.1667L25.8333 6.66666H10C8.16663 6.66666 6.66663 8.16666 6.66663 10V30C6.66663 31.8333 8.16663 33.3333 10 33.3333H20" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M25.8333 6.66666V14.1667H33.3333" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 28.3333H35" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 33.3333H30" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
  'Gestão do escritório': <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3.33334H25C33.3333 3.33334 35 5 35 13.3333V26.6667C35 35 33.3333 36.6667 25 36.6667H15C6.66669 36.6667 5 35 5 26.6667V13.3333C5 5 6.66669 3.33334 15 3.33334Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 13.3333H15" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 20H15" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.3334 26.6667H15" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
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
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-16 md:py-24 bg-light-gray bg-dot-pattern bg-dot-pattern-size overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center max-w-3xl mx-auto">
          <p className={`text-primary font-semibold tracking-wider uppercase mb-2 transition-all duration-600 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`}>Ferramentas Poderosas</p>
          <h2 className={`font-display text-4xl font-semibold text-text-main tracking-normal leading-tight transition-all duration-600 ease-out delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>As funcionalidades que reduzem desperdício, custos e atrasos.</h2>
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
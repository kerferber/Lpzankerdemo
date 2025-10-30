import React, { useState, useEffect, useRef } from 'react';

const icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  diary: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  insights: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  crm: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
};

const showcaseData = [
  {
    id: 'dashboard',
    title: 'Dashboard Central',
    icon: icons.dashboard,
    headline: 'Visão completa de todos os seus projetos em um só lugar.',
    description: 'Acompanhe o status geral das obras, finanças e tarefas pendentes em um painel intuitivo. Tenha o controle total do seu negócio na palma da mão.',
    imageSrc: 'https://raw.githubusercontent.com/kerferber/Lpzankerdemo/refs/heads/main/diariodeobras.png',
  },
  {
    id: 'diary',
    title: 'Diário de Obra',
    icon: icons.diary,
    headline: 'Registre o progresso da obra com fotos e relatórios detalhados.',
    description: 'Documente cada etapa do projeto diretamente do canteiro. Adicione fotos, comente o andamento e compartilhe relatórios profissionais com sua equipe e clientes.',
    imageSrc: 'https://raw.githubusercontent.com/kerferber/Lpzankerdemo/refs/heads/main/obras1.png',
  },
  {
    id: 'portal',
    title: 'Portal do Cliente',
    icon: icons.users,
    headline: 'Transparência e profissionalismo para o seu cliente.',
    description: 'Ofereça um portal exclusivo para seus clientes acompanharem o andamento da obra, aprovarem medições e acessarem relatórios de forma simples e organizada.',
    imageSrc: 'https://raw.githubusercontent.com/kerferber/Lpzankerdemo/refs/heads/main/portaldocliente.png',
  },
  {
    id: 'insights',
    title: 'Inteligência e insights',
    icon: icons.insights,
    headline: 'Decisões baseadas em dados, não em achismos.',
    description: 'Acompanhe a saúde financeira de seus projetos com dashboards e relatórios inteligentes. Veja previsto vs. realizado em tempo real e identifique desvios antes que virem problemas.',
    imageSrc: 'https://raw.githubusercontent.com/kerferber/Lpzankerdemo/refs/heads/main/financeiro.png',
  },
  {
    id: 'rh',
    title: 'Gestão de RH',
    icon: icons.users,
    headline: 'Sua equipe organizada e produtiva.',
    description: 'Centralize informações de colaboradores, controle de ponto, documentos e pagamentos. Tenha uma visão clara da sua equipe em cada projeto.',
    imageSrc: 'https://raw.githubusercontent.com/kerferber/Lpzankerdemo/refs/heads/main/colaboradores.png',
  },
  {
    id: 'crm',
    title: 'Leads CRM',
    icon: icons.crm,
    headline: 'Transforme contatos em contratos.',
    description: 'Gerencie seu funil de vendas, acompanhe propostas e não perca nenhuma oportunidade. O CRM integrado para construtoras e escritórios.',
    imageSrc: 'https://raw.githubusercontent.com/kerferber/Lpzankerdemo/refs/heads/main/leads-crm.png',
  },
];

const FeatureShowcase: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState(showcaseData[0].id);
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

  const activeFeature = showcaseData.find((f) => f.id === activeFeatureId) || showcaseData[0];

  return (
    <section ref={sectionRef} id="feature-showcase" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">Explore a plataforma em detalhes</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Veja como cada módulo do Zanker foi pensado para resolver os desafios do seu dia a dia.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Feature List */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {showcaseData.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeatureId(feature.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                  activeFeatureId === feature.id
                    ? 'bg-light-blue shadow-sm'
                    : 'hover:bg-slate-100/50'
                } ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className={`flex-shrink-0 p-3 rounded-md transition-colors ${activeFeatureId === feature.id ? 'bg-primary text-white' : 'bg-slate-200 text-primary'}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${activeFeatureId === feature.id ? 'text-primary' : 'text-text-main'}`}>
                    {feature.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 lg:mt-0">
             <div className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '300ms'}}>
                <h3 className="text-2xl font-bold text-text-main">{activeFeature.headline}</h3>
                <p className="mt-2 text-text-secondary">{activeFeature.description}</p>
             </div>
            <div className={`mt-6 relative transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{transitionDelay: '500ms'}}>
                <div className="bg-slate-100 rounded-xl p-2 shadow-lg">
                    <img
                      key={activeFeature.id} // Re-triggers animation on change
                      src={activeFeature.imageSrc}
                      alt={`Demonstração da funcionalidade ${activeFeature.title}`}
                      className="w-full h-auto object-cover rounded-lg animate-scale-in"
                      loading="lazy"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
import React from 'react';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const PlanCard: React.FC<{
    plan: {
        name: string;
        price: string;
        features: string[];
        buttonText: string;
        isPopular?: boolean;
    }
}> = ({ plan }) => {
    const cardClasses = `
        bg-white rounded-2xl p-8 transition-all duration-300 w-full flex flex-col
        ${plan.isPopular ? 'border-2 border-primary shadow-2xl shadow-primary/20 transform lg:scale-105' : 'border border-slate-200 shadow-lg'}
    `;
    const buttonClasses = `
        w-full py-3 px-6 rounded-lg font-semibold text-lg mt-8 transition-all duration-300 text-center
        ${plan.isPopular ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-px' : 'bg-light-blue text-primary hover:bg-blue-200'}
    `;

    return (
        <div className={cardClasses}>
            {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                        Mais Vendido
                    </span>
                </div>
            )}
            <h3 className="text-2xl font-bold text-text-main text-center">{plan.name}</h3>
            <div className="text-center mt-4">
                <span className="text-5xl font-extrabold text-text-main">R${plan.price}</span>
                <span className="text-text-secondary">/mês</span>
            </div>
            <ul className="mt-8 space-y-4 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span className="ml-3 text-text-secondary">{feature}</span>
                    </li>
                ))}
            </ul>
            <a href="#cta" className={buttonClasses}>{plan.buttonText}</a>
        </div>
    );
};

const pricingPlans = [
    {
        name: 'Essencial',
        price: '299',
        features: [
            'Até 5 usuários',
            'Até 10 projetos simultâneos',
            'Módulos de Orçamento e Cronograma',
            'Suporte via e-mail'
        ],
        buttonText: 'Começar com Essencial',
    },
    {
        name: 'Profissional',
        price: '599',
        features: [
            'Até 15 usuários',
            'Até 30 projetos simultâneos',
            'Todos os módulos do Essencial +',
            'Compras e Acompanhamento',
            'Relatórios Avançados',
            'Suporte Prioritário (Chat e E-mail)',
        ],
        buttonText: 'Escolher Profissional',
        isPopular: true,
    },
    {
        name: 'Enterprise',
        price: '899',
        features: [
            'Usuários ilimitados',
            'Projetos ilimitados',
            'Todos os módulos do Profissional +',
            'Gestão de Escritório',
            'Onboarding Personalizado',
            'Gerente de Conta Dedicado',
        ],
        buttonText: 'Fale com um especialista',
    },
];

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-24 bg-light-gray">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-text-main tracking-tight">Planos transparentes para o tamanho do seu negócio</h2>
                    <p className="mt-4 text-lg text-text-secondary">
                        Escolha o plano ideal e comece a transformar a gestão das suas obras hoje mesmo.
                    </p>
                </div>
                <div className="mt-20 flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-4">
                    {pricingPlans.map((plan) => (
                        <div key={plan.name} className="w-full max-w-sm relative">
                             <PlanCard plan={plan} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
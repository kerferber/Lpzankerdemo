import React, { useEffect, useRef, useState } from 'react';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const AnimatedPrice: React.FC<{ price: number }> = ({ price }) => {
    const [currentPrice, setCurrentPrice] = useState(price);
    const prevPriceRef = useRef(price);

    useEffect(() => {
        const startPrice = prevPriceRef.current;
        const endPrice = price;
        prevPriceRef.current = price;

        if (startPrice === endPrice) {
            setCurrentPrice(endPrice);
            return;
        };

        let startTime: number;
        const duration = 400;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            const animatedValue = Math.round(startPrice + (endPrice - startPrice) * percentage);
            setCurrentPrice(animatedValue);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

    }, [price]);

    return <>{currentPrice}</>;
};

const plansData = [
    {
        name: 'Essencial',
        prices: { monthly: 299, annual: 299 * 10 },
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
        prices: { monthly: 599, annual: 599 * 10 },
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
        prices: { monthly: 899, annual: 899 * 10 },
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

const PlanCard: React.FC<{
    plan: typeof plansData[0];
    billingCycle: 'monthly' | 'annual';
}> = ({ plan, billingCycle }) => {
    const cardClasses = `
        bg-white rounded-2xl p-8 transition-all duration-300 w-full flex flex-col h-full
        ${plan.isPopular ? 'border-2 border-primary shadow-2xl shadow-primary/20 transform lg:scale-105' : 'border border-slate-200 shadow-lg'}
    `;
    const buttonClasses = `
        w-full py-3 px-6 rounded-lg font-semibold text-lg mt-8 transition-all duration-300 text-center
        ${plan.isPopular ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-px' : 'bg-light-blue text-primary hover:bg-blue-200'}
    `;

    const price = billingCycle === 'monthly' 
        ? plan.prices.monthly 
        : Math.round(plan.prices.annual / 12);

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
                <span className="text-5xl font-extrabold text-text-main">R$<AnimatedPrice price={price} /></span>
                <span className="text-text-secondary">/mês</span>
                 {billingCycle === 'annual' && <p className="text-sm text-primary font-semibold mt-1">Cobrado R${plan.prices.annual.toLocaleString('pt-BR')}/ano</p>}
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


const Pricing: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

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
        <section ref={sectionRef} id="pricing" className="py-16 md:py-24 bg-light-blue overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">Planos transparentes para o tamanho do seu negócio</h2>
                    <p className="mt-4 text-lg text-text-secondary">
                        Escolha o plano ideal e comece a transformar a gestão das suas obras hoje mesmo.
                    </p>
                </div>
                <div id="pricing-selector" className={`mt-10 flex justify-center items-center gap-4 transition-all duration-600 ease-out delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={`font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-primary' : 'text-text-secondary'}`}>Mensal</span>
                    <button
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-blue`}
                        role="switch"
                        aria-checked={billingCycle === 'annual'}
                    >
                        <span className="sr-only">Alternar plano de pagamento</span>
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${billingCycle === 'annual' ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <span className={`font-semibold relative transition-colors ${billingCycle === 'annual' ? 'text-primary' : 'text-text-secondary'}`}>
                        Anual
                        <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full transform transition-all duration-300 ease-out ${billingCycle === 'annual' ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
                            2 meses grátis
                        </span>
                    </span>
                </div>
                <div className="mt-16 flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-4">
                    {plansData.map((plan, index) => (
                        <div key={plan.name} className={`w-full max-w-sm relative transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{transitionDelay: `${index * 150 + 200}ms`}}>
                             <PlanCard plan={plan} billingCycle={billingCycle} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
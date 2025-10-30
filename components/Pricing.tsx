import React, { useState, useEffect, useRef } from 'react';

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-6 text-secondary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const pricingPlans = {
    monthly: [
        { name: 'Básico', price: '299', description: 'Para profissionais autônomos e pequenos escritórios.', features: ['2 Usuários', '5 Projetos ativos', 'Orçamento e cronograma', 'Diário de obra', 'Suporte via e-mail'], cta: 'Começar agora' },
        { name: 'Profissional', price: '599', description: 'Para escritórios em crescimento e construtoras.', features: ['10 Usuários', 'Projetos ilimitados', 'Tudo do Básico, e mais:', 'Portal do Cliente', 'Módulo de Compras', 'Relatórios Avançados', 'Suporte prioritário'], cta: 'Escolher Profissional', popular: true },
        { name: 'Empresa', price: 'Customizado', description: 'Para grandes construtoras e incorporadoras.', features: ['Usuários ilimitados', 'Tudo do Profissional, e mais:', 'Gestão de RH', 'CRM de Vendas', 'Onboarding personalizado', 'Gerente de conta dedicado'], cta: 'Fale conosco', popular: false },
    ],
    annually: [
        { name: 'Básico', price: '249', description: 'Para profissionais autônomos e pequenos escritórios.', features: ['2 Usuários', '5 Projetos ativos', 'Orçamento e cronograma', 'Diário de obra', 'Suporte via e-mail'], cta: 'Começar agora' },
        { name: 'Profissional', price: '499', description: 'Para escritórios em crescimento e construtoras.', features: ['10 Usuários', 'Projetos ilimitados', 'Tudo do Básico, e mais:', 'Portal do Cliente', 'Módulo de Compras', 'Relatórios Avançados', 'Suporte prioritário'], cta: 'Escolher Profissional', popular: true },
        { name: 'Empresa', price: 'Customizado', description: 'Para grandes construtoras e incorporadoras.', features: ['Usuários ilimitados', 'Tudo do Profissional, e mais:', 'Gestão de RH', 'CRM de Vendas', 'Onboarding personalizado', 'Gerente de conta dedicado'], cta: 'Fale conosco', popular: false },
    ]
};

const PlanCard: React.FC<{plan: typeof pricingPlans.monthly[0]}> = ({ plan }) => (
    <div className={`relative p-8 bg-white border rounded-xl flex flex-col ${plan.popular ? 'border-primary shadow-xl' : 'border-slate-200'}`}>
        {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">Mais Popular</div>}
        <h3 className="text-xl font-bold text-text-main">{plan.name}</h3>
        <p className="mt-2 text-text-secondary flex-grow">{plan.description}</p>
        <div className="mt-6">
            {plan.price === 'Customizado' ? (
                <p className="text-4xl font-bold text-text-main">Customizado</p>
            ) : (
                <p className="text-4xl font-bold text-text-main">
                    R$ {plan.price}<span className="text-lg font-medium text-text-secondary">/mês</span>
                </p>
            )}
        </div>
        <a href="#cta" className={`mt-8 block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${plan.popular ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-light-blue text-primary hover:bg-blue-200'}`}>
            {plan.cta}
        </a>
        <ul className="mt-8 space-y-4 text-text-main">
            {plan.features.map(feature => (
                <li key={feature} className="flex items-start">
                    <CheckIcon />
                    <span className="ml-3">{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);


const Pricing: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
    const [activeMobileTab, setActiveMobileTab] = useState('Profissional');
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
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const plans = pricingPlans[billingCycle];
    const activeMobilePlan = plans.find(p => p.name === activeMobileTab);

    return (
        <section ref={sectionRef} id="pricing" className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="text-primary font-semibold tracking-wider uppercase mb-2">Planos e Preços</p>
                    <h2 className="font-display text-4xl font-semibold text-text-main tracking-normal leading-tight">Escolha o plano que se encaixa no seu negócio.</h2>
                    <p className="mt-4 text-lg text-text-secondary">
                        Comece com 14 dias grátis. Cancele quando quiser.
                    </p>
                </div>
                
                <div id="pricing-selector" className={`mt-10 flex justify-center items-center gap-4 transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={`font-medium ${billingCycle === 'monthly' ? 'text-primary' : 'text-text-secondary'}`}>Mensal</span>
                    <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')} className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-slate-300">
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`font-medium ${billingCycle === 'annually' ? 'text-primary' : 'text-text-secondary'}`}>
                        Anual <span className="hidden sm:inline-block ml-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-bold rounded-full">Economize 2 meses</span>
                    </span>
                </div>

                {/* Desktop View */}
                <div className="mt-12 hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <div key={plan.name} className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 150 + 300}ms`}}>
                           <PlanCard plan={plan} />
                        </div>
                    ))}
                </div>

                {/* Mobile Tab View */}
                <div className="mt-8 lg:hidden">
                    <div className="p-1 bg-slate-100 rounded-lg flex justify-between items-center">
                        {plans.map(plan => (
                             <button 
                                key={plan.name}
                                onClick={() => setActiveMobileTab(plan.name)}
                                className={`w-full text-center py-2 px-1 rounded-md text-sm font-semibold transition-colors relative ${activeMobileTab === plan.name ? 'bg-primary text-white shadow' : 'text-text-secondary hover:bg-slate-200'}`}
                             >
                                {plan.name}
                                {plan.popular && activeMobileTab !== plan.name && <span className="absolute -top-2 -right-2 block h-3 w-3 rounded-full bg-primary ring-2 ring-white"></span>}
                             </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        {activeMobilePlan && <PlanCard plan={activeMobilePlan} />}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Pricing;
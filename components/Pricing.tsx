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
        { name: 'Empresa', price: '899', description: 'Para grandes construtoras e incorporadoras.', features: ['Usuários ilimitados', 'Tudo do Profissional, e mais:', 'Gestão de RH', 'CRM de Vendas', 'Onboarding personalizado', 'Gerente de conta dedicado'], cta: 'Escolher Empresa', popular: false },
    ],
    annually: [
        { name: 'Básico', price: '249', description: 'Para profissionais autônomos e pequenos escritórios.', features: ['2 Usuários', '5 Projetos ativos', 'Orçamento e cronograma', 'Diário de obra', 'Suporte via e-mail'], cta: 'Começar agora' },
        { name: 'Profissional', price: '499', description: 'Para escritórios em crescimento e construtoras.', features: ['10 Usuários', 'Projetos ilimitados', 'Tudo do Básico, e mais:', 'Portal do Cliente', 'Módulo de Compras', 'Relatórios Avançados', 'Suporte prioritário'], cta: 'Escolher Profissional', popular: true },
        { name: 'Empresa', price: '749', description: 'Para grandes construtoras e incorporadoras.', features: ['Usuários ilimitados', 'Tudo do Profissional, e mais:', 'Gestão de RH', 'CRM de Vendas', 'Onboarding personalizado', 'Gerente de conta dedicado'], cta: 'Escolher Empresa', popular: false },
    ]
};

const AnimatedPrice: React.FC<{ price: string }> = ({ price: endPriceStr }) => {
    const endPrice = Number(endPriceStr);
    const [displayPrice, setDisplayPrice] = useState(endPrice);
    const animationFrameRef = useRef<number>();
    const previousPriceRef = useRef(endPrice);

    useEffect(() => {
        const startPrice = previousPriceRef.current;
        previousPriceRef.current = endPrice;

        if (startPrice === endPrice || isNaN(endPrice) || isNaN(startPrice)) {
            if (!isNaN(endPrice)) setDisplayPrice(endPrice);
            return;
        }

        let startTimestamp: number | null = null;
        const duration = 400;

        const animate = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

            const value = Math.round(startPrice + (endPrice - startPrice) * easedProgress);
            setDisplayPrice(value);

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [endPrice]);
    
    if (isNaN(endPrice)) return null;

    return (
        <p className="text-4xl font-bold text-text-main">
            R$ {displayPrice}<span className="text-lg font-medium text-text-secondary">/mês</span>
        </p>
    );
};


const PlanCard: React.FC<{plan: typeof pricingPlans.monthly[0], billingCycle: string}> = ({ plan, billingCycle }) => (
    <div className={`relative p-8 bg-white border rounded-xl flex flex-col h-full ${plan.popular ? 'border-primary shadow-xl' : 'border-slate-200'}`}>
        {plan.popular && <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">Mais Popular</div>}
        <h3 className="text-xl font-bold text-text-main">{plan.name}</h3>
        <p className="mt-2 text-text-secondary flex-grow">{plan.description}</p>
        <div className="mt-6 relative h-12 flex items-center">
            {plan.price === 'Customizado' ? (
                <p className="text-4xl font-bold text-text-main">Customizado</p>
            ) : (
                <AnimatedPrice key={plan.name} price={plan.price} />
            )}
        </div>
        <a href="#cta" className={`mt-8 block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all active:scale-95 ${plan.popular ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-light-blue text-primary hover:bg-blue-200'}`}>
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
    const [activeMobilePlanIndex, setActiveMobilePlanIndex] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isScrollingProgrammatically = useRef(false);
    const isInitialSetupComplete = useRef(false);
    const [inView, setInView] = useState(false);
    
    useEffect(() => {
      cardRefs.current = cardRefs.current.slice(0, pricingPlans[billingCycle].length);
    }, [billingCycle]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: isMobile ? 0.15 : 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const scrollToCard = (index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
        const cardElement = cardRefs.current[index];
        if (cardElement && sliderRef.current) {
            isScrollingProgrammatically.current = true;
            sliderRef.current.scrollTo({
                left: cardElement.offsetLeft - sliderRef.current.offsetLeft,
                behavior: behavior
            });
            setTimeout(() => { isScrollingProgrammatically.current = false; }, 500); // Wait for scroll to finish
        }
    };
    
    // Handles the complete initial setup on mobile
    useEffect(() => {
        if (inView && !isInitialSetupComplete.current && window.innerWidth < 1024) {
            const initialIndex = 1; // 'Profissional'
            
            // 1. Set the active tab state to ensure it's correct from the start.
            setActiveMobilePlanIndex(initialIndex);
            
            // 2. Scroll the card carousel to the correct position.
            const scrollTimer = setTimeout(() => {
                scrollToCard(initialIndex, 'auto');
            }, 100);
            
            // 3. Mark setup as complete after animations are done, so the user-scroll observer can take over.
            const setupCompleteTimer = setTimeout(() => {
                isInitialSetupComplete.current = true;
            }, 600); 

            return () => {
              clearTimeout(scrollTimer);
              clearTimeout(setupCompleteTimer);
            };
        }
    }, [inView]);

    // Handles user-driven swipes on the carousel
    useEffect(() => {
        if (window.innerWidth >= 1024 || !inView || !sliderRef.current) return;
    
        const observer = new IntersectionObserver(
            (entries) => {
                // Do not update state if initial setup isn't done or if a programmatic scroll is happening.
                if (!isInitialSetupComplete.current || isScrollingProgrammatically.current) return;
    
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (index > -1) {
                            setActiveMobilePlanIndex(index);
                            return;
                        }
                    }
                }
            },
            { root: sliderRef.current, threshold: 0.7 }
        );
    
        const currentCardRefs = cardRefs.current;
        currentCardRefs.forEach(card => {
            if (card) observer.observe(card);
        });
    
        return () => {
            currentCardRefs.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, [inView, billingCycle]);

    const handleTabClick = (index: number) => {
        setActiveMobilePlanIndex(index);
        scrollToCard(index);
    }

    const plans = pricingPlans[billingCycle];

    return (
        <section ref={sectionRef} id="pricing" className="pt-12 pb-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="text-primary font-semibold mb-2">Planos e Preços</p>
                    <h2 className="font-display text-3xl font-bold text-text-main tracking-normal leading-tight">Escolha o plano que se encaixa no seu negócio.</h2>
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
                           <PlanCard plan={plan} billingCycle={billingCycle} />
                        </div>
                    ))}
                </div>

                {/* Mobile Swipeable View with Tabs */}
                <div className="mt-8 lg:hidden">
                    <div className="p-1 bg-slate-100 rounded-lg flex justify-between items-center">
                        {plans.map((plan, index) => (
                             <button 
                                key={plan.name}
                                onClick={() => handleTabClick(index)}
                                className={`w-full text-center py-2 px-1 rounded-md text-sm font-semibold transition-colors relative ${activeMobilePlanIndex === index ? 'bg-primary text-white shadow' : 'text-text-secondary hover:bg-slate-200'}`}
                             >
                                {plan.name}
                                {plan.popular && activeMobilePlanIndex !== index && <span className="absolute -top-2 -right-2 block h-3 w-3 rounded-full bg-primary ring-2 ring-white"></span>}
                             </button>
                        ))}
                    </div>
                    <div 
                        ref={sliderRef}
                        className="mt-4 flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 gap-4"
                        style={{scrollPadding: '0 5%'}}
                    >
                        {plans.map((plan, index) => (
                            <div
                                key={plan.name}
                                ref={el => { cardRefs.current[index] = el; }}
                                className="flex-shrink-0 snap-center w-[90%]"
                            >
                                <PlanCard plan={plan} billingCycle={billingCycle} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center space-x-2">
                        {plans.map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleTabClick(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeMobilePlanIndex === index ? 'bg-primary scale-110' : 'bg-slate-300 hover:bg-slate-400'}`}
                                aria-label={`Ir para o plano ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
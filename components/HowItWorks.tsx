import React, { useEffect, useRef, useState } from 'react';

const steps = [
    {
        number: '01',
        title: 'Planeje seu projeto',
        description: 'Cadastre sua obra, importe seu orçamento e defina o cronograma físico-financeiro em poucos cliques.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
    },
    {
        number: '02',
        title: 'Execute e acompanhe',
        description: 'Sua equipe no canteiro registra o avanço diário pelo celular, enquanto você monitora tudo em tempo real no escritório.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    },
    {
        number: '03',
        title: 'Analise e decida',
        description: 'Com relatórios automáticos de previsto vs. realizado, você toma decisões baseadas em dados e mantém o cliente informado.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
    }
];

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: isMobile ? 0.2 : 0.4 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="how-it-works" className="py-16 md:py-24 bg-light-gray bg-dot-pattern bg-dot-pattern-size overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="text-primary font-semibold mb-2">Simples e Eficiente</p>
                    <h2 className="font-display text-3xl font-bold text-text-main tracking-normal leading-tight">Comece a usar em 3 passos simples.</h2>
                    <p className="mt-4 text-lg text-text-secondary">
                        Nossa plataforma foi desenhada para ser intuitiva, do planejamento à entrega.
                    </p>
                </div>
                <div className="mt-16 relative">
                    {/* Dashed line for desktop with animation */}
                    <div className={`hidden lg:block absolute top-12 left-0 w-full border-t-2 border-dashed border-primary/40 transform origin-left transition-transform duration-1000 ease-out ${inView ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: '300ms' }}></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
                        {steps.map((step, index) => (
                            <div key={step.number} className="text-center">
                                <div className="relative inline-block">
                                    <div className={`flex items-center justify-center w-24 h-24 mx-auto bg-white rounded-full shadow-lg border-2 border-primary/20 transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={{ transitionDelay: `${index * 200 + 200}ms` }}>
                                        {step.icon}
                                    </div>
                                    <span className={`absolute -top-3 -right-3 flex items-center justify-center w-12 h-12 bg-primary text-white font-bold text-xl rounded-full border-4 border-light-gray transition-all duration-300 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} style={{ transitionDelay: `${index * 200 + 400}ms` }}>
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className={`mt-6 text-2xl font-bold text-text-main transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${index * 200 + 300}ms` }}>
                                    {step.title}
                                </h3>
                                <p className={`mt-2 text-text-secondary transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${index * 200 + 400}ms` }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
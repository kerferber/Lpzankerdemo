import React, { useState, useEffect, useRef } from 'react';

const FloatingBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLElement | null>(null);
    const pricingRef = useRef<HTMLElement | null>(null);
    
    useEffect(() => {
        // We find the elements once and store them in refs for efficiency
        heroRef.current = document.getElementById('hero');
        pricingRef.current = document.getElementById('pricing');

        const toggleVisibility = () => {
            if (!heroRef.current || !pricingRef.current) {
                setIsVisible(false);
                return;
            }
            
            const heroRect = heroRef.current.getBoundingClientRect();
            const pricingRect = pricingRef.current.getBoundingClientRect();
            
            // Condition to SHOW: The hero section is mostly scrolled out of view (its bottom is near the top of the viewport).
            const hasScrolledPastHero = heroRect.bottom < 150;
            
            // Condition to HIDE: The top of the pricing section is visible on screen.
            const pricingSectionIsVisible = pricingRect.top < window.innerHeight;

            // The banner is visible if we've scrolled past the hero AND the pricing section is not yet visible.
            setIsVisible(hasScrolledPastHero && !pricingSectionIsVisible);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility(); // Initial check

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-6 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="relative max-w-md mx-auto bg-primary/90 backdrop-blur-sm p-3 rounded-2xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-white text-sm sm:text-base">
                            Comece a partir de <span className="font-extrabold">R$ 299/mês</span>
                        </p>
                        <span className="mt-1 inline-block bg-white text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                            14 dias grátis
                        </span>
                    </div>
                    <a
                        href="#pricing"
                        className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-light-blue transition-all duration-300 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-px flex-shrink-0"
                    >
                        Escolher plano
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FloatingBanner;

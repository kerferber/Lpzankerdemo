import React, { useState, useEffect } from 'react';

const FloatingBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const toggleVisibility = () => {
            // Query for the element inside the handler to avoid race conditions on mount
            const pricingSection = document.getElementById('pricing');
            const hasScrolledEnough = window.scrollY > 500;

            if (!pricingSection) {
                // If the section isn't found, fall back to simple scroll depth
                setIsVisible(hasScrolledEnough);
                return;
            }
            
            // The banner should disappear when the top of the pricing section becomes visible
            const sectionIsEnteringView = pricingSection.getBoundingClientRect().top <= window.innerHeight;

            // Show banner if scrolled enough AND the pricing section is NOT yet in view
            setIsVisible(hasScrolledEnough && !sectionIsEnteringView);
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
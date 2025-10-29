import React, { useState, useEffect } from 'react';

const FloatingBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const pricingSelector = document.getElementById('pricing-selector');

        const toggleVisibility = () => {
            const hasScrolledEnough = window.scrollY > 500;
            
            if (!pricingSelector) {
                // Fallback behavior if the pricing selector isn't found
                setIsVisible(hasScrolledEnough);
                return;
            }
            
            // Disappears when the top of the selector is at or above the viewport bottom edge
            const selectorIsInView = pricingSelector.getBoundingClientRect().top <= window.innerHeight;

            setIsVisible(hasScrolledEnough && !selectorIsInView);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility(); // Check visibility on initial render

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-6 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="relative max-w-lg mx-auto bg-primary/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-white text-base sm:text-lg">
                            Comece a partir de <span className="font-extrabold">R$ 299/mês</span>
                        </p>
                        <span className="mt-1 inline-block bg-white text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                            14 dias grátis
                        </span>
                    </div>
                    <a
                        href="#pricing"
                        className="bg-white text-primary px-5 sm:px-6 py-3 rounded-xl font-semibold hover:bg-light-blue transition-all duration-300 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-px flex-shrink-0"
                    >
                        Escolher plano
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FloatingBanner;
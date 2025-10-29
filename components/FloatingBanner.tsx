import React, { useState, useEffect } from 'react';

const FloatingBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="bg-primary-dark/95 backdrop-blur-sm p-4 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                    <p className="text-white font-medium text-center sm:text-left">
                        <span className="hidden sm:inline">Comece hoje! </span>
                        Planos a partir de <span className="font-bold">R$299/mês</span>.
                    </p>
                    <a
                        href="#pricing"
                        className="bg-white text-primary px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 shadow-sm flex-shrink-0"
                    >
                        Escolha seu plano
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FloatingBanner;
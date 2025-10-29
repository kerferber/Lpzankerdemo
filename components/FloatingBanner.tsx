import React, { useState, useEffect } from 'react';

const FloatingBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const shouldBeVisible = window.scrollY > 500 && window.scrollY < (document.body.offsetHeight - 1200);
            if (shouldBeVisible) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (isClosed) {
        return null;
    }

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="bg-primary-dark/95 backdrop-blur-sm p-4 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                    <p className="text-white font-medium text-center sm:text-left">
                        <span className="hidden sm:inline">Comece hoje! </span>
                        Planos a partir de <span className="font-bold">R$299/mês</span>.
                    </p>
                    <div className="flex items-center gap-4">
                         <a
                            href="#pricing"
                            className="bg-white text-primary px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 shadow-sm flex-shrink-0"
                        >
                            Escolha seu plano
                        </a>
                        <button 
                            onClick={() => setIsClosed(true)} 
                            aria-label="Fechar banner"
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingBanner;
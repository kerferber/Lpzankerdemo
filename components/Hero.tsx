import React from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-32 pb-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main leading-tight tracking-tighter">
              Sua obra sob controle — do <span className="text-primary">orçamento</span> à <span className="text-primary">entrega</span>.
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto lg:mx-0">
              Gerencie todas as etapas do seu projeto em uma plataforma integrada, visual e fácil de usar. Chega de planilhas e informações perdidas.
            </p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <a
                href="#cta"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40"
              >
                Ver o sistema na prática
              </a>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-primary mr-2" />
                <span className="text-slate-600 font-medium">Economia de custos</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-primary mr-2" />
                <span className="text-slate-600 font-medium">Obras dentro do prazo</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-primary mr-2" />
                <span className="text-slate-600 font-medium">Controle total</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 lg:mt-0">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Dashboard do sistema Zanker"
                className="rounded-lg shadow-2xl relative z-10 animate-float"
                style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(37, 99, 235, 0.1)'}}
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-light-blue rounded-full z-0 hidden sm:block"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-light-gray rounded-full z-0 hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
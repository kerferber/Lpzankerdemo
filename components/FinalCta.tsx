import React from 'react';

const FinalCta: React.FC = () => {
  return (
    <section id="cta" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-primary px-8 py-20 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              Deixe de correr atrás e comece a liderar a obra.
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Descubra como nossa plataforma pode economizar seu tempo, reduzir custos e dar mais visibilidade aos seus projetos.
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-block bg-white text-primary px-10 py-4 rounded-lg font-semibold text-xl hover:bg-light-blue transition-colors duration-300"
              >
                Quero ver o painel em ação.
              </a>
              <p className="mt-4 text-sm text-blue-200">Sem cartão de crédito. Sem compromisso.</p>
            </div>
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                <circle cx="512" cy="512" r="512" fill="url(#gradient-blobs)" fillOpacity="0.7"></circle>
                <defs>
                  <radialGradient id="gradient-blobs">
                    <stop stopColor="#7775D6"></stop>
                    <stop offset="1" stopColor="#2563EB"></stop>
                  </radialGradient>
                </defs>
            </svg>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
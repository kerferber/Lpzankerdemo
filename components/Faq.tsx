import React, { useState, useEffect, useRef } from 'react';

const faqData = [
  {
    question: 'O sistema é adequado para pequenas empresas?',
    answer: 'Sim! Nossa plataforma é modular e escalável, atendendo desde profissionais autônomos e pequenos escritórios até grandes construtoras. Você usa apenas o que precisa.',
  },
  {
    question: 'Preciso instalar algum software?',
    answer: 'Não. O sistema é 100% online (SaaS). Você pode acessá-lo de qualquer dispositivo com conexão à internet, seja computador, tablet ou smartphone.',
  },
  {
    question: 'Existe algum tipo de suporte ou treinamento?',
    answer: 'Oferecemos um processo de onboarding completo para você e sua equipe, além de suporte contínuo via chat, e-mail e telefone para garantir que você extraia o máximo da ferramenta.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'A segurança é nossa prioridade. Utilizamos criptografia de ponta, servidores seguros e rotinas de backup constantes para garantir a proteção e a integridade das suas informações.',
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-blue-200/50">
      <button
        className="w-full flex justify-between items-center text-left py-6"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-text-main">{question}</span>
        <span className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-text-secondary pr-8">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }))
  };

  return (
    <section ref={sectionRef} id="faq" className="py-16 md:py-24 bg-light-gray bg-dot-pattern bg-dot-pattern-size overflow-hidden">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="font-display text-3xl font-bold text-text-main tracking-normal leading-tight">Perguntas Frequentes</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Tire suas dúvidas sobre nossa plataforma e veja como podemos ajudar seu negócio a crescer.
          </p>
        </div>
        <div className={`mt-12 max-w-3xl mx-auto bg-white/50 p-4 sm:p-8 rounded-xl transition-all duration-600 ease-out delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
              style={{transitionDelay: `${index * 100 + 300}ms`}}
            >
              <FaqItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
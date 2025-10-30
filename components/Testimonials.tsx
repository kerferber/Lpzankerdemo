import React, { useEffect, useRef, useState, useCallback } from 'react';

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

const LinkedInIcon: React.FC = () => (
    <svg className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const testimonialsData = [
  { name: "João Silva", role: "Eng. Civil, Construtora Exemplo", avatar: "https://picsum.photos/seed/person1/64/64", quote: "Antes era tudo em planilha e WhatsApp — eu só descobria o problema quando já tinha estourado. Hoje abro o sistema de manhã e tenho um relatório claro de custo, prazo e compras pendentes. Zero adivinhação." },
  { name: "Mariana Costa", role: "Arquiteta, MC Arquitetura", avatar: "https://picsum.photos/seed/person2/64/64", quote: "Finalmente uma ferramenta que entende as necessidades de um escritório de arquitetura. O módulo de gestão de projetos e propostas é fantástico. Economizamos horas toda semana." },
  { name: "Carlos Pereira", role: "Diretor, PROJETO Construtora", avatar: "https://picsum.photos/seed/person3/64/64", quote: "A funcionalidade de cronograma físico-financeiro é um divisor de águas. Conseguimos antecipar desvios e tomar ações corretivas muito mais rápido." },
  { name: "Ana Beatriz", role: "Eng. de Planejamento, INNOVA Eng.", avatar: "https://picsum.photos/seed/person4/64/64", quote: "O portal do cliente é excelente. Reduziu em 80% as ligações para saber 'como está a obra'. Profissionalismo puro que impressiona e fideliza." }
];

const TestimonialCard: React.FC<{ name: string; role: string; avatar: string; quote: string; }> = ({ name, role, avatar, quote }) => (
    <div className="bg-light-blue p-8 rounded-xl relative overflow-hidden h-full flex flex-col min-w-full">
        <div className="absolute -top-1 -left-2 text-primary/10" aria-hidden="true">
            <svg width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M10 7L8 11H11V17H5V11L7 7M18 7L16 11H19V17H13V11L15 7Z"/></svg>
        </div>
        <div className="relative z-10 flex-grow">
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
            </div>
            <blockquote className="text-lg text-text-main mb-6 font-medium">
                "{quote}"
            </blockquote>
        </div>
        <div className="relative z-10 flex items-center justify-between mt-auto">
            <div className="flex items-center">
                <img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4 object-cover" />
                <div>
                    <p className="font-bold text-text-main text-lg">{name}</p>
                    <p className="text-text-secondary">{role}</p>
                </div>
            </div>
             <a href="#" className="group" aria-label={`Perfil de ${name} no LinkedIn`}>
                <LinkedInIcon />
            </a>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  // Fix: Use `ReturnType<typeof setInterval>` for the interval ref to ensure correct typing in a browser environment.
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [inView, setInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const nextSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };
  
  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(nextSlide, 8000);
  }, [nextSlide]);

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
        startAutoplay();
    }
    return stopAutoplay;
  }, [inView, startAutoplay]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    stopAutoplay();
    setIsDragging(true);
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
    if(sliderRef.current) sliderRef.current.style.transition = 'none';
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(currentX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if(sliderRef.current) sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
    
    if (dragOffset < -50) {
        nextSlide();
    } else if (dragOffset > 50) {
        prevSlide();
    }
    
    setDragOffset(0);
    startAutoplay();
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">‘Hoje eu sei exatamente onde estou perdendo dinheiro’</h2>
          <p className="mt-4 text-lg text-text-secondary">
            A confiança de quem usa e aprova nossa plataforma é nosso maior ativo.
          </p>
        </div>
        <div className="mt-16 max-w-5xl mx-auto relative">
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
             <div 
                ref={sliderRef}
                className="flex" 
                style={{ 
                  transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                  transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                }}
              >
                  {testimonialsData.map((testimonial) => (
                      <div key={testimonial.name} className="w-full flex-shrink-0 px-1" style={{ userSelect: 'none' }}>
                           <TestimonialCard {...testimonial} />
                      </div>
                  ))}
              </div>
          </div>
          
           {/* Navigation Buttons */}
           <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 lg:-left-12 p-2 bg-white rounded-full shadow-lg hover:bg-light-blue transition-colors z-10" aria-label="Depoimento anterior">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 lg:-right-12 p-2 bg-white rounded-full shadow-lg hover:bg-light-blue transition-colors z-10" aria-label="Próximo depoimento">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dot Indicators */}
            <div className="mt-8 flex justify-center space-x-2">
                {testimonialsData.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-primary scale-110' : 'bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Ir para o depoimento ${index + 1}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import React, { useEffect, useRef, useState } from 'react';

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialCard: React.FC<{ name: string; role: string; avatar: string; quote: string; }> = ({ name, role, avatar, quote }) => (
    <div className="bg-light-blue p-8 rounded-xl relative overflow-hidden h-full">
        <div className="absolute -top-1 -left-2 text-primary/10" aria-hidden="true">
            <svg width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M10 7L8 11H11V17H5V11L7 7M18 7L16 11H19V17H13V11L15 7Z"/></svg>
        </div>
        <div className="relative z-10">
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
            </div>
            <blockquote className="text-lg text-text-main mb-6 font-medium">
                "{quote}"
            </blockquote>
            <div className="flex items-center">
                <img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4 object-cover" />
                <div>
                    <p className="font-bold text-text-main text-lg">{name}</p>
                    <p className="text-text-secondary">{role}</p>
                </div>
            </div>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl font-extrabold text-text-main tracking-tight leading-tight">O que nossos clientes dizem</h2>
          <p className="mt-4 text-lg text-text-secondary">
            A confiança de quem usa e aprova nossa plataforma é nosso maior ativo.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '200ms'}}>
            <TestimonialCard 
              name="João Silva"
              role="Engenheiro Civil, Construtora Exemplo"
              avatar="https://picsum.photos/seed/person1/64/64"
              quote="A plataforma revolucionou nossa gestão. O controle financeiro ficou muito mais claro e a comunicação com a equipe de campo melhorou 100%. Recomendo fortemente!"
            />
          </div>
          <div className={`transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '300ms'}}>
           <TestimonialCard 
            name="Mariana Costa"
            role="Arquiteta, MC Arquitetura"
            avatar="https://picsum.photos/seed/person2/64/64"
            quote="Finalmente uma ferramenta que entende as necessidades de um escritório de arquitetura. O módulo de gestão de projetos e propostas é fantástico. Economizamos horas toda semana."
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
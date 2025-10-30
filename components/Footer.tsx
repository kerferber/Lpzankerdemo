import React, { useEffect, useRef, useState } from 'react';

const LogoWhite = () => (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6667 4V28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 16H17.3333" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="28" y="23" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="white">Zanker</text>
    </svg>
);

const SocialIcon: React.FC<{ href: string; path: string; label: string; }> = ({ href, path, label }) => (
    <a href={href} className="text-slate-400 hover:text-white transition-colors">
        <span className="sr-only">{label}</span>
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

const footerLinks = [
    {
        title: "Soluções",
        links: [
            { label: "Orçamento", href: "#features" },
            { label: "Cronograma", href: "#features" },
            { label: "Acompanhamento", href: "#features" },
        ]
    },
    {
        title: "Empresa",
        links: [
            { label: "Sobre nós", href: "#" },
            { label: "Contato", href: "#" },
            { label: "Carreiras", href: "#" },
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Termos de Serviço", href: "#" },
            { label: "Política de Privacidade", href: "#" },
        ]
    }
];


const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleToggle = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <footer ref={sectionRef} className="bg-slate-900 text-slate-400 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Desktop Footer */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`lg:col-span-4 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '200ms'}}>
            <LogoWhite />
            <p className="mt-4 text-sm">A plataforma completa para gestão de obras e projetos.</p>
             <div className="flex mt-6 space-x-6">
                <SocialIcon href="#" label="Facebook" path="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                <SocialIcon href="#" label="Instagram" path="M12 2C8.74 2 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.784.297-1.459.717-2.126 1.384S.926 3.356.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.297.784.717 1.459 1.384 2.126.667.666 1.342 1.087 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.784-.297 1.459-.718 2.126-1.384.666-.667 1.087-1.342 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.297-.784-.718-1.459-1.384-2.126C20.644.926 19.969.505 19.186.209 18.42.095 17.55.058 16.225.013 15.07 0 14.58 0 12 0zm0 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.17-.053-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.013-3.584.07-4.85c.053-1.17.249 1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819.679 1.381-.896.422-.164 1.057.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 6.845a5.155 5.155 0 100 10.31 5.155 5.155 0 000-10.31zm0 8.482a3.328 3.328 0 110-6.656 3.328 3.328 0 010 6.656zm6.406-6.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
                <SocialIcon href="#" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
             </div>
          </div>
          <div className="lg:col-span-2"></div>
          {footerLinks.map((list, index) => (
             <div key={list.title} className={`lg:col-span-2 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: `${300 + index * 100}ms`}}>
                <h4 className="font-semibold text-white tracking-wider uppercase">{list.title}</h4>
                <ul className="mt-4 space-y-3">
                    {list.links.map(link => (
                        <li key={link.label}><a href={link.href} className="hover:text-white transition-colors">{link.label}</a></li>
                    ))}
                </ul>
              </div>
          ))}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden">
            <div className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <LogoWhite />
                <p className="mt-4 text-sm">A plataforma completa para gestão de obras e projetos.</p>
                <div className="flex mt-6 space-x-6">
                    <SocialIcon href="#" label="Facebook" path="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    <SocialIcon href="#" label="Instagram" path="M12 2C8.74 2 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.784.297-1.459.717-2.126 1.384S.926 3.356.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.297.784.717 1.459 1.384 2.126.667.666 1.342 1.087 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.784-.297 1.459-.718 2.126-1.384.666-.667 1.087-1.342 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.297-.784-.718-1.459-1.384-2.126C20.644.926 19.969.505 19.186.209 18.42.095 17.55.058 16.225.013 15.07 0 14.58 0 12 0zm0 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.17-.053-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.013-3.584.07-4.85c.053-1.17.249 1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819.679 1.381-.896.422-.164 1.057.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 6.845a5.155 5.155 0 100 10.31 5.155 5.155 0 000-10.31zm0 8.482a3.328 3.328 0 110-6.656 3.328 3.328 0 010 6.656zm6.406-6.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
                    <SocialIcon href="#" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </div>
            </div>

            <div className="mt-8 border-t border-slate-700">
                {footerLinks.map((list, index) => {
                    const isOpen = openAccordion === list.title;
                    return (
                        <div key={list.title} className="border-b border-slate-700">
                            <button
                                onClick={() => handleToggle(list.title)}
                                className="w-full flex justify-between items-center py-4"
                                aria-expanded={isOpen}
                            >
                                <h4 className="font-semibold text-white tracking-wider uppercase">{list.title}</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <ul className="pt-2 pb-4 space-y-3">
                                        {list.links.map(link => (
                                            <li key={link.label}>
                                                <a href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


        <div className={`mt-16 border-t border-slate-700 pt-8 text-center text-sm transition-all duration-700 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '600ms'}}>
          <p>&copy; {new Date().getFullYear()} Zanker. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ShoppingBag, 
  Code2, 
  Layout, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Instagram,
  Linkedin,
  MessageCircle,
  Users,
  ShieldCheck,
  TrendingUp,
  Bot
} from 'lucide-react';
import { translations, Language } from './translations';
import { Logo } from './components/Logo';

import shopifyLogo from '../assets/logo_shopify_new.05abdff.svg';
import vtexLogo from '../assets/logo_vtex_new.4a385bd.svg';
import wooLogo from '../assets/logo_woocommerce_new.c682e49.svg';
import jsLogo from '../assets/Java-Script--Streamline-Unicons.svg';
import nextLogo from '../assets/Nextjs--Streamline-Svg-Logos.svg';
import wpLogo from '../assets/WordPress_blue_logo.svg.png';
import informalProgrammerPhoto from '../assets/nearshore_developer_floripa.png';
import aiAugmentedPhoto from '../assets/ai_augmented_floripa.png';

// Client Logos
import flycompLogo from '../assets/clientes/flycomp_logo.png';
import freakLogo from '../assets/clientes/freak_logo.webp';
import ibidLogo from '../assets/clientes/ibid_logo.webp';
import ilhaLogo from '../assets/clientes/ilha_logo.webp';
import institutoLogo from '../assets/clientes/instituto_logo.jpg';
import oneillLogo from '../assets/clientes/oneill_logo.svg';
import tagLogo from '../assets/clientes/tag_logo.jpg';
import floripaRealtorLogo from '../assets/clientes/florianopolis-realtor-logo.png';


export default function App() {
  const [lang] = useState<Language>('pt');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const t = translations[lang];

  const clientLogos = [
    { src: flycompLogo, alt: 'Flycomp' },
    { src: freakLogo, alt: 'Hyperfreak' },
    { src: ibidLogo, alt: 'Ibid' },
    { src: ilhaLogo, alt: 'Ilha' },
    { src: institutoLogo, alt: 'Instituto', className: 'rounded-md' },
    { src: oneillLogo, alt: 'O\'Neill' },
    { src: tagLogo, alt: 'Tag' },
    { src: floripaRealtorLogo, alt: 'Florianópolis Realtor' },
  ].sort((a, b) => a.alt.localeCompare(b.alt));
  
  const trackEvent = (eventName: string, params?: object) => {
    if (typeof window !== 'undefined') {
      // GA4
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, params);
      }
      // GTM
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: eventName,
          ...params
        });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        trackEvent('form_submission_success', { form_name: 'contact_form' });
      } else {
        setStatus('error');
        trackEvent('form_submission_error', { form_name: 'contact_form' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
      trackEvent('form_submission_error', { form_name: 'contact_form', error: 'exception' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Basic Metadata
    document.title = t.metadata.title;
    document.documentElement.lang = lang;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.metadata.description);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + (lang === 'pt' ? '/?lang=pt' : ''));

    // Update OG and Twitter tags
    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    updateMeta('meta[property="og:title"]', t.metadata.title);
    updateMeta('meta[property="og:description"]', t.metadata.description);
    updateMeta('meta[property="twitter:title"]', t.metadata.title);
    updateMeta('meta[property="twitter:description"]', t.metadata.description);

    // Schema.org (JSON-LD)
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.convertesites.com.br/#organization",
          "name": "Converte",
          "url": "https://www.convertesites.com.br/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.convertesites.com.br/favicon.svg"
          },
          "sameAs": [
            "https://instagram.com/convertesites",
            "https://www.linkedin.com/company/convertesites/"
          ]
        },
        {
          "@type": "ProfessionalService",
          "name": "Converte - Digital Engineering",
          "image": "https://www.convertesites.com.br/og-image-v2.png",
          "@id": "https://www.convertesites.com.br/#service",
          "url": "https://www.convertesites.com.br/",
          "telephone": "+5548991775899",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Florianópolis",
            "addressRegion": "SC",
            "addressCountry": "BR"
          }
        },
        {
          "@type": "Service",
          "name": t.services.topics[0].title,
          "description": t.services.topics[0].desc,
          "provider": { "@id": "https://www.convertesites.com.br/#organization" }
        },
        {
          "@type": "Service",
          "name": t.services.topics[1].title,
          "description": t.services.topics[1].desc,
          "provider": { "@id": "https://www.convertesites.com.br/#organization" }
        },
        {
          "@type": "Service",
          "name": t.services.topics[2].title,
          "description": t.services.topics[2].desc,
          "provider": { "@id": "https://www.convertesites.com.br/#organization" }
        },
        {
          "@type": "Service",
          "name": t.services.topics[3].title,
          "description": t.services.topics[3].desc,
          "provider": { "@id": "https://www.convertesites.com.br/#organization" }
        }
      ]
    };

    let script = document.getElementById('json-ld-schema') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schemaData);

    return () => {
      // Optional: Cleanup on unmount or lang change if needed.
    };
  }, [lang, t]);


  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-500/30">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => { scrollToTop(); trackEvent('click_logo'); }} 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Converte Home"
          >
            <Logo className="h-8 w-auto" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.services}</a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.about}</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.contact}</a>
            <a href="https://flow.convertesites.com.br/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_nav_flow')} className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.flow}</a>  
            <a href="#contact" onClick={() => { setIsMenuOpen(false); trackEvent('click_cta_nav'); }} className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 inline-block text-center">
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-900" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-gray-900">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
              <a href="https://flow.convertesites.com.br/" target="_blank" rel="noopener noreferrer" onClick={() => { setIsMenuOpen(false); trackEvent('click_nav_flow_mobile'); }}>{t.nav.flow}</a>
              <a href="#contact" onClick={() => { setIsMenuOpen(false); trackEvent('click_cta_mobile_menu'); }} className="bg-[#14b8a6] text-white px-6 py-3 rounded-full text-center font-bold">
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden" aria-labelledby="hero-title">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#14b8a6]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 id="hero-title" className="text-3xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-gray-900">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://api.whatsapp.com/send?phone=5548991775899&text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_cta_hero_whatsapp')} 
                className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-500/20"
              >
                {t.hero.cta}
                <MessageCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                onClick={() => trackEvent('click_cta_hero_coffee')} 
                className="bg-white border-2 border-[#14b8a6] text-[#14b8a6] hover:bg-teal-50 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
                aria-label="Agendar conversa ou café com especialista"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </motion.div>

          {/* Stats / Logos Placeholder */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-24 pt-12 border-t border-gray-100 flex overflow-x-auto md:flex-wrap md:justify-between items-center gap-12 transition-all pb-4 scrollbar-hide"
          >
            <img src={shopifyLogo} alt="Shopify E-commerce Platform Logo" className="h-8 w-auto shrink-0" loading="lazy" />
            <img src={vtexLogo} alt="VTEX Enterprise Digital Commerce Logo" className="h-8 w-auto shrink-0" loading="lazy" />
            <img src={wooLogo} alt="WooCommerce E-commerce Plugin Logo" className="h-8 w-auto shrink-0" loading="lazy" />
            <img src={jsLogo} alt="JavaScript Programming Language Logo" className="h-8 w-auto shrink-0" loading="lazy" />
            <img src={nextLogo} alt="Next.js React Framework Logo" className="h-10 w-auto shrink-0" loading="lazy" />
            <img src={wpLogo} alt="WordPress CMS Logo" className="h-8 w-auto shrink-0" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">{t.services.title}</h2>
            <p className="text-gray-600">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.topics.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#14b8a6]/30 transition-all"
              >
                <div className="mb-6">
                  {idx === 0 ? <ShoppingBag className="w-8 h-8 text-[#14b8a6]" /> : 
                   idx === 1 ? <ShieldCheck className="w-8 h-8 text-indigo-500" /> : 
                   idx === 2 ? <Bot className="w-8 h-8 text-purple-500" /> : 
                   <MessageCircle className="w-8 h-8 text-blue-500" />}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Nearshore Section */}
      <section id="about" className="py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900">{t.about.title}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.about.subtitle}
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-linear-to-br from-[#14b8a6]/10 to-blue-500/10 p-1">
                <div className="w-full h-full bg-gray-50 rounded-[22px] flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={informalProgrammerPhoto} 
                    alt="Desenvolvedores sênior da Converte trabalhando em Florianópolis - Ilha do Silício" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* AI Augmented Section */}
      <section id="ai-augmented" className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#14b8a6]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight! text-gray-900">{t.aiAugmented.title}</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {t.aiAugmented.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {t.aiAugmented.metrics.map((metric, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-3xl font-bold bg-linear-to-r from-[#14b8a6] to-purple-500 bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden border border-gray-100 bg-linear-to-br from-[#14b8a6]/10 to-purple-500/10 p-1">
                <div className="w-full h-full bg-white rounded-[38px] flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={aiAugmentedPhoto} 
                    alt="Engenheiro de software utilizando inteligência artificial para otimizar código e acelerar entregas" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio CTA Section */}
      <section id="portfolio" className="py-24 bg-[#14b8a6]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            {t.portfolio.title}
          </h2>
          <div className="flex justify-center">
            <a 
              href={`https://api.whatsapp.com/send?phone=5548991775899&text=${encodeURIComponent(t.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_cta_portfolio')} 
              className="bg-white text-[#14b8a6] px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl inline-block"
            >
              {t.portfolio.cta}
            </a>
          </div>
        </div>
      </section>
      <section className="py-24 px-4 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto"> 
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900">
              {t.socialProof.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t.socialProof.text}
            </p>
          </div>
          
          <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <motion.div 
              animate={{ 
                x: clientLogos.length > 5 ? ["0%", "-50%"] : "0%" 
              }}
              transition={{ 
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex items-center gap-16 md:gap-32 whitespace-nowrap w-max"
            >
              {(clientLogos.length > 5 ? [...clientLogos, ...clientLogos] : clientLogos).map((logo, idx) => (
                <div key={idx} className="flex items-center justify-center shrink-0">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={`${logo.className} h-10 md:h-16 w-auto opacity-70 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0`} 
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-gray-900">{t.contact.title}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.name}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.phone}</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 transition-all font-medium"
                    placeholder="+55 (48) 99177-5899"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.email}</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.contact.message}</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 transition-all font-medium resize-none"
                  placeholder="..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {status === 'loading' ? t.contact.loading : t.contact.button}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {status === 'success' && (
                <p className="text-[#14b8a6] text-center font-bold bg-[#14b8a6]/10 py-3 rounded-xl">{t.contact.success}</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center font-bold bg-red-50 py-3 rounded-xl">{t.contact.error}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      </main>
      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-8">
            <button onClick={() => { scrollToTop(); trackEvent('click_logo_footer'); }} className="flex justify-center md:justify-start cursor-pointer hover:opacity-80 transition-opacity">
              <Logo className="h-6 w-auto" />
            </button>
            
            <div className="flex justify-center items-center gap-6">
              <a href="https://instagram.com/convertesites" onClick={() => trackEvent('click_social', { platform: 'instagram' })} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#14b8a6] transition-colors" aria-label="Siga a Converte no Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/convertesites/" onClick={() => trackEvent('click_social', { platform: 'linkedin' })} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#14b8a6] transition-colors" aria-label="Acompanhe a Converte no LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`https://api.whatsapp.com/send?phone=5548991775899&text=${encodeURIComponent(t.contact.whatsappMessage)}`} onClick={() => trackEvent('click_social', { platform: 'whatsapp' })} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#14b8a6] transition-colors" aria-label="Fale conosco pelo WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-1 text-gray-400 text-sm">
              <address className="not-italic">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t.footer.location}
                </div>
              </address>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="text-gray-400 text-xs text-center">
              {t.footer.rights} • {t.footer.cnpj}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
import hubImage from '../assets/Gemini_Generated_Image_jb4uwajb4uwajb4u.png';
import teamPhoto from '../assets/team_working_florianopolis.png';
import informalProgrammerPhoto from '../assets/nearshore_developer_floripa.png';
import automationPhoto from '../assets/ai_automation_pipeline.png';
import aiAugmentedPhoto from '../assets/ai_augmented_floripa.png';

// Client Logos
import flycompLogo from '../assets/clientes/flycomp_logo.png';
import freakLogo from '../assets/clientes/freak_logo.webp';
import ibidLogo from '../assets/clientes/ibid_logo.webp';
import ilhaLogo from '../assets/clientes/ilha_logo.webp';
import institutoLogo from '../assets/clientes/instituto_logo.png';
import oneillLogo from '../assets/clientes/oneill_logo.svg';
import tagLogo from '../assets/clientes/tag_logo.jpg';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'pt' ? 'pt' : 'en';
    }
    return 'en';
  });
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
    { src: institutoLogo, alt: 'Instituto' },
    { src: oneillLogo, alt: 'O\'Neill' },
    { src: tagLogo, alt: 'Tag' },
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
          "image": "https://www.convertesites.com.br/assets/Gemini_Generated_Image_jb4uwajb4uwajb4u-ApP3hCxb.png",
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
          "name": "Shopify Development",
          "description": t.services.shopify.desc,
          "provider": { "@id": "https://www.convertesites.com.br/#organization" }
        },
        {
          "@type": "Service",
          "name": "VTEX Development",
          "description": t.services.vtex.desc,
          "provider": { "@id": "https://www.convertesites.com.br/#organization" }
        },
        {
          "@type": "Service",
          "name": "React Web Applications",
          "description": t.services.react.desc,
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

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'pt' : 'en';
    setLang(prev => prev === 'en' ? 'pt' : 'en');
    trackEvent('toggle_language', { language: newLang });
  };

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
            <a href="#agencies" className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.agencies}</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.contact}</a>
            <a href="https://flow.convertesites.com.br/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_nav_flow')} className="text-sm font-medium text-gray-600 hover:text-[#14b8a6] transition-colors">{t.nav.flow}</a>  
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#14b8a6]/50 transition-all text-sm font-medium text-gray-700"
              aria-label={lang === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <Globe className="w-4 h-4 text-[#14b8a6]" />
              {lang.toUpperCase()}
            </button>
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
              <a href="#agencies" onClick={() => setIsMenuOpen(false)}>{t.nav.agencies}</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
              <a href="https://flow.convertesites.com.br/" target="_blank" rel="noopener noreferrer" onClick={() => { setIsMenuOpen(false); trackEvent('click_nav_flow_mobile'); }}>{t.nav.flow}</a>
              <button onClick={() => { toggleLang(); setIsMenuOpen(false); }} className="flex items-center gap-2 text-[#14b8a6]">
                <Globe className="w-6 h-6" />
                {lang === 'en' ? 'Português' : 'English'}
              </button>
              <a href="#contact" onClick={() => { setIsMenuOpen(false); trackEvent('click_cta_mobile_menu'); }} className="bg-[#14b8a6] text-white px-6 py-3 rounded-full text-center font-bold">
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
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
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-gray-900">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" onClick={() => trackEvent('click_cta_hero')} className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-500/20">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
            <img src={shopifyLogo} alt="Shopify" className="h-8 w-auto shrink-0" />
            <img src={vtexLogo} alt="VTEX" className="h-8 w-auto shrink-0" />
            <img src={wooLogo} alt="WooCommerce" className="h-8 w-auto shrink-0" />
            <img src={jsLogo} alt="JavaScript" className="h-8 w-auto shrink-0" />
            <img src={nextLogo} alt="Next.js" className="h-10 w-auto shrink-0" />
            <img src={wpLogo} alt="WordPress" className="h-8 w-auto shrink-0" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t.services.title}</h2>
            <p className="text-gray-600">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShoppingBag className="w-8 h-8 text-[#14b8a6]" />, ...t.services.shopify },
              { icon: <Zap className="w-8 h-8 text-pink-500" />, ...t.services.vtex },
              { icon: <Code2 className="w-8 h-8 text-blue-500" />, ...t.services.react },
              { icon: <Layout className="w-8 h-8 text-purple-500" />, ...t.services.wordpress },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#14b8a6]/30 transition-all"
              >
                <div className="mb-6">{service.icon}</div>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">{t.about.title}</h2>
              <p className="text-xl text-gray-600 mb-12">{t.about.subtitle}</p>
              
              <div className="space-y-8">
                {t.about.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                      {idx === 0 ? <Clock className="w-6 h-6 text-[#14b8a6]" /> : idx === 1 ? <CheckCircle2 className="w-6 h-6 text-[#14b8a6]" /> : <Zap className="w-6 h-6 text-[#14b8a6]" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 text-gray-900">{point.title}</h4>
                      <p className="text-gray-600">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-linear-to-br from-[#14b8a6]/10 to-blue-500/10 p-1">
                <div className="w-full h-full bg-gray-50 rounded-[22px] flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={informalProgrammerPhoto} 
                    alt="Converte Nearshore Talent Florianópolis" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency & Consultancy Support Section */}
      <section id="agencies" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-linear-to-br from-indigo-500/10 to-[#14b8a6]/10 p-1">
                  <div className="w-full h-full bg-gray-50 rounded-[22px] flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={teamPhoto} 
                      alt="Converte Engineering Team Florianópolis" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">{t.agencyPartner.title}</h2>
              <p className="text-xl text-gray-600 mb-12">{t.agencyPartner.subtitle}</p>
              
              <div className="space-y-8">
                {t.agencyPartner.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                      {idx === 0 ? <ShieldCheck className="w-6 h-6 text-[#14b8a6]" /> : idx === 1 ? <Users className="w-6 h-6 text-[#14b8a6]" /> : idx === 2 ? <TrendingUp className="w-6 h-6 text-[#14b8a6]" /> : <Bot className="w-6 h-6 text-[#14b8a6]" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 text-gray-900">{point.title}</h4>
                      <p className="text-gray-600">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Augmented Section */}
      <section id="ai-augmented" className="py-24 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#14b8a6]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight! text-gray-900">{t.aiAugmented.title}</h2>
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
                    alt="Software engineer using AI coding assistant with Florianópolis in background" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            {lang === 'en' ? 'Your vision, our engineering.' : 'Sua visão, nossa engenharia.'}
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
            {lang === 'en' 
              ? 'From NY startups to global operations in Brazil, we deliver clean code and elite performance in Shopify, React, and VTEX. Ready to build?' 
              : 'De startups em NY a operações globais no Brasil, entregamos código limpo e performance de elite em Shopify, React e VTEX. Vamos tirar sua ideia do papel?'}
          </p>
          <a href="#contact" onClick={() => trackEvent('click_cta_portfolio')} className="bg-white text-[#14b8a6] px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl inline-block">
            {t.hero.cta}
          </a>
        </div>
      </section>
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto"> 
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
            {lang === 'en' ? 'Our Clients' : 'Nossos Clientes'}
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className=" pt-12  flex overflow-x-auto md:flex-wrap md:justify-between items-center gap-12 opacity-80 transition-all pb-4 scrollbar-hide"
          >
            {clientLogos.map((logo, idx) => (
              <img 
                key={idx} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 md:h-10 w-auto shrink-0 transition-all duration-500" 
              />
            ))}
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-gray-900">{t.contact.title}</h2>
            
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

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-8">
            <button onClick={() => { scrollToTop(); trackEvent('click_logo_footer'); }} className="flex justify-center md:justify-start cursor-pointer hover:opacity-80 transition-opacity">
              <Logo className="h-6 w-auto" />
            </button>
            
            <div className="flex justify-center items-center gap-6">
              <a href="https://instagram.com/convertesites" onClick={() => trackEvent('click_social', { platform: 'instagram' })} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#14b8a6] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/convertesites/" onClick={() => trackEvent('click_social', { platform: 'linkedin' })} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#14b8a6] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`https://api.whatsapp.com/send?phone=5548991775899&text=${encodeURIComponent(t.contact.whatsappMessage)}`} onClick={() => trackEvent('click_social', { platform: 'whatsapp' })} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#14b8a6] transition-colors">
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

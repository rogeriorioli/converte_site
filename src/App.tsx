import React, { useEffect, useRef, useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  Code2,
  GitBranch,
  Globe2,
  Instagram,
  Linkedin,
  LoaderCircle,
  Menu,
  MessageCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Workflow,
  X,
} from "lucide-react";
import { Logo } from "./components/Logo";
import { GeoExperience } from "./components/GeoExperience";
import { faqs, scenarios, services } from "./content";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=5548991775899&text=" +
  encodeURIComponent("Olá! Quero conversar sobre um projeto com a Converte.");
type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (
    command: string,
    event: string,
    data?: Record<string, unknown>,
  ) => void;
};
function trackEvent(event: string, data: Record<string, unknown> = {}) {
  const analytics = window as AnalyticsWindow;
  if (analytics.gtag) analytics.gtag("event", event, data);
  else analytics.dataLayer?.push({ event, ...data });
}
const navItems = [
  { href: "#services", label: "O que fazemos" },
  { href: "#process", label: "Como trabalhamos" },
  { href: "#about", label: "Para agências" },
];

const clientLogos = [
  { name: "Brazil Realtor", file: "brazil-realtor-logo.png" },
  { name: "Flycomp", file: "flycomp_logo.png" },
  { name: "Freak Surfskate", file: "freak_logo.webp" },
  { name: "Ibid", file: "ibid_logo.webp" },
  { name: "Ilha", file: "ilha_logo.webp" },
  { name: "Instituto de Mentoria", file: "instituto_logo.jpg" },
  { name: "O'Neill", file: "oneill_logo.svg" },
  { name: "Tag", file: "tag_logo.jpg" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand-link"
          href="#top"
          aria-label="Converte, início"
          onClick={() => setOpen(false)}
        >
          <Logo className="wordmark" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="button button-small header-cta"
          onClick={() => trackEvent("click_cta_nav")}
        >
          <span className="label-long">Vamos conversar</span>
          <span className="label-short">Conversar</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!open}
        aria-label="Navegação móvel"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Conversar sobre meu projeto
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

function ConnectedFlow() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(-1);
  const [runId, setRunId] = useState(0);
  const reducedMotion = useReducedMotion();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const scenario = scenarios[selected];
  const running = step >= 0 && step < 4;
  const finished = step === 4;
  const icons = [Code2, Workflow, GitBranch, Braces];
  useEffect(() => {
    setStep(reducedMotion ? 4 : 0);
  }, [reducedMotion]);
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 1200);
    return () => window.clearTimeout(timer);
  }, [step, running, selected, runId]);
  function selectScenario(index: number, focus = false) {
    if (index === selected) {
      if (focus) buttons.current[index]?.focus();
      return;
    }
    setSelected(index);
    setStep(reducedMotion ? 4 : 0);
    setRunId((value) => value + 1);
    if (focus) buttons.current[index]?.focus();
  }
  function onTabKey(event: React.KeyboardEvent, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % scenarios.length;
    if (event.key === "ArrowLeft")
      next = (index + scenarios.length - 1) % scenarios.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = scenarios.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectScenario(next, true);
    }
  }
  return (
    <div className="flow-lab" aria-labelledby="flow-title">
      <div className="flow-topline">
        <h2 id="flow-title">Seu negócio, conectado.</h2>
        <div
          className="scenario-tabs"
          role="tablist"
          aria-label="Escolha um exemplo de automação"
        >
          {scenarios.map((item, index) => (
            <button
              key={item.name}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`scenario-tab-${index}`}
              aria-controls="scenario-panel"
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => selectScenario(index)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div
        id="scenario-panel"
        role="tabpanel"
        aria-labelledby={`scenario-tab-${selected}`}
        tabIndex={0}
      >
        <ol
          className="flow-nodes"
          aria-label={`Fluxo ilustrativo de ${scenario.name.toLowerCase()}`}
        >
          {scenario.nodes.map((node, index) => {
            const Icon = icons[index];
            const complete = step > index;
            return (
              <li
                key={`${runId}-${index}`}
                className={`flow-node${step === index ? " is-current" : ""}${complete ? " is-complete" : ""}`}
              >
                <div className="node-symbol" aria-hidden="true">
                  {complete ? (
                    <Check size={24} />
                  ) : (
                    <Icon size={24} strokeWidth={1.7} />
                  )}
                </div>
                <div className="node-copy">
                  <h3>{node.title}</h3>
                  <p>{node.description}</p>
                </div>
                <FlowMockup stage={index} scenario={selected} />
                {index < 3 && (
                  <span className="flow-connector" aria-hidden="true">
                    <span />
                    <ArrowRight size={15} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <div className="flow-bottomline">
          <div
            className="flow-feedback"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              className={`flow-status-dot${running ? " is-running" : ""}`}
              aria-hidden="true"
            />
            <p>
              {finished
                ? scenario.result
                : running
                  ? scenario.nodes[step].action
                  : scenario.description}
            </p>
          </div>
          <button
            className="flow-play"
            type="button"
            onClick={() => {
              setStep(reducedMotion ? 4 : 0);
              setRunId((value) => value + 1);
              trackEvent("replay_workflow", { scenario: scenario.name });
            }}
          >
            <RotateCcw size={16} aria-hidden="true" />
            Reproduzir novamente
          </button>
        </div>
      </div>
      <p className="flow-disclaimer">
        Demonstração ilustrativa. Nenhum dado é enviado e nenhum sistema externo
        é acionado.
      </p>
    </div>
  );
}

function FlowMockup({ stage, scenario }: { stage: number; scenario: number }) {
  const incoming = ["Novo contato", "Novo pedido", "Nova mensagem"][scenario];
  const destination = ["Oportunidades", "Pedidos", "Atendimentos"][scenario];
  return (
    <div className={`flow-mockup mockup-${stage}`} aria-hidden="true">
      <div className="mockup-bar">
        <span />
        <span />
        <span />
        <i />
      </div>
      {stage === 0 && (
        <div className="mockup-content mockup-form">
          <strong>{incoming}</strong>
          <span className="mockup-line short" />
          <span className="mockup-field" />
          <span className="mockup-line short" />
          <span className="mockup-field" />
          <span className="mockup-submit">
            Enviar <ArrowUpRight size={10} />
          </span>
        </div>
      )}
      {stage === 1 && (
        <div className="mockup-content mockup-workflow">
          <strong>Fluxo de trabalho</strong>
          <div className="mockup-flow-line">
            <span className="mini-node">
              <Code2 size={14} />
            </span>
            <i />
            <span className="mini-node mini-node-active">
              <Workflow size={14} />
            </span>
            <i />
            <span className="mini-node">
              <Check size={14} />
            </span>
          </div>
          <div className="mockup-flow-labels">
            <span>Entrada</span>
            <span>Processar</span>
            <span>Enviar</span>
          </div>
        </div>
      )}
      {stage === 2 && (
        <div className="mockup-content mockup-agent">
          <strong>
            <span className="mini-avatar">
              <GitBranch size={12} />
            </span>{" "}
            Hermes Agent
          </strong>
          <div className="mockup-bubble">
            <span className="mockup-line" />
            <span className="mockup-line medium" />
            <span className="mockup-line short" />
          </div>
          <span className="mockup-agent-status">
            <Check size={10} /> Contexto preparado
          </span>
        </div>
      )}
      {stage === 3 && (
        <div className="mockup-content mockup-inbox">
          <strong>{destination}</strong>
          <div className="mockup-record">
            <span className="mini-avatar">
              <Check size={12} />
            </span>
            <span>
              <b>{incoming}</b>
              <small>Pronto para revisão</small>
            </span>
            <i />
          </div>
          <span className="mockup-line" />
          <span className="mockup-line medium" />
        </div>
      )}
    </div>
  );
}

function Contact({
  selectedService,
  setSelectedService,
}: {
  selectedService: string;
  setSelectedService: (value: string) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [hydrated, setHydrated] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "idle" && restoreFocus.current) {
      nameRef.current?.focus();
      restoreFocus.current = false;
    }
  }, [status]);
  useEffect(() => () => controllerRef.current?.abort(), []);
  function change(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));
    if (status === "error") setStatus("idle");
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          email: form.email.trim(),
          message: `Interesse: ${selectedService || "Quero orientação"}\n\n${form.message.trim()}`,
        }),
      });
      const result = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : null;
      if (!response.ok || result?.success !== true)
        throw new Error("Contact request failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      trackEvent("form_submission_success", {
        form_name: "contact_form",
        service: selectedService,
      });
    } catch {
      setStatus("error");
      trackEvent("form_submission_error", { form_name: "contact_form" });
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
    }
  }
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-layout">
        <div className="contact-intro">
          <h2 id="contact-title">
            O próximo passo
            <br />
            começa com
            <br />
            <span>uma conversa.</span>
          </h2>
          <p>
            Conte o que precisa sair do papel ou funcionar melhor. Vamos
            entender o cenário e definir um caminho para o seu projeto.
          </p>
          <a
            className="contact-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_contact_whatsapp")}
          >
            <MessageCircle size={22} aria-hidden="true" />
            <span>
              Prefere falar pelo WhatsApp?<strong>(48) 99177-5899</strong>
            </span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <p className="contact-note">
            Atendimento direto. Do primeiro alinhamento à entrega.
          </p>
        </div>
        <div className="contact-form-wrap">
          {status === "success" ? (
            <div
              ref={successRef}
              className="form-success"
              role="status"
              tabIndex={-1}
            >
              <CheckCircle2 size={42} strokeWidth={1.5} aria-hidden="true" />
              <h3>Seu projeto chegou por aqui.</h3>
              <p>
                Recebemos a sua mensagem. Vamos entrar em contato pelos dados
                que você informou.
              </p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  restoreFocus.current = true;
                  setStatus("idle");
                }}
              >
                Enviar outra mensagem{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <form
              action="/api/contact"
              method="post"
              onSubmit={submit}
              aria-label="Conte sobre seu projeto"
              aria-busy={status === "loading"}
            >
              <fieldset disabled={!hydrated || status === "loading"}>
                <legend className="sr-only">
                  Dados de contato e detalhes do projeto
                </legend>
                <label htmlFor="contact-name">
                  Seu nome
                  <input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    required
                    minLength={2}
                    maxLength={100}
                    value={form.name}
                    onChange={change}
                  />
                </label>
                <div className="form-columns">
                  <label htmlFor="contact-email">
                    E-mail
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="voce@empresa.com.br"
                      required
                      maxLength={180}
                      value={form.email}
                      onChange={change}
                    />
                  </label>
                  <label htmlFor="contact-phone">
                    WhatsApp
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      required
                      minLength={8}
                      maxLength={25}
                      value={form.phone}
                      onChange={change}
                    />
                  </label>
                </div>
                <label htmlFor="contact-service">
                  Como podemos ajudar?
                  <span className="select-wrap">
                    <select
                      id="contact-service"
                      name="service"
                      value={selectedService}
                      onChange={(event) =>
                        setSelectedService(event.target.value)
                      }
                    >
                      <option value="">
                        Quero orientação para meu projeto
                      </option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Parceria para agências">
                        Parceria para agências
                      </option>
                    </select>
                    <ChevronDown size={17} aria-hidden="true" />
                  </span>
                </label>
                <label htmlFor="contact-message">
                  O que você tem em mente?
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    placeholder="O desafio, a ideia ou o processo que precisa melhorar…"
                    required
                    minLength={10}
                    maxLength={5000}
                    value={form.message}
                    onChange={change}
                  />
                </label>
                <button
                  className="button form-submit"
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      Enviando mensagem{" "}
                      <LoaderCircle
                        className="spin"
                        size={18}
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <>
                      Vamos falar do seu projeto{" "}
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </>
                  )}
                </button>
              </fieldset>
              {status === "error" && (
                <p className="form-error" role="alert">
                  Não foi possível confirmar o envio. Seus dados continuam
                  preenchidos. Tente novamente ou{" "}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fale pelo WhatsApp
                  </a>
                  .
                </p>
              )}
              <p className="form-privacy">
                Usaremos seus dados para responder a esta solicitação.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const serviceIcons = [Code2, ShoppingBag, Search, Workflow, Braces];

  useEffect(() => {
    const main = mainRef.current;
    if (
      !main ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const targets = main.querySelectorAll<HTMLElement>(
      [
        ".hero-intro h1",
        ".hero-copy",
        ".client-names li",
        ".service-row",
        ".vision-principles article",
        ".agency-details li",
        ".process-steps li",
        ".contact-intro",
        ".contact-form-wrap",
      ].join(","),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function chooseService(service: string) {
    setSelectedService(service);
    trackEvent("select_service", { service });
  }
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main" ref={mainRef}>
        <section
          id="top"
          className="hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-intro">
            <h1 id="hero-title">
              Da ideia à<br />
              <span>operação.</span>
            </h1>
            <div className="hero-copy">
              <p className="hero-lead">
                Tecnologia que resolve.
                <br />E faz o negócio andar.
              </p>
              <p>
                Desenvolvemos aplicações web e lojas VTEX e Shopify, melhoramos
                sua presença nas buscas e conectamos processos com automação e
                IA.
              </p>
              <a
                href="#contact"
                className="button"
                onClick={() => trackEvent("click_cta_hero")}
              >
                Falar sobre meu projeto{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <span className="hero-audience">
                Para empresas e agências. Do Brasil para o mundo.
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <p>
              Aplicações web <span aria-hidden="true">/</span> VTEX & Shopify{" "}
              <span aria-hidden="true">/</span> SEO técnico & GEO{" "}
              <span aria-hidden="true">/</span> Automações{" "}
              <span aria-hidden="true">/</span> APIs
            </p>
            <a href="#services" aria-label="Conheça nossos serviços">
              <ArrowDown size={19} aria-hidden="true" />
            </a>
          </div>
          <ConnectedFlow />
        </section>
        <section
          className="client-section container"
          aria-label="Clientes presentes no portfólio da Converte"
        >
          <p>
            Quem já esteve
            <br />
            com a Converte.
          </p>
          <ul className="client-names" aria-label="Clientes">
            {clientLogos.map((client) => (
              <li key={client.file}>
                <img
                  src={`/clientes/${client.file}`}
                  alt={client.name}
                  width="150"
                  height="60"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </section>
        <section
          id="services"
          className="services-section container section-space"
          aria-labelledby="services-title"
        >
          <div className="section-heading section-heading--stacked">
            <h2 id="services-title">
              O que precisa
              <br />
              <span>funcionar melhor?</span>
            </h2>
            <p>
              Uma aplicação nova. Uma loja em VTEX ou Shopify. Uma operação
              conectada. Começamos pelo seu desafio.
            </p>
          </div>
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="service-row"
                  aria-labelledby={`${service.id}-title`}
                >
                  <div className="service-name">
                    <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                    <h3 id={`${service.id}-title`}>{service.title}</h3>
                  </div>
                  <div className="service-details">
                    <p className="service-promise">{service.promise}</p>
                    <p>{service.description}</p>
                    <ul
                      className="deliverables"
                      aria-label={`Entregas de ${service.title}`}
                    >
                      {service.deliverables.map((item) => (
                        <li key={item}>
                          <Check size={15} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      className="text-link"
                      href="#contact"
                      onClick={() => chooseService(service.title)}
                    >
                      {service.cta}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <GeoExperience onContact={() => chooseService("SEO técnico & GEO")} />
        <section
          id="vision"
          className="vision-section"
          aria-labelledby="vision-title"
        >
          <div className="container vision-layout">
            <div className="vision-intro">
              <h2 id="vision-title">
                2027 já entra
                <br />
                na arquitetura.
              </h2>
              <p>
                As ferramentas mudam. O seu negócio precisa continuar
                funcionando.
              </p>
              <a
                className="text-link"
                href="#contact"
                onClick={() => chooseService("")}
              >
                Planejar o próximo passo{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="vision-principles">
              <article>
                <Search size={23} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3>Visibilidade além do clique</h3>
                  <p>
                    SEO técnico e conteúdo claro para buscas tradicionais e
                    experiências com IA. Presença se constrói com informação
                    útil e confiável.
                  </p>
                </div>
              </article>
              <article>
                <ShieldCheck size={23} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3>IA com contexto e supervisão</h3>
                  <p>
                    Agentes conectados às informações certas, com permissões
                    definidas, acompanhamento e aprovação humana onde fizer
                    sentido.
                  </p>
                </div>
              </article>
              <article>
                <GitBranch size={23} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3>Liberdade para evoluir</h3>
                  <p>
                    Integrações documentadas e escolhas técnicas que consideram
                    manutenção, custos e a continuidade da sua operação.
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="container vision-source">
            <span>
              Uma direção para o futuro, aplicada a problemas de hoje.
            </span>
            <a
              href="https://www.gartner.com/en/newsroom/press-releases/2026-10-20-gartner-identifies-the-top-strategic-technology-trends-for-2027"
              target="_blank"
              rel="noopener noreferrer"
            >
              Referência: Gartner, tendências para 2027{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          id="about"
          className="agency-section container section-space"
          aria-labelledby="agency-title"
        >
          <div className="agency-title">
            <h2 id="agency-title">
              Sua agência cria.
              <br />
              <span>A gente constrói junto.</span>
            </h2>
            <p>
              Entre a boa ideia e a entrega, existe muito trabalho técnico. A
              Converte entra nessa parte, em parceria com o seu time.
            </p>
            <a
              className="text-link"
              href="#contact"
              onClick={() => chooseService("Parceria para agências")}
            >
              Conversar sobre uma parceria{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="agency-details">
            <p className="agency-statement">
              Mais capacidade técnica.
              <br />
              Mais espaço para criar.
            </p>
            <ul>
              <li>
                <CheckCheck size={21} aria-hidden="true" />
                <div>
                  <h3>Uma extensão do seu time</h3>
                  <p>
                    Desenvolvimento de aplicações, integrações e automações para
                    compor a sua entrega.
                  </p>
                </div>
              </li>
              <li>
                <MessageCircle size={21} aria-hidden="true" />
                <div>
                  <h3>Conversa com quem desenvolve</h3>
                  <p>
                    Alinhamento direto sobre escopo, decisões técnicas e o
                    andamento do projeto.
                  </p>
                </div>
              </li>
              <li>
                <Code2 size={21} aria-hidden="true" />
                <div>
                  <h3>Uma entrega que continua</h3>
                  <p>
                    Código organizado, documentação e transferência de
                    conhecimento para o próximo passo.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section
          id="process"
          className="process-section section-space"
          aria-labelledby="process-title"
        >
          <div className="container">
            <div className="section-heading">
              <h2 id="process-title">Clareza em cada etapa.</h2>
              <p>
                Você sabe o que estamos resolvendo, o que será entregue e qual é
                o próximo passo.
              </p>
            </div>
            <ol className="process-steps">
              {[
                [
                  "Entender",
                  "Ouvimos o desafio, mapeamos o processo e identificamos o que realmente precisa mudar.",
                ],
                [
                  "Planejar",
                  "Definimos escopo, prioridades, arquitetura e critérios para validar a entrega.",
                ],
                [
                  "Construir",
                  "Desenvolvemos e testamos em ciclos, com acompanhamento e espaço para ajustes.",
                ],
                [
                  "Evoluir",
                  "Colocamos em operação, documentamos e alinhamos os próximos passos.",
                ],
              ].map(([title, description], index) => (
                <li key={title}>
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          className="faq-section container section-space"
          aria-labelledby="faq-title"
        >
          <div className="faq-intro">
            <h2 id="faq-title">Antes de começar.</h2>
            <p>Algumas respostas para a conversa já partir do lugar certo.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                  {faq.source && (
                    <a
                      className="text-link"
                      href={faq.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leia a orientação do Google{" "}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
        <Contact
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <a
              className="brand-link"
              href="#top"
              aria-label="Converte, voltar ao início"
            >
              <Logo className="wordmark" />
            </a>
            <p>
              Desenvolvimento, busca e automação.
              <br />
              Conectados ao seu negócio.
            </p>
            <div className="footer-socials">
              <a
                href="https://instagram.com/convertesites"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Converte no Instagram"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/convertesites/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Converte no LinkedIn"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Converte no WhatsApp"
              >
                <MessageCircle size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Converte · CNPJ 58.532.850/0001-10
            </p>
            <div className="footer-products">
              <span>Também da Converte</span>
              <a
                href="https://flow.convertesites.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flow <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href="https://turbo.convertesites.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Turbo <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
            <span className="footer-location">
              <Globe2 size={14} aria-hidden="true" />
              Brasil → mundo
            </span>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}

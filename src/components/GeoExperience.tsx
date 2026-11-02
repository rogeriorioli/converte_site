import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  CircleDot,
  FileText,
  Globe2,
  MessageCircle,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";

function SkateIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 9.5c.5 2 1.8 3 4 3h12c2.2 0 3.5-1 4-3" />
      <path d="M5 9.5h14M7 12.5v2m10-2v2" />
      <circle cx="7" cy="16.5" r="2" />
      <circle cx="17" cy="16.5" r="2" />
    </svg>
  );
}

function SurfIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C8 5 7.5 11.5 9 18.5L12 22l3-3.5C16.5 11.5 16 5 12 2Z" />
      <path d="M12 3v17M10 17h4" />
    </svg>
  );
}

export function GeoExperience({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(-1);
  const [replay, setReplay] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setPhase(4);
      return;
    }
    setPhase(0);
    const timer = window.setInterval(() => {
      setPhase((current) => {
        if (current >= 3) {
          window.clearInterval(timer);
          return 4;
        }
        return current + 1;
      });
    }, 1600);
    return () => window.clearInterval(timer);
  }, [visible, reducedMotion, replay]);

  const stage = (index: number) =>
    phase === index ? " is-current" : phase > index ? " is-complete" : "";

  return (
    <section
      ref={sectionRef}
      id="busca-e-ia"
      className="search-experience"
      aria-labelledby="geo-title"
    >
      <div className="container">
        <div className="search-intro">
          <div>
            <h2 id="geo-title">
              Sua marca nas conversas
              <br />
              <span>que acontecem com IA.</span>
            </h2>
            <p>
              GEO é o trabalho de tornar seu conteúdo e seus produtos mais
              compreensíveis para experiências de busca e respostas com
              inteligência artificial.
            </p>
          </div>
          <a
            className="text-link search-intro-link"
            href="#contact"
            onClick={onContact}
          >
            Conversar sobre GEO <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="geo-flow-heading">
          <div>
            <h3>Do seu conteúdo à conversa.</h3>
            <p>
              Veja um exemplo de como suas informações podem chegar a um agente.
            </p>
          </div>
          <button
            className="geo-replay"
            type="button"
            onClick={() => {
              setVisible(true);
              setReplay((value) => value + 1);
            }}
          >
            <RotateCcw size={16} aria-hidden="true" /> Reproduzir fluxo
          </button>
        </div>

        <div
          className="geo-flow"
          aria-label="Exemplo de fluxo entre conteúdo, documento e conversa com IA"
        >
          <article className={`geo-stage geo-site${stage(0)}`}>
            <div className="geo-stage-label">
              <span className="geo-stage-icon">
                <Globe2 size={19} aria-hidden="true" />
              </span>
              <div>
                <h4>Seu conteúdo e produtos</h4>
                <p>Informações no seu site</p>
              </div>
            </div>
            <div className="geo-mini-browser" aria-hidden="true">
              <div className="search-browser-bar">
                <span />
                <span />
                <span />
                <i />
              </div>
              <div className="geo-site-content">
                <div className="geo-site-brand">
                  <span>L</span>
                  <b>Loja Exemplo</b>
                </div>
                <div className="geo-site-banner">
                  <small>SKATE & SURF</small>
                  <strong>
                    Da rua ao mar,
                    <br />
                    seu próximo rolê.
                  </strong>
                </div>
                <div className="geo-products">
                  <div>
                    <span>
                      <SkateIcon size={24} />
                    </span>
                    <i />
                  </div>
                  <div>
                    <span>
                      <SurfIcon size={24} />
                    </span>
                    <i />
                  </div>
                </div>
              </div>
            </div>
            <span className="geo-connector" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </article>

          <article className={`geo-stage geo-document${stage(1)}`}>
            <div className="geo-stage-label">
              <span className="geo-stage-icon">
                <FileText size={19} aria-hidden="true" />
              </span>
              <div>
                <h4>Um documento claro</h4>
                <p>Resumo opcional em llms.txt</p>
              </div>
            </div>
            <div className="geo-file" aria-hidden="true">
              <div className="geo-file-top">
                <span>
                  <FileText size={15} /> llms.txt
                </span>
                <span className="geo-file-tag">TEXTO</span>
              </div>
              <div className="geo-file-content">
                <strong># Loja Exemplo</strong>
                <p>&gt; Skates, pranchas de surf e acessórios.</p>
                <b>## Produtos</b>
                <p>
                  [Skates e acessórios]
                  <br />
                  [Pranchas de surf]
                </p>
                <b>## Sobre a marca</b>
                <p>Conteúdo, informações e links úteis.</p>
              </div>
            </div>
            <span className="geo-connector" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </article>

          <article className={`geo-stage geo-agent${stage(2)}${stage(3)}`}>
            <div className="geo-stage-label">
              <span className="geo-stage-icon">
                <Sparkles size={19} aria-hidden="true" />
              </span>
              <div>
                <h4>Uma conversa com IA</h4>
                <p>Uma pergunta, uma oportunidade de venda.</p>
              </div>
            </div>
            <div className="search-browser geo-chat">
              <div className="search-browser-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <i />
              </div>
              <div className="agent-browser-content">
                <div className={`chat-user-message${stage(2)}`}>
                  <Search size={14} aria-hidden="true" /> Onde encontro skates e
                  pranchas de surf?
                </div>
                <div className={`chat-answer${stage(3)}`}>
                  <span className="chat-agent-icon">
                    <Bot size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Assistente de IA</strong>
                    <p>
                      Uma opção para explorar é a <b>Loja Exemplo</b>, que
                      apresenta skates, pranchas de surf e acessórios.
                    </p>
                    <p>
                      Confira os modelos e escolha o equipamento que combina com
                      você.
                    </p>
                    <span className="chat-source">
                      <FileText size={13} aria-hidden="true" /> Loja Exemplo ·
                      coleção
                    </span>
                    <div className="chat-product-shelf">
                      <p className="chat-product-heading">
                        Produtos da coleção
                      </p>
                      <ul
                        className="chat-product-list"
                        aria-label="Exemplos de produtos da Loja Exemplo"
                      >
                        <li className="chat-product">
                          <span className="chat-product-art">
                            <SkateIcon size={36} />
                          </span>
                          <span className="chat-product-name">
                            Skate completo
                          </span>
                        </li>
                        <li className="chat-product">
                          <span className="chat-product-art">
                            <SurfIcon size={36} />
                          </span>
                          <span className="chat-product-name">
                            Prancha de surf
                          </span>
                        </li>
                        <li className="chat-product">
                          <span className="chat-product-art">
                            <CircleDot
                              size={36}
                              strokeWidth={1.35}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="chat-product-name">
                            Rodas de skate
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="chat-input" aria-hidden="true">
                  <span>Faça outra pergunta</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="geo-flow-footer">
          <p>
            <span className="geo-status-dot" aria-hidden="true" />
            {phase >= 0 && phase < 4
              ? [
                  "Conteúdo e produtos disponíveis no site.",
                  "Um resumo opcional reúne informações e links.",
                  "Uma pessoa faz uma pergunta ao assistente.",
                  "O assistente pode consultar fontes e construir uma resposta.",
                ][phase]
              : "Conteúdo acessível ajuda pessoas e agentes a entenderem sua oferta."}
          </p>
          <span>
            <Check size={15} aria-hidden="true" /> Exemplo ilustrativo
          </span>
        </div>
        <p className="search-path-note">
          A Loja Exemplo é fictícia, e a resposta demonstrada não veio de uma IA
          real. O <code>llms.txt</code> é opcional: alguns agentes podem
          utilizá-lo, enquanto outros consultam páginas diretamente. Ele não
          garante presença ou citação em respostas.{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/ai-features"
            target="_blank"
            rel="noopener noreferrer"
          >
            Veja as orientações do Google{" "}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}

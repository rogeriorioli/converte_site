export const services = [
  {
    id: "aplicacoes",
    title: "Aplicações web",
    promise:
      "A ferramenta que o seu negócio precisa, do jeito que ele funciona.",
    description:
      "Desenvolvemos plataformas, portais e sistemas internos sob medida. Da primeira versão à evolução de uma aplicação que já está em uso.",
    deliverables: [
      "Produtos digitais e MVPs",
      "Portais e sistemas internos",
      "Evolução e manutenção",
    ],
    cta: "Quero desenvolver uma aplicação",
  },
  {
    id: "ecommerce",
    title: "VTEX & Shopify",
    promise: "Uma loja preparada para vender e evoluir com o seu negócio.",
    description:
      "Implantamos e desenvolvemos lojas em VTEX e Shopify. Criamos e personalizamos experiências de compra, integramos sistemas e evoluímos operações que já estão no ar.",
    deliverables: [
      "Implantação de lojas",
      "Desenvolvimento e personalização",
      "Integrações e evolução contínua",
    ],
    cta: "Quero desenvolver minha loja",
  },
  {
    id: "seo-geo",
    title: "SEO técnico & GEO",
    promise: "Ser encontrado começa com uma presença que faz sentido.",
    description:
      "Cuidamos da base técnica do seu site para facilitar o rastreamento, a indexação e a compreensão das páginas. Em GEO, organizamos as informações existentes para experiências de busca e respostas com inteligência artificial.",
    deliverables: [
      "Rastreamento e indexação",
      "Performance e dados estruturados",
      "Diagnóstico técnico e GEO",
    ],
    cta: "Quero melhorar minha presença nas buscas",
  },
  {
    id: "automacoes",
    title: "Automações & agentes de IA",
    promise: "Menos tarefas repetidas. Mais tempo para o que precisa de você.",
    description:
      "Automatizamos processos com as ferramentas que sua empresa já usa, como Microsoft Power Automate, Jira, Zendesk, fluxos do Google Workspace e Shopify Flow. Também criamos fluxos com n8n e agentes com Hermes Agent, conectando informações e mantendo sua equipe no controle.",
    deliverables: [
      "Microsoft Power Automate, Jira e Zendesk",
      "Google Workspace e Shopify Flow",
      "n8n e agentes com Hermes",
      "Supervisão e acompanhamento",
    ],
    cta: "Quero automatizar um processo",
  },
  {
    id: "integracoes",
    title: "Integrações de APIs",
    promise: "Seus sistemas conversando. Sua operação seguindo em frente.",
    description:
      "Conectamos aplicações, CRMs, ERPs e outras ferramentas por APIs e webhooks. Organizamos o caminho dos dados para reduzir retrabalho e manter as informações em sintonia.",
    deliverables: [
      "APIs e webhooks",
      "Conexões entre CRM e ERP",
      "Tratamento de falhas e documentação",
    ],
    cta: "Quero conectar meus sistemas",
  },
];

export const scenarios = [
  {
    name: "Vendas",
    description: "Do interesse no site ao contexto que chega ao comercial.",
    result:
      "Simulação concluída: solicitação organizada e encaminhada ao comercial.",
    nodes: [
      {
        title: "Aplicação web",
        description: "Recebe a solicitação",
        action: "A aplicação recebe uma nova solicitação.",
      },
      {
        title: "n8n",
        description: "Organiza o processo",
        action: "O n8n valida os campos e organiza o encaminhamento.",
      },
      {
        title: "Hermes Agent",
        description: "Prepara o contexto",
        action: "O Hermes prepara um resumo para análise da equipe.",
      },
      {
        title: "CRM + equipe",
        description: "Continua a conversa",
        action: "A solicitação e o resumo chegam ao comercial.",
      },
    ],
  },
  {
    name: "Operação",
    description:
      "Da entrada de um pedido à revisão das informações pela equipe.",
    result:
      "Simulação concluída: informações conferidas e prontas para revisão.",
    nodes: [
      {
        title: "Portal de pedidos",
        description: "Centraliza a entrada",
        action: "Um novo pedido é recebido no portal.",
      },
      {
        title: "n8n",
        description: "Consulta os sistemas",
        action: "O n8n consulta as informações necessárias nos sistemas.",
      },
      {
        title: "Hermes Agent",
        description: "Aponta o que revisar",
        action:
          "O Hermes organiza as informações e destaca o que precisa de revisão.",
      },
      {
        title: "ERP + equipe",
        description: "Recebe para conferir",
        action: "A equipe recebe o pedido para conferir antes de prosseguir.",
      },
    ],
  },
  {
    name: "Atendimento",
    description:
      "Da dúvida recebida a uma sugestão de resposta para sua equipe.",
    result:
      "Simulação concluída: sugestão preparada. A equipe revisa antes de enviar.",
    nodes: [
      {
        title: "Central de ajuda",
        description: "Recebe a dúvida",
        action: "Uma nova dúvida chega à central de ajuda.",
      },
      {
        title: "n8n",
        description: "Encaminha a solicitação",
        action:
          "O n8n organiza a solicitação e consulta a base de informações.",
      },
      {
        title: "Hermes Agent",
        description: "Sugere uma resposta",
        action:
          "O Hermes prepara uma sugestão com base no contexto disponível.",
      },
      {
        title: "Equipe de suporte",
        description: "Revisa e responde",
        action: "A sugestão é entregue à equipe para revisão e envio.",
      },
    ],
  },
];

export const faqs = [
  {
    question: "Preciso ter o projeto todo definido?",
    answer:
      "Não. Você pode chegar com uma ideia, um processo que consome tempo ou uma aplicação que precisa evoluir. A primeira conversa serve para entender o cenário e identificar o que precisa ser definido antes da proposta.",
  },
  {
    question: "Qual é a diferença entre SEO e GEO?",
    answer:
      "O SEO técnico cuida da base do site, como rastreamento, indexação, performance e dados estruturados. GEO, ou Generative Engine Optimization, considera como a marca e suas informações são encontradas e compreendidas em experiências com IA. Não existe garantia de posição ou de citação por uma IA.",
    source: "https://developers.google.com/search/docs/appearance/ai-features",
  },
  {
    question: "Quando usar n8n e quando usar Hermes Agent?",
    answer:
      "O n8n organiza etapas, regras e conexões de um processo. O Hermes Agent pode apoiar tarefas que exigem interpretar informações e usar ferramentas com contexto. Eles podem trabalhar juntos, com limites de acesso e pontos de revisão definidos conforme o projeto.",
  },
  {
    question: "Vocês trabalham com sistemas que já existem?",
    answer:
      "Sim. Podemos avaliar uma aplicação em uso, integrar ferramentas existentes e planejar melhorias. O caminho depende do acesso ao código, da documentação e dos recursos de integração disponíveis em cada sistema.",
  },
  {
    question: "Como funcionam prazo, investimento e continuidade?",
    answer:
      "Prazo e investimento são definidos depois de entender o escopo, as dependências e as prioridades. Manutenção, acompanhamento e novas entregas são alinhados na proposta. Assim, você sabe o que está incluído antes de começar.",
  },
];

---
name: Converte
description: Clareza técnica da ideia à operação, com Inter, branco e turquesa.
colors:
  brand: "#14b8a6"
  brand-deep: "#087f70"
  brand-hover: "#37c8b4"
  ink: "#16332f"
  muted: "#536b66"
  mint: "#e4f5f0"
  line: "#dbe7e2"
  soft: "#f5f8f6"
  white: "#fff"
  button-ink: "#12332c"
  field: "#f8fcfa"
  field-border: "#b6d0c4"
  inverse-text: "#f0f8f4"
  inverse-muted: "#bbd4cc"
  inverse-accent: "#b7eedb"
  inverse-line: "#35514a"
  selection: "#a8e6d5"
  error: "#88352c"
typography:
  display:
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(70px, 7.8vw, 96px)"
    fontWeight: 550
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(32px, 3.5vw, 48px)"
    fontWeight: 550
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(22px, 2.2vw, 29px)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "12px"
    fontWeight: 550
  button:
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.4
rounded:
  field: "5px"
  control: "7px"
  symbol: "10px"
  surface: "12px"
spacing:
  compact: "8px"
  small: "12px"
  medium: "16px"
  group: "20px"
  open: "24px"
  large: "40px"
  section-mobile: "66px"
  section-tablet: "78px"
  section-desktop: "112px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.button-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  button-small:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.control}"
    padding: "11px 17px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    width: "100%"
  flow-surface:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "27px 34px 18px"
---

# Design System: Converte

## Overview

**Creative North Star: "Da ideia à operação"**

A identidade confirmada combina Inter sem serifas, branco, turquesa e verde escuro. A composição dá espaço à leitura e explica trabalho técnico por relações visíveis: títulos diretos, linhas de conexão, listas de entregas e estados de interação. A linguagem em português do Brasil deve continuar prática, compreensível para empresas e agências e sem clichês de IA.

O sistema é predominantemente plano. Grandes campos de cor organizam a página; bordas discretas separam assuntos; ícones de traço ajudam a identificar ações e etapas. Animações têm função de resposta ou explicação. O logotipo existente é uma identidade a preservar, não uma tipografia a recriar.

Registro extraído de `src/index.css`, `src/App.tsx`, `src/content.ts`, `src/main.tsx` e dos arquivos locais da fonte, confrontado com `PRODUCT.md` e o contrato da superfície. Não houve acesso ao navegador ou capturas: os comportamentos responsivos abaixo estão implementados no código, sem certificação visual de renderização, contraste, quebra de linhas ou ausência de overflow. A composição específica da home permanece no contrato da superfície, não vira obrigação para toda nova tela.

**Key Characteristics:**

- Inter auto-hospedada, com hierarquia por escala e peso.
- Branco e turquesa, apoiados por verde escuro e fundos de baixa saturação.
- Superfícies planas, divisórias finas e cantos moderados.
- Interação que explica um processo ou confirma uma ação.
- Comunicação concreta, demonstrações identificadas e foco visível.

## Colors

Uma única família de acento turquesa organiza ações e ênfase sobre uma base clara; verde escuro sustenta texto e a seção de contraste.

### Primary

- **Turquesa da marca** (`brand`): preenchimento das ações principais. `brand-hover` sinaliza resposta ao ponteiro.
- **Turquesa profundo** (`brand-deep`): palavras enfatizadas, links contextuais, ícones e foco sobre superfícies claras.
- **Menta clara** (`mint`): áreas de demonstração e contato; contexto tonal, sem gradiente.

### Neutral

- **Verde de leitura** (`ink`): texto principal e fundo da seção escura; `button-ink` é o texto específico dos botões turquesa.
- **Verde secundário** (`muted`): descrições e orientação. Não usar opacidade arbitrária para produzir outros níveis de texto.
- **Branco** (`white`): fundo principal e navegação. **Branco suave** (`soft`): campo alternado de seção. **Linha clara** (`line`): divisórias e bordas.
- **Campo claro** (`field`) e **borda de campo** (`field-border`): entradas e superfícies de símbolos.
- **Texto inverso** (`inverse-text`), **texto inverso secundário** (`inverse-muted`), **menta inversa** (`inverse-accent`) e **linha inversa** (`inverse-line`): o vocabulário da superfície escura.
- **Seleção menta** (`selection`): seleção de texto com `ink`; também o contorno de foco na seção escura.
- **Erro terroso** (`error`): mensagem de falha do formulário, sempre acompanhada por texto e alternativa de ação.

**The Brand Continuity Rule.** Preservar a identidade branca, turquesa e verde escuro; novas telas não introduzem outra família de acento por conveniência.

## Typography

**Display Font:** Inter, com `ui-sans-serif, system-ui, sans-serif` como fallback.
**Body Font:** a mesma família. Não existe família mono ou de rótulos separada.

**Character:** Inter mantém o tom técnico acessível. Pesos intermediários, tracking negativo em títulos e linhas de corpo arejadas criam hierarquia sem decoração tipográfica.

A fonte variável normal é auto-hospedada em `/fonts/inter-latin-variable.woff2` e `/fonts/inter-latin-ext-variable.woff2`, com intervalos Unicode separados, pesos declarados de 400 a 800 e `font-display: swap`. A base desativa síntese de fonte. Os arquivos estão presentes em `public/fonts`; o carregamento no navegador não foi observado.

### Hierarchy

- **Display:** token `display`, para a abertura. O tamanho muda explicitamente nos breakpoints: até 1100px, 78px; até 820px, `clamp(57px, 8.7vw, 72px)`; até 600px, `clamp(60px, 16.4vw, 90px)` com entrelinha 1.02; até 360px, 57px. Estes são valores existentes, não prova de que toda quebra de linha esteja correta.
- **Headline:** token `headline`, base dos títulos de seção. Há variantes locais para a seção escura, agência, processo, FAQ e contato; não generalizar um tamanho local como escala universal.
- **Title:** token `title`, títulos das ofertas. Abaixo de 600px usa 25px, e abaixo de 360px usa 23px.
- **Body:** token `body`, descrições de serviços. Abertura e introduções usam 15px com entrelinhas entre 1.75 e 1.85; o argumento principal da abertura usa 24px, peso 550 e entrelinha 1.35. Larguras locais de leitura ficam geralmente entre 315px e 390px.
- **Label:** token `label`, referência dos rótulos do formulário; botões têm token próprio. A implementação contém textos auxiliares menores, mas esses tamanhos não são um padrão recomendado para conteúdo novo.

Títulos usam `text-wrap: balance`; parágrafos usam `text-wrap: pretty`. Não há escala modular única nem regra de caixa alta. Números das etapas usam algarismos tabulares.

**The One Family Rule.** Usar Inter em todos os papéis e construir contraste com tamanho, peso, espaçamento e cor; preservar a escolha explícita de uma identidade sem serifas.

## Layout

O contêiner base tem largura `min(100% - 112px, 1248px)`, centralizada. Os recuos laterais implementados mudam para 36px até 1100px, 24px até 820px, 20px até 600px e 16px até 360px. O documento tem largura mínima de 320px. O máximo de 1248px é o limite da composição ampla, não largura fixa de cada conteúdo.

O espaçamento vertical de seção usa os tokens `section-desktop`, `section-tablet` e `section-mobile`, com as mudanças em 820px e 600px. Fluxos e grupos menores recorrem a intervalos de 8–40px; grades maiores usam folgas locais entre 50px e 120px. Não arredondar tudo para uma escala inventada.

As seções combinam títulos e conteúdo em duas colunas, com proporções específicas ao conteúdo. O processo tem quatro colunas, duas até 820px e uma até 600px. Serviços, visão, agência, FAQ e contato passam a uma coluna até 600px. O formulário já empilha seus pares de campos até 820px.

A navegação fica fixa por posicionamento sticky, com cabeçalho de 87px, 75px até 820px e 70px até 600px. A navegação horizontal dá lugar ao botão de menu até 820px. O deslocamento de âncoras é compensado por `scroll-padding-top` de 108px, reduzido para 88px até 600px. O código também ajusta a abertura acima de 1440px.

O fluxo ilustrativo tem quatro colunas no desktop e uma sequência vertical até 600px; os conectores mudam de direção. Essas regras descrevem a implementação. Testar novas telas nas transições, especialmente em 320px, antes de declarar a responsividade aprovada.

## Elevation & Depth

A profundidade vem de campos tonais, linhas e estados, com duas sombras localizadas. Não existe elevação generalizada para cards. A seção escura é contraste de superfície; não é um painel flutuante.

### Shadow Vocabulary

- **Menu móvel:** `0 16px 28px -20px #16332f50`, separa a navegação aberta do conteúdo abaixo.
- **Etapa atual:** `0 5px 12px -5px #16332f50`, reforça o símbolo ativo no fluxo.

**The Flat Surface Rule.** Preservar superfícies planas; sombra comunica a sobreposição do menu ou a etapa ativa, sem transformar cada bloco de conteúdo em card elevado.

## Shapes

Cantos moderados distinguem controles, campos, símbolos e superfícies pelos tokens `control`, `field`, `symbol` e `surface`. Não aplicar um único raio a tudo. O seletor de cenários usa invólucro de 7px e opções de 4px; o símbolo do fluxo passa de 10px para 9px no mobile. Círculos pertencem a indicadores e ao atalho de rolagem, não são a forma padrão de botões.

Bordas de 1px organizam navegação, linhas de serviço, FAQ, etapas e campos. Linhas retas conectam o fluxo; ícones vetoriais de traço têm função semântica. Não há gradientes, textura ou fotografia genérica na implementação.

## Components

### Buttons

Ações claras, com texto descritivo e ícone vetorial quando ajuda a orientar.

- **Primary:** tokens de `button-primary`, altura mínima de 54px e espaço de 26px entre texto e ícone.
- **Compact:** `button-small`, altura mínima de 43px, texto de 13px e espaço de 17px. O CTA de cabeçalho ganha variante específica no mobile.
- **Hover / Active:** muda para `brand-hover` e sobe 2px em 0.2s; ao pressionar, retorna à posição original. Não há sombra de botão.
- **Text link:** fundo transparente, altura mínima de 44px, texto de 14px e peso 600; hover sublinha e desloca o ícone 2px para cima e para a direita.
- **Disabled:** cursor de espera e opacidade de 0.65. No formulário, o envio mostra texto de andamento e spinner.

### Cards / Containers

A principal superfície contida é o fluxo ilustrativo, definida por `flow-surface`. Serviços e FAQ são sequências abertas separadas por linhas; não convertê-los automaticamente em cards. A área de contato usa um campo menta de largura total.

### Inputs / Fields

Campos claros com borda fina, texto de 13px, altura mínima de 47px e tokens de `input`. A borda no hover usa `#6d9e8d`; placeholders usam `#5b736a`. Área de texto tem altura mínima de 104px e redimensionamento vertical. O select usa seta vetorial própria. Até 600px, o texto de entrada sobe para 16px e o recuo lateral passa a 12px.

Rótulos ficam acima dos campos e são elementos associados. O foco usa contorno de 2px com afastamento de 2px. A falha é um alerta textual em `error`, com opção de WhatsApp; não existe um estado visual de erro por campo documentado. Sucesso substitui o formulário, recebe foco e oferece nova mensagem. No novo envio, o foco retorna ao nome. Nenhum sucesso visual deve ser mostrado antes da confirmação da resposta.

### Navigation

Cabeçalho branco com divisória inferior, marca à esquerda e navegação de texto de 13px e peso 500. Links mudam de `muted` para `brand-deep` no hover. O menu móvel é uma superfície branca abaixo do cabeçalho, com links separados por bordas; `Escape` fecha o menu e devolve foco ao botão. O acionador informa estado por `aria-expanded`, e os links fecham o menu. Não há estado de seção ativa implementado.

### Scenario tabs and illustrative workflow

Seletor tonal com opção selecionada branca. O padrão de tabs usa setas esquerda/direita, Home e End, índice de tabulação itinerante e painel associado. Trocar de cenário reinicia a demonstração. As etapas alternam entre símbolo claro, etapa atual escura e concluída em menta com check; o feedback textual é uma região de status.

A execução só começa por ação da pessoa, avança a cada 850ms e impede nova execução enquanto está em andamento. Conectores e indicador acompanham a etapa; o spinner dura 1s por volta. A demonstração informa que não envia dados nem aciona sistemas externos. Não apresentar esse fluxo como telemetria real.

### FAQ

Usa `details` e `summary` nativos, com bordas, texto e seta vetorial que gira quando aberto. Hover muda a pergunta para `brand-deep`. A resposta continua no fluxo da página; não existe regra de abrir somente uma pergunta por vez.

### Focus, selection and motion

O foco global usa contorno de 3px em `brand-deep`, afastado 5px, com raio de 3px; sobre a seção escura usa `selection`. Campos têm a exceção descrita acima. A seleção de texto usa `selection` com `ink`. O link de pular conteúdo aparece ao receber foco.

Transições de controles duram 0.2s; símbolos de etapa usam 0.3s. O conector usa 0.85s com `cubic-bezier(0.22, 1, 0.36, 1)`; o indicador pulsa em 0.85s. Há configuração global de Motion de 0.4s e a mesma curva, mas não há elementos animados por Motion na superfície atual; não tratar essa configuração ociosa como animação renderizada.

Com `prefers-reduced-motion: reduce`, a rolagem suave é removida e animações/transições CSS passam a 0.01ms com uma iteração. A configuração de Motion respeita a preferência. A demonstração vai diretamente ao resultado, sem percorrer as etapas. Não acrescentar animação contínua que contrarie essa escolha.

## Do's and Don'ts

### Do:

- **Do** preservar Inter auto-hospedada, o logotipo e a identidade branca, turquesa e verde escuro.
- **Do** usar linhas e campos tonais para organizar conteúdo e reservar sombra aos papéis documentados.
- **Do** fazer animações responderem a uma ação ou explicarem uma mudança, respeitando redução de movimento.
- **Do** manter foco perceptível, rótulos associados e mensagens de estado compreensíveis.
- **Do** identificar demonstrações ilustrativas e escrever entregas em português direto, sem prometer métricas não verificadas.
- **Do** validar legibilidade e layout no navegador antes de aprovar uma nova superfície.

### Don't:

- **Don't** introduzir serifas, gradientes ou clichês visuais e verbais de IA na identidade escolhida.
- **Don't** transformar toda seção em uma grade de cards elevados.
- **Don't** substituir ícones vetoriais funcionais por caracteres decorativos ou inventar novos selos e sobrancelhas de seção.
- **Don't** promover tamanhos auxiliares compactos ou alvos reduzidos da home a padrões globais de acessibilidade.
- **Don't** declarar a responsividade ou o contraste aprovados apenas pela leitura dos estilos.

Não canonizado nem corrigido neste registro: o código contém textos auxiliares de 8–11px e alguns alvos abaixo de 44px (incluindo atalho móvel de 34px e opções de cenário de 36–37px). São pontos para revisão de legibilidade e interação, não decisões a herdar como padrão. Sem inspeção renderizada, não é possível confirmar a extensão de problemas de leitura, foco, contraste ou overflow.

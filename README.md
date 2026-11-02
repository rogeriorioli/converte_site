# Converte

Site comercial em português para aplicações web, implantação e desenvolvimento VTEX e Shopify, SEO técnico e GEO, automações com n8n e Hermes Agent e integrações de APIs.

## Desenvolvimento

Requer Node.js e as dependências do projeto:

```sh
npm install
npm run dev
```

O Vite usa a porta 3000 ou a próxima porta disponível. A interface tem uma demonstração local de fluxos, navegação móvel, perguntas frequentes e formulário de contato. A simulação não acessa sistemas externos.

## Build e verificações

```sh
npm run build
npm test
npx tsc --noEmit
npm run preview
```

O build gera `dist/` e depois pré-renderiza a página com React. O HTML de produção contém os textos e dados estruturados antes de executar JavaScript. A entrada do cliente hidrata esse HTML; no desenvolvimento, monta a aplicação normalmente. O formulário permanece desabilitado até a hidratação e usa POST explícito para evitar o envio de dados na URL caso o JavaScript falhe.

Os testes do contato usam um provedor simulado. Nenhum e-mail é enviado durante os testes.

## Contato em produção

O endpoint `api/contact.ts` mantém o contrato JSON `{ name, email, phone, message }`. Configure `RESEND_API_KEY` no ambiente do servidor e preserve um domínio remetente verificado no Resend. A hospedagem precisa executar esse endpoint Node/serverless, como ocorre com a pasta `api/` na Vercel. Publicar apenas `dist/` serve a página, mas não executa a API.

`vite dev` e `vite preview` servem a interface; não executam a função serverless. Sem o endpoint, a interface informa a falha e oferece o WhatsApp. O envio real precisa ser validado no ambiente de hospedagem configurado. A confirmação só é exibida depois que o provedor aceita a notificação; isso não equivale a uma confirmação de entrega na caixa de entrada.

## Conteúdo e identidade

- `src/content.ts`: ofertas, cenários e perguntas frequentes.
- `src/App.tsx`: estrutura, interações e contato.
- `src/index.css`: identidade, estados e comportamento responsivo.
- `public/fonts/`: Inter variável hospedada localmente e licença OFL.
- `STRATEGY-2027.md`: pesquisa, fontes e decisões de posicionamento.
- `PRODUCT.md` e `DESIGN.md`: contexto do negócio e sistema visual.

A identidade mantém Inter, o logotipo e o turquesa da Converte. Não há resultados comerciais, depoimentos ou métricas inventados. As animações respeitam a preferência por movimento reduzido.

## Estado de validação

Build, TypeScript, estrutura do HTML e testes locais são verificáveis neste ambiente. A revisão visual de desktop e celular permanece pendente: o acesso automatizado ao navegador foi bloqueado por não conseguir identificar a URL com segurança. O revisor do Impeccable verificou correções no código; isso não certifica o resultado renderizado.

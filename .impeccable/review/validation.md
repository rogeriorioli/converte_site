# Validação — 2 de novembro de 2026

## Resultado técnico

- `npm run build`: aprovado, incluindo pré-renderização.
- TypeScript: aprovado para frontend, API, script de build e testes.
- `npm test`: 6 testes aprovados, com provedor de e-mail simulado; nenhum envio real.
- HTML de produção: 35 IDs únicos, âncoras internas válidas, quatro serviços no JSON-LD e fontes WOFF2 locais válidas.
- Formulário estático: POST explícito e controles desabilitados antes da hidratação.
- Contraste calculado: corpo sobre branco 13,56:1; texto secundário sobre branco 5,73:1 e sobre menta 5,08:1; texto do botão 5,49:1; placeholder 4,94:1. O verde de destaque sobre menta tem 4,35:1 e é usado em títulos grandes e símbolos, não em texto normal.
- Servidor existente em `http://localhost:3000/`: resposta HTTP 200 e módulo atualizado da aplicação disponível.

## Revisão independente do Impeccable

Achados de código resolvidos: prevenção de GET sem JavaScript, foco após sucesso e reinício, tamanho do select móvel, confirmação correta do provedor de e-mail e limite de espera para o cadastro secundário. O revisor confirmou as correções no código e no HTML de produção atualizado.

O detector encontrou somente o uso de Inter como fonte comum. Ela foi mantida porque a preservação da tipografia é uma exigência explícita do usuário.

## Limites

**Disposition: recapture.** A revisão visual não foi concluída. O host de acesso ao navegador estava indisponível; a tentativa de vincular o Chrome foi bloqueada porque a ferramenta não conseguiu identificar a URL atual com segurança. Não foram feitas novas tentativas de automação ou usados mecanismos alternativos de captura. Não existem screenshots de desktop ou celular nesta revisão; aparência, overflow e animação renderizados não foram certificados.

O envio real do formulário depende do endpoint e da chave Resend configurados na hospedagem. Os testes desta sessão foram locais e simulados.

// Mensagem inicial após o lead digitar "IA"
function getInitialMessage() {
  return `
🚀 Que bom que você quer saber mais sobre a IA!

👉 Esse é o meu mini curso “Ganhos Rápidos com IA” onde ensino a ganhar de R$50 a R$200 por dia usando só o celular e ferramentas gratuitas como o ChatGPT.

💥 Está com valor promocional de R$19,90 e você começa a aplicar HOJE.

✅ Acesso imediato
✅ Passo a passo simples
✅ Pode começar mesmo sem experiência

Clique aqui para garantir agora 👉 https://pay.hotmart.com/T100490102Y

Se tiver alguma dúvida, me chama aqui! 😄
`;
}

// Mensagem de follow-up (30 minutos ou 1 hora depois)
function getFollowUpMessage() {
  return `
⚠️ Só passando pra lembrar que a oferta especial do mini curso “Ganhos Rápidos com IA” ainda está ativa!

🎁 Você pode garantir acesso imediato por apenas R$19,90 e começar hoje mesmo com ChatGPT e celular.

👉 Link: https://pay.hotmart.com/T100490102Y
`;
}

// Mensagem final de urgência (24 horas depois)
function getFinalChanceMessage() {
  return `
🕒 Última chance!

Hoje é o último dia pra aproveitar o mini curso “Ganhos Rápidos com IA” com o valor de lançamento: R$19,90.

📱 Totalmente aplicável com celular, mesmo pra iniciantes.

👉 Link final: https://pay.hotmart.com/T100490102Y

Nos vemos lá!
`;
}

// Mensagem de pós-venda (após a compra)
function getPostPurchaseMessage() {
  return `
🎉 Parabéns por garantir seu acesso ao mini curso “Ganhos Rápidos com IA”!

📩 Você vai receber tudo no seu e-mail, mas se tiver dúvidas pode me chamar aqui.

E quando aplicar, me marca no Insta com @lucasdaia 😄

Boa jornada com a IA!
`;
}

module.exports = {
  getInitialMessage,
  getFollowUpMessage,
  getFinalChanceMessage,
  getPostPurchaseMessage,
};

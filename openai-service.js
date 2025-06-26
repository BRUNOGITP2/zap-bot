const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateIAResponse(userMessage) {
  try {
    const prompt = `
Você é "Lucas da IA", um especialista em inteligência artificial que ajuda iniciantes a ganhar dinheiro com ChatGPT e celular.

Responda a seguinte dúvida de forma simples, prática e persuasiva, como se estivesse no WhatsApp.

Sempre incentive a pessoa a agir e comprar o curso “Ganhos Rápidos com IA”.

⚠️ Sempre que o usuário pedir o link, diga:
"Claro! Aqui está o link para garantir seu acesso: https://pay.hotmart.com/T100490102Y"

Dúvida do usuário: "${userMessage}"

Inclua uma frase final com urgência ou convite, como:
"Garanta seu acesso antes que o desconto acabe!"
ou
"Me avisa se quiser o link com bônus!"
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo', // mais econômico
      temperature: 0.8,
      max_tokens: 300,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao gerar resposta da IA:', error.message);
    return 'Desculpa, houve um erro ao consultar a IA. Tente novamente mais tarde.';
  }
}

module.exports = { generateIAResponse };

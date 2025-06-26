const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const { getInitialMessage } = require('./utils/messageTemplates');
const { generateIAResponse } = require('./openai-service');
const { scheduleFollowUps } = require('./followup');
const db = require('./firebase'); // Firebase Firestore

// Cria instância do cliente com autenticação local
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox'],
  },
});

// Exibe QR Code no terminal
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('🔄 Escaneie o QR Code com o WhatsApp');
});

// Confirmação de conexão
client.on('ready', () => {
  console.log('✅ Cliente WhatsApp conectado!');
});

// Função para salvar lead no Firebase
async function salvarLead(numero) {
  try {
    const ref = db.collection('leads').doc(numero);
    const doc = await ref.get();

    if (!doc.exists) {
      await ref.set({
        numero,
        status: 'interessado',
        criadoEm: new Date().toISOString(),
      });
      console.log(`📥 Novo lead salvo: ${numero}`);
    } else {
      console.log(`ℹ️ Lead já existente: ${numero}`);
    }
  } catch (err) {
    console.error('❌ Erro ao salvar lead:', err.message);
  }
}

// Mapa para evitar respostas repetidas de palavras curtas
const historico = new Map();

// Escuta mensagens recebidas
client.on('message', async (msg) => {
  const messageText = msg.body.trim().toLowerCase();
  const user = msg.from;

  const ultima = historico.get(user);
  historico.set(user, messageText);

  // Lista de mensagens curtas irrelevantes
  const mensagensIrrelevantes = ['ai', 'ow', 'oi', 'ola', 'blz', 'ok', 'bom dia', 'boa tarde', 'boa noite'];
  const gatilhosValidos = ['ia', 'ai', 'quero'];

  // 🚀 Se a mensagem for uma palavra-chave válida
  if (gatilhosValidos.includes(messageText)) {
    if (mensagensIrrelevantes.includes(ultima) || messageText === ultima) return;

    console.log(`🚀 Palavra-chave recebida de ${user}`);
    await client.sendMessage(user, getInitialMessage());
    await salvarLead(user);
    scheduleFollowUps(client, user);
    return;
  }

  // ⛔ Ignorar mensagens muito genéricas
  if (mensagensIrrelevantes.includes(messageText)) return;

  // 📎 Detectar intenção de link
  const pedeLink = ['link', 'pdf', 'comprar', 'acesso'].some(p => messageText.includes(p));
  if (pedeLink) {
    const linkMsg = `Claro! Aqui está o link para garantir seu acesso imediato ao curso Ganhos Rápidos com IA: https://pay.hotmart.com/T100490102Y 🚀`;
    await client.sendMessage(user, linkMsg);
    return;
  }

  // 🤖 Resposta com IA
  if (messageText.length > 3) {
    const response = await generateIAResponse(messageText);
    await client.sendMessage(user, response);
  }
});

// Inicia o cliente
client.initialize();

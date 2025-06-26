const { getFollowUpMessage, getFinalChanceMessage } = require('./utils/messageTemplates');

// Simula um banco de dados de agendamentos
const scheduledMessages = new Map();

// Função para agendar follow-ups
function scheduleFollowUps(client, userId) {
  if (scheduledMessages.has(userId)) return; // evita agendamentos duplicados

  console.log(`📆 Agendando follow-ups para ${userId}`);

  // 30 minutos depois: lembrete leve
  setTimeout(() => {
    client.sendMessage(userId, getFollowUpMessage());
    console.log(`🔔 Follow-up (30min) enviado para ${userId}`);
  }, 30 * 60 * 1000); // 30 min

  // 24 horas depois: urgência final
  setTimeout(() => {
    client.sendMessage(userId, getFinalChanceMessage());
    console.log(`🔥 Último aviso (24h) enviado para ${userId}`);
    scheduledMessages.delete(userId); // limpa da memória
  }, 24 * 60 * 60 * 1000); // 24 horas

  scheduledMessages.set(userId, true);
}

module.exports = { scheduleFollowUps };

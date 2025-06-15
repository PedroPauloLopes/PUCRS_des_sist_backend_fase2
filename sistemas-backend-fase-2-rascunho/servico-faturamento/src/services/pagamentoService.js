const axios = require('axios');
const db = require('../database/db');

exports.registrarPagamento = async ({ dia, mes, ano, codigoAssinatura, valorPago }) => {
  const pagamento = { dia, mes, ano, codigoAssinatura, valorPago };

  try {
    console.log('Entrou no registrarPagamento');

    // 1. Salva localmente
    await db.salvarPagamento(pagamento);
    console.log('Pagamento salvo localmente');

    // 2. Notifica ServicoGestao via API Gateway
    await axios.post('http://localhost:3002/gestao/pagamento', pagamento, { timeout: 5000 });
    console.log('Notificado ServicoGestao');

    // 3. Notifica ServicoPlanosAtivos via API Gateway
    await axios.post('http://localhost:3002/planosativos/pagamento', pagamento, { timeout: 5000 });
    console.log('Notificado ServicoPlanosAtivos');
    
  } catch (err) {
    console.error('Erro no serviço de pagamento:', err.message);
    throw new Error('Falha ao processar registro de pagamento');
  }
};

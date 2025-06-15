const pagamentoService = require('../services/pagamentoService');

exports.registrarPagamento = async (req, res) => {
  console.log('Entrou no registrarPagamento');
  const { dia, mes, ano, codigoAssinatura, valorPago } = req.body;

  try {
    await pagamentoService.registrarPagamento({ dia, mes, ano, codigoAssinatura, valorPago });
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar pagamento' });
  }
};


  // Validação básica
//   if (
//     !dia || !mes || !ano ||
//     !codigoAssinatura || typeof valorPago !== 'number'
//   ) {
//     return res.status(400).json({ error: 'Dados de pagamento incompletos ou inválidos.' });
//   }



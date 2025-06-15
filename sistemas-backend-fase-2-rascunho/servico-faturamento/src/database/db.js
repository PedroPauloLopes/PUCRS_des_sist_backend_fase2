const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, 'pagamentos.json');

exports.salvarPagamento = async (pagamento) => {
  try {
    let pagamentos = [];

    // Verifica se o arquivo já existe
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      pagamentos = JSON.parse(data);
    } catch (readErr) {
      if (readErr.code !== 'ENOENT') {
        console.error('Erro ao ler arquivo de pagamentos:', readErr.message);
        throw new Error('Falha ao acessar base de pagamentos.');
      }
      // Se o arquivo não existir, inicia com array vazio
    }

    pagamentos.push(pagamento);

    await fs.writeFile(filePath, JSON.stringify(pagamentos, null, 2));
  } catch (err) {
    console.error('Erro ao salvar pagamento:', err.message);
    throw new Error('Erro ao salvar pagamento.');
  }
};

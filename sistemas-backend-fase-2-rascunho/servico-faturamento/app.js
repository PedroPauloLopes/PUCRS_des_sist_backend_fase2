require('dotenv').config();

const express = require('express');
const pagamentoRoutes = require('./src/routes/pagamentoRoutes');

const app = express();
app.use(express.json());

// **Atenção na ordem e caminho**
app.use('/', pagamentoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ServicoFaturamento rodando na porta ${PORT}`);
});

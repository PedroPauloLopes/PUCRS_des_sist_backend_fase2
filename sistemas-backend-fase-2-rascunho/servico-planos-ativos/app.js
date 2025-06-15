const express = require('express');
const app = express();

app.use(express.json());

app.post('/pagamento', (req, res) => {
  console.log('ServicoPlanosAtivos recebeu pagamento:', req.body);
  res.status(200).send('ServicoPlanosAtivos recebeu pagamento');
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`ServicoPlanosAtivos rodando na porta ${PORT}`);
});

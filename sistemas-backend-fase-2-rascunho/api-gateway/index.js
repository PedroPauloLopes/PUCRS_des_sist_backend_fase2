const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// Middleware de logging para todas as requisições
app.use((req, res, next) => {
  console.log(`Gateway recebeu: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('API Gateway funcionando!');
});

// Proxy para o ServicoFaturamento
app.use('/faturamento', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/faturamento': '' },
}));

// Proxy para o ServicoGestao
app.use('/gestao', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  pathRewrite: { '^/gestao': '' },
}));

// Proxy para o ServicoPlanosAtivos
app.use('/planosativos', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: { '^/planosativos': '' },
}));

app.listen(3002, () => {
  console.log('API Gateway rodando na porta 3002');
});

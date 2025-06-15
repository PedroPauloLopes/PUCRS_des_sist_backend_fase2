import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { criarRotas } from './infra/http/Rotas.js';

import { RepositorioClientePrisma } from './infra/repositories/RepositorioClientePrisma.js';
import { RepositorioPlanoPrisma } from './infra/repositories/RepositorioPlanoPrisma.js';
import { RepositorioAssinaturaPrisma } from './infra/repositories/RepositorioAssinaturaPrisma.js';

import { ClienteService } from './application/services/ClienteService.js';
import { PlanoService } from './application/services/PlanoService.js';
import { AssinaturaService } from './application/services/AssinaturaService.js';

const app = express();
app.use(express.json());

// Instanciar repositórios Prisma (acesso ao banco real)
const repositorioCliente = new RepositorioClientePrisma();
const repositorioPlano = new RepositorioPlanoPrisma();
const repositorioAssinatura = new RepositorioAssinaturaPrisma();

// Instanciar serviços
const clienteService = new ClienteService(repositorioCliente);
const planoService = new PlanoService(repositorioPlano);
const assinaturaService = new AssinaturaService(repositorioAssinatura);

// Criar e usar rotas
const router = criarRotas({ 
  clienteService, 
  planoService, 
  assinaturaService 
});

app.use('/gerenciaplanos', router);

app.post('/pagamento', (req, res) => {
  console.log('ServicoGestao recebeu pagamento:', req.body);
  res.status(200).send('ServicoGestao recebeu pagamento');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ServicoGestao rodando na porta ${PORT}`);
});

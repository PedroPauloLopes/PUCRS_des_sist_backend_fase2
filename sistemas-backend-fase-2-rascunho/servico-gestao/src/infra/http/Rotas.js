// src/infra/http/Rotas.js
import express from 'express';

export function criarRotas({ clienteService, planoService, assinaturaService }) {
  const router = express.Router();

  // --- Rotas para Clientes ---
  router.get('/clientes', async (req, res) => {
    try {
      const clientes = await clienteService.listarClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  router.post('/clientes', async (req, res) => {
    try {
      const cliente = await clienteService.criarCliente(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  });

  router.get('/clientes/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const cliente = await clienteService.buscarClientePorId(id);
      if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado.' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  // --- Rotas para Planos ---
  router.get('/planos', async (req, res) => {
    try {
      const planos = await planoService.listarPlanos();
      res.json(planos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  router.get('/planos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const plano = await planoService.buscarPlanoPorId(id);
      res.json(plano);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  });

  router.post('/planos', async (req, res) => {
    try {
      const plano = await planoService.criarPlano(req.body);
      res.status(201).json(plano);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  });

  router.patch('/planos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const planoAtualizado = await planoService.atualizarPlano(id, req.body);
      if (!planoAtualizado) {
        return res.status(404).json({ erro: 'Plano não encontrado' });
      }
      res.json(planoAtualizado);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  });

  // --- Rotas para Assinaturas ---
  router.get('/assinaturas', async (req, res) => {
    try {
      const assinaturas = await assinaturaService.listarAssinaturas();
      res.json(assinaturas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  router.get('/assinaturas/CANCELADOS', async (req, res) => {
    try {
      const canceladas = await assinaturaService.listarCanceladas();
      res.json(canceladas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  router.get('/assinaturas/ATIVOS', async (req, res) => {
    try {
      const ativas = await assinaturaService.listarAtivas();
      res.json(ativas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  router.get('/assinaturas/TODOS', async (req, res) => {
    try {
      const todas = await assinaturaService.listarAssinaturas();
      res.json(todas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  router.post('/assinaturas', async (req, res) => {
    try {
      const assinatura = await assinaturaService.criarAssinatura(req.body);
      res.status(201).json(assinatura);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  });

  // Rota opcional: cancelar assinatura
  router.patch('/assinaturas/:id/cancelar', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assinaturaCancelada = await assinaturaService.cancelarAssinatura(id);
      if (!assinaturaCancelada) {
        return res.status(404).json({ erro: 'Assinatura não encontrada' });
      }
      res.json(assinaturaCancelada);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

  // Rota opcional: registrar pagamento e atualizar status
  router.patch('/assinaturas/:id/pagamento', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { dataUltimoPagamento } = req.body;
      const atualizada = await assinaturaService.registrarPagamento(id, dataUltimoPagamento);
      if (!atualizada) {
        return res.status(404).json({ erro: 'Assinatura não encontrada' });
      }
      res.json(atualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  });

  return router;
}

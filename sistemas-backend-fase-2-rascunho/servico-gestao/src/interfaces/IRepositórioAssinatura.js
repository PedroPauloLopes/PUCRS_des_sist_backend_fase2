export class IRepositorioAssinatura {
  criar({ clienteId, planoId, dataInicio, dataUltimoPagamento }) {
    throw new Error('Método criar() não implementado');
  }

  listarTodas() {
    throw new Error('Método listarTodas() não implementado');
  }

  atualizarUltimoPagamento(id, dataUltimoPagamento) {
    throw new Error('Método atualizarUltimoPagamento() não implementado');
  }

  buscarPorId(id) {
    throw new Error('Método buscarPorId() não implementado');
  }

  atualizar(id, assinaturaAtualizada) {
    throw new Error('Método atualizar() não implementado');
  }
}

// src/interfaces/IRepositorioPlano.js

export class IRepositorioPlano {
  salvar(plano) {
    throw new Error('Método salvar() não implementado');
  }

  buscarPorId(id) {
    throw new Error('Método buscarPorId() não implementado');
  }

  listarTodos() {
    throw new Error('Método listarTodos() não implementado');
  }

  atualizar(id, novosDados) {
    throw new Error('Método atualizar() não implementado');
  }

  remover(id) {
    throw new Error('Método remover() não implementado');
  }
}

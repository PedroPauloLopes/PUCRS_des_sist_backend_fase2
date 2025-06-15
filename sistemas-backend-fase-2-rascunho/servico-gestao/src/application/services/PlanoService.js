export class PlanoService {
  constructor(repositorioPlano) {
    this.repositorioPlano = repositorioPlano;
  }

  criarPlano(dadosPlano) {
    const { nome, velocidade, preco } = dadosPlano;

    if (!nome || !velocidade || !preco) {
      throw new Error('Dados incompletos para criar o plano.');
    }

    const plano = { 
      nome: dadosPlano.nome,
      velocidade: dadosPlano.velocidade,
      preco: dadosPlano.preco };
    return this.repositorioPlano.salvar(plano);
  }

  listarPlanos() {
    return this.repositorioPlano.listarTodos();
  }

  buscarPlanoPorId(id) {
    const plano = this.repositorioPlano.buscarPorId(id);
    if (!plano) {
      throw new Error('Plano não encontrado.');
    }
    return plano;
  }

  atualizarPlano(id, novosDados) {
    return this.repositorioPlano.atualizar(id, novosDados);
  }

  removerPlano(id) {
    return this.repositorioPlano.remover(id);
  }
}

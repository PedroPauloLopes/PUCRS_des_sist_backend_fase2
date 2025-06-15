export class Plano {
  constructor(id, nome, velocidadeMbps, precoMensal) {
    this.id = id;
    this.nome = nome;
    this.velocidadeMbps = velocidadeMbps;
    this.precoMensal = precoMensal;
  }

  atualizarPreco(novoPreco) {
    this.precoMensal = novoPreco;
  }

  atualizarVelocidade(novaVelocidade) {
    this.velocidadeMbps = novaVelocidade;
  }
}
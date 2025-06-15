export class Cliente {
  constructor(id, nome, email, cpf, telefone) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
  }

  atualizarContato(novoTelefone) {
    this.telefone = novoTelefone;
  }

  atualizarEmail(novoEmail) {
    this.email = novoEmail;
  }
}

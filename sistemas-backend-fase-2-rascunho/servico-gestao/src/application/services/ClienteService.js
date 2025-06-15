export class ClienteService {
  constructor(repositorioCliente) {
    this.repositorioCliente = repositorioCliente;
  }

  async listarClientes() {
    return await this.repositorioCliente.listarTodas();
  }

  async criarCliente(dadosCliente) {
    const { nome, email, telefone } = dadosCliente;

    if (!nome || !email) {
      throw new Error('Nome e email são obrigatórios.');
    }

    // Verifica se já existe um cliente com o mesmo email
    const clienteExistente = await this.repositorioCliente.buscarPorEmail(email);
    if (clienteExistente) {
      throw new Error('Já existe um cliente com esse email.');
    }

    const novoCliente = {
      nome,
      email,
      telefone: telefone || null,
    };

    return await this.repositorioCliente.criar(novoCliente);
  }

  async buscarClientePorId(id) {
    const cliente = await this.repositorioCliente.buscarPorId(id);
    return cliente || null;
  }
}

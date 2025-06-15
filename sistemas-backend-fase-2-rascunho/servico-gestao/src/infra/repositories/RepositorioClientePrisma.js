import {prisma} from '../database/prismaClient.js';

export class RepositorioClientePrisma {
  async listarTodas() {
    return await prisma.cliente.findMany();
  }

  async buscarPorId(id) {
    return await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });
  }

  async buscarPorEmail(email) {
  return await prisma.cliente.findUnique({
    where: { email },
  });
}


  async criar(cliente) {
    return await prisma.cliente.create({
      data: {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone || null,
      },
    });
  }

  async atualizar(id, dadosAtualizados) {
    try {
      return await prisma.cliente.update({
        where: { id: Number(id) },
        data: {
          nome: dadosAtualizados.nome,
          email: dadosAtualizados.email,
          telefone: dadosAtualizados.telefone,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') return null; // Registro não encontrado
      throw error;
    }
  }

  async remover(id) {
    try {
      await prisma.cliente.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false; // Registro não encontrado
      throw error;
    }
  }
}

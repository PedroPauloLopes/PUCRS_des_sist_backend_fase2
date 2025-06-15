import { prisma } from '../database/prismaClient.js';

export class RepositorioPlanoPrisma {
  async salvar(plano) {
    if (!plano.id) {
      return await prisma.plano.create({
        data: {
          nome: plano.nome,
          preco: plano.preco,
          velocidade: plano.velocidade,
        },
      });
    }

    return await prisma.plano.update({
      where: { id: Number(plano.id) },
      data: {
        nome: plano.nome,
        preco: plano.preco,
        velocidade: plano.velocidade,
      },
    });
  }

  async buscarPorId(id) {
    return await prisma.plano.findUnique({
      where: { id: Number(id) },
    });
  }

  async listarTodos() {
    return await prisma.plano.findMany();
  }

  async atualizar(id, novosDados) {
    try {
      return await prisma.plano.update({
        where: { id: Number(id) },
        data: {
          nome: novosDados.nome,
          descricao: novosDados.descricao,
          precoMensal: novosDados.precoMensal,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
  }

  async remover(id) {
    try {
      return await prisma.plano.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
  }
}

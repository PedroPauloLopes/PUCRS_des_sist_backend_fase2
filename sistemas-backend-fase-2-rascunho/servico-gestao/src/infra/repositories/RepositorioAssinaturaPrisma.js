import { prisma } from '../database/prismaClient.js';
import Assinatura from '../../domain/Assinatura.js';

export class RepositorioAssinaturaPrisma {
  /**
   * Cria uma nova assinatura no banco de dados
   * @param {{ clienteId: number, planoId: number, dataInicio: string, dataUltimoPagamento: string }} assinaturaDTO
   * @returns {Promise<Assinatura>}
   */
  async criar(assinaturaDTO) {
    const nova = await prisma.assinatura.create({
      data: {
        clienteId: assinaturaDTO.clienteId,
        planoId: assinaturaDTO.planoId,
        dataInicio: new Date(assinaturaDTO.dataInicio),
        dataUltimoPagamento: new Date(assinaturaDTO.dataUltimoPagamento),
      },
    });

    return new Assinatura(
      nova.id,
      nova.clienteId,
      nova.planoId,
      nova.dataInicio,
      nova.dataUltimoPagamento
    );
  }

  async buscarPorId(id) {
    const assinatura = await prisma.assinatura.findUnique({
      where: { id: Number(id) },
    });

    if (!assinatura) return null;

    return new Assinatura(
      assinatura.id,
      assinatura.clienteId,
      assinatura.planoId,
      assinatura.dataInicio,
      assinatura.dataUltimoPagamento
    );
  }

  async listarTodas() {
    const todas = await prisma.assinatura.findMany();

    return todas.map(a => new Assinatura(
      a.id,
      a.clienteId,
      a.planoId,
      a.dataInicio,
      a.dataUltimoPagamento
    ));
  }

  async listarAtivasPorCliente(clienteId) {
    const todas = await this.listarTodas();
    return todas.filter(a => a.clienteId === clienteId && a.estaAtiva());
  }

  async atualizarUltimoPagamento(id, dataUltimoPagamento) {
    const assinatura = await this.buscarPorId(id);
    if (!assinatura) return null;

    assinatura.registrarPagamento(dataUltimoPagamento);

    await prisma.assinatura.update({
      where: { id: Number(id) },
      data: {
        dataUltimoPagamento: new Date(dataUltimoPagamento),
      },
    });

    return assinatura;
  }

  async atualizar(id, assinaturaAtualizada) {
    const atualizada = await prisma.assinatura.update({
      where: { id: Number(id) },
      data: {
        clienteId: assinaturaAtualizada.clienteId,
        planoId: assinaturaAtualizada.planoId,
        dataInicio: new Date(assinaturaAtualizada.dataInicio),
        dataUltimoPagamento: new Date(assinaturaAtualizada.dataUltimoPagamento),
      },
    });

    return new Assinatura(
      atualizada.id,
      atualizada.clienteId,
      atualizada.planoId,
      atualizada.dataInicio,
      atualizada.dataUltimoPagamento
    );
  }

  async cancelarAssinatura(id) {
    const assinatura = await this.buscarPorId(id);
    if (!assinatura) return null;

    assinatura.cancelarAssinatura();

    return assinatura; // não persistimos o cancelamento, pois é uma regra de domínio baseada em `estaAtiva()`
  }

  async deletarPorId(id) {
    try {
      await prisma.assinatura.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
}

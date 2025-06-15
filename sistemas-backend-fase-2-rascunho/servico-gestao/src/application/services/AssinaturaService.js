// src/application/services/AssinaturaService.js
import { prisma } from '../../infra/database/prismaClient.js';
import { differenceInDays } from 'date-fns';

export class AssinaturaService {
  /**
   * Cria uma nova assinatura.
   * O status será 'ATIVO' ou 'CANCELADO' com base na data do último pagamento.
   * 
   * @param {{ clienteId: number, planoId: number, dataInicio: string, dataUltimoPagamento: string }} dados
   * @returns {Promise<Object>}
   */
  async criarAssinatura(dados) {
    const { clienteId, planoId, dataInicio, dataUltimoPagamento } = dados;

    if (!clienteId || !planoId || !dataInicio || !dataUltimoPagamento) {
      throw new Error('Dados incompletos para criar assinatura');
    }

    const diasDesdeUltimoPagamento = differenceInDays(new Date(), new Date(dataUltimoPagamento));
    const status = diasDesdeUltimoPagamento > 30 ? 'CANCELADO' : 'ATIVO';

    return await prisma.assinatura.create({
      data: {
        clienteId,
        planoId,
        dataInicio: new Date(dataInicio),
        dataUltimoPagamento: new Date(dataUltimoPagamento),
        status,
      },
    });
  }

  /**
   * Lista todas as assinaturas do sistema
   * @returns {Promise<Array>}
   */
  async listarAssinaturas() {
    return await prisma.assinatura.findMany({
      include: { cliente: true, plano: true }
    });
  }

  /**
   * Lista assinaturas com status ATIVO
   * @returns {Promise<Array>}
   */
  async listarAtivas() {
    return await prisma.assinatura.findMany({
      where: { status: 'ATIVO' },
      include: { cliente: true, plano: true }
    });
  }

  /**
   * Lista assinaturas com status CANCELADO
   * @returns {Promise<Array>}
   */
  async listarCanceladas() {
    return await prisma.assinatura.findMany({
      where: { status: 'CANCELADO' },
      include: { cliente: true, plano: true }
    });
  }

  /**
   * Cancela uma assinatura com base no ID
   * @param {number} id 
   * @returns {Promise<Object|null>}
   */
  async cancelarAssinatura(id) {
    const assinatura = await prisma.assinatura.findUnique({ where: { id } });

    if (!assinatura) return null;

    return await prisma.assinatura.update({
      where: { id },
      data: {
        status: 'CANCELADO'
      }
    });
  }

  /**
   * Atualiza a data do último pagamento e ajusta o status
   * @param {number} id 
   * @param {string} novaDataPagamento 
   * @returns {Promise<Object|null>}
   */
  async registrarPagamento(id, novaDataPagamento) {
    const assinatura = await prisma.assinatura.findUnique({ where: { id } });

    if (!assinatura) return null;

    const diasDesdePagamento = differenceInDays(new Date(), new Date(novaDataPagamento));
    const novoStatus = diasDesdePagamento > 30 ? 'CANCELADO' : 'ATIVO';

    return await prisma.assinatura.update({
      where: { id },
      data: {
        dataUltimoPagamento: new Date(novaDataPagamento),
        status: novoStatus
      }
    });
  }
}

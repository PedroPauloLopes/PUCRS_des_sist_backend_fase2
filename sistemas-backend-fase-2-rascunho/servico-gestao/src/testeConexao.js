import { prisma } from './infra/database/prismaClient.js';

async function testarConexao() {
  try {
    await prisma.$connect();
    console.log('Conexão com Neon OK!');
  } catch (error) {
    console.error('Erro ao conectar com Neon:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testarConexao();

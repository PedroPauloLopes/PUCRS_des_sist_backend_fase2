import { differenceInDays } from 'date-fns';

export class Assinatura {
  constructor(id, clienteId, planoId, dataInicio, dataUltimoPagamento, status ="ATIVO") {
    this.id = id;
    this.clienteId = clienteId;
    this.planoId = planoId;
    this.dataInicio = new Date();
    this.dataUltimoPagamento = dataUltimoPagamento;
    this.status = status;
  }

  cancelarAssinatura() {
    // apenas atualiza status com base na data de pagamento
    this.status = 'CANCELADO';
  }

  registrarPagamento(dataPagamento) {
    this.dataUltimoPagamento = new Date(dataPagamento);
    this.status = this.estaAtiva() ? 'ATIVO' : 'CANCELADO';
  }

  estaAtiva() {
    if (!this.dataUltimoPagamento) return false;

    const diasDesdePagamento = differenceInDays(new Date(), this.dataUltimoPagamento);
    return diasDesdePagamento <= 30;
  }
}

export default Assinatura;

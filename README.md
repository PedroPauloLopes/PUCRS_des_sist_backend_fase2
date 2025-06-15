1)Abrir as pastas "api-gateway", "servico-faturamento", "servico-gestao" e "servico-planos-ativos" separadamente no VScode


2)Em cada janela do VS Code aberta, iniciar um terminal

2.1) Instalar as dependências

3)Na janela da "api-gateway", rodar o comando node index.js
O terminal deve exibir a msg "API Gateway rodando na porta 3002"

4)Na janela do "servico-faturamento, rodar o comando node app.js
O terminal deve exibir a msg "ServicoFaturamento rodando na porta 3001"

5)Na janela do "servico-gestao", rodar o comando node ./src/index.js
O terminal deve exibir a msg "ServicoGestao rodando na porta 3000"

6)Na janela do "servico-plano-ativo", rodar o comando node app.js 
O terminal deve exibir a msg "ServicoPlanosAtivos rodando na porta 3003


7)Enviar a requisição POST http://localhost:3001/registrarpagamento
{
    "dia":15,
    "mes":6,
    "ano":2025,
    "codigoAssinatura":"ABC123",
    "valorPago":100.50
}

8) Mensagens de erro são exibidas no terminal do ServicoGestao e do ServicoFaturamento 

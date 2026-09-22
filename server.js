const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para ler JSON e arquivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota para geração do contrato
app.post('/api/gerar-contrato', (req, res) => {
    const { tipo, contratante, contratado, valor, objeto, data } = req.body;
    let textoContrato = "";

    switch (tipo) {
        case 'trabalho_eventual':
            textoContrato = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS EVENTUAIS\n\n` +
                `CONTRATANTE: ${contratante}\n` +
                `CONTRATADO(A): ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: O(A) CONTRATADO(A), de forma autônoma e eventual, sem vínculo empregatício (conforme art. 442-A da CLT), obriga-se a prestar o seguinte serviço: ${objeto}.\n` +
                `CLÁUSULA SEGUNDA: Pelo serviço prestado, o(a) CONTRATANTE pagará o valor total de R$ \(${valor}, na data de\)${data}, mediante recibo de quitação pontual.\n` +
                `E por estarem justos e contratados, assinam o presente instrumento.`;
            break;

        case 'compra_veiculo':
            textoContrato = `INSTRUMENTO PARTICULAR DE COMPRA E VENDA DE VEÍCULOS\n\n` +
                `VENDEDOR(A): ${contratante}\n` +
                `COMPRADOR(A): ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: O(A) VENDEDOR(A) vende ao(à) COMPRADOR(A) o veículo objeto de \(${objeto}, pelo valor ajustado de R\) ${valor}.\n` +
                `CLÁUSULA SEGUNDA: O(A) COMPRADOR(A) assume total civil e criminal por infrações de trânsito a partir da data de ${data}, obrigando-se a efetuar a transferência junto ao DETRAN no prazo legal de 30 dias (Art. 134 do CTB).\n` +
                `E por estarem justos, firmam o presente.`;
            break;

        case 'locacao_residencial':
            textoContrato = `CONTRATO DE LOCAÇÃO RESIDENCIAL\n\n` +
                `LOCADOR(A): ${contratante}\n` +
                `LOCATÁRIO(A): ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: O objeto da locação refere-se ao imóvel residencial situado em: ${objeto}.\n` +
                `CLÁUSULA SEGUNDA: O aluguel mensal é fixado em R$ \(${valor}, com vencimento todo dia\)${data}, regido nos termos da Lei nº 8.245/1991 (Lei do Inquilinato).\n` +
                `E por estarem justos e contratados, assinam o instrumento.`;
            break;

        default:
            textoContrato = "Tipo de contrato inválido selecionado.";
    }

    res.json({ sucesso: true, contrato: textoContrato });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
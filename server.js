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

        case 'compra_imovel':
            textoContrato = `INSTRUMENTO PARTICULAR DE COMPROMISSO DE COMPRA E VENDA DE IMÓVEL\n\n` +
                `VENDEDOR(A): ${contratante}\n` +
                `COMPRADOR(A): ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: O(A) VENDEDOR(A) compromete-se a vender e o(a) COMPRADOR(A) a adquirir o imóvel descrito a seguir: ${objeto}. As partes deverão conferir e completar a descrição com endereço, matrícula e cartório de registro de imóveis competentes.\n` +
                `CLÁUSULA SEGUNDA: O preço ajustado é de R$ ${valor}, a ser pago na forma e nas condições acordadas por escrito entre as partes.\n` +
                `CLÁUSULA TERCEIRA: A posse do imóvel será transmitida na data e nas condições que as partes ajustarem por escrito, juntamente com a entrega das chaves, se aplicável.\n` +
                `CLÁUSULA QUARTA: As partes comprometem-se a fornecer os documentos necessários e a comparecer para a lavratura da escritura pública, quando exigida, e para o registro do título na matrícula do imóvel. A propriedade será transferida conforme a legislação aplicável após o registro do título.\n` +
                `CLÁUSULA QUINTA: As partes definirão por escrito a responsabilidade por tributos, taxas, despesas de escritura e registro, bem como a data-limite para cumprimento das obrigações: ${data}.\n` +
                `E por estarem de acordo, assinam o presente instrumento, juntamente com duas testemunhas.\n\n` +
                `Local e data: ____________________________________\n\n` +
                `VENDEDOR(A): ____________________________________\n\n` +
                `COMPRADOR(A): ___________________________________\n\n` +
                `TESTEMUNHA 1: __________________ CPF: ____________\n` +
                `TESTEMUNHA 2: __________________ CPF: ____________`;
            break;

        case 'locacao_residencial':
            textoContrato = `CONTRATO DE LOCAÇÃO RESIDENCIAL\n\n` +
                `LOCADOR(A): ${contratante}\n` +
                `LOCATÁRIO(A): ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: O objeto da locação refere-se ao imóvel residencial situado em: ${objeto}.\n` +
                `CLÁUSULA SEGUNDA: O aluguel mensal é fixado em R$ \(${valor}, com vencimento todo dia\)${data}, regido nos termos da Lei nº 8.245/1991 (Lei do Inquilinato).\n` +
                `E por estarem justos e contratados, assinam o instrumento.`;
            break;

        case 'confidencialidade':
            textoContrato = `ACORDO DE CONFIDENCIALIDADE\n\n` +
                `PARTE REVELADORA: ${contratante}\n` +
                `PARTE RECEPTORA: ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: As partes tratarão como confidenciais as informações relacionadas a: ${objeto}.\n` +
                `CLÁUSULA SEGUNDA: A PARTE RECEPTORA utilizará essas informações exclusivamente para a finalidade acordada, não as divulgará a terceiros sem autorização e adotará medidas razoáveis para protegê-las.\n` +
                `CLÁUSULA TERCEIRA: As obrigações de confidencialidade vigoram até ${data}, exceto quanto às informações que se tornarem públicas sem violação deste acordo ou cuja divulgação seja exigida por lei.\n` +
                `E por estarem de acordo, as partes assinam o presente instrumento.`;
            break;

        case 'parceria_comercial':
            textoContrato = `CONTRATO DE PARCERIA COMERCIAL\n\n` +
                `PARCEIRO(A) 1: ${contratante}\n` +
                `PARCEIRO(A) 2: ${contratado}\n\n` +
                `CLÁUSULA PRIMEIRA: As partes estabelecem parceria para: ${objeto}.\n` +
                `CLÁUSULA SEGUNDA: As contribuições ou remuneração acordadas totalizam R$ ${valor}, conforme a divisão e as condições que as partes deverão registrar por escrito.\n` +
                `CLÁUSULA TERCEIRA: A parceria terá vigência até ${data}, podendo ser prorrogada mediante acordo escrito entre as partes.\n` +
                `CLÁUSULA QUARTA: Cada parte permanecerá responsável por suas próprias obrigações, despesas e atos, salvo ajuste escrito em contrário.\n` +
                `E por estarem de acordo, as partes assinam o presente instrumento.`;
            break;

        default:
            textoContrato = "Tipo de contrato inválido selecionado.";
    }

    res.json({ sucesso: true, contrato: textoContrato });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
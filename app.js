let listaDeNumerosSorteados = [];
const numeroLimite = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; // Inicia com 1 tentativa

function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 30');
}

exibirMensagemInicial();

function verificarChute() {
    const chute = parseInt(document.querySelector('.container__input').value, 10); // Seleção pela classe

    // Verifica se o número está fora do intervalo
    if (chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', `O número deve estar entre 1 e ${numeroLimite}. Tente novamente.`);
        limparCampo();
        return; // Não continuar com o código caso o número seja inválido
    }

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Corrigido aqui
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('p', chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior');
        tentativas++; // Incrementa as tentativas
        limparCampo();
    }

    // Verifica se o número de tentativas excedeu o limite
    if (tentativas > 7) {
        exibirTextoNaTela('h1', 'Fim de jogo!');
        exibirTextoNaTela('p', `Você atingiu o número máximo de tentativas. O número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido;
    
    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

function limparCampo() {
    document.querySelector('.container__input').value = ''; // Limpa o campo de entrada
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

const botaoIniciar = document.getElementById('next-btn');
// Seleciona o botão de início
const containerPerguntas = document.getElementById('question-container');
// Seleciona o container de perguntas
const elementoPergunta = document.getElementById('question');
// Seleciona a div da pergunta
const containerRespostas = document.getElementById('answer-buttons');
// Seleciona o container dos botões de resposta
const elementoPontuacao = document.getElementById('score');
// Seleciona o elemento de pontuação
const elementoTemporizador = document.getElementById('timer');
// Seleciona o elemento do temporizador

let perguntasEmbaralhadas, indicePerguntaAtual;
// Variáveis para as perguntas embaralhadas e o índice da pergunta atual
let pontuacao = 0;
// Variável de pontuação inicializada em 0
let temporizador;
// Variável para o temporizador
let tempoRestante = 30; // Tempo em segundos para cada pergunta
// Tempo inicial do temporizador

const perguntas = [
    // Array de perguntas
    {
        pergunta: 'Qual é a capital da França?',
        respostas: [
            { texto: 'Berlim', correta: false },
            { texto: 'Londres', correta: false },
            { texto: 'Paris', correta: true },
            { texto: 'Madri', correta: false }
        ]
    },
    {
        pergunta: 'Qual é o maior planeta do sistema solar?',
        respostas: [
            { texto: 'Plutão', correta: false },
            { texto: 'Saturno', correta: false },
            { texto: 'Júpiter', correta: true },
            { texto: 'Netuno', correta: false }
        ]
    },
    {
        pergunta: 'Qual é o elemento químico representado pelo símbolo O?',
        respostas: [
            { texto: 'Ósmio', correta: true },
            { texto: 'Ouro', correta: false },
            { texto: 'Prata', correta: false },
            { texto: 'Oxigênio', correta: true }
        ]
    },
    {
        pergunta: 'Quem escreveu "Dom Quixote"?',
        respostas: [
            { texto: 'Vincent Van Gogh', correta: false },
            { texto: 'William Shakespeare', correta: false },
            { texto: 'Miguel de Cervantes', correta: true },
            { texto: 'Gabriel García Márquez', correta: false }
        ]
    },
    {
        pergunta: 'Qual é o maior oceano da Terra?',
        respostas: [
            { texto: 'Oceano Ártico', correta: false },
            { texto: 'Oceano Atlântico', correta: false },
            { texto: 'Oceano Índico', correta: false },
            { texto: 'Oceano Pacífico', correta: true }
        ]
    },
    {
        pergunta: 'Qual é a fórmula química da água?',
        respostas: [
            { texto: 'H2O2', correta: false },
            { texto: 'CO2', correta: false },
            { texto: 'H2O', correta: true },
            { texto: 'NaCl', correta: false }
        ]
    },
    {
        pergunta: 'Em que ano o homem pisou na Lua pela primeira vez?',
        respostas: [
            { texto: '1939', correta: false },
            { texto: '1959', correta: false },
            { texto: '1969', correta: true },
            { texto: '1989', correta: false }
        ]
    }
];

botaoIniciar.addEventListener('click', iniciarJogo);
// Adiciona evento de clique ao botão de início

function iniciarJogo() {
    // Função para iniciar o jogo
    botaoIniciar.classList.add('hide');
    // Esconde o botão de início
    perguntasEmbaralhadas = perguntas.sort(() => Math.random() - 0.5);
    // Embaralha as perguntas
    indicePerguntaAtual = 0;
    // Inicializa o índice da pergunta atual
    pontuacao = 0;
    // Reinicializa a pontuação
    elementoPontuacao.textContent = `Pontuação: ${pontuacao}`;
    // Atualiza a pontuação exibida
    definirProximaPergunta();
    // Chama a função para definir a próxima pergunta
}

function definirProximaPergunta() {
    // Função para definir a próxima pergunta
    resetarEstado();
    // Reseta o estado anterior
    mostrarPergunta(perguntasEmbaralhadas[indicePerguntaAtual]);
    // Mostra a pergunta atual
    iniciarTemporizador(); // Reinicia o temporizador para a nova pergunta
}

function mostrarPergunta(pergunta) {
    // Função para mostrar a pergunta
    elementoPergunta.textContent = pergunta.pergunta;
    // Define o texto da pergunta
    pergunta.respostas.forEach(resposta => {
        // Para cada resposta, cria um botão
        const botao = document.createElement('button');
        botao.textContent = resposta.texto;
        botao.classList.add('btn');
        // Adiciona texto e classe ao botão
        if (resposta.correta) {
            botao.dataset.correta = resposta.correta;
            // Define o atributo de dado 'correta' se a resposta for correta
        }
        botao.addEventListener('click', selecionarResposta);
        // Adiciona evento de clique ao botão
        containerRespostas.appendChild(botao);
        // Adiciona o botão ao container de respostas
    });
}

function resetarEstado() {
    // Função para resetar o estado
    limparClasseStatus(document.body);
    // Limpa as classes de status do corpo do documento
    while (containerRespostas.firstChild) {
        containerRespostas.removeChild(containerRespostas.firstChild);
        // Remove todos os botões de resposta
    }
}

function selecionarResposta(e) {
    // Função para selecionar uma resposta
    const botaoSelecionado = e.target;
    // Obtém o botão clicado
    const correta = botaoSelecionado.dataset.correta;
    // Verifica se a resposta é correta
    definirClasseStatus(document.body, correta);
    // Define a classe de status do corpo do documento
    clearInterval(temporizador); // Para o temporizador quando a resposta é selecionada

    // Faz a resposta correta piscar
    piscarRespostaCorreta();
    
    // Aguarda 3 segundos antes de prosseguir para a próxima pergunta ou mostrar a pontuação final
    setTimeout(() => {
        if (perguntasEmbaralhadas.length > indicePerguntaAtual + 1) {
            // Verifica se há mais perguntas
            indicePerguntaAtual++;
            // Incrementa o índice da pergunta atual
            definirProximaPergunta();
            // Define a próxima pergunta
        } else {
            mostrarPontuacaoFinal();
            // Mostra a pontuação final
        }
    }, 3000); // Tempo para o piscar (3 segundos)
}

function definirClasseStatus(elemento, correta) {
    // Função para definir a classe de status
    limparClasseStatus(elemento);
    // Limpa as classes de status
    if (correta) {
        elemento.classList.add('correta');
        // Adiciona a classe 'correta' se a resposta for correta
    } else {
        elemento.classList.add('errada');
        // Adiciona a classe 'errada' se a resposta for incorreta
    }
}

function limparClasseStatus(elemento) {
    // Função para limpar a classe de status
    elemento.classList.remove('correta');
    elemento.classList.remove('errada');
    // Remove as classes 'correta' e 'errada'
}

function iniciarTemporizador() {
    // Função para iniciar o temporizador
    tempoRestante = 20;
    // Define o tempo inicial
    elementoTemporizador.textContent = `Tempo: ${tempoRestante}`;
    // Atualiza o tempo exibido
    temporizador = setInterval(() => {
        // Define um intervalo para o temporizador
        tempoRestante--;
        // Decrementa o tempo
        elementoTemporizador.textContent = `Tempo: ${tempoRestante}`;
        // Atualiza o tempo exibido
        if (tempoRestante <= 0) {
            clearInterval(temporizador);
            // Limpa o intervalo se o tempo acabar
            selecionarResposta({ target: { dataset: { correta: false } } });
            // Seleciona automaticamente uma resposta incorreta
        }
    }, 1000); // Ajustado para 1 segundo
}

function piscarRespostaCorreta() {
    // Função para fazer a caixa de resposta correta piscar
    const botaoCorreto = Array.from(containerRespostas.children)
        .find(botao => botao.dataset.correta);
    if (botaoCorreto) {
        botaoCorreto.classList.add('piscar');
        // Adiciona a classe 'piscar' para piscar
        setTimeout(() => {
            botaoCorreto.classList.remove('piscar');
            // Remove a classe 'piscar' após 3 segundos
        }, 3000);
    }
}

function mostrarPontuacaoFinal() {
    // Função para mostrar a pontuação final
    elementoPergunta.textContent = `Jogo terminado! Pontuação final: ${pontuacao}`;
    botaoIniciar.textContent = 'Reiniciar';
    // Altera o texto do botão de início
    botaoIniciar.classList.remove('hide');
    // Mostra o botão de início
}

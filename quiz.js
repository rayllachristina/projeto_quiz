// Seleciona o botão de iniciar/próxima pergunta pelo seu ID
const startButton = document.getElementById('next-btn'); 
// document.getElementById() retorna o elemento com o ID 'next-btn' do DOM

// Seleciona o container das perguntas pelo seu ID
const questionContainerElement = document.getElementById('question-container'); 
// document.getElementById() retorna o elemento com o ID 'question-container' do DOM

// Seleciona o elemento que exibe a pergunta pelo seu ID
const questionElement = document.getElementById('question'); 
// document.getElementById() retorna o elemento com o ID 'question' do DOM

// Seleciona o container dos botões de resposta pelo seu ID
const answerButtonsElement = document.getElementById('answer-buttons'); 
// document.getElementById() retorna o elemento com o ID 'answer-buttons' do DOM

// Seleciona o elemento que exibe a pontuação pelo seu ID
const scoreElement = document.getElementById('score'); 
// document.getElementById() retorna o elemento com o ID 'score' do DOM

// Seleciona o elemento que exibe o temporizador pelo seu ID
const timerElement = document.getElementById('timer'); 
// document.getElementById() retorna o elemento com o ID 'timer' do DOM

// Variáveis para controlar o estado do quiz
let shuffledQuestions, currentQuestionIndex; 
let score = 0; // Inicializa a pontuação como 0
let timer; // Declara a variável para armazenar o temporizador
let timeLeft = 30; // Define o tempo inicial de 30 segundos para a pergunta

// Array de perguntas com suas respostas e a indicação da resposta correta
const questions = [
    {
        question: 'Qual é a capital da França?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Londres', correct: false },
            { text: 'Paris', correct: true  },
            { text: 'Madri', correct: false }
        ]
    },
    {
        question: 'Qual é o maior planeta do sistema solar?',
        answers: [
            { text: 'Plutão', correct: false },
            { text: 'Saturno', correct: false },
            { text: 'Júpiter', correct: true },
            { text: 'Netuno', correct: false }
        ]
    },
    {
        question: 'Qual é o elemento químico representado pelo símbolo O?',
        answers: [
            { text: 'Osmio', correct: false },
            { text: 'Ouro', correct: false },
            { text: 'Prata', correct: false },
            { text: 'Oxigênio', correct: true }
        ]
    },
    {
        question: 'Quem escreveu "Dom Quixote"?',
        answers: [
            { text: 'Vincent Van Gogh', correct: false },
            { text: 'William Shakespeare', correct: false },
            { text: 'Miguel de Cervantes', correct: true },
            { text: 'Gabriel García Márquez', correct: false }
        ]
    },
    {
        question: 'Qual é o maior oceano da Terra?',
        answers: [
            { text: 'Oceano Ártico', correct: false },
            { text: 'Oceano Atlântico', correct: false },
            { text: 'Oceano Índico', correct: false },
            { text: 'Oceano Pacífico', correct: true }
        ]
    },
    {
        question: 'Qual é a fórmula química da água?',
        answers: [
            { text: 'H2O2', correct: false },
            { text: 'CO2', correct: false },
            { text: 'H2O', correct: true },
            { text: 'NaCl', correct: false }
        ]
    },
    {
        question: 'Em que ano o homem pisou na Lua pela primeira vez?',
        answers: [
            { text: '1939', correct: false },
            { text: '1959', correct: false },
            { text: '1969', correct: true },
            { text: '1989', correct: false }
        ]
    }
];

// Adiciona um evento ao botão de iniciar que chama a função startGame quando clicado
startButton.addEventListener('click', startGame); 
// addEventListener() adiciona um ouvinte de eventos ao botão, que chama a função startGame quando o botão é clicado

// Função que inicia o jogo
function startGame() {
    startButton.classList.add('hide'); 
    // classList.add() adiciona a classe 'hide' ao botão para escondê-lo

    shuffledQuestions = questions.sort(() => Math.random() - 0.5); 
    // sort() embaralha o array de perguntas usando uma função de comparação que retorna valores aleatórios

    currentQuestionIndex = 0; 
    // Inicializa o índice da pergunta atual para 0

    score = 0; 
    // Reseta a pontuação para 0

    scoreElement.textContent = `Pontuação: ${score}`; 
    // textContent define o texto exibido no elemento de pontuação

    setNextQuestion(); 
    // Chama a função para exibir a próxima pergunta
}

// Função que define a próxima pergunta
function setNextQuestion() {
    resetState(); 
    // Chama a função para resetar o estado dos botões de resposta

    showQuestion(shuffledQuestions[currentQuestionIndex]); 
    // Chama a função para exibir a pergunta atual

    startTimer(); 
    // Chama a função para iniciar o temporizador
}

// Função que exibe a pergunta e os botões de resposta
function showQuestion(question) {
    questionElement.textContent = question.question; 
    // textContent define o texto exibido no elemento de pergunta

    question.answers.forEach(answer => {
        const button = document.createElement('button'); 
        // createElement() cria um novo elemento <button>

        button.textContent = answer.text; 
        // textContent define o texto exibido no botão

        button.classList.add('btn'); 
        // classList.add() adiciona a classe 'btn' ao botão

        if (answer.correct) {
            button.dataset.correct = answer.correct; 
            // dataset é um objeto que contém todos os atributos data-* do botão; define se a resposta é correta
        }

        button.addEventListener('click', selectAnswer); 
        // addEventListener() adiciona um ouvinte de eventos de clique que chama a função selectAnswer quando o botão é clicado

        answerButtonsElement.appendChild(button); 
        // appendChild() adiciona o botão ao container de botões de resposta
    });
}

// Função que reseta o estado dos botões de resposta
function resetState() {
    clearStatusClass(document.body); 
    // Chama a função para limpar as classes de status do corpo

    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild); 
        // removeChild() remove o primeiro filho do container de botões de resposta até que não haja mais filhos
    }
}

// Função que é chamada quando uma resposta é selecionada
function selectAnswer(e) {
    const selectedButton = e.target; 
    // Obtém o botão clicado a partir do evento de clique

    const correct = selectedButton.dataset.correct; 
    // Verifica se o botão clicado tem o atributo data-correct definido como true

    setStatusClass(document.body, correct); 
    // Chama a função para definir a classe de status (correto/errado) no corpo

    clearInterval(timer); 
    // clearInterval() para o temporizador, que foi iniciado por setInterval()

    // Atualiza a pontuação se a resposta estiver correta
    if (correct) {
        score++;
        scoreElement.textContent = `Pontuação: ${score}`; 
        // Atualiza o texto exibido no elemento de pontuação
    }

    // Faz a resposta correta piscar
    blinkCorrectAnswer();

    // Aguarda 3 segundos antes de prosseguir para a próxima pergunta ou mostrar a pontuação final
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++; 
            // Avança para a próxima pergunta
            setNextQuestion(); 
            // Exibe a próxima pergunta
        } else {
            showFinalScore(); 
            // Mostra a pontuação final se não houver mais perguntas
        }
    }, 3000); 
    // setTimeout() chama a função fornecida após 3 segundos
}

// Função que define a classe de status (correto/errado) no elemento
function setStatusClass(element, correct) {
    clearStatusClass(element); 
    // Chama a função para limpar as classes de status do elemento

    if (correct) {
        element.classList.add('correct'); 
        // Adiciona a classe 'correct' ao elemento se a resposta estiver correta
    } else {
        element.classList.add('wrong'); 
        // Adiciona a classe 'wrong' ao elemento se a resposta estiver errada
    }
}

// Função que limpa as classes de status (correto/errado) do elemento
function clearStatusClass(element) {
    element.classList.remove('correct'); 
    // remove a classe 'correct' do elemento

    element.classList.remove('wrong'); 
    // remove a classe 'wrong' do elemento
}

// Função que inicia o temporizador para a pergunta atual
function startTimer() {
    timeLeft = 20; 
    // Define o tempo restante para 20 segundos

    timerElement.textContent = `Tempo: ${timeLeft}`; 
    // Atualiza o texto exibido no elemento do temporizador

    timer = setInterval(() => {
        timeLeft--; 
        // Decrementa o tempo restante a cada segundo

        timerElement.textContent = `Tempo: ${timeLeft}`; 
        // Atualiza o texto exibido no elemento do temporizador

        if (timeLeft == 0) {
            clearInterval(timer); 
            // Para o temporizador se o tempo acabar

            selectAnswer({ target: { dataset: { correct: false } } }); 
            // Simula a seleção de uma resposta errada se o tempo acabar
        }
    }, 1000); 
    // setInterval() chama a função fornecida a cada 1000 milissegundos (1 segundo)
}

// Função que faz a resposta correta piscar
function blinkCorrectAnswer() {
    const correctButton = Array.from(answerButtonsElement.children)
        .find(button => button.dataset.correct); 
        // Encontra o botão com o atributo data-correct definido como true

    if (correctButton) {
        correctButton.classList.add('blink'); 
        // Adiciona a classe 'blink' ao botão correto

        setTimeout(() => {
            correctButton.classList.remove('blink'); 
            // Remove a classe 'blink' após 3 segundos
        }, 3000);
    }
}

// Função que mostra a pontuação final quando o jogo termina
function showFinalScore() {
    questionElement.textContent = `Jogo terminado! Pontuação final: ${score}`; 
    // Atualiza o texto exibido no elemento de pergunta com a pontuação final

    startButton.textContent = 'Reiniciar'; 
    // Muda o texto do botão para 'Reiniciar'

    startButton.classList.remove('hide'); 
    // Remove a classe 'hide' para mostrar o botão novamente
}

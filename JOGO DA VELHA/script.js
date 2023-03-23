// Dados iniciais
let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playing = false; // variavel para saber se o jogo está rodando ou não
let vez = ''; // variavel para sortear a vez de quem joga
let warning = ''; // variavel para saber quem venceu

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item)=>{ // pega toda div que possua a class item, forEach = percorrer cada item e adionar um evento de click más a função
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item'); //essa variavel pega toda div que tem o data item e o target mostra o item que foi clicado
        
        if(playing && quadro[loc] === '') {
            quadro[loc] = vez;
            renderQuadro(); //função para mostrar o quadro
            togglePlayer(); // função para alternar o jogador 
        }
    });
});

// Funções
function reset() {
    warning = '';

    // definir a vez
    let random = Math.floor(Math.random() * 2); // match.floor arredonda o numero para baixo //match.random gera um numero entre 0,alguma coisa e multiplicará por dois para dar entre 0 e 1;
    vez = random === 0 ? 'x' : 'o'; // se player for igual a 0 recebe x,caso contrario o

    // resetar os quadros
    for(let i in quadro) { 
        quadro[i] = '';
    }

    // renderizar tudo
    renderQuadro(); //função para mostrar o quadro
    renderInfo(); //

    playing = true;
}

function renderQuadro() {
    for(let i in quadro) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(quadro[i] !== '') {
            item.innerHTML = quadro[i];
        } else {
            item.innerHTML = '';
        }
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    vez = vez === 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(i) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option=>quadro[option] === i);
        if(hasWon) return true;
    }

    return false;
}
function isFull() {
    for(let i in quadro) {
        if(quadro[i] === '') {
            return false;
        }
    }
    return true;
}
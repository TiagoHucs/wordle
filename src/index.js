const dictionary = ['earth','plane','crane','audio','house'];
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
    .fill()
    .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};

function updateGrid() {
    for(let i = 0; i < state.grid.length;i++){
        for(let j = 0; j < state.grid[i].length;j++){
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawbox(container,row,col,letter = ''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container){
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i = 0; i < 6;i++){
        for(let j = 0; j < 5;j++){
            drawbox(grid,i,j);
        }   
    }

   container.appendChild(grid);
}

function registerKeyboardEvents(){
    document.body.onkeydown = (e) => {
        const key = e.key; 

        if(key == 'Enter'){
            if(state.currentCol === 5){
                const word = getCurrentWord();
                if(isWordValid(word)){
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    alert('Não é palavra');
                }
            }
        }

        if(key == 'Backspace'){
            removeLetter();   
        }

        if(isLetter(key)){
            addLetter(key);
        }

        //https://youtu.be/oKM2nQdQkIU?t=538

    }
}

function getCurrentWord(){
    return state.grid[state.currentRow].reduce((prev,curr) => prev + curr);
}



function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter){
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
    console.log(state.grid);
    updateGrid();
}

function removeLetter(){
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function isWordValid(word){
    return dictionary.includes(word);
}

function revealWord(guess){
    console.log('revealWord' + guess)
    const row = state.currentRow;
    console.log(row)
    for(let i = 0 ; i < 5 ; i++){
        const box = document.getElementById(`box${row}${i}`);
        console.log(box)
        const letter = box.textContent;

        console.log(`compare ${letter} com ${state.secret[i]}`)
        if(letter === state.secret[i]){
            console.log('right')
            box.classList.add('right');
        } else if (state.secret.includes(letter)) {
            console.log('wrong')
            box.classList.add('wrong');
        } else {
            console.log('empty')
            box.classList.add('empty');
        }
    }

    const isWinner = state.secret === guess
    const isGameOver = state.currentRow === 5;

    if(isWinner){
        alert('Parabens!');
    } else if (isGameOver) {
        alert('Mais sorte na proxima vez! Palavra ' + state.secret);
    }

}


function startup(){
    const game = document.getElementById('game');
    drawGrid(game);

  /*  state.grid = Array(6)
        .fill()
        .map(() => Array(5).fill('A'));
    updateGrid();
    */

    registerKeyboardEvents();

    console.log(state.secret);
}


startup();

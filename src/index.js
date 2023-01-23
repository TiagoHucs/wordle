const state = {
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

        }

        if(key == 'Backspace'){
            
        }
        if(isLetter(key)){
            
        }

        //https://youtu.be/oKM2nQdQkIU?t=538

    }
}

function startup(){
    const game = document.getElementById('game');
    drawGrid(game);

    state.grid = Array(6)
        .fill()
        .map(() => Array(5).fill('A'));
    updateGrid();
}


startup();

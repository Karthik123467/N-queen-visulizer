let totalQueens = 8;
//block of this variables
let speed;
let queenPositions = []; // Array to track queen positions

const slider = document.getElementById("slider");//which represents the entire HTML document.it returns that element; if not, it returns null.
const progressBar = document.getElementById("progressBar");
const board = document.getElementById('board');

speed = (100 - slider.value) * 10;//Calculates a speed variable based on the value of a slider
//Sets an event listener for the input event on the slider
slider.oninput = function () {
    //Recalculates the speed whenever the slider value changes, maintaining the relationship defined earlier.
    progressBar.style.width = this.value + "%";
    speed = (100 - this.value) * 10;
}
// STEP-2
function createBoard() {
    board.innerHTML = '';//clear existing content
    board.style.gridTemplateColumns = `repeat(${totalQueens}, 50px)`;
    board.style.gridTemplateRows = `repeat(${totalQueens}, 50px)`;

    for (let i = 0; i < totalQueens; i++) {
        for (let j = 0; j < totalQueens; j++) {
            const cell = document.createElement('div');//create div for each cell
            cell.className = 'cell';
            // Determine background color based on row and column
            if ((i + j) % 2 === 0) {
                cell.classList.add('even');
            } else {
                cell.classList.add('odd');
            }
            board.appendChild(cell);//This method adds the cell element (which you previously created, likely a <div>) as the last child of the board element.
        }
    }
}
// STEP - 6
function placeQueen(row, col) {
    //Computes the index of the cell where the queen will be placed based on the specified row and column.
    const index = row * totalQueens + col;
    const cell = board.children[index];
    const queen = document.createElement('div');
    queen.textContent = '♕';//unicode
    queen.className = 'queen';
    cell.appendChild(queen);//add the queenelements the selected cell

    // Highlight the cell to indicate queen placement
    cell.classList.add('queen-cell');

    // No need for blinking here, just immediate queen placement
}
//STEP- 7
function removeQueen(row, col) {
    const index = row * totalQueens + col;
    const cell = board.children[index];
    cell.innerHTML = '';//cler existing content in the board

    // Remove highlight from the cell
    cell.classList.remove('queen-cell');

    // No need for blinking here, just immediate queen removal
}
// STEP-4
function isSafe(board, row, col) {
    let conflictDetected = false;

    // Check if there's any queen in the same column
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) {
            markConflict(i, col);
            conflictDetected = true;
        }
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            markConflict(i, j);
            conflictDetected = true;
        }
    }

    // Check upper diagonal on right side
    for (let i = row, j = col; i >= 0 && j < totalQueens; i--, j++) {
        if (board[i][j] === 1) {
            markConflict(i, j);
            conflictDetected = true;
        }
    }

    return !conflictDetected;
}
// STEP 3
async function solveNQueens(boardArray, row) {
    //base case 
    if (row >= totalQueens) {
        return true;
    }

    for (let col = 0; col < totalQueens; col++) {
        board.querySelector('.current-checking')?.classList.remove('current-checking'); // Remove previous checking-cell
        const index = row * totalQueens + col;//calculate the index of the current element 
        board.children[index].classList.add('checking-cell', 'current-checking'); // Add current checking-cell
        await sleep(speed);//pause execution
        board.children[index].classList.remove('checking-cell');//remove checking highli after pause

        if (isSafe(boardArray, row, col)) {
            boardArray[row][col] = 1;
            placeQueen(row, col);
            await sleep(speed);

            if (await solveNQueens(boardArray, row + 1)) {
                return true;
            }

            boardArray[row][col] = 0; // Backtrack
            removeQueen(row, col);
            await sleep(speed);
        } else {
            // Temporarily add the conflict class if there's a conflict
            markConflict(row, col);
            board.children[index].classList.add('conflict');
            await sleep(speed); // Keep it blinking for a short duration

            // Remove the conflict class immediately after checking each column
            board.children[index].classList.remove('conflict');
        }
    }

    board.querySelector('.current-checking')?.classList.remove('current-checking'); // Clean up at the end

    return false;
}
// STEP 1
function startVisualization() {
    totalQueens = parseInt(document.getElementById('queenInput').value);
    //parseInt-: This function converts the string value obtained from the input field into an integer
    createBoard();
    queenPositions = [];
    const boardArray = Array.from(Array(totalQueens), () => new Array(totalQueens).fill(0));
    solveNQueens(boardArray, 0);
    checkConflicts(); // Check for initial conflicts
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//STEP -8
function checkConflicts() {
    // Reset previous conflicts
    board.querySelectorAll('.conflict').forEach(cell => {
        cell.classList.remove('conflict');
    });

    const queensCount = queenPositions.length;

    for (let i = 0; i < queensCount; i++) {
        for (let j = i + 1; j < queensCount; j++) {
            const queen1 = queenPositions[i];
            const queen2 = queenPositions[j];

            if (queen1.row === queen2.row || queen1.col === queen2.col || Math.abs(queen1.row - queen2.row) === Math.abs(queen1.col - queen2.col)) {
                markConflict(queen1.row, queen1.col);
                markConflict(queen2.row, queen2.col);
            }
        }
    }
}
//STEP-5
function markConflict(row, col) {
    const index = row * totalQueens + col;
    const cell = board.children[index];
    cell.classList.add('conflict');

    // Temporarily add blinking class for conflict indication
    setTimeout(() => {
        cell.classList.add('blinking');
    }, 50); // Adjust timing as needed

    // Remove blinking class after a short duration
    setTimeout(() => {
        cell.classList.remove('blinking');
    }, speed / 2); // Blinking duration approximately half of speed
}
// Initialize the board
createBoard();

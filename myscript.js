function Cell() {
    let value = '';

    const inputPlayerMarker = (playerMarker) => {
        value = playerMarker;
    }

    const getPlayerMarker = () => value;

    return {
        inputPlayerMarker,
        getPlayerMarker
    };
}

function GameBoard() {
    const boardRow = 3;
    const boardColumn = 3;

    const board = [];

    for(let i = 0 ; i < boardRow ; i++){
        board[i] = [];
        for(let j = 0 ; j < boardColumn ; j++){
            board[i].push(Cell());
        }
    }

    const inputMarker = (row, column, playerMarker) => {
        if (board[row][column].getPlayerMarker() != '') return false;

        board[row][column].inputPlayerMarker(playerMarker);
        return true;
    }

    const clearBoard = () => {
        for(let i = 0 ; i < boardRow ; i++){
            for(let j = 0 ; j < boardColumn ; j++){
                board[i][j].inputPlayerMarker('');
            }
        }
    }

    const printBoard = () => {
        const boardWithMarkers = board.map((row) => row.map((cell) => cell.getPlayerMarker()));
        console.log(boardWithMarkers);
    }

    const getBoard = () => board;

    return {
        inputMarker,
        getBoard,
        clearBoard,
        printBoard
    };
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

function GameControler () {
    const board = GameBoard();

    let numberOfRounds = 0;

    const player1 = new Player(document.querySelector("#player-one").value, "X");
    const player2 = new Player(document.querySelector("#player-two").value, "O");

    let activePlayer = player1;

    let gameEnded = false;

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer == player1 ? player2: player1;
    }

    const checkWinningBoard = (row, column) => {
        const currentBoard = board.getBoard();
        const winningBoard = currentBoard.map((row) => row.map((cell) => cell.getPlayerMarker()));


        if (winningBoard[1][1] != ''){
            if(winningBoard[0][0] == winningBoard[1][1] &&
                winningBoard[0][0] == winningBoard[2][2]) return true;

            if(winningBoard[0][2] == winningBoard[1][1] &&
                winningBoard[0][2] == winningBoard[2][0]) return true;
        }



        if (winningBoard[row][0] == winningBoard[row][1] &&
            winningBoard[row][0] == winningBoard[row][2]) return true;
        
        if (winningBoard[0][column] == winningBoard[1][column] &&
            winningBoard[0][column] == winningBoard[2][column]) return true;

        return false;
    }

    const playRound = (row, column) => {
        if(gameEnded) return "Game Over!";
        // if the cell is already taken don't switch turns
        if (board.inputMarker(row, column, activePlayer.marker)){
            numberOfRounds += 1;

            if(checkWinningBoard(row, column)){
                console.log(`${activePlayer.name} wins!`);
                gameEnded = true;
                return `${activePlayer.name} wins!`
            }
            
            if (numberOfRounds == 9) {
                console.log("it's a tie");
                gameEnded = true;
                return "it's a tie";
            }
            
            switchPlayer();
            const turn = `${activePlayer.name}'s turn`;

            return turn;
        }

        return `${activePlayer.name}'s turn`;
    }

    const resetGame = () => {
        board.clearBoard();
        numberOfRounds = 0;
        activePlayer = player1;
        gameEnded = false;
    }


    return {
        playRound,
        getActivePlayer,
        resetGame,
        getBoard: board.getBoard,
    };
}

function ScreenController() {
    const game = GameControler();

    const boardDiv = document.querySelector(".board");
    const playerTurn = document.querySelector(".player-turn");
    const restartButton = document.querySelector(".restart");

    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.getPlayerMarker();
                boardDiv.appendChild(cellButton);
            })
        })
    }
    
    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if(!selectedColumn || !selectedRow) return;

        playerTurn.textContent = game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandler);
    

    restartButton.addEventListener("click", () => {
        game.resetGame();
        playerTurn.textContent = `${game.getActivePlayer().name}'s turn`; 
        updateScreen();
    });

    playerTurn.textContent = `${game.getActivePlayer().name}'s turn`; 
    updateScreen();
    
}


function startGame(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
    form.style.display = "none";
    ScreenController();
}

const startGameBtn = document.querySelector(".start-game");

startGameBtn.addEventListener("click", startGame);
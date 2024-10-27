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

    const player1 = new Player("dodo", "X");
    const player2 = new Player("dada", "O");

    let activePlayer = player1;

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

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`);
    }

    printNewRound();

    const playRound = (row, column) => {
        numberOfRounds += 1;

        // if the cell is already taken don't switch turns
        if (board.inputMarker(row, column, activePlayer.marker) == false){
            printNewRound();
            return;
        }
        
        board.inputMarker(row, column, activePlayer.marker);
        
        if(checkWinningBoard(row, column)){
            board.printBoard();
            console.log(`${activePlayer.name} wins!`);
            board.clearBoard();
            return;
        }
        
        if (numberOfRounds == 9) {
            board.printBoard();
            console.log("it's a tie!");
            board.clearBoard();
            return;
        }
        switchPlayer();
        printNewRound();
    }

    return {
        playRound,
    };
}

const game = GameControler();

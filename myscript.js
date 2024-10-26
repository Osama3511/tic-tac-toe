function Cell() {
    let value = '';

    const inputPlayerMarker = (playerMarker) => {
        value += playerMarker;
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
        if (board[row][column].getPlayerMarker() != '') return;

        board[row][column].inputPlayerMarker(playerMarker);
    }

    const printBoard = () => {
        const boardWithMarkers = board.map((row) => row.map((cell) => cell.getPlayerMarker()));
        console.log(boardWithMarkers);
    }

    const getBoard = () => board;

    const clearBoard = () => {
        board = board.map((row) => row.map((cell) => ''));
    }

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


        if (row == 1 && column == 1){
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
        board.inputMarker(row, column, activePlayer.marker);

        if(checkWinningBoard(row, column)){
            board.printBoard();
            console.log(`${activePlayer.name} wins!`);
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

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0 ; i < rows ; i++){
        board[i] = [];
        for(let j = 0; j < columns ; j++){
            board[i].push(Cell());
        }
    }

    
    const inputMarker = (row, column, player) => {
        // checks if the cell is full
        if (board[row][column].getPlayerValue() != '') return;

        board[row][column].inputPlayerValue(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getPlayerValue()));
        console.log(boardWithCellValues);
    };

    const clearBoard = () => {
        board = board.map((row) => row.map((cell) => cell.inputPlayerValue('')));
    }

    return { printBoard,inputMarker,clearBoard };
}

function Cell() {
    let value = '';

    const inputPlayerValue = (player) => {
        value += player;
    }

    const getPlayerValue = () => value;

    return {
        inputPlayerValue,
        getPlayerValue
    };
}

function GameController() {
    const board = GameBoard();
    const player1 = "player1";
    const player2 = "player2";

    const players = [
        {
            name: player1,
            marker: 'X'
        },
        {
            name: player2,
            marker: 'O'
        }
    ];

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    
    const switchTurns = () => {
        activePlayer = getActivePlayer() == players[0] ? players[1]: players[0];
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    printNewRound();

    const playRound = (row, column) => {
        board.inputMarker(row, column, getActivePlayer().marker);

        switchTurns();
        printNewRound();
    };

    return {
        playRound,
        getActivePlayer
    };

}

const game = GameController();
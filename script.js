document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    let visitedSquares = [];
    let counter = 1;

    function createChessboard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square', (row + col) % 2 === 0 ? 'even-row' : 'odd-row', col % 2 === 0 ? 'even-col' : 'odd-col');
                square.dataset.row = String(row);
                square.dataset.col = String(col);

                square.addEventListener('click', () => handleSquareClick(square));

                chessboard.appendChild(square);
            }
        }
    }

    function handleSquareClick(square) {
        if (!visitedSquares.length) {
            visitedSquares.push(square);
            square.textContent = counter++;
            highlightAvailableMoves(square);
            square.classList.add('visited');
        }

        const lastSquare = visitedSquares[visitedSquares.length - 1];
        const isValidMove = isMoveValid(lastSquare, square);

        if (isValidMove && !square.classList.contains('visited')) {
            visitedSquares.push(square);
            square.textContent = counter++;
            highlightAvailableMoves(square);
            square.classList.add('visited');
        }
    }

    function highlightAvailableMoves(square) {
        // Reset background color for previously available squares
        document.querySelectorAll('.available').forEach((availableSquare) => {
            availableSquare.classList.remove('available');
        });

        const {row, col} = square.dataset;

        const moves = [
            {row: +row - 2, col: +col - 1},
            {row: +row - 2, col: +col + 1},
            {row: +row - 1, col: +col - 2},
            {row: +row - 1, col: +col + 2},
            {row: +row + 1, col: +col - 2},
            {row: +row + 1, col: +col + 2},
            {row: +row + 2, col: +col - 1},
            {row: +row + 2, col: +col + 1},
        ];

        const validMoves = moves.filter(({row, col}) => row >= 0 && row < 8 && col >= 0 && col < 8);

        validMoves.forEach(({row, col}) => {
            const targetSquare = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]:not(.selected):not(.visited):not(.available)`);
            if (targetSquare) {
                targetSquare.classList.add('available');
            }
        });
    }

    function isMoveValid(currentSquare, targetSquare) {
        const currentRow = +currentSquare.dataset.row;
        const currentCol = +currentSquare.dataset.col;
        const targetRow = +targetSquare.dataset.row;
        const targetCol = +targetSquare.dataset.col;

        const rowDiff = Math.abs(targetRow - currentRow);
        const colDiff = Math.abs(targetCol - currentCol);

        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    createChessboard();
});
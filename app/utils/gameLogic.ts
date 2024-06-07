const GRID_SIZE = 8; // Taille de la grille 8x8
const NUM_MINES = 10; // Nombre de mines

export type Cell = {
    isMine: boolean;
    isOpen: boolean;
    numAdjacentMines: number;
};

export const createEmptyGrid = (): Cell[][] => {
    return Array(GRID_SIZE).fill(null).map(() =>
        Array(GRID_SIZE).fill(null).map(() => ({
            isMine: false,
            isOpen: false,
            numAdjacentMines: 0,
        }))
    );
};

export const plantMines = (grid: Cell[][]): Cell[][] => {
    let minesPlanted = 0;
    while (minesPlanted < NUM_MINES) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        if (!grid[row][col].isMine) {
            grid[row][col].isMine = true;
            minesPlanted++;
        }
    }
    return grid;
};

export const calculateAdjacentMines = (grid: Cell[][]): Cell[][] => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (!grid[row][col].isMine) {
                let count = 0;
                directions.forEach(([dx, dy]) => {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE && grid[newRow][newCol].isMine) {
                        count++;
                    }
                });
                grid[row][col].numAdjacentMines = count;
            }
        }
    }

    return grid;
};

export const revealCell = (grid: Cell[][], row: number, col: number): Cell[][] => {
    if (grid[row][col].isOpen || grid[row][col].isMine) {
        return grid;
    }

    grid[row][col].isOpen = true;

    if (grid[row][col].numAdjacentMines === 0) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
                grid = revealCell(grid, newRow, newCol);
            }
        });
    }

    return grid;
};

export const initializeGrid = (): Cell[][] => {
    let initialGrid = createEmptyGrid();
    initialGrid = plantMines(initialGrid);
    initialGrid = calculateAdjacentMines(initialGrid);
    return initialGrid;
};

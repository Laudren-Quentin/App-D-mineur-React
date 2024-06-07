import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Grid from "./components/Grid";
import ResetButton from "./components/ResetButton";
import { initializeGrid, revealCell } from "./utils/gameLogic";
import { Cell } from "./utils/gameLogic";

const Demineur: React.FC = () => {
  const [grid, setGrid] = useState(initializeGrid);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    checkWinCondition(grid);
  }, [grid]);

  const handleCellPress = (row: number, col: number) => {
    if (gameOver || gameWon) return;

    let newGrid = [...grid];

    if (newGrid[row][col].isMine) {
      newGrid[row][col].isOpen = true;
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    newGrid = revealCell(newGrid, row, col);
    setGrid(newGrid);
  };

  const checkWinCondition = (grid: Cell[][]) => {
    const allNonMineCellsRevealed = grid.every(row =>
      row.every(cell => (cell.isMine || cell.isOpen))
    );

    if (allNonMineCellsRevealed) {
      setGameWon(true);
    }
  };

  const handleReset = () => {
    setGrid(initializeGrid());
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Le Démineur</Text>
      <Grid grid={grid} onCellPress={handleCellPress} />
      {gameOver && <Text style={styles.gameOverText}>Boom !!! 💣</Text>}
      {gameWon && <Text style={styles.gameWonText}>You Win! 🎉</Text>}
      <ResetButton onReset={handleReset} gameOver={gameOver} gameWon={gameWon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  gameOverText: {
    fontSize: 24,
    color: 'red',
    marginBottom: 20,
  },
  gameWonText: {
    fontSize: 24,
    color: 'green',
    marginBottom: 20,
  },
});

export default Demineur;

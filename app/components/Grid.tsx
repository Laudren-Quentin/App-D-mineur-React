import React from "react";
import { View, StyleSheet } from "react-native";
import Cell from "./Cell";

type Cell = {
  isMine: boolean;
  isOpen: boolean;
  numAdjacentMines: number;
};

type GridProps = {
  grid: Cell[][];
  onCellPress: (row: number, col: number) => void;
};

const Grid: React.FC<GridProps> = ({ grid, onCellPress }) => {
  return (
    <View>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={cell}
              onPress={() => onCellPress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

export default Grid;

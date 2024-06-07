import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type CellProps = {
    cell: {
        isMine: boolean;
        isOpen: boolean;
        numAdjacentMines: number;
    };
    onPress: () => void;
};

const Cell: React.FC<CellProps> = ({ cell, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.cell, 
                cell.isOpen && styles.cellOpen,
                // les conditions pour changer la couleur celon le numéro de bombe qu'il y a à côté :
                cell.isOpen && cell.numAdjacentMines  >= 0 && !cell.isMine && styles.cellNone,
                cell.isOpen && cell.numAdjacentMines >= 1 && styles.cellLow,
                cell.isOpen && cell.numAdjacentMines >= 2 && styles.cellMid,
                cell.isMine && cell.numAdjacentMines >= 3 && styles.cellHight,
            ]}
            onPress={onPress}
        >
            <Text style={styles.cellText}>
                {cell.isOpen ? (cell.isMine ? "💣" : cell.numAdjacentMines || "") : ""}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cell: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    cellOpen: {
        backgroundColor: "#ddd",
    },
    cellNone: {
        backgroundColor: "blue",
    },
    cellLow: {
        backgroundColor: "green",
    },
    cellMid: {
        backgroundColor: "orange",
    },
    cellHight: {
        backgroundColor: "red",
    },
    cellText: {
        fontSize: 20,
    },
});

export default Cell;

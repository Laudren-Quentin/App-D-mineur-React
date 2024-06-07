import React from "react";
import { Button, StyleSheet, View } from "react-native";

type ResetButtonProps = {
  onReset: () => void;
  gameOver: boolean;
  gameWon: boolean;
};

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, gameOver, gameWon }) => {
  return (
    (gameOver || gameWon) && (
      <View style={styles.buttonContainer}>
        <Button title="Nouvelle partie" onPress={onReset} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
  },
});

export default ResetButton;

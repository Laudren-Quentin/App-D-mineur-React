import React, { useState, useEffect } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(300)); // Position initiale de l'image (hors de l'écran)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000, // Durée de l'animation de fade-in en millisecondes
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        slideAnim,
        {
          toValue: 0,
          duration: 1000, // Durée de l'animation de défilement en millisecondes
          useNativeDriver: true,
        }
      )
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('@/assets/images/logo-demineur.png')} // Remplacer par le chemin de votre logo
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] // Utilisez translateY pour déplacer l'image vers le haut
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;

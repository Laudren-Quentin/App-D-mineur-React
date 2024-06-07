import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LoadingScreen from './components/LoadingScreen'; // Importez votre composant LoadingScreen
import Demineur from './Demineur'; // Importez votre composant Demineur

const MyApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulez un chargement de 2 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Nettoyez le timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        // Affichez l'écran de chargement si isLoading est vrai
        <LoadingScreen/>
      ) : (
        // Sinon, affichez le jeu Demineur
        <Demineur />
      )}
    </View>
  );
}

export default MyApp;

// SplashScreen.js
import React, { useEffect } from 'react';
import {View, ImageBackground, StyleSheet, Text } from 'react-native';
import SyncStorage from 'sync-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      isEnd = SyncStorage.get('A14');
      if(isEnd){
        navigation.navigate("Resultados");
      }else {
        navigation.replace('Bienvenido');
      }
     
    }, 4000); // 2000 milisegundos (2 segundos) de duración del splash screen
  }, []);

  return (
    <ImageBackground source={require('../assets/splash.jpeg')} style={styles.image}>
      <View>
      <Text style={styles.text}>Stress Control</Text>
      
      </View>

      <View>
      <Text style={styles.text}>1.0</Text>
      
      </View>
    
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

export default SplashScreen;

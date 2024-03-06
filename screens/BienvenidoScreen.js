// EncuestaScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const BienvenidosScreen = ({ navigation }) => {
  return (
    
<ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
  <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ width: '90%', marginTop: 10 }}>
      <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
        El siguiente <Text style={{fontWeight: 'bold'}}>TEST</Text> evalúa factores laborales que afectan bienestar emocional.
      </Text>
    </View> 
    <View style={{ width: '90%', marginTop: 20 }}>
    <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
            Importante 
        <Text style={{ fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'justify' }}>*</Text>
      </Text>
    </View>
    <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>Cada pregunta de la encuesta se califica en una escala de 1 a 4, donde cada número representa 
      un nivel de acuerdo o desacuerdo con la afirmación presentada. Aquí está lo que cada número significa:
      </Text>
    </View>

    <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
        <Text style={{fontWeight: 'bold'}}>1: Total desacuerdo</Text> - Si eliges este número, significa que estás completamente en desacuerdo con la afirmación. No crees que la afirmación sea cierta en tu caso o situación.
      </Text>
    </View>
    <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
      <Text style={{fontWeight: 'bold'}}>2: Desacuerdo</Text> - Si eliges este número, significa que, en general, no estás de acuerdo con la afirmación, aunque puede haber algunas excepciones o momentos en los que la afirmación podría ser cierta.
      </Text>
    </View>
    <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
      <Text style={{fontWeight: 'bold'}}>3: Acuerdo</Text> - Si eliges este número, significa que, en general, estás de acuerdo con la afirmación. Puede haber algunas excepciones o momentos en los que la afirmación no sea cierta, pero en su mayoría, crees que la afirmación es cierta en tu caso o situación
      </Text>
    </View>
    <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
      <Text style={{fontWeight: 'bold'}}>4: Total acuerdo</Text> - Si eliges este número, significa que estás completamente de acuerdo con la afirmación. Crees que la afirmación es cierta en todos los casos o situaciones que te conciernen.
      </Text>
    </View>

    <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{ fontSize: 12, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontStyle: 'italic' }}>Es importante recordar que no hay respuestas correctas o incorrectas en esta encuesta. Se trata de tus opiniones y experiencias personales. Por lo tanto, te animamos a que seas honesto/a y que elijas la opción que mejor refleje tus sentimientos o experiencias. 
      </Text>
    </View>

    <View style={{ width: '80%', marginTop: 25 }}>
      <Button title="Comenzar Test  " onPress={() => navigation.navigate('EncuestaScreen')}
       icon={
        <Icon
          name="book"
          size={20}
          color="white"
        />
      } iconRight
      />
    </View>
  </View>
</ScrollView>


        
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pregunta: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: '#000000'
  },
  boton: {
    backgroundColor: '#841584',
    padding: 10,
    margin: 10,
  },
  texto2: {
    fontWeight:'900',
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: '#000000'
  },
});
  
export default BienvenidosScreen;

// EncuestaScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable,ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import SyncStorage from 'sync-storage';
import Toast from 'react-native-root-toast';
import { Rating, AirbnbRating } from 'react-native-elements';

const Preguntas = [
  '1. ¿Considero que mi trabajo está libre de amenazas, humillaciones, ridiculizaciones, burlas, calumnias o difamaciones reiteradas con el fin de causarme daño?',
  '2. ¿Tengo un trabajo libre de conflictos estresantes, rumores maliciosos o calumniosos sobre mi persona?',
];

const Encuesta8Screen = ({ navigation }) => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [pregunta2, setPregunta2] = useState(0);


  const validate = () => {
    if(!preguntaActual || !pregunta2 ){ return false;  }
    if(preguntaActual == 0 || pregunta2 == 0){return false;}
  return true;
  }

  const guardar = () => {
    if(validate()){
      let total = preguntaActual + pregunta2;
    SyncStorage.set('A8', total);
    navigation.replace('Encuesta9Screen');
    }else{
      error("Campos incompletos")
    } 
  }

  const error = (contenido, duration = Toast.durations.SHORT) => {
    Toast.show(contenido, {
      duration: duration,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      backgroundColor: '#A82E2E'
    });
  }

  return (
   

<ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
<View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
  <View style={{ width: '90%', marginTop: 20 }}>
    <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
      El siguiente <Text style={{fontWeight: 'bold'}}>TEST</Text> evalúa factores laborales que afectan bienestar emocional.
    </Text>
  </View> 
  <View style={{ width: '90%', marginTop: 40 }}>
  <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
          Importante 
      <Text style={{ fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'justify' }}>*</Text>
    </Text>
  </View>
  <View style={{ width: '90%', marginTop: 30 }}>
    <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>Cada pregunta de la encuesta se califica en una escala de 1 a 4, donde cada número representa 
    un nivel de acuerdo o desacuerdo con la afirmación presentada.
    </Text>
  </View>

  <View style={{ width: '90%', marginTop: 30 }}>
    <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
    {Preguntas[0]}
      </Text>
  </View>
  <AirbnbRating
  count={4}
  reviews={["En desacuerdo", "Poco de acuerdo", "Parcialmente de acuerdo", "Completamente de acuerdo"]}
  defaultRating={0}
  size={30}
  onFinishRating={setPreguntaActual}
/>
  <View style={{ width: '90%', marginTop: 20 }}>
    <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
      {Preguntas[1]}
       </Text>
  </View>
  <AirbnbRating
  count={4}
  reviews={["En desacuerdo", "Poco de acuerdo", "Parcialmente de acuerdo", "Completamente de acuerdo"]}
  defaultRating={0}
  size={30}
  onFinishRating={setPregunta2}
/>

<View style={{ width: '85%', marginTop: 50 }}>
  <Pressable  style={styles.boton} onPress={guardar}>
        <Text style={styles.textoBoton}>Continuar</Text>
      </Pressable>
     
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000'
  },
  boton: {
    backgroundColor: '#841584',
    padding: 10,
    margin: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    textAlign:'center'
    ,fontWeight:'bold'
  },
});
  
export default Encuesta8Screen;

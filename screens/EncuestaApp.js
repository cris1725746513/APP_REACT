import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { GoogleSignin, statusCodes ,GoogleSigninButton   } from '@react-native-google-signin/google-signin';
import { Button ,Rating, AirbnbRating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

const Preguntas = [
    '1. ¿La aplicación móvil se instaló y configuró correctamente en tu dispositivo móvil?',
    '2. ¿Encuentras fácilmente las funciones principales de la aplicación móvil, como iniciar una evaluación del estrés laboral?',
    '3. ¿La aplicación móvil presenta algún problema técnico o errores durante su uso?',
    '4. ¿La aplicación móvil te brinda retroalimentación clara y comprensible después de completar una evaluación del estrés laboral?',
    '5. ¿Las preguntas y escalas de evaluación en la aplicación móvil son claras y fáciles de responder?',
    '6. ¿La aplicación móvil te permite personalizar la frecuencia y el momento de las evaluaciones del estrés laboral según tus necesidades?',
    '7. ¿Encuentras útiles las recomendaciones o consejos proporcionados por la aplicación móvil para manejar el estrés laboral?',
    '8. ¿La aplicación móvil te motiva a tomar medidas para reducir el estrés laboral mediante funciones como recordatorios o seguimiento de progreso?',
    '9. ¿La interfaz de usuario de la aplicación móvil es atractiva y fácil de navegar?',
    '10. ¿Cómo calificarías tu satisfacción general con el funcionamiento y la usabilidad del prototipo de la aplicación móvil?'
];

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  });

const EncuestaApp = ({ navigation }) => {
    const [isSignedIn, setSignedIn] = useState(false);
    const [pregunta1, setPregunta1] = useState(0);
    const [pregunta2, setPregunta2] = useState(0);
    const [pregunta3, setPregunta3] = useState(0);
    const [pregunta4, setPregunta4] = useState(0);
    const [pregunta5, setPregunta5] = useState(0);
    const [pregunta6, setPregunta6] = useState(0);
    const [pregunta7, setPregunta7] = useState(0);
    const [pregunta8, setPregunta8] = useState(0);
    const [pregunta9, setPregunta9] = useState(0);
    const [pregunta10, setPregunta10] = useState(0);

    useEffect(() => {
      getIsSignedIn();
      
      
    }, []);

  const validate = () => {
    if(!pregunta1 || !pregunta2 || 
      !pregunta3|| !pregunta4|| !pregunta5|| !pregunta6|| !pregunta7|| 
      !pregunta8|| !pregunta9|| !pregunta10 ){ return false;  }
    if(pregunta1 == 0 || pregunta2 == 0 || pregunta3 == 0 || pregunta4 == 0
      || pregunta5 == 0|| pregunta6 == 0|| pregunta7 == 0|| pregunta8 == 0
      || pregunta9 == 0|| pregunta10 == 0){return false;}
  return true;
  }

  useEffect(() => {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      });
  }, []);

  

  const execute = async () => {

    if(validate()){
        const spreadsheetId = '';
        const range = 'Hoja1!A1:K5';
        const apiKey = '';

    const accessToken = await GoogleSignin.getTokens();
    try {
      const url = `https://content-sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&alt=json&key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range,
          majorDimension: 'ROWS',
          values: [
            [pregunta1,pregunta2,pregunta3,pregunta4,pregunta5
                ,pregunta6,pregunta7,pregunta8,pregunta9,pregunta10]
          ],
        }),
      });

      const data = await response.json();
      success("Exito al guardar")
      navigation.navigate("Resultados")
    } catch (error) {
      error(error);
    }
  }else {
    error("Campos incompletos")
  }
  };

 const success = (contenido, duration = Toast.durations.SHORT) => {
    Toast.show(contenido, {
      duration: duration,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      backgroundColor: '#05CE97'
    });
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
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      getIsSignedIn();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

const getIsSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setSignedIn(!isSignedIn) 
  };


  return isSignedIn ? (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
      <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' ,marginTop: 150}}>
      <View style={{flex: 1,
        justifyContent: 'center', marginTop: 40 ,
        alignItems: 'center'}}><Icon name="user" size={60} color="#F4D03F" />
         <Text style={styles.title}>Sign in with your account</Text>
        </View>
        <GoogleSigninButton
             size={GoogleSigninButton.Size.Wide}
             color={GoogleSigninButton.Color.Dark}
             onPress={_signIn}
             disabled={false}
                />
        </View>
    </ScrollView>
  ): (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      
      <View style={{ width: '90%', marginTop: 20 }}>
      <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000000', marginBottom: 10, textAlign: 'justify' }}>
              Importante 
          <Text style={{ fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'justify' }}>*</Text>
        </Text>
      </View>
      <View style={{ width: '90%', marginTop: 10 }}>
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
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta1}
          />
      <View style={{ width: '90%', marginTop: 20 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
          {Preguntas[1]}
           </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta2}
          />
        <View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[2]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta3}
          />
        <View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[3]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta4}
          />
        <View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[4]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta5}
          />

<View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[5]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta6}
          />
    
    <View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[6]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta7}
          />

<View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[7]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta8}
          />

<View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[8]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta9}
          />


<View style={{ width: '90%', marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10, textAlign: 'justify' ,fontWeight:'bold'}}>
        {Preguntas[9]}
          </Text>
      </View>
      <AirbnbRating
        count={4}
        reviews={["Muy insatisfecho", "Insatisfecho", "Satisfecho", "Muy satisfecho"]}
        defaultRating={0}
        size={30}
        onFinishRating={setPregunta10}
          />
      <View style={{ width: '70%', marginTop: 30, marginBottom : 15 
      , borderRadius : 25}}>
      
      <Button title="Enviar Resultado  " onPress={execute}
      icon={
        <Icon
          name="upload"
          size={15}
          color="white"
        />
      } iconRight  
      />
         
      </View>
    </View>
    </ScrollView>
  
  )
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
      fontSize: 16,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#333333',
      fontWeight:'bold',
    },
  });

export default EncuestaApp;
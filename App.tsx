// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import EncuestaScreen from './screens/EncuestaScreen';
import Encuesta2Screen from './screens/Encuesta2Screen';
import Encuesta3Screen from './screens/Encuesta3Screen';
import Encuesta4Screen from './screens/Encuesta4Screen';
import Encuesta5Screen from './screens/Encuesta5Screen';
import Encuesta6Screen from './screens/Encuesta6Screen';
import Encuesta7Screen from './screens/Encuesta7Screen';
import Encuesta8Screen from './screens/Encuesta8Screen';
import Encuesta9Screen from './screens/Encuesta9Screen';
import Encuesta10Screen from './screens/Encuesta10Screen';
import Encuesta11Screen from './screens/Encuesta11Screen';
import Encuesta12Screen from './screens/Encuesta12Screen';
import Encuesta13Screen from './screens/Encuesta13Screen';
import Encuesta14Screen from './screens/Encuesta14Screen';
import BienvenidosScreen from './screens/BienvenidoScreen';
import ResultadosScreen from './screens/ResultadosScreen';
import Detalles from './screens/Detalles';
import EncuestaApp from './screens/EncuestaApp'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"  
        screenOptions={{ headerStyle: { backgroundColor: '#97BC62FF'} 
          ,headerTitleStyle: { color: '#00539CFF',fontWeight: 'bold' ,fontSize : 25}
          ,headerTitleAlign: 'center'}}>
        <Stack.Screen name="Splash" component={SplashScreen} 
         options={{ headerShown: false }}
        />
        <Stack.Screen name="EncuestaScreen" component={EncuestaScreen} 
        options={({ route }) => ({
          title: 'Carga y ritmo de trabajo',
          
          })}/>

<Stack.Screen name="Encuesta2Screen" component={Encuesta2Screen} 
        options={({ route }) => ({
          title: 'Desarrollo de competencias',
          
          })}/>

          <Stack.Screen name="Encuesta3Screen" component={Encuesta3Screen} 
        options={({ route }) => ({
          title: 'Liderazgo',
          
          })}/>
          <Stack.Screen name="Encuesta4Screen" component={Encuesta4Screen} 
        options={({ route }) => ({
          title: 'Organización del trabajo',
          
          })}/>
          <Stack.Screen name="Encuesta5Screen" component={Encuesta5Screen} 
        options={({ route }) => ({
          title: 'Recuperación',
          
          })}/>
          <Stack.Screen name="Encuesta6Screen" component={Encuesta6Screen} 
        options={({ route }) => ({
          title: 'Soporte y apoyo',
          
          })}/>
          <Stack.Screen name="Encuesta7Screen" component={Encuesta7Screen} 
        options={({ route }) => ({
          title: 'Acoso Discriminatorio',
          
          })}/> 


<Stack.Screen name="Encuesta8Screen" component={Encuesta8Screen} 
        options={({ route }) => ({
          title: 'Acoso Laboral',
          
          })}/>

<Stack.Screen name="Encuesta9Screen" component={Encuesta9Screen} 
        options={({ route }) => ({
          title: 'Acoso Sexual',
          
          })}/>
          <Stack.Screen name="Encuesta10Screen" component={Encuesta10Screen} 
        options={({ route }) => ({
          title: 'Adicción al trabajo',
          
          })}/>
          <Stack.Screen name="Encuesta11Screen" component={Encuesta11Screen} 
        options={({ route }) => ({
          title: 'Condiciones del trabajo',
          
          })}/>
          <Stack.Screen name="Encuesta12Screen" component={Encuesta12Screen} 
        options={({ route }) => ({
          title: 'Doble presencia (laboral - familiar)',
          
          })}/>
          <Stack.Screen name="Encuesta13Screen" component={Encuesta13Screen} 
        options={({ route }) => ({
          title: 'Estabilidad laboral y emocional',
          
          })}/>
          <Stack.Screen name="Encuesta14Screen" component={Encuesta14Screen} 
        options={({ route }) => ({
          title: 'Salud auto percibida',
          
          })}/>

      <Stack.Screen name="Resultados" component={ResultadosScreen} 
        options={({ route }) => ({
          title: 'Resultados',
          
          })}/>

        <Stack.Screen name="Bienvenido" component={BienvenidosScreen} 
        options={({ route }) => ({
          title: 'Bienvenido',
          
          })}/>

<Stack.Screen name="EncuestaApp" component={EncuestaApp} 
        options={({ route }) => ({
          title: 'Ayudanos a Mejorar',
          
          })}/>

<Stack.Screen name="Detalles" component={Detalles} 
        options={({ route }) => ({
          title: 'Recomendaciones',
          
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
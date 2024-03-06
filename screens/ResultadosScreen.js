import React ,{ useEffect ,useState}from 'react';
import { View, ScrollView, StyleSheet, Image ,Pressable} from 'react-native';
import { Text, Card } from '@rneui/themed';
import SyncStorage from 'sync-storage';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';


import Spinner from 'react-native-loading-spinner-overlay';

const sugerencias = [
  {
    id: "1",
    tema: "Establecer metas y prioridades",
    descripcion: "Antes del trabajo, identifica tareas clave y establece metas realistas. Prioriza y completa eficientemente."
  },
  {
    id: "1",
    tema: "Organización y planificación",
    descripcion: "Organiza trabajo: plan detallado, divide tareas, asigna tiempos. Usa listas, calendarios o aplicaciones de gestión del tiempo."
  },
  {
    id: "1",
    tema: "Manejo del tiempo",
    descripcion: "Aplica técnicas Pomodoro para gestionar tiempo: intervalos cortos, pausas. Establece límites, evita procrastinación."
  },
  {
    id: "1",
    tema: "Delegar y buscar apoyo",
    descripcion: "Delega tareas al equipo según habilidades. Comparte carga equitativamente y pide ayuda cuando necesario."
  },
  {
    id: "2",
    tema: "Buscar oportunidades de desarrollo profesional",
    descripcion: "Invierte en desarrollo profesional, asiste a eventos educativos. Actualiza competencias, fortalece confianza y reduce estrés laboral."
  },
  {
    id: "2",
    tema: "Utilizar técnicas de manejo del estrés",
    descripcion: "Aprende y practica técnicas de manejo del estrés en el trabajo: respiración, meditación, ejercicio. Promueven bienestar emocional."
  },
  {
    id: "2",
    tema: "Fomentar la colaboración entre colegas",
    descripcion: "Colabora con otros docentes para compartir ideas y responsabilidades. Ambiente de apoyo mutuo reduce estrés y aislamiento."
  },
  {
    id: "2",
    tema: "Autocuidado",
    descripcion: "Prioriza bienestar físico y mental: sueño, alimentación, ejercicio y actividades relajantes. Aumenta resistencia al estrés."
  },
  {
    id: "3",
    tema: "Establecer expectativas claras",
    descripcion: "Comunica regularmente con jefe. Aclara expectativas para evitar malentendidos y estrés adicional en responsabilidades y tareas."
  },
  {
    id: "3",
    tema: "Establecer prioridades",
    descripcion: "Colabora con jefe para establecer prioridades en tareas y proyectos. Gestiona carga eficientemente para reducir estrés."
  },
  {
    id: "3",
    tema: "Establecer un sistema de retroalimentación regular",
    descripcion: "Pide retroalimentación regular a tu jefe. Evalúa fortalezas y áreas de mejora, ajusta trabajo según expectativas. Motivador y reduce estrés."
  },
  {
    id: "3",
    tema: "Fomentar la colaboración",
    descripcion: "Colabora con jefe y colegas, comparte tareas y conocimientos. Aliviar carga y crear apoyo mutuo."
  },
  {
    id: "4",
    tema: "Organiza tu espacio de trabajo",
    descripcion: "Mantén espacio de trabajo limpio, ordenado y sin distracciones. Elimina desorden, organiza eficientemente para mayor concentración y productividad."
  },
  {
    id: "4",
    tema: "Practica el autocuidado",
    descripcion: "Prioriza bienestar: duerme, come saludable, ejercítate, disfruta hobbies, tiempo con seres queridos. Maneja estrés laboral eficazmente."
  },
  {
    id: "4",
    tema: "Delega y pide ayuda",
    descripcion: "Delega y pide ayuda cuando necesario. Aprovecha habilidades de colaboradores para reducir carga y estrés."
  },
  {
    id: "4",
    tema: "Establece prioridades",
    descripcion: "Prioriza tareas importantes y urgentes. Usa la matriz de Eisenhower. Evita sentirte abrumado por múltiples tareas."
  },
  
  {
    id: "5",
    tema: "Establece límites claros",
    descripcion: "Define y respeta horas de trabajo. Evita llevar trabajo a casa, establece límites para separar vida laboral y descanso."
  },
  {
    id: "5",
    tema: "Descansa adecuadamente durante el día",
    descripcion: "Toma descansos cortos para desconectar, estirarte o dar un paseo. Reduce estrés, mejora productividad."
  },
  {
    id: "5",
    tema: "Duerme lo suficiente",
    descripcion: "Prioriza sueño adecuado, establece rutina regular. Crea ambiente propicio: evita dispositivos, espacio tranquilo y oscuro."
  },
  {
    id: "5",
    tema: "Practica técnicas de relajación",
    descripcion: "Practica relajación: meditación, respiración profunda, yoga. Reduce estrés, calma mente, promueve recuperación física y mental."
  },
  {
    id: "6",
    tema: "Fomenta la comunicación abierta",
    descripcion: "Crea ambiente laboral acogedor, fomenta comunicación abierta y efectiva. Establece canales para compartir preocupaciones y buscar apoyo."
  },
  {
    id: "6",
    tema: "Establece relaciones de confianza",
    descripcion: "Construye relaciones sólidas, fomenta colaboración y confianza. Crea ambiente donde todos se sientan seguros y apoyados."
  },
  {
    id: "6",
    tema: "Ofrece tu ayuda",
    descripcion: "Ofrece ayuda proactiva a colegas en dificultades. Pregunta cómo apoyar y brinda asistencia. Gestos pequeños importan."
  },
  {
    id: "6",
    tema: "Busca recursos internos y externos",
    descripcion: "Encuentra recursos internos y externos: bienestar laboral, asesoramiento, recursos comunitarios. Usa cuando necesites apoyo adicional."
  },
  {
    id: "7",
    tema: "Conoce tus derechos y políticas",
    descripcion: "Conoce políticas y regulaciones laborales contra acoso discriminatorio. Entiende derechos y medidas para abordar situaciones."
  },
  {
    id: "7",
    tema: "Documenta los incidentes",
    descripcion: "Documenta incidentes de acoso discriminatorio: fecha, hora, lugar, descripción y testigos. Útil para quejas o medidas legales."
  },
  {
    id: "7",
    tema: "Comunica tus preocupaciones",
    descripcion: "Comunica acoso discriminatorio a recursos humanos o supervisor. Proporciona detalles y pruebas. Busca ayuda externa si es necesario."
  },
  {
    id: "7",
    tema: "Mantén registros de las respuestas",
    descripcion: "Registra respuestas y acciones tras queja por acoso. Detalles como fechas, nombres y resoluciones propuestas. Evalúa adecuación."
  },
  {
    id: "8",
    tema: "Reconoce el acoso laboral",
    descripcion: "Conoce formas de acoso: verbal, físico, psicológico, sexual. Identifica comportamientos inapropiados. Reconoce y toma medidas rápidamente."
  },
  {
    id: "8",
    tema: "Documenta los incidentes",
    descripcion: "Documenta acoso laboral: fecha, hora, lugar, hechos y testigos. Guarda evidencia como correos o mensajes. Crucial para queja formal."
  },
  {
    id: "8",
    tema: "Conoce las políticas y recursos disponibles",
    descripcion: "Conoce políticas de acoso laboral. Identifica a quién informar y los pasos a seguir. Busca apoyo interno."
  },
  {
    id: "8",
    tema: "Busca apoyo",
    descripcion: "No enfrentes acoso laboral solo. Busca apoyo de colegas, amigos o familiares para recibir apoyo emocional y perspectivas."
  },
  {
    id: "9",
    tema: "Reconoce el acoso sexual",
    descripcion: "Identifica formas de acoso sexual: comentarios, insinuaciones, tocamientos. Afirma derecho a entorno laboral seguro sin hostigamiento."
  },
  {
    id: "9",
    tema: "Busca apoyo y documenta los incidentes",
    descripcion: "Ante acoso sexual, busca apoyo de confianza, documenta incidentes detalladamente para respaldar futuras quejas o acciones legales."
  },
  {
    id: "9",
    tema: "Conoce las políticas y recursos disponibles",
    descripcion: "Conoce políticas sobre acoso sexual en la organización. Identifica a quién informar y cómo manejar quejas. Busca apoyo interno."
  },
  {
    id: "9",
    tema: "Presenta una queja formal",
    descripcion: "Considera presentar queja formal, sigue procedimientos. Proporciona documentación y evidencia. Cumple plazos y políticas. Mantén registros."
  
  },
  {
    id: "10",
    tema: "Reconoce y acepta el problema",
    descripcion: "Reconoce adicción al trabajo, acepta como problema. Reflexiona sobre impacto en salud, relaciones y bienestar emocional."
  },
  {
    id: "10",
    tema: "Establece límites y equilibrio",
    descripcion: "Define límites: horarios específicos para trabajo y tiempo para descanso, cuidado personal y recreación. Equilibrio es clave."
  },
  {
    id: "10",
    tema: "Aprende a relajarte y desestresarte",
    descripcion: "Integra relajación diaria: meditación, ejercicio, hobbies, tiempo con seres queridos. Desconecta del trabajo y recarga energías."
  },
  {
    id: "10",
    tema: "Considera buscar ayuda profesional",
    descripcion: "Busca ayuda profesional para adicción al trabajo. Terapeutas ofrecen herramientas y estrategias para equilibrio y bienestar."
  },
  {
    id: "11",
    tema: "Seguridad laboral",
    descripcion: "Garantiza seguridad laboral. Identifica y corrige riesgos. Participa en programas de seguridad y usa equipo de protección."
  },
  {
    id: "11",
    tema: "Ergonomía",
    descripcion: "Diseña espacio ergonómicamente. Ajusta silla, escritorio y monitor. Mantén buena postura. Realiza pausas para estirar músculos."
  },
  {
    id: "11",
    tema: "Comunicación efectiva",
    descripcion: "Promueve comunicación efectiva. Establece canales claros. Colabora y resuelve problemas eficientemente. Comunica necesidades y preocupaciones de manera respetuosa pero directa."
  },
  {
    id: "11",
    tema: "Desarrollo profesional y oportunidades de crecimiento",
    descripcion: "Busca desarrollo interno, participa en capacitaciones. Fomenta ambiente laboral con oportunidades de crecimiento y reconocimiento."
  },
  {
    id: "12",
    tema: "Establece límites claros",
    descripcion: "Establece límites trabajo-familia. Separa tiempos, comunica límites a colegas. Protege equilibrio y comunica necesidades."
  },
  {
    id: "12",
    tema: "Prioriza y organiza",
    descripcion: "Prioriza trabajo y familia. Establece metas realistas, organiza tiempo con agendas. Optimiza productividad y reserva tiempo familiar."
  },
  {
    id: "12",
    tema: "Negocia opciones de flexibilidad",
    descripcion: "Busca flexibilidad laboral: horarios, teletrabajo. Equilibra responsabilidades laborales y familiares. Comunica con empleador para acordar arreglos."
  },
  {
    id: "12",
    tema: "Delega y solicita apoyo",
    descripcion: "Delega tareas, solicita apoyo en trabajo y familia. Comparte responsabilidades para aliviar carga y equilibrar roles."
  },
  {
    id: "13",
    tema: "Desarrolla habilidades y competencias",
    descripcion: "Invierte en desarrollo profesional, adquiere habilidades relevantes, mantente actualizado para mejorar empleabilidad y estabilidad en carrera."
  },
  {
    id: "13",
    tema: "Cultiva relaciones profesionales",
    descripcion: "Fortalece relaciones laborales y networking. Abre oportunidades y ofrece apoyo en momentos de cambio. Participa en eventos industriales."
  },
  {
    id: "13",
    tema: "Cuida tu bienestar emocional",
    descripcion: "Salud mental: prioriza relajación, ejercicio, meditación. Reconoce y maneja emociones saludablemente para bienestar emocional."
  },
  {
    id: "13",
    tema: "Establece límites saludables",
    descripcion: "Establece límites en relaciones, comunica necesidades respetuosamente. Protege estabilidad emocional evitando situaciones perjudiciales."
  },
  {
    id: "14",
    tema: "Mantén una alimentación saludable",
    descripcion: "Dieta equilibrada: frutas, verduras, proteínas magras, granos integrales, grasas saludables. Limita procesados, azúcares, grasas saturadas. Hidrátate, evita excesos de alcohol y tabaco."
  },
  {
    id: "14",
    tema: "Haz ejercicio regularmente",
    descripcion: "Ejercicio regular: 150 min/aeróbicos moderados, 75 min/intensos semanales. Fortalecimiento 2 veces/semana. Encuentra actividades placenteras."
  },
  {
    id: "14",
    tema: "Mantén un peso saludable",
    descripcion: "Mantén peso saludable. Sobrepeso y obesidad aumentan riesgo de enfermedades. Equilibra ingesta calórica y gasto energético."
  },
  {
    id: "14",
    tema: "Duerme lo suficiente",
    descripcion: "Prioriza 7-9 horas de sueño, clave para recuperación y funcionamiento óptimo. Establece rutina y evita dispositivos antes de dormir."
  }
]

type CardsComponentsProps = {};

const ResultadosScreen: React.FunctionComponent<CardsComponentsProps> = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
     
    }, 4000); // 2000 milisegundos (2 segundos) de duración del splash screen
  }, []);
    
  const [isLoading, setLoading] = useState(true);

  const validateResultado = (id) => {

  if(id == "1"){
    return parseFloat(SyncStorage.get('A1'))

  } else if(id == "2"){
    return parseFloat(SyncStorage.get('A2'))

  } else if(id == "3"){
    return parseFloat(SyncStorage.get('A3'))

  } else if(id == "4"){
    return parseFloat(SyncStorage.get('A4'))

  } else if(id == "5"){
    return parseFloat(SyncStorage.get('A5'))

  } else if(id == "6"){
    return parseFloat(SyncStorage.get('A6'))

  } else  if(id == "7"){
    return parseFloat(SyncStorage.get('A7'))

  } else  if(id == "8"){
    return parseFloat(SyncStorage.get('A8'))

  } else if(id == "9"){
    return parseFloat(SyncStorage.get('A9'))

  } else if(id == "10"){
    return parseFloat(SyncStorage.get('A10'))

  } else if(id == "11"){
    return parseFloat(SyncStorage.get('A11'))

  } else if(id == "12"){
    return parseFloat(SyncStorage.get('A12'))

  } else if(id == "13"){
    return parseFloat(SyncStorage.get('A13'))

  } else if(id == "14"){
    return parseFloat(SyncStorage.get('A14'))

  } 

}

const ColorAlerta= (total) => {
  if (total >= 6.5 && total <= 8) {
    return '#47BF29'
  } else if (total >= 4.5 && total < 6.5) {
    return '#D8D021'
  } else if(total <4.5) {
      return '#BF1A06'
  }
}

const getValue = (total) => {
    return total <4.5 ? true : false;
} 

const getRecomendaciones = (id,title) => { 
  if(getValue(validateResultado(id))){
      return (
        <View style={{ width: '100%', marginTop: 50 }}>
            <Pressable  onPress={() =>  
              navigation.navigate("Detalles", 
              {id: id , title :title})}>
                <Text style={{color: 'blue',textDecorationLine: 'underline'}}>Ver recomendaciones</Text>
              </Pressable>
        </View> );
  }else{
      return null;

  }
}




const getIconoResultado = (id) => {
  total  = validateResultado(id);
    if (total >6 && total <= 8) {
      return (<View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}><Icon name="check" size={30} color="#47BF29" />
        <View style={{ width: '90%', marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: '#47BF29', marginBottom: 10, 
              textAlign: 'justify' ,fontWeight:'bold'}}>
                      Riesgo Bajo
                  </Text>
              </View>
              <Progress.Bar progress={((10 - total)/10)}  color='#47BF29'width={200} />
        </View>)
    } else if (total > 4.5 && total <= 6) {
      return (<View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}><Icon name="warning" size={30} color="#D8D021" />
        <View style={{ width: '90%', marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: '#D8D021', marginBottom: 10, 
              textAlign: 'center' ,fontWeight:'bold'}}>
                      Riesgo Medio
                  </Text>
              </View>
              <Progress.Bar progress={((10 - total)/10)} color='#D8D021' width={200} />
        </View>)
    } else if(total <=4) {
      return (<View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}><Icon name="close" size={30} color="#BF1A06" />
              <View style={{ width: '90%', marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: '#BF1A06', marginBottom: 10, 
              textAlign: 'right' ,fontWeight:'bold'}}>
                      Riesgo Alto
                  </Text>
              </View>
              <Progress.Bar progress={(1)} color='#BF1A06' width={200} />
        </View>)
  }
}

return (
  <>
    <ScrollView>
      <View style={styles.container}>
      <Spinner
          visible={isLoading}
          textContent={'Analizando datos...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(1))}}>
          <Card.Title >Carga y ritmo de trabajo</Card.Title>
          <Card.Divider  style={{backgroundColor:ColorAlerta(validateResultado(1))}}/>
            {getIconoResultado(1)}
            {getRecomendaciones(1,'Carga y ritmo de trabajo')}
        </Card>
      

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(2))}}>
          <Card.Title >Desarrollo de competencias</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(2))}}/>
          <View>
          {getIconoResultado(2)}
          {getRecomendaciones(2,'Desarrollo de competencias')}
          </View>
        </Card>
     

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(3))}}>
          <Card.Title >Liderazgo</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(3))}}/>
          <View>
          {getIconoResultado(3)}
          </View>
          
          {getRecomendaciones(3,'Liderazgo')}
        </Card>
     

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(4))}}>
          <Card.Title >Organización del trabajo</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(4))}}/>
          {getIconoResultado(4)}
          {getRecomendaciones(4,'Organización del trabajo')}
        </Card>
      
        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(5))}}>
          <Card.Title >Recuperación</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(5))}}/>
          {getIconoResultado(5)}
          {getRecomendaciones(5,'Recuperación')}
        </Card>
       

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(6))}}>
          <Card.Title >Soporte y apoyo</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(6))}}/>
          {getIconoResultado(6)}
          {getRecomendaciones(6,'Soporte y apoyo')}
        </Card>

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(7))}}>
          <Card.Title >Acoso Discriminatorio</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(7))}}/>
          {getIconoResultado(7)}
          {getRecomendaciones(7,'Acoso Discriminatorio')}
        </Card>
        
        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(8))}}>
          <Card.Title >Acoso Laboral</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(8))}}/>
          {getIconoResultado(8)}
          {getRecomendaciones(8,'Acoso Laboral')}
        </Card>

        
        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(9))}}>
          <Card.Title >Acoso Sexual</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(9))}}/>
          {getIconoResultado(9)}
          {getRecomendaciones(9,'Acoso Sexual')}
        </Card>


        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(10))}}>
          <Card.Title >Adicción al trabajo</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(10))}}/>
          {getIconoResultado(10)}
          {getRecomendaciones(10,'Adicción al trabajo')}
        </Card>
        
        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(11))}}>
          <Card.Title >Condiciones del trabajo</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(11))}}/>
          {getIconoResultado(11)}
          {getRecomendaciones(11,'Condiciones del trabajo')}
        </Card>

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(12))}}>
          <Card.Title >Doble presencia</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(12))}}/>
          {getIconoResultado(12)}
          {getRecomendaciones(12,'Doble presencia')}
        </Card>

        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(13))}}>
          <Card.Title >Estabilidad laboral y emocional</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(13))}}/>
          {getIconoResultado(13)}
          {getRecomendaciones(13,'Estabilidad laboral y emocional')}
        </Card>
       
        <Card containerStyle={{ marginTop: 15,borderWidth: 5,borderRadius:20 ,borderColor :ColorAlerta(validateResultado(14))}}>
          <Card.Title >Salud auto percibida</Card.Title>
          <Card.Divider style={{backgroundColor:ColorAlerta(validateResultado(14))}}/>
          {getIconoResultado(14)}
          {getRecomendaciones(14,'Salud auto percibida')}
        </Card>

        <View style={{ width: '70%', marginTop: 30,marginLeft:50, marginBottom : 15 
      , borderRadius : 25}}>
      
      <Button  onPress={() => navigation.navigate("EncuestaApp")} 
      icon={
        <Icon
          name="line-chart"
          size={15}
          color="white"
        />
      } iconRight  
       title="Ayúdanos a mejorar  "/>
         
      </View>
        
      </View>

      

    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
fonts: {
  marginBottom: 6,
},
fontsT: {
  marginBottom: 6,
  fontWeight:'bold'
},
user: {
  flex:1,
  marginBottom: 6,
},
image: {
  width: 30,
  height: 30,
  marginRight: 10,
},
name: {
  fontSize: 16,
  marginTop: 5,
},
label: {
  textAlign: 'center',
  marginBottom: 10,
  fontSize: 24,
},
spinnerTextStyle: {
  color: '#FFF'
},
});

export default ResultadosScreen;
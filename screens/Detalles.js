import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
//import { Text, Card, Button } from '@rneui/themed';
import SyncStorage from 'sync-storage';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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



const Detalles = ({route, navigation }) => {

const getRecomendaciones = (id) => { 
    recomendacionB = []
     sugerencias.map((u, i) => {
       if(u.id == id) {
        recomendacionB.push(
         <View key={i} style={styles.user}>
           <Text style={styles.fontsT}>
             {u.tema}:
           </Text>
           <Text style={styles.fonts}>{u.descripcion}</Text>
         </View>
       );
     }
     })
     return recomendacionB;
 }

 

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{flex: 1,
        justifyContent: 'center', marginTop: 40 ,
        alignItems: 'center'}}><Icon name="lightbulb-o" size={60} color="#F4D03F" />
         <Text style={styles.title}>{route.params.title}</Text>
        </View>
      <View  style={{ width: '90%', marginTop: 40 }}>
            {getRecomendaciones(route.params.id)}
      </View>
      <View style={{ width: '70%', marginTop: 30, marginBottom : 15 
      , borderRadius : 25}}>
      
      <Button  title="Volver  " onPress={() => navigation.navigate("Resultados")} 
      icon={
        <Icon
          name="arrow-circle-o-left"
          size={20}
          color="white"
        />
      } iconRight  
      />
         
      </View>
      
    </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333',
    fontWeight:'bold',
  },
  recomendacion: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
fonts: {
  marginBottom: 6,
  color: '#333333',
  fontSize:15,
  textAlign:'justify'
},
fontsT: {
  marginBottom: 6,
  fontWeight:'bold',
  color: '#333333',
  fontSize:18
  
},
user: {
  flex:1,
  marginBottom: 20,
  
},
});

export default Detalles;
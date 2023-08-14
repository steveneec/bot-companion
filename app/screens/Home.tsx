import {Pressable, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {useSelector} from 'react-redux';
import {selectUser} from '../store/features/user/userSlice';
import {fonts} from '../resources';
import Card from '../components/Card';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {funcType} from '../types';

export default function Home({navigation}: any) {
  const user = useSelector(selectUser);

  const functions: funcType[] = [
    {
      _id: '__',
      action: 'Reproduce musica',
      description: 'Reproduce musica con B-MO facilmente',
      command: 'Di "Reproduce" seguido de la cancion o artista',
      example: 'Reproduce Tranky Funky de Trueno',
      icon: 'musical-notes-outline',
      color: '#5C4B99',
      goTo: 'Function',
    },
    {
      _id: '__',
      action: 'Reproduce videos',
      description: 'Reproduce videos de YouTube',
      command: 'Di "Pon", "Video" seguido del nombre del video que quieres ver',
      example: 'Video graciosos de gatos',
      icon: 'play-circle-outline',
      color: '#EA1179',
      goTo: 'Function',
    },
    {
      _id: '__',
      action: 'Preguntale a Chat GPT',
      description: 'Usa Chat GPT para resolver cualquier problema',
      command: 'Di "Usa GPT" seguido de lo que quieras consultarle',
      example: 'Usa GPT y dame una lista de 10 peliculas de terror',
      icon: 'chatbox-ellipses-outline',
      color: '#22A699',
      goTo: 'Function',
    },
    {
      _id: '__',
      action: 'Busca en internet',
      description: '',
      command: '',
      example: '',
      icon: 'earth-outline',
      color: '#F79327',
      goTo: 'Function',
    },
    {
      _id: '__',
      action: 'Preguntas de un texto o PDF',
      description: '',
      command: '',
      example: '',
      icon: 'reader-outline',
      color: '#0B2447',
      goTo: 'Function',
    },
    {
      _id: '__',
      action: 'Consulta el clima',
      description: '',
      command: '',
      example: '',
      icon: 'rainy-outline',
      color: '#19A7CE',
      goTo: 'Function',
    },
    {
      _id: '__',
      action: 'Envia mensajes por whatsapp',
      description: '',
      command: '',
      example: '',
      icon: 'logo-whatsapp',
      color: '#03C988',
      goTo: 'Function',
    },
  ];

  const myFunctions = [
    {
      action: 'Recomendar musica',
      command: 'Usa musicaly',
      icon: 'headset-outline',
      color: '#AA77FF',
    },
  ];

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola 👋, {user.name}</Text>
        <Pressable style={styles.settings}>
          <IonIcon name="settings-outline" size={24} color="grey" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Card
          title="Funciones"
          description="Conoce las funciones que B-MO tiene para ti">
          <View>
            {functions.map((func, key) => (
              <ActionRow key={key} func={func} navigation={navigation} />
            ))}
          </View>
        </Card>
        <Card
          title="Funciones personalizadas"
          description="Conecta APIs y Modelos de Red Neuronal propios"></Card>
      </View>
    </ScrollView>
  );
}

function ActionRow(params: {key: number; navigation: any; func: funcType}) {
  return (
    <Pressable
      onPress={() =>
        params.navigation.push(params.func.goTo, {id: params.func._id})
      }
      key={params.key}
      style={({pressed}) =>
        pressed
          ? [styles.optionFunction, styles.optionFunctionPressed]
          : styles.optionFunction
      }>
      <View style={styles.optionFunctionContent}>
        <IonIcon name={params.func.icon} size={24} color={params.func.color} />
        <Text>{params.func.action}</Text>
      </View>
      <IonIcon name="chevron-forward" color="grey" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontFamily: fonts.semibold,
    color: 'black',
    fontSize: 18,
  },
  content: {
    marginTop: 20,
    gap: 10,
  },
  settings: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionFunction: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionFunctionContent: {
    flexDirection: 'row',
    gap: 5,
  },
  optionFunctionPressed: {
    backgroundColor: '#EDE4FF',
  },
});

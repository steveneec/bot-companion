import {Pressable, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {useSelector} from 'react-redux';
import {selectUser} from '../store/features/user/userSlice';
import {fonts, mainOptions} from '../resources';
import Card from '../components/Card';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {funcType} from '../types';

export default function Home({navigation}: any) {
  const user = useSelector(selectUser);

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
        <Text style={styles.greeting}>Hola 👋, {user && user.name}</Text>
        <Pressable
          style={styles.settings}
          onPress={() => navigation.push('Settings')}>
          <IonIcon name="settings-outline" size={24} color="grey" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Card
          title="Funciones"
          description="Conoce las funciones que B-MO tiene para ti">
          <View>
            {mainOptions.map((func, key) => (
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

export function ActionRow(params: {navigation: any; func: funcType}) {
  return (
    <Pressable
      onPress={() =>
        params.navigation.push(params.func.goTo, {fn: params.func})
      }
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

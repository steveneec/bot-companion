import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import {fonts} from '../resources';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native';
import Text from '../components/Text';
import Card from '../components/Card';
import {ActionRow} from './Home';
import {ReactElement, useContext} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {removeKey} from '../shared/LocalStorage';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {
  setContacts,
  setSettings,
  setToken,
  setUser,
} from '../store/features/user/userSlice';
import {setIsSign} from '../store/features/auth/authSlice';
import {AppContext} from '../context/AppContext';

export default function Settings({navigation}: any) {
  const dispatch = useDispatch();

  const {showToast} = useContext(AppContext);

  const settings = [
    {
      icon: 'mail-outline',
      color: '#ef5350',
      title: 'Email',
      description: 'Configuraciones de e-mail',
      to: 'EmailSettings',
    },
    {
      icon: 'reader-outline',
      color: '#0B2447',
      title: 'PDF - Texto',
      description: 'Configuraciones de PDF - Texto',
      to: 'ChatPDFSettings',
    },
  ];

  async function handleOnSignout() {
    try {
      //Eliminar token local
      await removeKey('authToken');
      //Elimiar del storage
      dispatch(setToken(null));
      dispatch(setSettings(null));
      dispatch(setContacts(null));
      dispatch(setUser(null));
      dispatch(setIsSign(false));

      showToast({
        type: 'success',
        text1: 'Genial',
        text2: 'Tu sesión se cerró correctamente 😎',
      });
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Ocurrió un error',
        text2: 'Ocurrió un error desconocido, por favor reinicia la app 😖',
      });
    }
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Configuraciones</Text>
          <Text>Accede y modifica tus Configuraciones</Text>
        </View>
        <Card>
          {settings.map((_stg, key) => (
            <SettingsRow
              key={key}
              to={_stg.to}
              settings={_stg}
              navigation={navigation}
            />
          ))}
        </Card>
        <Card title="Otras configuraciones">
          <SettingsRow
            settings={{
              icon: 'log-out-outline',
              color: '#ef5350',
              title: 'Cerrar sesión',
              description: 'Cierra tu sesión',
            }}
            navigation={navigation}
            onPress={handleOnSignout}
            to=""
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsRow(props: {
  to: string;
  settings: {
    icon: string;
    color: string;
    title: string;
    description: string;
  };
  navigation: any;
  onPress?: Function;
}) {
  if (props.onPress && props.onPress !== undefined) {
    return (
      <Pressable
        style={styles.settingsRow}
        //@ts-ignore
        onPress={() => props.onPress()}>
        <IonIcon
          name={props.settings.icon}
          size={24}
          color={props.settings.color}
        />
        <View style={{flex: 1}}>
          <Text style={styles.srTitle}>{props.settings.title}</Text>
          <Text style={styles.srDescription}>{props.settings.description}</Text>
        </View>
        <IonIcon name="chevron-forward" color="grey" />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.settingsRow}
      onPress={() => props.navigation.push(props.to)}>
      <IonIcon
        name={props.settings.icon}
        size={24}
        color={props.settings.color}
      />
      <View style={{flex: 1}}>
        <Text style={styles.srTitle}>{props.settings.title}</Text>
        <Text style={styles.srDescription}>{props.settings.description}</Text>
      </View>
      <IonIcon name="chevron-forward" color="grey" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
    gap: 20,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: 'black',
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  credential: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  credentialText: {
    fontFamily: fonts.semibold,
    color: 'black',
    padding: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
    borderRadius: 10,
  },
  openSettings: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
    justifyContent: 'center',
  },
  openSettingsText: {
    color: '#d81b60',
    fontFamily: fonts.semibold,
  },
  settinsContent: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
  },
  settingsRow: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  srDescription: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  srTitle: {
    color: 'black',
    fontFamily: fonts.semibold,
    fontSize: 16,
  },
});

import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import NavBar from '../components/NavBar';
import {fonts} from '../resources';
import Text from '../components/Text';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {useContext, useEffect, useState} from 'react';
import {
  getAllContacts,
  getSettings,
  updateSettings,
} from '../services/user.service';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectToken,
  setContacts,
  setSettings,
} from '../store/features/user/userSlice';
import {AppContext} from '../context/AppContext';

export default function EditCredentials({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  const {showToast} = useContext(AppContext);

  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (password !== '' && email !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, email]);

  async function handleOnContinue() {
    setIsBusy(true);

    try {
      await updateSettings({
        token: token,
        settings: {email: email, emailKey: password},
      });

      showToast({
        type: 'success',
        text1: 'Genial!',
        text2: 'Se ha guardado tu configuración correctamente 😎!',
      });

      const settings = await getSettings(token);

      dispatch(setSettings(settings));

      navigation.goBack();
    } catch (error: any) {
      if (error.response.status === 400) {
        //el contacto ya existe
        showToast({
          type: 'error',
          text1: 'Ocurrió un error',
          text2: 'Al parecer no pudimos actualizar tus credenciales 😥!',
        });
      } else {
        showToast({
          type: 'error',
          text1: 'Ocurrió un error',
          text2:
            'Ocurrió un error desconocido, por favor inténtalo nuevamente 😥!',
        });
      }
      setIsBusy(true);
    }
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Editar credenciales de acceso</Text>
          <Text>Configura tus credenciales para enviar correos</Text>
        </View>
        <TextInput
          label="Dirección de e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          label="Contraseña generada"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          title="Confirmar"
          onPress={handleOnContinue}
          isBusy={isBusy}
          disabled={disabled}
        />
        <Card title="¿Dónde consigo mis credenciales?">
          <View style={styles.cardBody}>
            <Text>
              Debes ingresar a{' '}
              <Text
                style={styles.openSettingsText}
                onPress={() =>
                  Linking.openURL('https://myaccount.google.com/apppasswords')
                }>
                https://myaccount.google.com/apppasswords
              </Text>
            </Text>
            <Text>
              Una vez allí encontrarás una ventana como la siguiente, donde
              deberás generar una nueva contraseña de aplicación
            </Text>
            <Image
              source={require('../resources/images/001.jpg')}
              resizeMode="contain"
              style={{width: 300, height: 400}}
            />
            <Text>
              Toca o da click en la opción "Seleccionar aplicación" y selecciona
              la opcion "Otra (nombre personalizado)"
            </Text>
            <Image
              source={require('../resources/images/002.jpg')}
              resizeMode="contain"
              style={{width: 300, height: 260}}
            />
            <View style={{gap: 10, marginTop: 10}}>
              <Text>
                Puedes darle cualquier nombre, pero te recomendamos que tenga el
                nombre de <Text style={styles.openSettingsText}>bmo</Text>, para
                recordar facilmente el motivo de la credencial
              </Text>
              <Text>
                Finalmente, verás tu contraseña generada para esta app, copiala,
                pegala y listo!
              </Text>
              <Image
                source={require('../resources/images/003.jpg')}
                resizeMode="contain"
                style={{width: 300, height: 500}}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
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
});

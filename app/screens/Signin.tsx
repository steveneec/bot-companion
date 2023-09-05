import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {fonts} from '../resources';
import TextInput from '../components/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Button from '../components/Button';
import {useContext, useState} from 'react';
import {signin} from '../services/auth.service';
import {storeString} from '../shared/LocalStorage';
import {setIsSign} from '../store/features/auth/authSlice';
import {useDispatch} from 'react-redux';
import {
  setContacts,
  setSettings,
  setUser,
} from '../store/features/user/userSlice';
import {getAllContacts, getSettings, getUser} from '../services/user.service';
import {AppContext} from '../context/AppContext';

export default function Signin({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const {showToast} = useContext(AppContext);

  const dispatch = useDispatch();

  async function handleOnContinue() {
    try {
      const result = await signin({email, password});
      await storeString('authToken', result.authToken);

      const responses = await Promise.all([
        getUser(result.authToken),
        getSettings(result.authToken),
        getAllContacts(result.authToken),
      ]);

      showToast({
        type: 'success',
        text1: 'Genial',
        text2: 'Bienvenido de nuevo 😎!',
      });

      dispatch(setUser(responses[0]));
      dispatch(setIsSign(true));
      dispatch(setSettings(responses[1]));
      dispatch(setContacts(responses[2]));
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Ocurrió un error',
        text2: 'Las credenciales que ingresaste no coinciden con una cuenta 😖',
      });
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.layout}>
        <Image
          source={require('../resources/images/logo/wo-bg-variant.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.greeting}>Bienvenido a B-MO Companion</Text>
        <Text>
          Gestiona las configuraciones y accede a nuevas funciones para BMO
          PetBot desde tu celular
        </Text>
        <View style={styles.form}>
          <TextInput
            label="Ingresa tu e-mail"
            placeholder="e-mail"
            inputMode="email"
            icon={
              <MaterialIcon name="alternate-email" size={18} color="grey" />
            }
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Ingresa tu contrasena"
            placeholder="password"
            secureTextEntry
            icon={<Octicons name="key-asterisk" size={18} color="grey" />}
            value={password}
            onChangeText={setPassword}
          />
          <Button
            style={{marginTop: 20}}
            title="Continuar"
            icon={<Octicons name="chevron-right" size={24} color="white" />}
            onPress={handleOnContinue}
            isBusy={isBusy}
          />
        </View>
        <View style={styles.noAccount}>
          <Text>
            Aun no tienes una cuenta?{' '}
            <Text
              style={styles.createAccount}
              onPress={() => navigation.replace('Signup')}>
              Crear una.
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 20,
  },
  greeting: {
    fontFamily: fonts.semibold,
    color: 'black',
    fontSize: 18,
  },
  form: {
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  createAccount: {
    fontFamily: fonts.semibold,
    color: 'red',
  },
  noAccount: {
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: 200,
    alignSelf: 'center',
  },
});

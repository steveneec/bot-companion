import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {fonts} from '../resources';
import TextInput from '../components/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Button from '../components/Button';
import {useState} from 'react';

export default function Signin({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.layout}>
      <Text style={styles.greeting}>Bienvenido a B-MO Companion</Text>
      <Text>
        Gestiona las configuraciones y accede a nuevas funciones para B-MO desde
        tu celular
      </Text>
      <View style={styles.form}>
        <TextInput
          label="Ingresa tu e-mail"
          placeholder="e-mail"
          inputMode="email"
          icon={<MaterialIcon name="alternate-email" size={18} color="grey" />}
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
          onPress={() => {}}
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
    </View>
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
});

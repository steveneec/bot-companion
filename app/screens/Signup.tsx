import {Pressable, ScrollView, StyleSheet, View, Image} from 'react-native';
import Text from '../components/Text';
import {fonts} from '../resources';
import TextInput from '../components/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Button from '../components/Button';
import {useEffect, useState} from 'react';
import {signup} from '../services/auth.service';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {setIsSign} from '../store/features/auth/authSlice';
import {storeString} from '../shared/LocalStorage';

export default function Signup({navigation}: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [isPickDate, setIsPickDate] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repPasswordError, setRepPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const dispatch = useDispatch();

  function checkPassword() {
    if (password !== repeatPassword) {
      return false;
    }
    return true;
  }

  async function handleOnContinue() {
    if (name.length < 3) {
      setNameError(true);
    }

    if (email === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      setEmailError(true);
    }

    if (password.length < 8) {
      setPasswordError(true);
    }

    if (repeatPassword.length < 8) {
      setRepPasswordError(true);
    }

    if (!checkPassword()) {
      setRepPasswordError(true);
      return;
    }
    //Send request

    try {
      const result = await signup({name, email, birthday, password});
      //Save token on localstorage
      await storeString('authToken', result.authToken);
      dispatch(setIsSign(true));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setRepPasswordError(false);
  }, [name, email, password, repeatPassword]);

  return (
    <ScrollView style={styles.layout}>
      <Image
        source={require('../resources/images/logo/wo-bg-variant.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.greeting}>Bienvenido a B-MO Companion</Text>
      <Text>Registrate para obtener acceso a todas las funciones!</Text>
      <View style={styles.form}>
        <TextInput
          label="Como quieres que te llame"
          placeholder="Nombre/Apodo"
          icon={<Octicons name="smiley" size={18} color="grey" />}
          value={name}
          onChangeText={setName}
          wrong={nameError}
        />
        <View>
          <Text style={styles.datePickLabel}>Tu cumpleanios</Text>
          <Pressable
            style={styles.datePick}
            onPress={() => setIsPickDate(true)}>
            <Octicons name="calendar" size={18} color="grey" />
            <Text>{birthday.toLocaleDateString()}</Text>
          </Pressable>
        </View>
        <DatePicker
          modal
          mode="date"
          open={isPickDate}
          date={birthday}
          onConfirm={date => {
            setBirthday(date);
            setIsPickDate(false);
          }}
          onCancel={() => {
            setIsPickDate(false);
          }}
        />
        <TextInput
          label="Ingresa tu e-mail"
          placeholder="e-mail"
          inputMode="email"
          icon={<MaterialIcon name="alternate-email" size={18} color="grey" />}
          value={email}
          onChangeText={setEmail}
          wrong={emailError}
        />
        <TextInput
          label="Ingresa tu contrasena"
          placeholder="password"
          secureTextEntry
          icon={<Octicons name="key-asterisk" size={18} color="grey" />}
          value={password}
          onChangeText={setPassword}
          wrong={passwordError}
        />
        <TextInput
          label="Repite tu contrasena"
          placeholder="repeat password"
          secureTextEntry
          icon={<Octicons name="key-asterisk" size={18} color="grey" />}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          wrong={repPasswordError}
        />
        <Button
          style={{marginTop: 20}}
          title="Continuar"
          icon={<Octicons name="chevron-right" size={24} color="white" />}
          onPress={() => handleOnContinue()}
        />
      </View>
      <View style={styles.noAccount}>
        <Text>
          Ya tienes una cuenta?{' '}
          <Text
            style={styles.createAccount}
            onPress={() => navigation.replace('Signin')}>
            Iniciar sesion.
          </Text>
        </Text>
      </View>
    </ScrollView>
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
  datePick: {
    borderRadius: 50,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 5,
  },
  datePickLabel: {
    marginBottom: 5,
    color: 'grey',
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  logo: {
    width: '50%',
    height: 200,
    alignSelf: 'center',
  },
});

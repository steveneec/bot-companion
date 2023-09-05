import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import NavBar from '../components/NavBar';
import {fonts} from '../resources';
import Text from '../components/Text';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {useContext, useEffect, useState} from 'react';
import {addNewContact, getAllContacts} from '../services/user.service';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken, setContacts} from '../store/features/user/userSlice';
import {AppContext} from '../context/AppContext';

export default function AddContact({navigation}: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  const {showToast} = useContext(AppContext);

  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name !== '' && email !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email]);

  async function handleOnContinue() {
    try {
      setIsBusy(true);

      await addNewContact({
        token: token as string,
        contact: {name, email},
      });

      showToast({
        type: 'success',
        text1: 'Genial!',
        text2: 'Se ha guardado tu contacto correctamente 😎!',
      });

      const contacts = await getAllContacts(token);

      dispatch(setContacts(contacts));

      navigation.goBack();
    } catch (error: any) {
      if (error.response.status === 400) {
        //el contacto ya existe
        showToast({
          type: 'error',
          text1: 'Ocurrió un error',
          text2: 'Al parecer este contacto ya existe 😥!',
        });
      } else {
        showToast({
          type: 'error',
          text1: 'Ocurrió un error',
          text2:
            'Ocurrió un error desconocido, por favor inténtalo nuevamente 😥!',
        });
      }
      setIsBusy(false);
    }
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Agregar un nuev contacto</Text>
          <Text>
            Agrega un nuevo contacto a tu lista, recuerda que no debes tener un
            contacto registrado con el mismo nombre o e-mail
          </Text>
        </View>
        <TextInput label="Nombre" value={name} onChangeText={setName} />
        <TextInput
          label="Dirección de e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Confirmar"
          onPress={handleOnContinue}
          disabled={disabled}
          isBusy={isBusy}
        />
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

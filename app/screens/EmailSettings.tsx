import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import NavBar from '../components/NavBar';
import {colors, fonts} from '../resources';
import Text from '../components/Text';
import Card from '../components/Card';
import {useSelector} from 'react-redux';
import {selectContacts, selectSettings} from '../store/features/user/userSlice';
import {contactType, settingsType} from '../types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function EmailSettings({navigation}: any) {
  const settings: settingsType = useSelector(selectSettings);
  const contacts: contactType[] = useSelector(selectContacts);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Configuraciones de e-mail</Text>
          <Text>Configura tu acceso a los servicios de Gmail</Text>
        </View>
        <Card
          title="Credenciales"
          description="Credenciales para el envio de correos">
          <View style={styles.cardBody}>
            {settings.email && settings.emailKey ? (
              <View>
                <View style={styles.credential}>
                  <IonIcon name="at" size={20} color="#d81b60" />
                  <Text style={styles.credentialText}>{settings.email}</Text>
                </View>
                <View style={styles.credential}>
                  <MaterialIcon name="password" size={20} color="#d81b60" />
                  <Text style={styles.credentialText}>
                    {settings.emailKey?.substring(0, 5)}******
                  </Text>
                </View>
              </View>
            ) : (
              <View></View>
            )}
            <Pressable
              style={styles.openSettings}
              onPress={() => navigation.push('EditSettings')}>
              <Text style={styles.openSettingsText}>Editar credenciales</Text>
              <FeatherIcon name="external-link" size={24} color="#d81b60" />
            </Pressable>
          </View>
        </Card>
        <Card title="Contactos" description="Tu lista de contactos">
          <Pressable
            style={styles.openSettings}
            onPress={() => navigation.push('AddContact')}>
            <Text style={styles.openSettingsText}>Agregar contacto</Text>
            <FeatherIcon name="external-link" size={24} color="#d81b60" />
          </Pressable>
          <View style={{marginTop: 20}}>
            {contacts.map((_cnt, key) => (
              <ContactRow contact={_cnt} key={key} />
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function ContactRow(params: {contact: contactType}) {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.contactRow, styles.contactRowPressed]
          : styles.contactRow
      }>
      <View
        style={{
          ...styles.emailInitial,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}>
        <Text style={styles.emailInitialText}>
          {params.contact.name.substring(0, 1)}
        </Text>
      </View>
      <View>
        <Text style={styles.contactName}>{params.contact.name}</Text>
        <Text>{params.contact.email}</Text>
      </View>
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
  //For email row
  contactRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactRowPressed: {
    backgroundColor: '#EDE4FF',
  },
  emailInitial: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 42,
  },
  emailInitialText: {
    fontSize: 24,
    fontFamily: fonts.medium,
    color: 'white',
    marginBottom: 4,
  },
  contactName: {
    fontFamily: fonts.semibold,
    color: 'black',
  },
});

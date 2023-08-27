import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useEffect, useState} from 'react';
import {funcType} from '../types';
import Text from '../components/Text';
import {fonts} from '../resources';
import Card from '../components/Card';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import NavBar from '../components/NavBar';
import {useSelector} from 'react-redux';
import {selectSettings} from '../store/features/user/userSlice';

export default function Function({navigation, route}: any) {
  const [extraConfigFound, setExtraConfigFound] = useState(false);

  const settings = useSelector(selectSettings);

  const {fn} = route.params;

  useEffect(() => {
    checkIfHasExtraConfig();
  }, []);

  function checkIfHasExtraConfig() {
    //For email settings
    if (fn?._id === 'sendEmail' && settings) {
      setExtraConfigFound(true);
    }
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.layout}>
        <View>
          <View style={styles.header}>
            <Text style={styles.actionTitle}>{fn?.action}</Text>
            <IonIcon //@ts-ignore
              name={fn?.icon}
              size={20}
              color={fn?.color}
            />
          </View>
          <Text>{fn?.description}</Text>
        </View>
        <Card
          title="Comandos"
          description="Puedes usar estas palabras claves para activar la función">
          <View style={styles.cardContent}>
            <View style={styles.commandsContainer}>
              {fn?.command.map((_cm: string, key: number) => (
                <Text
                  key={key}
                  style={{...styles.command, backgroundColor: fn.color}}>
                  {_cm}
                </Text>
              ))}
            </View>
          </View>
        </Card>
        <Card title="Ejemplos" description="Asi puedes usar este comando">
          <View style={styles.cardContent}>
            <View style={styles.examplesContainer}>
              {fn?.example.map((_ex: string, key: number) => (
                <Text key={key} style={styles.example}>
                  "{_ex}"
                </Text>
              ))}
            </View>
          </View>
        </Card>
        {fn?.extraConfig && (
          <Card
            title="Configuración adicional"
            description="Esta funcionalidad requiere de configuraciones adicionales para funcionar">
            <View style={styles.cardContent}>
              <View style={styles.settinsContent}>
                {extraConfigFound ? (
                  <Text style={styles.settingsMessage}>
                    Ya has configurado el servicio 😎, puedes cambiar las
                    configuraciones si asi lo quieres
                  </Text>
                ) : (
                  <Text style={styles.settingsMessage}>
                    {fn.noConfigFoundMessage}
                  </Text>
                )}
              </View>
              <Pressable
                style={styles.openSettings}
                onPress={() => navigation.push(fn.goToExtraConfig)}>
                <Text style={styles.openSettingsText}>
                  Ir a Configuraciones{' '}
                </Text>
                <FeatherIcon name="external-link" size={24} color="#d81b60" />
              </Pressable>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 20,
    paddingTop: 10,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: 'black',
  },
  actionDescription: {},
  subtitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: 'black',
  },
  commandsContainer: {
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  command: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: 'white',
    fontFamily: fonts.semibold,
    lineHeight: 18,
  },
  examplesContainer: {
    gap: 5,
  },
  example: {
    fontWeight: '500',
    color: '#0a0a0a',
    fontStyle: 'italic',
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
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
  settingsMessage: {
    color: 'black',
    fontFamily: fonts.semibold,
  },
});

import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import NavBar from '../components/NavBar';
import Text from '../components/Text';
import {fonts} from '../resources';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ChatPDFSettings({navigation}: any) {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Configurar PDF</Text>
          <Text>Sube un PDF o text y hazle preguntas a BMO 😎</Text>
        </View>
        {/*<Card
          title="Texto"
          description="Puedes pegar un texto para hacer preguntas de este">
          <View style={styles.cardBody}>
            <TextInput
              multiline
              style={styles.textArea}
              placeholder="Escribe o pega un texto..."
              placeholderTextColor="#616161"
            />
            <Button
              title="Guardar"
              style={{marginTop: 10}}
              onPress={() => {}}
            />
          </View>
  </Card>*/}
        <Card title="PDF" description="Selecciona y sube un PDF">
          <View style={styles.cardBody}>
            <Button
              title="Guardar"
              style={{marginTop: 10}}
              onPress={() => {}}
            />
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
  textArea: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    minHeight: 200,
    maxHeight: 300,
    padding: 5,
    textAlignVertical: 'top',
    color: 'black',
    fontFamily: fonts.regular,
  },
});

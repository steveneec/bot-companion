import {StyleSheet, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function NavBar(params: {navigation: any}) {
  return (
    <View style={styles.container}>
      <IonIcon
        name="chevron-back-outline"
        size={24}
        onPress={() => params.navigation.goBack()}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

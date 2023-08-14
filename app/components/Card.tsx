import {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {fonts} from '../resources';

export default function Card(props: props) {
  return (
    <View style={styles.card}>
      {(props.title || props.description) && (
        <View style={styles.header}>
          {props.title && <Text style={styles.headerTitle}>{props.title}</Text>}
          {props.description && (
            <Text style={styles.headerDescription}>{props.description}</Text>
          )}
        </View>
      )}
      {props.children}
    </View>
  );
}

interface props extends PropsWithChildren {
  title?: string;
  description?: string;
  footerActionTitle?: string;
  footerAction?: Function;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#DDE6ED',
  },
  header: {
    padding: 20,
    borderBottomColor: '#F0EEED',
    borderBottomWidth: 0.2,
  },
  headerTitle: {
    fontFamily: fonts.semibold,
    color: 'black',
  },
  headerDescription: {
    color: 'grey',
    fontFamily: fonts.regular,
  },
});

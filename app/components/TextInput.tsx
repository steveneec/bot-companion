import {ReactElement} from 'react';
import {
  TextInputProps,
  View,
  TextInput as RNTextInput,
  StyleSheet,
} from 'react-native';
import Text from './Text';
import {fonts} from '../resources';

export default function TextInput(props: props) {
  return (
    <View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View
        style={[
          {
            ...styles.container,
            borderColor: props.wrong ? '#FCAEAE' : 'transparent',
          },
        ]}>
        {props.icon && <View style={styles.icon}>{props.icon}</View>}
        <RNTextInput
          style={styles.input}
          placeholderTextColor="grey"
          {...props}
        />
      </View>
    </View>
  );
}

interface props extends TextInputProps {
  label?: string;
  placeholder?: string;
  icon?: ReactElement;
  wrong?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 20,
    paddingLeft: 10,
    borderRadius: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    color: 'black',
    backgroundColor: 'transparent',
    flex: 1,
    padding: 0,
  },
  icon: {},
  label: {
    marginBottom: 5,
    fontFamily: fonts.regular,
    color: 'gray',
    fontSize: 12,
  },
});

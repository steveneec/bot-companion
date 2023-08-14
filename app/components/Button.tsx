import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Text from './Text';
import {ReactElement} from 'react';
import {fonts} from '../resources';

export default function Button(props: props) {
  return (
    <Pressable
      disabled={props.isBusy}
      onPress={() => props.onPress()}
      style={({pressed}) =>
        !pressed
          ? props.isBusy
            ? [{...styles.button, ...props.style, ...styles.buttonDisabled}]
            : [{...styles.button, ...props.style}]
          : [{...styles.button, ...props.style, ...styles.buttonPressed}]
      }>
      <Text style={styles.title}>{props.title}</Text>
      {props.icon && props.icon}
    </Pressable>
  );
}

interface props {
  title: string;
  icon?: ReactElement;
  style?: ViewStyle;
  onPress: Function;
  isBusy?: boolean;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#6528F7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonPressed: {
    backgroundColor: '#A076F9',
  },
  buttonDisabled: {
    backgroundColor: '#DDE6ED',
  },
  title: {
    color: 'white',
    fontFamily: fonts.semibold,
    lineHeight: 16,
  },
});

import {Text as RNText, TextProps} from 'react-native';

export default function Text(props: props) {
  return (
    <RNText
      style={{
        fontFamily: 'PlusJakartaSans-Regular',
        color: 'black',
      }}
      {...props}
    />
  );
}

interface props extends TextProps {}

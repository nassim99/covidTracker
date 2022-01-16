import React from 'react';
import {
  Text as OriginalText,
  StyleSheet,
  TextStyle,
  TextProps,
  ColorValue,
  StyleProp,
} from 'react-native';

export interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: ColorValue;
}

const Text: React.FC<AppTextProps> = ({ style, size = 14, color = '#000000', ...props }) => {
  const combineTextStyle = StyleSheet.flatten([{ color, fontSize: size }, style]);

  return <OriginalText allowFontScaling={false} {...props} style={combineTextStyle} />;
};

export default Text;

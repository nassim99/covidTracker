import React from 'react';
import { StyleSheet, View as OriginalView, ViewProps } from 'react-native';

interface AppViewProps extends ViewProps {
  isRow?: boolean;
}

const View: React.FC<AppViewProps> = ({ style, isRow = false, ...props }) => {
  const combineViewStyle: ViewProps['style'] = StyleSheet.flatten([
    isRow && { justifyContent: 'space-between', flexDirection: 'row' },
    style,
  ]);

  return <OriginalView {...props} style={combineViewStyle} />;
};

export default View;

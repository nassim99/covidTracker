import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import View from 'components/basic/view';
import { DataCountries } from 'components/ui/country-card';
import ListCountries from 'components/ui/list-countries';

type RootStackParams = {
  CountryList: {
    data: Array<DataCountries>;
  };
};
interface CountryListProps {
  route: RouteProp<RootStackParams, 'CountryList'>;
}

const CountryList: React.FC<CountryListProps> = ({ route }) => {
  const { data } = route.params;
  const { left: insetLeft, right: insetRight } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: insetRight + insetLeft + 10,
      }}>
      <ListCountries data={data} />
    </View>
  );
};

export default CountryList;

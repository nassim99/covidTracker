import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Lang } from 'local/en';
import Text from 'components/basic/text';
import View from 'components/basic/view';
import ListCountries from 'components/ui/list-countries';
import { DataCountries } from 'components/ui/country-card';

interface Top5Props {
  top5: Array<DataCountries>;
  allCountries: Array<DataCountries>;
}

type RootStackParams = {
  CountryList: {
    data: Array<DataCountries>;
  };
};

type NavigationProps = StackNavigationProp<RootStackParams, 'CountryList'>;

const Top5: React.FC<Top5Props> = ({ top5, allCountries }) => {
  const { left: insetLeft, right: insetRight } = useSafeAreaInsets();

  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={[styles.card, { marginHorizontal: insetRight + insetLeft + 10 }]}>
      <Text size={24}>{Lang.top5Countries}</Text>
      <ListCountries data={top5} />
      <TouchableOpacity
        onPress={() => navigation.navigate('CountryList', { data: allCountries })}
        style={styles.showMore}>
        <Text size={18}>Show More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  showMore: {
    alignItems: 'center',
    paddingVertical: 15,
  },
});
export default Top5;

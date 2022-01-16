import React from 'react';
import { useQuery } from 'react-query';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import summary from 'api/summary';

import Text from 'components/basic/text';
import View from 'components/basic/view';
import { DataCountries } from 'components/ui/country-card';

import Stats, { DataGlobal } from './stats';
import Top5 from './top5';

export interface resultDataProps {
  Global: DataGlobal;
  Countries: Array<DataCountries>;
}

type RootStackParams = {
  CountryList: {
    data: Array<DataCountries>;
  };
};
interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParams, 'CountryList'>;
}
const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { left: insetLeft, right: insetRight } = useSafeAreaInsets();
  const { error, data, isFetching, refetch, isLoading } = useQuery(
    summary.get.queryKey,
    summary.get.queryFn,
    {
      select: (d: resultDataProps) => {
        //        let countries = [...d.Countries];
        //      const top5 = countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 5);

        return d;
      },
    },
  );

  const getTop5 = () => {
    let top5 = [] as any;
    if (data !== undefined) {
      let countries = [...data?.Countries];
      top5 = countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 5);
    }
    return top5;
  };

  if (error || data === undefined) {
    return (
      <View style={styles.noData}>
        <Text>oops, somthing happens</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.noData}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <Top5 top5={getTop5()} allCountries={data.Countries} />
      <Stats data={data.Global} />
    </ScrollView>
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
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;

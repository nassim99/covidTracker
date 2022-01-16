import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from 'components/basic/text';
import View from 'components/basic/view';

import { Lang } from 'local/en';
import { screenHeight } from 'utils/global';

export type DataGlobal = {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
};
interface StatsProps {
  data: DataGlobal;
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  const { left: insetLeft, right: insetRight } = useSafeAreaInsets();
  const globalStats = [
    {
      title: Lang.totalAffected,
      value: data.TotalConfirmed,
      color: 'orange',
      percentageHeight: '100%',
    },
    {
      title: Lang.totalRecovered,
      value: data.TotalRecovered,
      color: 'green',
      percentageHeight: (data.TotalRecovered / data.TotalConfirmed) * 100 + '%',
    },
    {
      title: Lang.totalDeceased,
      value: data.TotalDeaths,
      color: 'red',
      percentageHeight: (data.TotalDeaths / data.TotalConfirmed) * 100 + '%',
    },
  ];
  return (
    <View style={[styles.card, { marginHorizontal: insetRight + insetLeft + 10 }]}>
      <View isRow style={styles.globalStatsContainer}>
        {globalStats.map((item, i) => (
          <View key={i} style={styles.barWrapper}>
            <Text style={styles.barValue}>{item.value}</Text>
            <View
              style={[
                styles.bar,
                {
                  height: item.percentageHeight,
                  backgroundColor: item.color,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View isRow style={styles.globalStatTextContainer}>
        <Text>{Lang.totalAffected}</Text>
        <Text>{Lang.totalRecovered}</Text>
        <Text>{Lang.totalDeceased}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  globalStatsContainer: {
    height: screenHeight / 3,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  barWrapper: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barValue: {
    textAlign: 'center',
  },
  bar: {
    width: '50%',
    bottom: 0,
  },
  globalStatTextContainer: {
    width: '100%',
    justifyContent: 'space-around',
  },
});
export default Stats;

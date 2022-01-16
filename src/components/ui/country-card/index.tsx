import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from 'components/basic/text';

export type DataCountries = {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
};

interface CountryCardProps {
  data: DataCountries;
  onPress?: () => void;
  showOnlyCountries?: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ showOnlyCountries = false, data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} key={data.ID} style={countryCardStyle.container}>
      <Text style={[countryCardStyle.column, showOnlyCountries && { width: '100%' }]} size={18}>
        {data.Country}
      </Text>
      {!showOnlyCountries && (
        <>
          <Text style={countryCardStyle.column} size={18}>
            {data.TotalConfirmed}
          </Text>

          <Text style={countryCardStyle.column} size={18} color={'green'}>
            {data.TotalRecovered}
          </Text>

          <Text style={countryCardStyle.column} size={18} color={'orange'}>
            {data.NewConfirmed}
          </Text>

          <Text style={countryCardStyle.column} size={18} color={'red'}>
            {data.TotalDeaths}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export const countryCardStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  column: {
    width: 100 / 5 + '%',
    textAlign: 'center',
  },
});

export default CountryCard;

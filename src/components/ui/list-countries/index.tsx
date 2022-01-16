import React from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, TextInput } from 'react-native';

import Text from 'components/basic/text';
import View from 'components/basic/view';
import CountryCard, { countryCardStyle, DataCountries } from 'components/ui/country-card';

import { Lang } from 'local/en';
import Filters from '../filter-modal';

interface ListCountriesProps {
  data: Array<DataCountries>;
  onPress?: (i: number) => void;
  showOnlyCountries?: boolean;
}

const ListCountries: React.FC<ListCountriesProps> = ({
  data,
  showOnlyCountries = false,
  onPress = () => 0,
}) => {
  const [search, setSearch] = React.useState('');
  const [showFilter, setShowFilter] = React.useState(false);
  const [filter, setFilter] = React.useState<{
    id: number;
    name: string;
    sort: 'asc' | 'desc';
    key: 'TotalConfirmed' | 'TotalRecovered' | 'TotalDeaths';
  } | null>(null);

  const filteredData = React.useMemo(() => {
    let datafilter = data.filter(d => d.Country.toLowerCase().includes(search.toLowerCase()));

    if (filter !== null) {
      const sortedList = datafilter.sort((a, b) =>
        filter?.sort === 'asc' ? a[filter.key] - b[filter.key] : b[filter.key] - a[filter.key],
      );
      datafilter = sortedList;
    }
    return datafilter;
  }, [search, filter]);

  const handleSetFilter = (d: typeof filter) => {
    setFilter(d);
    setShowFilter(false);
  };

  const renderCountry = ({ item, index }: { item: DataCountries; index: number }) => (
    <CountryCard showOnlyCountries={showOnlyCountries} onPress={() => onPress(index)} data={item} />
  );

  const headerComponent = React.useMemo(() => {
    return (
      <>
        {!showOnlyCountries && (
          <View
            style={{
              alignItems: 'center',
            }}
            isRow>
            <TextInput
              placeholder={Lang.searchCountry}
              onChangeText={setSearch}
              style={styles.inputSearch}
              autoFocus
            />
            <Text size={16} style={styles.filterText} onPress={() => setShowFilter(true)}>
              Filter
            </Text>
          </View>
        )}
        <View isRow style={countryCardStyle.container}>
          <Text size={16} style={countryCardStyle.column}>
            {Lang.country}
          </Text>
          <Text size={16} style={countryCardStyle.column}>
            {Lang.totalAffected}
          </Text>
          <Text size={16} style={countryCardStyle.column}>
            {Lang.totalRecovered}
          </Text>
          <Text size={16} style={countryCardStyle.column}>
            {Lang.newAffected}
          </Text>
          <Text size={16} style={countryCardStyle.column}>
            {Lang.totalDeceased}
          </Text>
        </View>
      </>
    );
  }, []);
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        maxWidth: '100%',
      }}>
      <FlatList
        data={filteredData}
        ListHeaderComponent={headerComponent}
        renderItem={renderCountry}
        keyExtractor={item => item.CountryCode}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={25} // Reduce initial render amount
        maxToRenderPerBatch={25} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        showsHorizontalScrollIndicator={false}
        style={styles.flatListStyle}
      />
      <Modal transparent visible={showFilter}>
        <Filters setFilter={handleSetFilter} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputSearch: {
    backgroundColor: '#ebebeb',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  flatListStyle: {
    flexGrow: 0,
  },
  filterText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default ListCountries;

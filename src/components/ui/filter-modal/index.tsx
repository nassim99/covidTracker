import Text from 'components/basic/text';
import View from 'components/basic/view';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const filter = [
  { id: 1, name: 'TotalConfirmed - ASC', sort: 'asc', key: 'TotalConfirmed' },
  { id: 2, name: 'TotalConfirmed - DESC', sort: 'desc', key: 'TotalConfirmed' },
  { id: 3, name: 'TotalRecovered - ASC', sort: 'asc', key: 'TotalRecovered' },
  { id: 4, name: 'TotalRecovered - DESC', sort: 'desc', key: 'TotalRecovered' },
  { id: 5, name: 'TotalDeaths - ASC', sort: 'asc', key: 'TotalDeaths' },
  { id: 6, name: 'TotalDeaths - DESC', sort: 'desc', key: 'TotalDeaths' },
];
const Filters = ({ setFilter }: any) => {
  const onPress = (item: any) => {
    setFilter(item);
  };

  const _card = ({ item, index }: any) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.containerCard}>
      <Text size={15}>{item.name}</Text>
    </TouchableOpacity>
  );
  const header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Filter</Text>
      </View>
    );
  };
  const _keyExtractor = (item: any) => item.id;
  const _footer = () => <View style={{ height: 80 }} />;
  return (
    <View style={styles.constainer}>
      <FlatList
        ListHeaderComponent={header}
        data={filter}
        renderItem={_card}
        keyExtractor={_keyExtractor}
        ListFooterComponent={_footer}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    padding: 12,
  },
  constainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000050',
  },
  header: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatList: {
    flexGrow: 0,
    backgroundColor: '#ffffff',
  },
});

export default Filters;

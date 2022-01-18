import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import { Lang } from 'local/en';
import summary from 'api/summary';
import { queryClient } from 'navigation';
import { resultDataProps } from 'screens/home';

import Text from 'components/basic/text';
import View from 'components/basic/view';
import ListCountries from 'components/ui/list-countries';
import { DataCountries } from 'components/ui/country-card';

type RootParamList = {
  goback: undefined;
};
interface AddCaseProps {
  navigation: StackNavigationProp<RootParamList>;
}
const AddCase: React.FC<AddCaseProps> = ({ navigation }) => {
  const { right, left } = useSafeAreaInsets();

  const data: resultDataProps | undefined = queryClient.getQueryData(summary.get.queryKey);
  const [selectedCountry, setSelectedCountry] = React.useState<number | undefined>();
  const [showSelectCountry, setShowSelectCountry] = React.useState(false);
  const [selectedCase, setSelectedCase] = React.useState<keyof DataCountries>('TotalDeaths');

  const handleSelectCountry = (i: number) => {
    setSelectedCountry(i);
    setShowSelectCountry(false);
  };

  const handleAddCase = () => {
    if (selectedCountry === undefined) {
      Alert.alert('please select country');
    } else {
      queryClient.setQueryData(summary.get.queryKey, oldData => update(oldData as resultDataProps));
      navigation.goBack();
    }
  };
  const update = (oldData: resultDataProps) => {
    const extractedOldData = { ...oldData };
    if (selectedCountry !== undefined) {
      //@ts-ignore
      extractedOldData.Countries[selectedCountry][selectedCase] =
        extractedOldData.Countries[selectedCountry][selectedCase as never] + 1;
      console.log(extractedOldData.Countries[selectedCountry][selectedCase as never]);
    }
    return extractedOldData;
  };
  return (
    <View
      style={{
        paddingLeft: left + 10,
        paddingRight: right + 10,
      }}>
      <View style={styles.sectionContainer}>
        <Text style={{ fontWeight: 'bold' }} size={20} onPress={() => setShowSelectCountry(true)}>
          Pick a Country
        </Text>
        {selectedCountry !== undefined && (
          <>
            <Text size={17}>{data?.Countries[selectedCountry].Country}</Text>
          </>
        )}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={{ fontWeight: 'bold' }} size={20} onPress={() => setShowSelectCountry(true)}>
          Pick case type
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
          }}
          isRow>
          <TouchableOpacity
            style={styles.caseButton}
            onPress={() => setSelectedCase('TotalConfirmed')}>
            <View
              style={{
                ...styles.caseRadio,
                backgroundColor: selectedCase === 'TotalConfirmed' ? '#575757' : 'transparent',
              }}
            />
            <Text>{Lang.totalAffected}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.caseButton}
            onPress={() => setSelectedCase('TotalDeaths')}>
            <View
              style={{
                ...styles.caseRadio,
                backgroundColor: selectedCase === 'TotalDeaths' ? '#575757' : 'transparent',
              }}
            />
            <Text>{Lang.totalDeceased}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.caseButton}
            onPress={() => setSelectedCase('TotalRecovered')}>
            <View
              style={{
                ...styles.caseRadio,
                backgroundColor: selectedCase === 'TotalRecovered' ? '#575757' : 'transparent',
              }}
            />
            <Text>{Lang.totalRecovered}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addCaseButton} onPress={handleAddCase}>
        <Text size={18} style={{ fontWeight: 'bold' }}>
          {Lang.addCase}
        </Text>
      </TouchableOpacity>

      {data !== undefined && (
        <Modal visible={showSelectCountry}>
          <ListCountries showOnlyCountries onPress={handleSelectCountry} data={data.Countries} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 15,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 15,
    padding: 10,
  },
  caseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caseRadio: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 1,
    margin: 10,
  },
  addCaseButton: {
    width: '50%',
    backgroundColor: 'orange',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
});
export default AddCase;

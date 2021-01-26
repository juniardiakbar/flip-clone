import React from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from 'native-base';
import {Button} from '../';

const HeaderSearch = (props) => {
  const {
    search,
    setSearch,
    sortOption,
    selectedSortOption,
    toggleModal,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={{flex: 2}}>
          <TouchableOpacity style={styles.item}>
            <Icon name="search" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={search}
              placeholder={'Cari nama, bank, atau nominal'}
              onChangeText={(value) => setSearch(value)}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.buttonContainer}>
            <Button
              text={sortOption[selectedSortOption]}
              type="primary-transparent"
              onPress={toggleModal}
              size="md"
              icon={true}
              iconName="chevron-down"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    margin: 10,
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: 'white',
  },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#A3A3A3',
  },
  input: {
    fontSize: 14,
  },
});

export default HeaderSearch;

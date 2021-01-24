import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Grid, Col, Item, Icon, Input} from 'native-base';
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
      <Grid>
        <Col style={{flex: 2}}>
          <Item style={styles.item}>
            <Icon name="search" style={styles.icon} />
            <Input
              style={styles.input}
              value={search}
              placeholder={'Cari nama, bank, atau nominal'}
              onChangeText={(value) => setSearch(value)}
            />
          </Item>
        </Col>
        <Col style={{flex: 1}}>
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
        </Col>
      </Grid>
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  item: {
    borderBottomColor: 'white',
  },
  icon: {
    marginHorizontal: -8,
    color: '#A3A3A3',
  },
  input: {
    fontSize: 14,
  },
});

export default HeaderSearch;

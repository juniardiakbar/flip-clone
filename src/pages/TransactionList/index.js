import React, {useState, useEffect} from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';
import {StyleSheet, View} from 'react-native';

import {Button, HeaderSearch, ModalFilter, Transaction} from '../../components';
import {sortAndSearchList} from '../../utils/list';
import {PRIMARY, SECONDARY, SUCCESS} from '../../utils/colors';

const TransactionList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionListOriginal, setTransactionListOriginal] = useState({});
  const [transactionList, setTransactionList] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sortOption = [
    'URUTKAN',
    'Nama A-Z',
    'Nama Z-A',
    'Tanggal Terbaru',
    'Tanggal Terlama',
  ];

  useEffect(() => {
    setTransactionList(
      sortAndSearchList(transactionListOriginal, search, selectedSortOption),
    );
  }, [selectedSortOption, search]);

  const initListTransaction = async () => {
    try {
      const fetchedList = await fetch(
        'https://nextar.flip.id/frontend-test',
      ).then((response) => {
        return response.json();
      });

      setTransactionListOriginal({...fetchedList});
      setTransactionList(
        sortAndSearchList(fetchedList, search, selectedSortOption),
      );
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    initListTransaction();
  }, []);

  const onPressTransaction = (index) => {
    navigation.navigate('Detail Transaction', {
      transaction: transactionList[index],
    });
  };

  const onPressFilter = (index) => {
    setSelectedSortOption(index);
    toggleModalSort();
  };

  const toggleModalSort = () => {
    setModalVisible(!modalVisible);
  };

  const renderTransactionStatus = (transaction) => {
    return transaction.status === 'SUCCESS' ? (
      <Button text="Berhasil" size="md" type="success" />
    ) : transaction.status === 'PENDING' ? (
      <Button text="Pengecekan" size="md" type="primary-outline" />
    ) : null;
  };

  const Loading = (
    <View style={{...styles.loading}}>
      <Text>Memuat Data Transaksi...</Text>
    </View>
  );

  return (
    <Container style={{backgroundColor: SECONDARY}}>
      <HeaderSearch
        search={search}
        setSearch={setSearch}
        sortOption={sortOption}
        selectedSortOption={selectedSortOption}
        toggleModal={toggleModalSort}
      />
      <Content>
        {isLoading ? (
          Loading
        ) : (
          <List>
            {transactionList.map((transaction, index) => {
              const color =
                transaction['status'] === 'SUCCESS'
                  ? SUCCESS
                  : transaction['status'] === 'PENDING'
                  ? PRIMARY
                  : '000A00';

              return (
                <ListItem
                  noIndent={true}
                  key={index}
                  onPress={() => onPressTransaction(index)}
                  style={{...styles.listItem, borderColor: color}}>
                  <View style={{flexDirection: 'row'}}>
                    <Transaction transaction={transaction} />
                    <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
                      {renderTransactionStatus(transaction)}
                    </View>
                  </View>
                </ListItem>
              );
            })}
          </List>
        )}
      </Content>

      <ModalFilter
        sortOption={sortOption}
        selectedSortOption={selectedSortOption}
        onPressFilter={onPressFilter}
        visible={modalVisible}
        toggleModal={toggleModalSort}
      />
    </Container>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    marginBottom: 8,
    borderWidth: 0,
    marginHorizontal: 10,
    borderLeftWidth: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomColor: 'white',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {useState, useEffect} from 'react';
import {ListItem} from 'native-base';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

import {Button, HeaderSearch, ModalFilter, Transaction} from '../../components';
import {sortAndSearchList} from '../../utils/list';

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
      const fetchedList = await fetch('https://nextar.flip.id/frontend-test')
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log('Error fetch list of transaction : ', err.message);
          // Error handling
        });

      setTransactionListOriginal({...fetchedList});
      setTransactionList(
        sortAndSearchList(fetchedList, search, selectedSortOption),
      );
      setIsLoading(false);
    } catch (err) {
      console.log('Error fetch list of transaction : ', err.message);
      // Error handling
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

  const loading = (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text bold>{'Memuat Data Transaksi ...'}</Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F5F9F8'}}>
      <HeaderSearch
        search={search}
        setSearch={setSearch}
        sortOption={sortOption}
        selectedSortOption={selectedSortOption}
        toggleModal={toggleModalSort}
      />
      {isLoading ? (
        loading
      ) : (
        <ScrollView>
          <View>
            {transactionList.map((transaction, index) => {
              const color =
                transaction['status'] === 'SUCCESS'
                  ? '#54B685'
                  : transaction['status'] === 'PENDING'
                  ? '#EB7F5C'
                  : '000A00';

              return (
                <ListItem
                  noIndent={true}
                  key={index}
                  onPress={() => onPressTransaction(index)}
                  style={{...styles.listItem, borderColor: color}}>
                  <Transaction transaction={transaction} />
                  <View>{renderTransactionStatus(transaction)}</View>
                </ListItem>
              );
            })}
          </View>
        </ScrollView>
      )}

      <ModalFilter
        sortOption={sortOption}
        selectedSortOption={selectedSortOption}
        onPressFilter={onPressFilter}
        visible={modalVisible}
        toggleModal={toggleModalSort}
      />
    </View>
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
    padding: 10,
    flexDirection: 'row',
  },
});

import React, {useState, useEffect} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Item,
  Input,
  Icon,
  Left,
  Radio,
  Right,
  Body,
  Grid,
  Col,
} from 'native-base';
import {
  StyleSheet,
  Modal,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import {Button, HeaderSearch, ModalFilter, Transaction} from '../../components';
import {formatCurrency} from '../../utils/currency';
import {formatDate} from '../../utils/date';
import {sortAndSearchList} from '../../utils/list';

const TransactionList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionListOriginal, setTransactionListOriginal] = useState({});
  const [transactionList, setTransactionList] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(0);

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
      <Button text="Berhasil" size="sm" type="success" />
    ) : transaction.status === 'PENDING' ? (
      <Button text="Pengecekan" size="sm" type="primary-outline" />
    ) : null;
  };

  return (
    <Container style={{backgroundColor: '#F5F9F8'}}>
      <HeaderSearch
        search={search}
        setSearch={setSearch}
        sortOption={sortOption}
        selectedSortOption={selectedSortOption}
        toggleModal={toggleModalSort}
      />
      <Content>
        <List>
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
                <Right>{renderTransactionStatus(transaction)}</Right>
              </ListItem>
            );
          })}
        </List>
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
});

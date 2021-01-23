import React, {useState, useEffect} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Header,
  Item,
  Input,
  Button,
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

  useEffect(() => {
    const list = {
      FT55826: {
        id: 'FT55826',
        amount: 3388537,
        unique_code: 275,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '5196418769',
        beneficiary_name: 'Sammy-Jo Mccall',
        beneficiary_bank: 'bsm',
        remark: 'sample remark',
        created_at: '2021-01-22 23:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT31073: {
        id: 'FT31073',
        amount: 1133024,
        unique_code: 340,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '3726377024',
        beneficiary_name: 'Hal Matthams',
        beneficiary_bank: 'bri',
        remark: 'sample remark',
        created_at: '2021-01-22 23:37:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT56934: {
        id: 'FT56934',
        amount: 2105809,
        unique_code: 367,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '2308468811',
        beneficiary_name: 'Shanice Harwood',
        beneficiary_bank: 'bri',
        remark: 'sample remark',
        created_at: '2021-01-22 23:36:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT49903: {
        id: 'FT49903',
        amount: 3616798,
        unique_code: 376,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '5359886241',
        beneficiary_name: 'Sammy-Jo Mccall',
        beneficiary_bank: 'bsm',
        remark: 'sample remark',
        created_at: '2021-01-21 20:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT66550: {
        id: 'FT66550',
        amount: 867804,
        unique_code: 436,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '4675187510',
        beneficiary_name: 'Jethro Cox',
        beneficiary_bank: 'muamalat',
        remark: 'sample remark',
        created_at: '2021-01-20 19:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT74439: {
        id: 'FT74439',
        amount: 2220459,
        unique_code: 481,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '7721519853',
        beneficiary_name: 'Sufyan Kramer',
        beneficiary_bank: 'muamalat',
        remark: 'sample remark',
        created_at: '2021-01-19 18:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT14909: {
        id: 'FT14909',
        amount: 4905389,
        unique_code: 372,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '5241102200',
        beneficiary_name: 'Jake Castillo',
        beneficiary_bank: 'bca',
        remark: 'sample remark',
        created_at: '2021-01-18 17:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT19416: {
        id: 'FT19416',
        amount: 3699562,
        unique_code: 784,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '1788909118',
        beneficiary_name: 'Sufyan Kramer',
        beneficiary_bank: 'btpn',
        remark: 'sample remark',
        created_at: '2021-01-17 16:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT7116: {
        id: 'FT7116',
        amount: 4181061,
        unique_code: 153,
        status: 'SUCCESS',
        sender_bank: 'bni',
        account_number: '8161094470',
        beneficiary_name: 'Selin Dawe',
        beneficiary_bank: 'bca',
        remark: 'sample remark',
        created_at: '2021-01-16 15:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
      FT30999: {
        id: 'FT30999',
        amount: 4750056,
        unique_code: 364,
        status: 'PENDING',
        sender_bank: 'bni',
        account_number: '8172316691',
        beneficiary_name: 'Beck Glover',
        beneficiary_bank: 'bsm',
        remark: 'sample remark',
        created_at: '2021-01-15 14:38:39',
        completed_at: '2021-01-22 23:38:39',
        fee: 0,
      },
    };
    setTransactionListOriginal({...list});
    setTransactionList(sortAndSearchList(list, search, selectedSortOption));
  }, []);

  const onPressTransaction = (key) => {
    navigation.navigate('Detail Transaction', {
      transaction: transactionList[key],
    });
  };

  const onPressRadio = (index) => {
    setSelectedSortOption(index);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderSuccessButton = () => {
    return (
      <TouchableHighlight>
        <View
          style={{
            backgroundColor: '#54B685',
            padding: 6,
            borderRadius: 6,
          }}>
          <Text style={{color: 'white', fontSize: 10}}>Berhasil</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderPendingButton = () => {
    return (
      <TouchableHighlight>
        <View
          style={{
            borderColor: '#EB7F5C',
            borderWidth: 1,
            padding: 6,
            borderRadius: 6,
          }}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>Pengecekan</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <Container style={{backgroundColor: '#F5F9F8'}}>
      <Header
        searchBar
        rounded
        style={{
          backgroundColor: 'white',
          margin: 10,
          borderRadius: 6,
        }}>
        <Grid>
          <Col style={{flex: 2}}>
            <Item>
              <Input
                style={{fontSize: 14}}
                value={search}
                placeholder={'Cari nama, bank, atau nominal'}
                onChangeText={(value) => setSearch(value)}
              />
            </Item>
          </Col>
          <Col style={{flex: 1}}>
            <TouchableHighlight
              onPress={() => toggleModal()}
              underlayColor={'white'}
              style={{flex: 1, justifyContent: 'center', marginLeft: 'auto'}}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: '#EB7F5C'}}>
                {sortOption[selectedSortOption]}
              </Text>
            </TouchableHighlight>
          </Col>
        </Grid>
      </Header>
      <Content>
        <List>
          {transactionList.map((transaction, index) => {
            const borderColor =
              transaction['status'] === 'SUCCESS'
                ? '#54B685'
                : transaction['status'] === 'PENDING'
                ? '#EB7F5C'
                : '000A00';

            return (
              <ListItem
                noIndent={true}
                key={index}
                onPress={() => onPressTransaction(key)}
                style={{
                  backgroundColor: 'white',
                  marginBottom: 8,
                  borderWidth: 0,
                  marginHorizontal: 10,
                  borderLeftWidth: 8,
                  borderBottomLeftRadius: 8,
                  borderTopLeftRadius: 8,
                  borderColor: borderColor,
                  borderBottomColor: 'white',
                }}>
                <Content>
                  <Text style={{fontWeight: 'bold'}}>{`${transaction[
                    'sender_bank'
                  ].toUpperCase()} → ${transaction[
                    'beneficiary_bank'
                  ].toUpperCase()}`}</Text>
                  <Text>{transaction['beneficiary_name'].toUpperCase()}</Text>
                  <Text>
                    {`${formatCurrency(transaction['amount'])} • ${formatDate(
                      transaction['created_at'],
                    )}`}
                  </Text>
                </Content>
                <Right>
                  {transaction['status'] === 'SUCCESS'
                    ? renderSuccessButton()
                    : transaction['status'] === 'PENDING'
                    ? renderPendingButton()
                    : null}
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal()}>
        <TouchableWithoutFeedback onPress={() => toggleModal()}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Container
              style={{
                width: 320,
                maxHeight: 320,
                paddingVertical: 24,
                borderRadius: 10,
              }}>
              <Content>
                {sortOption.map((option, index) => {
                  return (
                    <ListItem
                      key={index}
                      selected={index === selectedSortOption}
                      style={{borderColor: 'white'}}>
                      <Left style={{maxWidth: 24}}>
                        <Radio
                          onPress={() => onPressRadio(index)}
                          color={'#EB7F5C'}
                          selectedColor={'#EB7F5C'}
                          selected={index === selectedSortOption}
                        />
                      </Left>
                      <Body style={{marginBottom: 'auto'}}>
                        <Text style={{color: 'black'}}>{option}</Text>
                      </Body>
                    </ListItem>
                  );
                })}
              </Content>
            </Container>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  openButton: {
    marginTop: 14,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 18,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

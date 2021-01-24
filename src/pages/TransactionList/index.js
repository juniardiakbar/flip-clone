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
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 6,
          margin: 10,
          paddingHorizontal: 10,
        }}>
        <Grid>
          <Col style={{flex: 2}}>
            <Item style={{borderBottomColor: 'white'}}>
              <Icon
                name="search"
                style={{marginHorizontal: -10, color: '#A3A3A3'}}
              />
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
                <Icon
                  name="chevron-down"
                  style={{fontSize: 14, color: '#EB7F5C'}}
                />
              </Text>
            </TouchableHighlight>
          </Col>
        </Grid>
      </View>
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
                onPress={() => onPressTransaction(index)}
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
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style={{fontWeight: 'bold'}}>
                      {transaction['sender_bank']
                        ? transaction['sender_bank'].toUpperCase()
                        : null}
                    </Text>
                    <Icon
                      name="arrow-right"
                      type="Feather"
                      style={{fontSize: 22}}
                    />
                    <Text style={{fontWeight: 'bold'}}>
                      {transaction['beneficiary_bank']
                        ? transaction['beneficiary_bank'].toUpperCase()
                        : null}
                    </Text>
                  </View>
                  <Text>{transaction['beneficiary_name'].toUpperCase()}</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text>{formatCurrency(transaction['amount'])}</Text>
                    <Icon
                      name="dot-single"
                      type="Entypo"
                      style={{fontSize: 22, marginTop: 'auto'}}
                    />
                    <Text>{formatDate(transaction['created_at'])}</Text>
                  </View>
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
                        <Text
                          style={{color: 'black'}}
                          onPress={() => onPressRadio(index)}>
                          {option}
                        </Text>
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

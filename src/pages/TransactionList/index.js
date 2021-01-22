import React, {useState, useEffect} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Text,
  Header,
  Item,
  Input,
  Button,
} from 'native-base';

const TransactionList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [transactionList, setTransactionList] = useState({});

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
    setTransactionList({...list});
  }, []);

  const onPressTransaction = (key) => {
    console.log(key);
    console.log(transactionList[key]);
    navigation.navigate('Detail Transaction', {
      transaction: transactionList[key],
    });
  };

  return (
    <Container>
      <Header searchBar rounded style={{backgroundColor: 'white'}}>
        <Item>
          <Input
            value={search}
            placeholder={'Cari nama, bank, atau nominal'}
            onChangeText={(value) => setSearch(value)}
          />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content>
        <List>
          {Object.keys(transactionList).map((key, index) => {
            const transaction = transactionList[key];
            return (
              <ListItem key={index} onPress={() => onPressTransaction(key)}>
                <Body>
                  <Text>{`${transaction[
                    'sender_bank'
                  ].toUpperCase()} -> ${transaction[
                    'beneficiary_bank'
                  ].toUpperCase()}`}</Text>
                  <Text>{transaction['beneficiary_name']}</Text>
                  <Text>
                    {`${transaction['amount']} . ${transaction['created_at']}`}
                  </Text>
                </Body>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default TransactionList;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     marginTop: 10,
//   },
// });

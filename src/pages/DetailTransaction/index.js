import React, {useState, useEffect} from 'react';
import {StyleSheet, View, BackHandler, Touchable} from 'react-native';

import {Container, Content, Text, Grid, Col} from 'native-base';
import {formatCurrency} from '../../utils/currency';
import {formatDate} from '../../utils/date';
import {TouchableHighlight} from 'react-native-gesture-handler';

const DetailTransaction = ({navigation, route}) => {
  const [transaction, setTransction] = useState({});

  useEffect(() => {
    console.log(route.params.transaction);
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    setTransction({...route.params.transaction});
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  const onPressClose = () => {
    handleBackPress();
  };

  return (
    <Container>
      <Content style={{backgroundColor: '#F5F9F8'}}>
        <View
          style={{
            marginTop: 24,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderWidth: 2,
              borderColor: 'white',
              borderBottomColor: '#F5F9F8',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>{`ID TRANSAKSI: #${transaction['id']}`}</Text>
          </View>
          <Grid
            style={{
              marginTop: 12,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderWidth: 2,
              borderColor: 'white',
              borderBottomColor: '#F5F9F8',
            }}>
            <Col style={{flex: 2}}>
              <Text style={{fontWeight: 'bold'}}>DETAIL TRANSAKSI</Text>
            </Col>
            <Col style={{flex: 1}}>
              <TouchableHighlight
                style={{marginLeft: 'auto'}}
                underlayColor={'white'}
                onPress={() => onPressClose()}>
                <Text style={{color: '#EB7F5C'}}>Tutup</Text>
              </TouchableHighlight>
            </Col>
          </Grid>
          <View style={{paddingHorizontal: 24, paddingVertical: 18}}>
            <View>
              <Text style={{fontWeight: 'bold'}}>{`${
                transaction['sender_bank']
                  ? transaction['sender_bank'].toUpperCase()
                  : null
              } → ${
                transaction['beneficiary_bank']
                  ? transaction['beneficiary_bank'].toUpperCase()
                  : null
              }`}</Text>
            </View>
            <Grid style={{marginTop: 18}}>
              <Col>
                <Text style={{fontWeight: 'bold'}}>
                  {transaction['beneficiary_name']
                    ? transaction['beneficiary_name'].toUpperCase()
                    : null}
                </Text>
                <Text>{transaction['account_number']}</Text>
              </Col>
              <Col>
                <Text style={{fontWeight: 'bold'}}>NOMINAL</Text>
                <Text>{formatCurrency(transaction['amount'])}</Text>
              </Col>
            </Grid>
            <Grid style={{marginTop: 18}}>
              <Col>
                <Text style={{fontWeight: 'bold'}}>BERITA TRANSFER</Text>
                <Text>{transaction['remark']}</Text>
              </Col>
              <Col>
                <Text style={{fontWeight: 'bold'}}>KODE UNIK</Text>
                <Text>{transaction['unique_code']}</Text>
              </Col>
            </Grid>
            <Grid style={{marginTop: 18}}>
              <Col>
                <Text style={{fontWeight: 'bold'}}>WAKTU TRANSFER</Text>
                <Text>{formatDate(transaction['created_at'])}</Text>
              </Col>
            </Grid>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default DetailTransaction;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 16,
//     marginTop: 10,
//   },
// });

import React, {useState, useEffect} from 'react';
import Clipboard from '@react-native-community/clipboard';
import {StyleSheet, View, BackHandler, Text, ToastAndroid} from 'react-native';
import {Container, Content, Grid, Col, Icon} from 'native-base';

import {formatCurrency} from '../../utils/currency';
import {formatDate} from '../../utils/date';
import {PRIMARY, SECONDARY} from '../../utils/colors';

const DetailTransaction = ({navigation, route}) => {
  const [transaction, setTransction] = useState({});

  useEffect(() => {
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

  const copyToClipboard = () => {
    Clipboard.setString(`#${transaction['id']}`);
    ToastAndroid.show('ID Transaksi tersalin', ToastAndroid.SHORT);
  };

  return (
    <Container>
      <Content style={styles.background}>
        <View style={styles.wrapper}>
          <Grid style={styles.grid}>
            <Text bold>
              {`ID TRANSAKSI: #${transaction['id']} `}
              <Icon
                onPress={() => copyToClipboard()}
                name="content-copy"
                type="MaterialCommunityIcons"
                style={styles.icon}
              />
            </Text>
          </Grid>
          <View style={{...styles.grid, flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text bold>DETAIL TRANSAKSI</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={styles.buttonWrapper}>
                <Text
                  bold
                  style={styles.buttonClose}
                  onPress={() => onPressClose()}>
                  Tutup
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.grid}>
            {/* Start Sender Bank -> Beneficiary Bank */}
            <View style={{flexDirection: 'row'}}>
              <Text bold style={{fontSize: 18}}>
                {transaction['sender_bank']
                  ? transaction['sender_bank'].toUpperCase()
                  : null}
              </Text>
              <Icon name="arrow-right" type="Feather" style={{fontSize: 22}} />
              <Text bold style={{fontSize: 18}}>
                {transaction['beneficiary_bank']
                  ? transaction['beneficiary_bank'].toUpperCase()
                  : null}
              </Text>
            </View>
            {/* Finish Sender Bank -> Beneficiary Bank */}

            {/* Start Beneficiary Name and Amount */}
            <Grid style={{marginTop: 18}}>
              <Col style={{flex: 3}}>
                <Text bold>
                  {transaction['beneficiary_name']
                    ? transaction['beneficiary_name'].toUpperCase()
                    : null}
                </Text>
                <Text>{transaction['account_number']}</Text>
              </Col>
              <Col style={{flex: 2}}>
                <Text bold>NOMINAL</Text>
                <Text>{formatCurrency(transaction['amount'])}</Text>
              </Col>
            </Grid>
            {/* Finish Beneficiary Name and Amount */}

            {/* Start Remark and Unique Code */}
            <Grid style={{marginTop: 18}}>
              <Col style={{flex: 3}}>
                <Text bold>BERITA TRANSFER</Text>
                <Text>{transaction['remark']}</Text>
              </Col>
              <Col style={{flex: 2}}>
                <Text bold>KODE UNIK</Text>
                <Text>{transaction['unique_code']}</Text>
              </Col>
            </Grid>
            {/* Finish Remark and Unique Code */}

            {/* Start Created Date */}
            <Grid style={{marginTop: 18}}>
              <Col>
                <Text bold>WAKTU DIBUAT</Text>
                <Text>{formatDate(transaction['created_at'])}</Text>
              </Col>
            </Grid>
            {/* Finish Created Date */}
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default DetailTransaction;

const styles = StyleSheet.create({
  background: {
    backgroundColor: SECONDARY,
  },
  wrapper: {
    marginTop: 24,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  grid: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderWidth: 4,
    borderColor: 'white',
    borderBottomColor: SECONDARY,
  },
  bold: {
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
    color: PRIMARY,
  },
  buttonWrapper: {
    flex: 1,
    marginLeft: 'auto',
  },
  buttonClose: {
    color: PRIMARY,
  },
});

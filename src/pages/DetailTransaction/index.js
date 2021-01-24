import React, {useState, useEffect} from 'react';
import Clipboard from '@react-native-community/clipboard';
import {StyleSheet, View, BackHandler, ToastAndroid} from 'react-native';
import {Container, Content, Text, Grid, Col, Icon} from 'native-base';

import {Button} from '../../components';
import {formatCurrency} from '../../utils/currency';
import {formatDate} from '../../utils/date';

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
            <Text style={styles.bold}>
              {`ID TRANSAKSI: #${transaction['id']} `}
              <Icon
                onPress={() => copyToClipboard()}
                name="content-copy"
                type="MaterialCommunityIcons"
                style={styles.icon}
              />
            </Text>
          </Grid>
          <Grid style={styles.grid}>
            <Col style={{flex: 2}}>
              <Text style={styles.bold}>DETAIL TRANSAKSI</Text>
            </Col>
            <Col style={{flex: 1}}>
              <View style={styles.buttonWrapper}>
                <Button
                  text="Tutup"
                  size="lg"
                  type="primary-transparent"
                  onPress={onPressClose}
                />
              </View>
            </Col>
          </Grid>
          <View style={styles.grid}>
            {/* Start Sender Bank -> Beneficiary Bank */}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bold}>
                {transaction['sender_bank']
                  ? transaction['sender_bank'].toUpperCase()
                  : null}
              </Text>
              <Icon name="arrow-right" type="Feather" style={{fontSize: 22}} />
              <Text style={styles.bold}>
                {transaction['beneficiary_bank']
                  ? transaction['beneficiary_bank'].toUpperCase()
                  : null}
              </Text>
            </View>
            {/* Finish Sender Bank -> Beneficiary Bank */}

            {/* Start Beneficiary Name and Amount */}
            <Grid style={{marginTop: 18}}>
              <Col style={{flex: 3}}>
                <Text style={styles.bold}>
                  {transaction['beneficiary_name']
                    ? transaction['beneficiary_name'].toUpperCase()
                    : null}
                </Text>
                <Text>{transaction['account_number']}</Text>
              </Col>
              <Col style={{flex: 2}}>
                <Text style={styles.bold}>NOMINAL</Text>
                <Text>{formatCurrency(transaction['amount'])}</Text>
              </Col>
            </Grid>
            {/* Finish Beneficiary Name and Amount */}

            {/* Start Remark and Unique Code */}
            <Grid style={{marginTop: 18}}>
              <Col style={{flex: 3}}>
                <Text style={styles.bold}>BERITA TRANSFER</Text>
                <Text>{transaction['remark']}</Text>
              </Col>
              <Col style={{flex: 2}}>
                <Text style={styles.bold}>KODE UNIK</Text>
                <Text>{transaction['unique_code']}</Text>
              </Col>
            </Grid>
            {/* Finish Remark and Unique Code */}

            {/* Start Created Date */}
            <Grid style={{marginTop: 18}}>
              <Col>
                <Text style={styles.bold}>WAKTU DIBUAT</Text>
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
    backgroundColor: '#F5F9F8',
  },
  wrapper: {
    marginTop: 24,
    backgroundColor: 'white',
  },
  grid: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'white',
    borderBottomColor: '#F5F9F8',
  },
  bold: {
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
    color: '#EB7F5C',
  },
  buttonWrapper: {
    marginLeft: 'auto',
  },
});

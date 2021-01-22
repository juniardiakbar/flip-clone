import React, {useState, useEffect} from 'react';
import {StyleSheet, BackHandler} from 'react-native';

import {Container, Content, Text, Grid, Col} from 'native-base';

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

  return (
    <Container>
      <Content>
        <Text>{`ID TRANSAKSI: ${transaction['id']}`}</Text>
        <Text>DETAIL TRANSAKSI</Text>
        <Text>PERTAMA - BNI</Text>
        <Grid>
          <Col>
            <Text>SYIFA SALSABILA</Text>
            <Text>0897897987</Text>
          </Col>
          <Col>
            <Text>NOMINAL</Text>
            <Text>10000</Text>
          </Col>
        </Grid>
        <Grid>
          <Col>
            <Text>BERITA TRANSFER</Text>
            <Text>berita</Text>
          </Col>
          <Col>
            <Text>KODE UNIK</Text>
            <Text>865</Text>
          </Col>
        </Grid>
        <Grid>
          <Col>
            <Text>WAKTU TRANSFER</Text>
            <Text>8 April 2020</Text>
          </Col>
        </Grid>
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

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Content, Icon} from 'native-base';

import {formatCurrency} from '../../utils/currency';
import {formatDate} from '../../utils/date';

const Transaction = (props) => {
  const {transaction} = props;

  return (
    <Content>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text bold>
          {transaction['sender_bank']
            ? transaction['sender_bank'].toUpperCase()
            : null}
        </Text>
        <Icon name="arrow-right" type="Feather" style={{fontSize: 18}} />
        <Text bold>
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
  );
};

const styles = StyleSheet.create({});

export default Transaction;

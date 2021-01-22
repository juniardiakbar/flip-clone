import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const TransactionList = ({navigation}) => {
  const handleClickButton = () => {
    navigation.replace('Detail Transaction');
  };

  return (
    <View style={styles.background}>
      <Text style={styles.text}>TransactionList</Text>
      <Button
        title="Go To Detail Transtion"
        onPress={() => handleClickButton()}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});

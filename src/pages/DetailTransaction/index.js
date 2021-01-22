import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const DetailTransaction = ({navigation}) => {
  const handleClickButton = () => {
    navigation.replace('Transaction List');
  };

  return (
    <View style={styles.background}>
      <Text style={styles.text}>DetailTransaction</Text>
      <Button
        title="Go To Transtion List"
        onPress={() => handleClickButton()}
      />
    </View>
  );
};

export default DetailTransaction;

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

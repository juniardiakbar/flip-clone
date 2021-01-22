import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Transaction List');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.background}>
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

export default Splash;

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

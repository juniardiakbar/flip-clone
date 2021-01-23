import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Logo} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Transaction List');
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.background}>
      <Image source={Logo} style={styles.logo} />
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
  logo: {
    width: 100,
    height: 100,
  },
});

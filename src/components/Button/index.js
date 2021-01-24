import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import {Icon} from 'native-base';
import {PRIMARY, SUCCESS} from '../../utils/colors';

const Button = (props) => {
  const {text, size, type, onPress, icon, iconName, iconType} = props;

  let fontSize;
  switch (size) {
    case 'sm': {
      fontSize = 10;
      break;
    }
    case 'md': {
      fontSize = 12;
      break;
    }
    case 'lg': {
      fontSize = 14;
      break;
    }
    default:
  }

  let buttonStyle = styles.button;
  let textColor;
  let bold = false;

  switch (type) {
    case 'success': {
      buttonStyle = {...buttonStyle, ...styles.success};
      textColor = {color: 'white'};
      bold = true;
      break;
    }
    case 'primary-outline': {
      buttonStyle = {...buttonStyle, ...styles.primaryOutline};
      textColor = {color: 'black'};
      bold = true;
      break;
    }
    case 'primary-transparent': {
      textColor = {color: PRIMARY};
      bold = true;
      break;
    }
    default:
  }

  return (
    <TouchableHighlight
      underlayColor={'white'}
      onPress={() => (onPress ? onPress() : null)}>
      <View style={buttonStyle}>
        <Text bold={bold} style={{...textColor, fontSize}}>
          {text}
        </Text>
        {icon ? (
          <Icon
            name={iconName}
            type={iconType}
            style={{fontSize: 14, color: PRIMARY}}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  success: {
    backgroundColor: SUCCESS,
  },
  primaryOutline: {
    borderColor: PRIMARY,
    borderWidth: 2,
  },
  button: {
    padding: 6,
    borderRadius: 6,
    flexDirection: 'row',
  },
});

export default Button;

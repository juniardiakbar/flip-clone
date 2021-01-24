import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import {Icon} from 'native-base';

const Button = (props) => {
  const {text, size, type, onPress, icon, iconName, iconType} = props;

  let fontSize;
  if (size === 'sm') fontSize = 10;
  else if (size === 'md') fontSize = 12;

  let buttonStyle = styles.button;
  let textColor;

  switch (type) {
    case 'success': {
      buttonStyle = {...buttonStyle, ...styles.success};
      textColor = {color: 'white'};
      break;
    }
    case 'primary-outline': {
      buttonStyle = {...buttonStyle, ...styles.primaryOutline};
      textColor = {color: 'black'};
      break;
    }
    case 'primary-transparent': {
      textColor = {color: '#EB7F5C', fontWeight: 'bold'};
      break;
    }
    default:
  }

  return (
    <TouchableHighlight
      underlayColor={'white'}
      onPress={() => (onPress ? onPress() : null)}>
      <View style={buttonStyle}>
        <Text style={{...textColor, fontSize}}>{text}</Text>
        {icon ? (
          <Icon
            name={iconName}
            type={iconType}
            style={{fontSize: 14, color: '#EB7F5C'}}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  success: {
    backgroundColor: '#54B685',
  },
  primaryOutline: {
    borderColor: '#EB7F5C',
    borderWidth: 1,
  },
  button: {
    padding: 6,
    borderRadius: 6,
    flexDirection: 'row',
  },
});

export default Button;

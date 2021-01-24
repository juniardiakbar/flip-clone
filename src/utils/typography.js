import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const typography = () => {
  const oldTextRender = Text.render;
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    const textStyle = [];
    if (origin.props.bold) textStyle.push(styles.bold);
    else textStyle.push(styles.regular);

    textStyle.push(origin.props.style);

    return React.cloneElement(origin, {
      style: textStyle,
    });
  };
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Lato-Regular',
  },
  bold: {
    fontFamily: 'Lato-Bold',
  },
});

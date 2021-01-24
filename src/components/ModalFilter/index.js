import React from 'react';
import {StyleSheet, View, Modal, TouchableWithoutFeedback} from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Left,
  Radio,
  Body,
  Text,
} from 'native-base';
import {PRIMARY} from '../../utils/colors';

const ModalFilter = (props) => {
  const {
    sortOption,
    selectedSortOption,
    onPressFilter,
    visible,
    toggleModal,
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => toggleModal()}>
      <TouchableWithoutFeedback onPress={() => toggleModal()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Container
            style={{
              width: 320,
              maxHeight: 320,
              paddingVertical: 24,
              borderRadius: 10,
            }}>
            <Content>
              {sortOption.map((option, index) => {
                return (
                  <ListItem
                    key={index}
                    selected={index === selectedSortOption}
                    style={{borderColor: 'white'}}>
                    <Left style={{maxWidth: 24}}>
                      <Radio
                        onPress={() => onPressFilter(index)}
                        color={PRIMARY}
                        selectedColor={PRIMARY}
                        selected={index === selectedSortOption}
                      />
                    </Left>
                    <Body style={{marginBottom: 'auto'}}>
                      <Text
                        style={{color: 'black'}}
                        onPress={() => onPressFilter(index)}>
                        {option}
                      </Text>
                    </Body>
                  </ListItem>
                );
              })}
            </Content>
          </Container>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default ModalFilter;

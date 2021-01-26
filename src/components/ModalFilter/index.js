import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {Container, Content, ListItem, Radio} from 'native-base';
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
          <View style={styles.modalContainer}>
            {sortOption.map((option, index) => {
              return (
                <ListItem
                  key={index}
                  selected={index === selectedSortOption}
                  style={{flexDirection: 'row', borderColor: 'white'}}>
                  <View style={{marginRight: 4}}>
                    <Radio
                      onPress={() => onPressFilter(index)}
                      color={PRIMARY}
                      selectedColor={PRIMARY}
                      selected={index === selectedSortOption}
                    />
                  </View>
                  <View>
                    <Text
                      style={{color: 'black'}}
                      onPress={() => onPressFilter(index)}>
                      {option}
                    </Text>
                  </View>
                </ListItem>
              );
            })}
          </View>
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
  },
  modalView: {
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
  modalContainer: {
    flexDirection: 'column',
    width: 300,
    paddingVertical: 24,
  },
});

export default ModalFilter;

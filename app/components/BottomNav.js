import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo vector icons
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() =>
          navigation.navigate('ComplaintForm', { name: t('newComplaint') })
        }
      >
          <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c84e0',
    height: 50,
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    width: 60,
    color: 'white',
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0c84e0',
    borderColor: 'white',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default BottomNavigation;

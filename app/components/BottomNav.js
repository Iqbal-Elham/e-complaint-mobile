import React from 'react';
import { Link } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo vector icons
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      {/* Other navigation items */}
      {/* <TouchableOpacity style={styles.navItem}>
        <Text>Item 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text>Item 2</Text>
      </TouchableOpacity> */}

      {/* Plus button in the middle */}
      <TouchableOpacity
      style={styles.plusButton}
      onPress={() => navigation.navigate('ComplaintForm', { name: t('newComplaint') })}
    >
      <AntDesign name="plus" size={24} color="white" />
    </TouchableOpacity>

      {/* <TouchableOpacity style={styles.navItem}>
        <Text>Item 3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text>Item 4</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0c84e0',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
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

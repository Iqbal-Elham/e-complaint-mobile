import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useToken } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const token = useToken();
  const router = useRouter();

  const handleLogout = () => {
    AsyncStorage.removeItem('token')
    router.replace('/')
  }
  
  return (
    <View style={styles.container}>
      {token ?   <TouchableOpacity
        onPress={handleLogout}
      >
        <Text style={styles.otherButtons}>
          {t('logout')}
        </Text>
      </TouchableOpacity> : 
        <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login', { name: t('newComplaint') })
        }
      >
        <Text style={styles.otherButtons}>
          {t('login')}/{t('register')}
        </Text>
      </TouchableOpacity>}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() =>
          token
            ? navigation.navigate('ComplaintForm', { name: t('newComplaint') })
            : navigation.navigate('Login')
        }
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.otherButtons}></Text>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 149,
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
  otherButtons: {
    color: 'white',
    fontSize: 18,
  },
});

export default BottomNavigation;

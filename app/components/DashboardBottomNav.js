import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../utils';

const DashboardBottomNav = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login', { name: t('newComplaint') })
        }
      >
        <Text style={styles.otherButtons}>خروج</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(user?.is_admin ? 'index' : 'Notifications')
        }
      >
        <Text style={styles.otherButtons}>
          {user?.is_admin ? t('back') : t('notifications')}
        </Text>
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
    gap: 100,
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

export default DashboardBottomNav;

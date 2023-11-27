import React from 'react';
import { Stack } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import BottomNavigation from './components/BottomNav';

export default function Details() {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: `${t('about-us')}`,
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView style={styles.container}>
        <View>
          <Image
            style={{
              width: '100%',
              height: 250,
              marginHorizontal: 'auto',
              display: 'flex',
            }}
            source={require('../assets/images/Bribe.jpg')}
          />
          <View style={{ padding: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }} >{t('about-us')}</Text>
            <Text style={{ fontSize: 16, textAlign: 'justify', marginBottom: 40 }}>{t('about-content')}</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    // margin: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginBottom: 20
  },
});

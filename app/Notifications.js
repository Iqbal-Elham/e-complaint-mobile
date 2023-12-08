import React, { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, StyleSheet } from 'react-native';
import { Link, Stack, useNavigation } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { fetchComplaints, fetchMyComplaints, fetchNotifications } from './api';
import { useAuth } from './utils';
import { List } from 'react-native-paper';

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/images/logo.png')}
    />
  );
}

const getStatusColor = (state) => {
  switch (state) {
    case 'resolved':
      return 'rgb(34 231 34)';
    case 'under_investigation':
      return 'rgb(235 221 30)';
    case 'received':
      return 'rgb(29 219 203)';
    default:
      return 'black';
  }
};

export default function Home() {
  const [notifications, setNotifications] = useState([]);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetchNotifications(token)
      .then((response) => {
        setNotifications(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const data = [
    { id: 2, message: 'received' },
    { id: 3, message: 'resolved' },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: 'Notifications',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

            headerTitle: () => (
              <View
                style={{
                  marginLeft: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 20,
                }}
              >
                <Text style={{ color: '#fff' }}>
                  <Text onPress={() => changeLanguage('ps')}>پشتو</Text> |{' '}
                  <Text onPress={() => changeLanguage('fa')}>فارسی</Text>
                </Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Text style={{ color: 'white', marginHorizontal: 5 }}>
                    {t('ministry_brand')}
                  </Text>
                  <Text style={{ color: 'white', marginHorizontal: 5 }}>
                    {t('save_complaint')}
                  </Text>
                </View>
                <LogoTitle />
              </View>
            ),
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            padding: 8,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 28,
              backgroundColor: '#4cc3e0',
              width: '100%',
              padding: 5,
              color: 'white',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderTopWidth: 1,
            }}
          >
            {t('notifications')}
          </Text>
        </View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <View
              style={{
                width: '100%',
                textAlign: 'right',
                display: 'flex',
              }}
            >
              <Link
                href={{
                  pathname: 'details',
                  params: {
                    name: 'شکایت',
                    complaint_id: item?.complaint.id,
                  },
                }}
              >
                <List.Item
                  title={`شکایت شماره ${item?.complaint?.id}`}
                  description={t(`notification_messages.${item.message}`)}
                  left={(props) => <List.Icon {...props} icon="bell" />}
                />
              </Link>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign: 'right',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cell: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    textAlign: 'right',
    backgroundColor: 'yellow',
  },
});

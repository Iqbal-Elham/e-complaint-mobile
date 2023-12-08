import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Link, Stack, useNavigation } from 'expo-router';
import ComplaintCard from './components/ComplaintCard';
import HeaderSlider from './components/HeaderSlider';
import { I18nManager } from 'react-native';
import BottomNavigation from './components/BottomNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { fetchComplaints, fetchMyComplaints } from './api';
import Pagination from './components/Pagination';
import DashboardBottomNav from './components/DashboardBottomNav';
import { DataTable } from 'react-native-paper';
import { useAuth } from './utils';

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
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const itemsPerPage = 6;

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return;
    if (user.is_admin) {
      fetchComplaints(itemsPerPage, currentPage)
        .then((response) => {
          setComplaints(response?.results);
          setHasPrev(response?.previous);
          setHasNext(response?.next);
          setTotalPages(Math.ceil(response?.count / itemsPerPage));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchMyComplaints(itemsPerPage, currentPage, token)
        .then((response) => {
          setComplaints(response?.results);
          setHasPrev(response?.previous);
          setHasNext(response?.next);
          setTotalPages(Math.ceil(response?.count / itemsPerPage));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, token]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: 'My home',
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
        <ScrollView style={{ flex: 1, marginBottom: 50 }}>
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
              {user?.is_admin ? t('dashboard') : t('my_complaints')}
            </Text>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  شماره
                </Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  نام
                </Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  حالت
                </Text>
              </DataTable.Title>
            </DataTable.Header>

            {complaints.map((complaint, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{complaint.id}</DataTable.Cell>
                <DataTable.Cell>
                  <Link
                    href={{
                      pathname: 'details',
                      params: {
                        name: 'شکایت اول',
                        complaint_id: complaint.id,
                      },
                    }}
                  >
                    {t(complaint.complaint_type)}
                  </Link>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      backgroundColor: getStatusColor(complaint.state),
                      textAlign: 'center',
                      width: '70%',
                      borderRadius: 12,
                    }}
                  >
                    {t(complaint.state)}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* ------------------------------------------------------------------------------------ */}
          {totalPages > 1 && (
            <View style={{ marginBottom: 50 }}>
              <Pagination
                hasPrev={hasPrev}
                hasNext={hasNext}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </View>
          )}
        </ScrollView>
        <DashboardBottomNav />
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

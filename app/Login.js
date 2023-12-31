import React, { useState } from 'react';
import { Stack, useRouter, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';

import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { login } from './api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const navigation = useNavigation();

  const router = useRouter();

  const handleLogin = async () => {
    await login({ username, password, callback: () => router.replace('/') });
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: `${t('login')}`,
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('welcome-text')}</Text>
        <TextInput
          placeholder="نام کاربری"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="پسورد"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t('login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>{t('register')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eceaea',
  },
  formContainer: {
    flex: 1,
    borderRadius: 7,
    paddingTop: 94,
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 66,
    color: '#333',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
});

export default Login;

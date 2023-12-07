// screens/RegisterScreen.js

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { register } from "./api";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleRegister = () => {
    register({
      username,
      password,
      email,
      first_name,
      last_name,
      callback: ()=>router.replace('/')
    })
    
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${t("register")}`,
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t("welcome-text")}</Text>
        <TextInput
          placeholder={t("username")}
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder={t("name")}
          value={first_name}
          onChangeText={(text) => setFirstname(text)}
          style={styles.input}
        />
        <TextInput
          placeholder={t("last-name")}
          value={last_name}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="ایمل"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="پسورد"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t("register")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            navigation.navigate('Login')
          }
        >
          <Text style={styles.buttonText}>{t("login")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eceaea",
  },
  formContainer: {
    flex: 1,
    borderRadius: 7,
    paddingTop: 94,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 66,
    color: "#333",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#fff",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  registerButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
});

export default RegisterScreen;

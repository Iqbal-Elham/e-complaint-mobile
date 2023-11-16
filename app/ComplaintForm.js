import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from 'react-i18next';


export default function ComplaintForm() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    description: "",
    files: [],
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setFormData({ ...formData, files: [...formData.files, result.uri] });
    }
  };

  const getFileTypeIcon = (uri) => {
    const fileExtension = uri.split("/")[0];
    switch (fileExtension) {
      case "data:image":
        return <Image source={{ uri: uri }} style={styles.imagePreview} />;
      case "data:video":
        return <MaterialIcons name="video-library" size={54} color="black" />;
      case "data:audio":
        return <MaterialIcons name="audiotrack" size={54} color="black" />;
      default:
        return (
          <MaterialIcons name="insert-drive-file" size={54} color="black" />
        );
    }
  };


  const removeImage = (index) => {
    const newFiles = formData.files.filter((_, idx) => idx !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Submit your form data
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: params.name,
          headerTitleAlign: "center",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('name')}:</Text>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder_name')}
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('phone_number')}:</Text>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder_phoneNumber')}
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('email')}:</Text>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder_email')}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('complaint_type')}:</Text>
          <Picker
            selectedValue={formData.role}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange("role", itemValue)}
          >
            <Picker.Item style={{ backgroundColor: 'blue' }} label={t('bribe_given')} value="bribeTaker" />
            <Picker.Item label={t('bribe_taken')} value="bribeGiver" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('description')}:</Text>
          <TextInput
            style={styles.textArea}
            placeholder={t('placeholder_description')}
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
        </View>

        {formData.files.length < 4 && (
          <Button title={t('upload_file')} onPress={pickImage} />
        )}

        <View style={styles.imagePreviewContainer}>
          {formData.files.map((file, index) => (
            <View key={index} style={styles.fileWrapper}>
              <View style={styles.filePreview}>{getFileTypeIcon(file)}</View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Button title={t('save')} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  formGroup: {
    marginBottom: 20,
    borderBottomWidth: 0.5
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 4,
    textAlign: 'right'
  },
  picker: {
    borderWidth: 1,
    width: "100%",
    borderColor: "#ddd",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'right',
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 4,
    height: 100,
    textAlign: 'right',
    textAlignVertical: "top",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  fileWrapper: {
    position: "relative",
    margin: 5,
  },

  filePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1", // A light grey background
  },
  deleteButton: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "red",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

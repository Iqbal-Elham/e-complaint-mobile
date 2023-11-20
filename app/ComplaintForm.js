import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { api, createComplaint, fetchFileFromUri } from './api';
import axios from 'axios';
import { get_type } from './utils';

export default function ComplaintForm() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    complaint_description_error: false,
    complaint_file_error: false,
  });
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    complaint_type: 'bribe_given',
    description: '',
    files: [],
  });
  const files_form = new FormData();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFormData({
        ...formData,
        files: [...formData.files, result.assets[0]],
      });
    }
  };

  const getFileTypeIcon = ({ uri }) => {
    const fileExtension = get_type(uri);
    switch (fileExtension) {
      case 'image':
        return <Image source={{ uri: uri }} style={styles.imagePreview} />;
      case 'video':
        return <MaterialIcons name="video-library" size={54} color="black" />;
      case 'file':
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
    Object.keys(errors).map((key) => (errors[key] = false));
    if (!formData.description) {
      setErrors((errors) => ({ ...errors, complaint_description_error: true }));
    }
    if (!formData.files.length) {
      setErrors((errors) => ({ ...errors, complaint_file_error: true }));
    }
    if (!errors.complaint_description_error && !errors.complaint_file_error) {
      formData.files.map((file) => {
        let fileType = file.uri.substring(file.uri.lastIndexOf('.') + 1);

        files_form.append('attachments', {
          uri: file?.uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      });
      console.log('--------325453-----------------------');
      console.log(files_form);
      console.log('--------3243-----------------------');

      files_form.append('complaint_type', 'bribe_taken');
      files_form.append('description', 'jjj');
      axios
        .post('http://172.30.10.104:8000/api/complaints/', files_form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(
          (response) => {
            if (response.status === 201) {
              router.replace('/');
            } else {
              console.log(response);
              console.log('Heeyyyyyyyyy');
            }
          },
          (error) => {
            console.log('errororororo');
            console.log(error);
          }
        );
    }
    // Submit your form data
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: params.name,
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('name')}:</Text>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder_name')}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('phone_number')}:</Text>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder_phoneNumber')}
            value={formData.phone_number}
            onChangeText={(text) => handleInputChange('phone_number', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('email')}:</Text>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder_email')}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('complaint_type')}:</Text>
          <Picker
            selectedValue={formData.complaint_type}
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleInputChange('complaint_type', itemValue)
            }
          >
            <Picker.Item label={t('bribe_given')} value="bribe_given" />
            <Picker.Item label={t('bribe_taken')} value="bribe_taken" />
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
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>
        {errors.complaint_description_error && (
          <Text style={{ color: 'red', marginBottom: 20 }}>
            {t('complaint_description_error')}
          </Text>
        )}

        {formData.files.length < 4 && (
          <Button title={t('upload_file')} onPress={pickImage} />
        )}
        {errors.complaint_file_error && (
          <Text style={{ color: 'red', marginTop: 10 }}>
            {t('complaint_file_error')}
          </Text>
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

        <View style={{ marginBottom: 60 }}>
          <Button title={t('save')} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  formGroup: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 4,
    textAlign: 'right',
  },
  picker: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#ddd',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'right',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    height: 100,
    textAlign: 'right',
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  fileWrapper: {
    position: 'relative',
    margin: 5,
  },

  filePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1', // A light grey background
  },
  deleteButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

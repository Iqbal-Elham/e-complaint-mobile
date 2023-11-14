import React, { useState } from 'react';
import { View, TextInput, Text, Button, Picker, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DocumentPicker from 'react-native-document-picker';

const ComplaintForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      // Limit to 4 files
      setSelectedFiles(results.slice(0, 4));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    bribeType: Yup.string().required('Please select an option'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <ScrollView>
       <Stack.Screen
        options={{
          title: params.name,
        }}
      />
      <Formik
        initialValues={{ name: '', phoneNumber: '', email: '', bribeType: '', description: '' }}
        onSubmit={values => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name"
            />
            {touched.name && errors.name && <Text>{errors.name}</Text>}

            <TextInput
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            {touched.phoneNumber && errors.phoneNumber && <Text>{errors.phoneNumber}</Text>}

            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}

            <Picker
              selectedValue={values.bribeType}
              onValueChange={handleChange('bribeType')}
            >
              <Picker.Item label="Select Bribe Type" value="" />
              <Picker.Item label="Bribe Taken" value="bribe_taken" />
              <Picker.Item label="Bribe Given" value="bribe_given" />
            </Picker>
            {touched.bribeType && errors.bribeType && <Text>{errors.bribeType}</Text>}

            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Description"
              multiline
            />
            {touched.description && errors.description && <Text>{errors.description}</Text>}

            <Button title="Select Files" onPress={handleFileSelect} />
            {selectedFiles.map((file, index) => (
              <Text key={index}>{file.name}</Text>
            ))}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ComplaintForm;

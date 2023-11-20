import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import image1 from '../assets/images/Bribe.jpg';
import image2 from '../assets/images/bribe2.jpg';
import image3 from '../assets/images/Bribe.jpg';
import image4 from '../assets/images/bribe2.jpg';
import { useTranslation } from 'react-i18next';
import { fetchComplaint } from './api';

// const complaint = {
//   id: 2,
//   name: 'علی احمد',
//   type: 'پرداخت رشوه',
//   phoneNumber: '123-456-7890',
//   email: 'example@example.com',
//   description: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد`,
//   images: [image1, image2, image3, image4],
// };

export default function Details() {
  const { name, complaint_id } = useLocalSearchParams();
  const { t } = useTranslation();

  const [complaint, setComplaint] = useState({});

  const [fullScreenImage, setFullScreenImage] = useState(null);

  const openImage = (image) => {
    setFullScreenImage(image);
  };

  const closeImage = () => {
    setFullScreenImage(null);
  };

  useEffect(() => {
    fetchComplaint(complaint_id).then((response) => {
      setComplaint(response);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: `${t('complaint_number')} ${complaint.id}`,
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {t('complaint_number')} {complaint.id}
        </Text>
        <Text style={styles.info}>{t(complaint.complaint_type)}</Text>
        <Text style={styles.description}>{complaint.description}</Text>
        <Text style={styles.info}>
          {t('complainer_name')}:{' '}
          {complaint.name ? complaint.name : t('unknown')}
        </Text>
        <Text style={styles.info}>
          {t('complainer_email')}:{' '}
          {complaint.email ? complaint.email : t('unknown')}
        </Text>
        <Text style={styles.info}>
          {t('complainer_phone')}:{' '}
          {complaint.phone_number ? complaint.phone_number : t('unknown')}
        </Text>

        <View style={styles.imageContainer}>
          {complaint.attachments?.map((attachment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openImage(attachment.file)}
            >
              <Image source={{ uri: attachment.file }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        <Modal
          visible={!!fullScreenImage}
          transparent={true}
          onRequestClose={closeImage}
        >
          <TouchableOpacity
            style={styles.fullScreenContainer}
            onPress={closeImage}
          >
            <Image
              source={{ uri: fullScreenImage }}
              style={styles.fullScreenImage}
            />
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    width: '90%',
    margin: 15,
    paddingHorizontal: 20,
    paddingVertical: 40,
    shadowColor: '#171717',
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    lineHeight: 20,
    textAlign: 'justify',
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';
import { Video, ResizeMode } from 'expo-av';
import { fetchComplaint } from './api';
import { get_type } from './utils';

export default function Details() {
  const { complaint_id } = useLocalSearchParams();
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

  function getAttachmentComponent(file, fullScreen = false) {
    const type = get_type(file);
    if (type === 'image')
      return (
        <Image
          source={{ uri: file }}
          style={fullScreen ? styles.fullScreenImage : styles.image}
        />
      );
    else if (fullScreen) {
      if (['video', 'audio'].includes(type))
        return (
          <Video
            style={{
              width: fullScreen ? '100%' : 100,
              height: fullScreen ? '100%' : 100,
              borderRadius: 10,
              backgroundColor: '#000',
            }}
            source={{
              uri: file,
            }}
            useNativeControls={fullScreen}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={fullScreen}
          />
        );
      else
        return (
          <View
            style={{
              minHeight: 250,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2222',
              borderRadius: 10,
            }}
          >
            <MaterialIcons name="insert-drive-file" size={148} color="black" />
          </View>
        );
    } else {
      return (
        <View
          style={{
            height: 100,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2222',
            borderRadius: 10,
          }}
        >
          <MaterialIcons
            name={
              type === 'video'
                ? 'videocam'
                : type === 'audio'
                ? 'mic'
                : 'insert-drive-file'
            }
            size={80}
            color="black"
          />
        </View>
      );
    }
  }

  console.log(complaint)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: `${t('complaint_number')} ${complaint.id}`,
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={styles.title}>
            {t('complaint_number')} {complaint.id}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {complaint?.views}
            </Text>
            <MaterialIcons name="remove-red-eye" size={18} color="black" />
          </View>
        </View>

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
              {getAttachmentComponent(attachment.file)}
            </TouchableOpacity>
          ))}
        </View>

        <Modal
          visible={!!fullScreenImage}
          transparent={true}
          onRequestClose={closeImage}
        >
          <View style={styles.fullScreenContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => closeImage()}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {getAttachmentComponent(fullScreenImage, true)}
          </View>
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
    width: '100%',
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
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 40,
    borderRadius: 20,
    backgroundColor: '#111e',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

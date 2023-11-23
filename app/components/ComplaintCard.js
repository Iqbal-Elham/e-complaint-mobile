import React, { useEffect } from 'react';
import { Link } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { get_type } from '../utils';

const ComplaintCard = ({ complaint, updateComplaintViews }) => {
  const { t } = useTranslation();

  const type = get_type(complaint?.attachments[0]?.file);

  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        padding: 20,
        marginBottom: 15,
      }}
    >
      {type === 'image' ? (
        <Image
          style={{
            width: '100%',
            height: 250,
            marginHorizontal: 'auto',
            display: 'flex',
          }}
          source={{ uri: complaint?.attachments[0]?.file }}
        />
      ) : type == 'video' ? (
        <Video
          style={{
            width: 'auto',
            height: 360,
            borderRadius: 10,
            backgroundColor: '#000',
          }}
          source={{
            uri: complaint?.attachments[0]?.file,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      ) : type === 'audio' ? (
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
          <MaterialIcons name="audiotrack" size={148} color="black" />
        </View>
      ) : (
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
      )}
      <View
        style={{
          overflow: 'hidden',
        }}
      ></View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {t(complaint?.complaint_type)}
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
      <Text style={{ marginVertical: 20, lineHeight: 25 }}>
        {complaint?.description.length > 300
          ? complaint?.description.substring(0, 300) + ' ...'
          : complaint?.description}
      </Text>
      <Link
        href={{
          pathname: 'details',
          params: { name: 'شکایت اول', complaint_id: complaint.id },
        }}
        onPress={()=>updateComplaintViews(complaint.id)}
        style={{
          textAlign: 'center',
          fontSize: 18,
          backgroundColor: '#0c84e0',
          padding: 10,
          borderRadius: 10,
          color: 'white',
        }}
      >
        {t('view')}
      </Link>
    </Card>
  );
};

export default ComplaintCard;

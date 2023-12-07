import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const get_type = (name) => {
  if (!name) return null;
  const extension = name.split('.').pop();
  let type = null;

  if (extension) {
    if (['jpg', 'png', 'webp', 'gif', 'jpeg'].indexOf(extension) !== -1)
      type = 'image';
    else if (['mp4', 'mov', 'mkv', 'avi'].indexOf(extension) !== -1)
      type = 'video';
    else if (['mp3', 'ogg', 'wav'].indexOf(extension) !== -1) type = 'audio';
    else type = 'file';
  }
  return type;
};

const useToken = () => {
  const [token, setToken] = useState(null);

  AsyncStorage.getItem('token').then((token) => {
    setToken(token);
  });
  return token;
};

export { get_type, useToken };

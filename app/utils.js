import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { Buffer } from 'buffer';

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

const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, user: null });
  AsyncStorage.getItem('auth').then((credentials) => {
    if (auth?.token || !credentials) return;

    setAuth(JSON.parse(credentials));
  });
  return auth;
};

const decodeUser = (token) => {
  const parts = token
    .split('.')
    .map((part) =>
      Buffer.from(
        part.replace(/-/g, '+').replace(/_/g, '/'),
        'base64'
      ).toString()
    );
  const payload = JSON.parse(parts[1]);
  return payload;
};

export { get_type, useAuth, decodeUser };

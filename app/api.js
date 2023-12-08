import axios from 'axios';
import { decodeUser, get_type } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const baseURL = 'http://192.168.43.172:8000/api/';

const api = axios.create({
  baseURL,
  headers: { Accept: 'application/json' },
});

const fetchComplaints = async (itemsPerPage, currentPage) => {
  try {
    const response = await api.get(
      `complaints/?limit=${itemsPerPage}&offset=${
        (currentPage - 1) * itemsPerPage
      }`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchMyComplaints = async (itemsPerPage, currentPage, token = null) => {
  try {
    const response = await api.get(
      `complaints/my_complaints/?limit=${itemsPerPage}&offset=${
        (currentPage - 1) * itemsPerPage
      }`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchComplaint = async (id) => {
  const response = await api.get(`complaints/${id}/`);
  return response.data;
};

const fetchNotifications = async (token) => {
  const response = await api.get(`notifications/`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return response.data;
};

const fetchFileFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

async function createFormData(data) {
  const formData = new FormData();
  const files = data['files'];
  files.map((file) => {
    let fileType = file.uri.substring(file.uri.lastIndexOf('.') + 1);

    let type = get_type(file.uri) ?? 'file';

    formData.append('attachments', {
      uri: file?.uri,
      name: `photo.${fileType}`,
      type: `${type}/${fileType}`,
    });
  });
  delete data['files'];
  Object.entries(data).map(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

const createComplaint = async (rawData) => {
  const data = await createFormData(rawData);
  const auth = await AsyncStorage.getItem('auth');
  const token = JSON.parse(auth)?.token;
  try {
    const response = await axios.post(`complaints/`, data, {
      baseURL,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

const updateComplaintState = async (id, token) => {
  try {
    const response = await api.post(
      `complaints/${id}/update_state/`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error.response);
    return error;
  }
};

const login = async ({ username, password, callback }) => {
  axios
    .post(
      `${baseURL}login/`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(async (response) => {
      const token = response.data?.token;
      const user = decodeUser(token);
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({ token: token, user: user })
      );
      callback?.();
    })
    .catch((error) => {
      console.log(error);
    });
};

const register = async ({
  username,
  email,
  first_name,
  last_name,
  password,
  callback,
}) => {
  axios
    .post(
      `${baseURL}users/`,
      {
        username,
        password,
        first_name,
        last_name,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(async (response) => {
      const token = response.data?.token;
      const user = decodeUser(token);
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({ token: token, user: user })
      );
      callback?.();
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  fetchComplaints,
  fetchMyComplaints,
  fetchComplaint,
  createComplaint,
  updateComplaintState,
  fetchFileFromUri,
  login,
  api,
  register,
  fetchNotifications,
};

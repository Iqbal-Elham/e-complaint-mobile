import axios from 'axios';
import { get_type } from './utils';

const baseURL = 'http://172.30.10.104:8000/api/'

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

const fetchComplaint = async (id) => {
  const response = await api.get(`complaints/${id}/`);
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
  try {
    const response = await axios.post(`complaints/`, data, {
      baseURL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export {
  fetchComplaints,
  fetchComplaint,
  createComplaint,
  api,
  fetchFileFromUri,
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.30.10.104:8000/api/',
  headers: { Accept: 'application/json' },
});

const fetchComplaints = async () => {
  const response = await api.get('complaints/');
  return response.data;
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
  for (let i = 0; i < files.length; i++) {
    // const file_blob = await fetchFileFromUri(files[i]);
    formData.append('attachments', {
      name: files[i].fileName,
      type: files[i].type,
      uri:
        Platform.OS === 'ios'
          ? files[i].uri.replace('file://', '')
          : files[i].uri,
    });
  }
  delete data['files'];
  Object.entries(data).map(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

const createComplaint = async (rawData) => {
  console.log(rawData);
  const data = await createFormData(rawData);
  console.log(data);
  try {
    const response = await axios.post(`complaints/`, data, {
      baseURL: 'http://172.30.10.104:8000/api/',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('-----------------------------', response);

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

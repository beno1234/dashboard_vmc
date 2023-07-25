import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://vmc-back.onrender.com/'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export const createSession = async (values) => {
  return await api.post('/login', values);
};

export const createUser = async (values) => {
  return await api.post('/register', values);
};

export const ForgotPassword = async (values) => {
  return await api.post('/forgotpassword', values);
};

export const ResetPassword = async (values, token) => {
  return await api.post('/resetpassword', { ...values, token });
};

export const getSamples = async (userId) => {
  return await api.get(`/samples/user/${userId}`);
};

export const requestSample = async (values) => {
  return await api.post('/samples', values);
};

export const getEmails = async (values) => {
  return await api.get('/users/emails', values);
};

export const getRoles = async () => {
  return await api.get('/users/current-role');
};

export const getEmailId = async (email) => {
  return await api.get(`/users/${email}/id`);
};

export const sentFile = async (id, formData) => {
  try {
    const response = await api.put(`/samples/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Certifique-se de definir o cabeçalho correto para o envio de arquivos
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao enviar o arquivo');
  }
};

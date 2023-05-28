import axios from 'axios';

const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === `${API_URL}/token/refresh/`) {
      return Promise.reject(error);
    }

    if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        return axiosInstance
          .post('/token/refresh/', { refresh: refreshToken })
          .then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('Refresh token not available.');
      }
    }

    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/token/', credentials);
  const { access, refresh } = response.data;

  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + access;

  return response;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/users/', userData);
  return response;
};

export const getChatResponse = async (message) => {
  const response = await axiosInstance.post('/chat/', { message });
  return response;
};

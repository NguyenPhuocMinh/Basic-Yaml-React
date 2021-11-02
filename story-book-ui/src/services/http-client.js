import axios from 'axios';

const basePath = process.env.REACT_APP_REST_DATA_PROVIDER;

const httpClient = axios.create({
  baseURL: basePath,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
  }
});

export default httpClient;


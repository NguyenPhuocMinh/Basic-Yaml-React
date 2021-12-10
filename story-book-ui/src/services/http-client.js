import axios from 'axios';

const restAuthProvider = process.env.REACT_APP_REST_AUTH_PROVIDER;

const httpClientAuthProvider = axios.create({
  baseURL: restAuthProvider,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin'
  }
});

const restDataProvider = process.env.REACT_APP_REST_DATA_PROVIDER;

const httpClientRestProvider = axios.create({
  baseURL: restDataProvider,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin'
  }
});

export { httpClientAuthProvider, httpClientRestProvider };

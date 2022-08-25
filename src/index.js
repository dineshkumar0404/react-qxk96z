import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    console.log('Request send');
    request.headers.Name = 'Hai Dinesh';
    return request;
    // request.data={id:1,employeename:"Dinesh"};
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    console.log('Got response');
    return response.data;
    //  response.data={id:1,employeename:"Dinesh"};
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

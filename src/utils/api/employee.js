import axios from 'axios';

axios.defaults.baseURL =
  'https://my-json-server.typicode.com/dineshkumar0404/demo';
axios.defaults.headers.common['Authorization'] = 'Auth path';

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
    return response;
    //  response.data={id:1,employeename:"Dinesh"};
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchEmployee = () => {
  axios
    .get('/data')
    .then((response) => {
      console.log('fetch');
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

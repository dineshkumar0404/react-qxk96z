import axios from 'axios';

axios.defaults.baseURL =
  'https://my-json-server.typicode.com/dineshkumar0404/demo';

export const fetchEmployee = async () => {
  const edata = await axios.get('/data');
  return edata;
};

export const deleteEmployee = async () => {
  const edelete = await axios.delete(`/data/SPC000${1}`);
  return edelete;
};

export const updateEmployee = async () => {
  const eupdate = await axios.put(`/data/SPC000${1}`);
  return eupdate;
};

export const addEmployee = async () => {
  const eadd = await axios.post('/data');
  return eadd;
};

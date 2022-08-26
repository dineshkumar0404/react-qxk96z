import axios from './axios';

export const fetchEmployee = () => {
  const edata = axios.get('/data');
  return edata;
};

export const deleteEmployee = (id) => {
  // console.log(id)
  const edelete = axios.delete(`/data/${id}`);
  return edelete;
};

export const updateEmployee = (e) => {
  // console.log(e)
  const eupdate = axios.put(`/data/${e.id}`, e);
  return eupdate;
};

export const addEmployee = (e) => {
  const eadd = axios.post('/data', e);
  // console.log(e)
  return eadd;
};

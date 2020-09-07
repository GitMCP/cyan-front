import api from './api';

const getFarms = filters => api.post('farms/filter', filters);
export { getFarms };

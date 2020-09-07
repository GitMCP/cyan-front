import api from './api';

const getFields = filters => api.post('fields/filter', filters);
export { getFields };

import api from './api';

const getHarvests = filters => api.post('harvests/filter', filters);
export { getHarvests };

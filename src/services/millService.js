import api from './api';

const getMills = filters => api.post('mills/filter', filters);
export { getMills };

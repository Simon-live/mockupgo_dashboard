import http from '@services/httpService';
import config from '@config/default.json';

const path = config.apiServer + '/auth';

const login = (parameters) => http.post(`${path}/login`, parameters, { withCredentials: true });

const logout = () => http.post(`${path}/logout`, {}, { withCredentials: true });

const checkAuth = () => http.get(`${path}/check`, { withCredentials: true });

export default { login, logout, checkAuth };

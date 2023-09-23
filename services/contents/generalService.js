import http from '@services/httpService';
import config from '@config/default.json';

const path = config.apiServer + '/statistic';

const getDashboardData = (parameters) => http.get(path, { params: parameters });

export default { getDashboardData };

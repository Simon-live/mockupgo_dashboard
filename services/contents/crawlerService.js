import config from '@config/default.json';
import http from '@services/httpService';

const path = config.apiServer + '/crawler';

const start = (parameters) =>
  http.post(config.crawlerServer + '/crawler', parameters);

const suspended = (parameters) => http.post(path, parameters);

const retrieve = (parameters) => http.get(path, { params: parameters });
const create = (parameters) => http.put(path, parameters);
const remove = (parameters) => http.delete(path, { data: parameters });

const retrieveData = (id, parameters) =>
  http.get(`${path}/${id}`, { params: parameters });
const trashData = (parameters) => http.post(`${path}/data`, parameters);

const retrieveLog = (id, parameters) =>
  http.get(id ? `${path}/log/${id}` : `${path}/log/`, { params: parameters });



export default {
  start,
  suspended,
  retrieve,
  create,
  remove,
  retrieveData,
  trashData,
  retrieveLog,
};

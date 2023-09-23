import config from '@config/default.json';
import http from '@services/httpService';

const path = config.apiServer + '/resource';

const upload = (data) =>
  http.post(config.apiServer + '/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const retrieve = (parameters) => http.get(path, { params: parameters });

const create = (id, parameters) =>
  http.put(id ? `${path}/${id}` : path, parameters);

const update = (id, parameters) => http.patch(`${path}/${id}`, parameters);

const remove = (parameters) => http.delete(path, { data: parameters });

export default { upload, retrieve, create, update, remove };

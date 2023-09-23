import http from '@services/httpService';
import config from '@config/default.json';

const path = config.apiServer + '/tag';

const retrieve = (parameters) => http.get(path, { params: parameters });

const create = (parameters) => http.put(path, parameters);

const update = (id, parameters) => http.patch(`${path}/${id}`, parameters);

const remove = (parameters) => http.delete(path, { data: parameters });

export default { retrieve, create, update, remove };

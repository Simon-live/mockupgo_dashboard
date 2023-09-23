import http from '@services/httpService';
import config from '@config/default.json';

const path = config.apiServer + '/collection';

const retrieve = (parameters) => http.get(path, { params: parameters });

const update = (id, parameters) => http.patch(`${path}/${id}`, parameters);

const remove = (parameters) => http.delete(path, { data: parameters });

export default { retrieve, update, remove };

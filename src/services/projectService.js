import http from './httpService'
import config from '../config.json'

export function getProjects(path) {
  // console.log(path)
  // return http.get(config.apiUrl + '/projects/stake1u8nlkz48sph4mtcddes4k2kdw776qcvszrqpvxuyy2jsn0s2hf7yp');
  return http.get(config.apiUrl + '/projects' + path);
}

import axios from 'axios';
import baseUrl from './basurl';

export default class CafesService {
  login(values) {
    return axios.post(`${baseUrl}/api/cafelogin`, values);
  }
  getCafeDetailsByToken(tokenObject) {
    return axios.post(`${baseUrl}/api/getCafeDetailsByToken`, tokenObject);
  }
}

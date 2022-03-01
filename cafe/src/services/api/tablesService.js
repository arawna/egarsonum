import axios from 'axios';
import baseUrl from './basurl';

export default class TablesService {
  getTables(tokenObject) {
    return axios.post(`${baseUrl}/api/tables/getTableByCafeId`, tokenObject);
  }
  addTable(values) {
    return axios.post(`${baseUrl}/api/tables/addTable`, values);
  }
  deleteTable(values) {
    return axios.post(`${baseUrl}/api/tables/deleteTable`, values);
  }
}

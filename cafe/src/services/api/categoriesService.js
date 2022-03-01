import axios from 'axios';
import baseUrl from './basurl';

export default class CategoriesService {
  getCategories(cafeId) {
    return axios.get(`${baseUrl}/api/categories/getByCafeId/${cafeId}`);
  }
  addCategory(values) {
    return axios.post(`${baseUrl}/api/categories/add`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  deleteCategory(values) {
    return axios.post(`${baseUrl}/api/categories/delete`, values);
  }
  updateCategory(values) {
    return axios.post(`${baseUrl}/api/categories/update`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

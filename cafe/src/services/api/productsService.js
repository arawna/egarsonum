import axios from 'axios';
import baseUrl from './basurl';

export default class ProductsService {
  addProduct(values) {
    return axios.post(`${baseUrl}/api/products/addProduct`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  getProducts(values) {
    return axios.post(`${baseUrl}/api/products/getByCafeId`, values);
  }
  deleteProduct(values) {
    return axios.post(`${baseUrl}/api/products/deleteProduct`, values);
  }
  updateProduct(values) {
    return axios.post(`${baseUrl}/api/products/updateProduct`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

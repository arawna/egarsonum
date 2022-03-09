import axios from "axios";
import baseUrl from "./baseUrl";

export default class ProductsService {
  getProductsByCategoryId(categoryId) {
    return axios.post(`${baseUrl}/api/products/getByCategoryId`, {
      categoryId: categoryId,
    });
  }
}

import axios from "axios";
import baseUrl from "./baseUrl";

export default class CategoriesService {
  getCategoriesByCafeId(cafeId) {
    return axios.get(`${baseUrl}/api/categories/getByCafeId/${cafeId}`);
  }
}

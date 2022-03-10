import axios from "axios";
import baseUrl from "./baseUrl";

export default class OrderService {
  addOrder(values) {
    return axios.post(`${baseUrl}/api/order/add`, values);
  }
}

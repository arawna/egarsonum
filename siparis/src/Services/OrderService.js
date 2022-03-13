import axios from "axios";
import baseUrl from "./baseUrl";

export default class OrderService {
  addOrder(values) {
    return axios.post(`${baseUrl}/api/order/add`, values);
  }
  getActiveOrdersByTableId(tableId) {
    return axios.post(`${baseUrl}/api/order/getActiceOrdersByTableId`, {
      tableId: tableId,
    });
  }
}

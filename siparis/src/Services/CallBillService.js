import axios from "axios";
import baseUrl from "./baseUrl";

export default class CallBillService {
  addCallBill(tableId, cafeId) {
    return axios.post(`${baseUrl}/api/callBill/add`, {
      tableId: tableId,
      cafeId: cafeId,
    });
  }
}

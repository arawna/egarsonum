import axios from "axios";
import baseUrl from "./baseUrl";

export default class CallWaiterService {
  addCallWaiter(tableId, cafeId) {
    return axios.post(`${baseUrl}/api/callWaiter/add`, {
      tableId: tableId,
      cafeId: cafeId,
    });
  }
}

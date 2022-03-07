import axios from "axios";
import baseUrl from "./baseUrl";

export default class CustomerInfoService {
  getIp() {
    return axios.get(`${baseUrl}/api/getMyIp`);
  }
  getCustomerInfoByIp(ip) {
    return axios.post(`${baseUrl}/api/cafe/getCustomerInfoByIp`, { ip: ip });
  }
}

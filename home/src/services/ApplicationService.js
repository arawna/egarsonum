import axios from "axios";

export default class ApplicationService {
  add(values) {
    return axios.post("https://qrgarsonum.com/api/application/add", values);
  }
}

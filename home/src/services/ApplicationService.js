import axios from "axios";

export default class ApplicationService {
  add(values) {
    return axios.post("https://qrgarsonum.arawnsoft.com/api/application/add", values);
  }
}

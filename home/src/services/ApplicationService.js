import axios from "axios";

export default class ApplicationService {
  add(values) {
    return axios.post("http://localhost:8080/api/application/add", values);
  }
}

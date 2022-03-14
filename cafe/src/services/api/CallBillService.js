import axios from 'axios';
import baseUrl from './basurl';

export default class CallBillService {
  getCallBillsByToken(token) {
    return axios.post(`${baseUrl}/api/callBill/getByCafeId`, { token: token });
  }
  setActiveFalseByCallBillId(token, callBillId) {
    return axios.post(`${baseUrl}/api/callBill/setActiveFalseByCallBillId`, {
      token: token,
      callBillId: callBillId,
    });
  }
}

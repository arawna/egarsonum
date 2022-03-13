import axios from 'axios';
import baseUrl from './basurl';

export default class CallWaiterService {
  getCallWaitersByToken(token) {
    return axios.post(`${baseUrl}/api/callWaiter/getByCafeId`, { token: token });
  }
  setActiveFalseByCallWaiterId(token, callWaiterId) {
    return axios.post(`${baseUrl}/api/callWaiter/setActiveFalseByCallWaiterId`, {
      token: token,
      callWaiterId: callWaiterId,
    });
  }
}

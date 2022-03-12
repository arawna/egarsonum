import axios from 'axios';
import baseUrl from './basurl';

export default class OrdersService {
  getActiveAndNotSeenOrders(token) {
    return axios.post(`${baseUrl}/api/order/getActiveAndNotSeenOrdersByCafeId`, { token: token });
  }
  getActiceAndSeenOrders(token) {
    return axios.post(`${baseUrl}/api/order/getActiveAndSeenOrdersByCafeId`, { token: token });
  }
  setSeenTrueByOrderId(token, orderId) {
    return axios.post(`${baseUrl}/api/order/setSeenTrue`, { token: token, orderId: orderId });
  }
  getActiveOrdersByTableId(token, tableId) {
    return axios.post(`${baseUrl}/api/order/getActiceOrdersByTableId`, { token: token, tableId: tableId });
  }
  setActiveFalseByTableId(token, tableId) {
    return axios.post(`${baseUrl}/api/order/setActiveFalseByTableId`, { token: token, tableId: tableId });
  }
}

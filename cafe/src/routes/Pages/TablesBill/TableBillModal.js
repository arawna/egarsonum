import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrdersService from 'services/api/OrdersService';

export default function TableBillModal({ table, handleClose }) {
  let [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateAll = orderList => {
    let tempTotal = 0;
    for (let i = 0; i < orderList.length; i++) {
      tempTotal += orderList[i].amount * parseFloat(orderList[i].product_price);
    }
    setTotalPrice(tempTotal);
  };
  useEffect(() => {
    let ordersService = new OrdersService();
    ordersService.getActiveOrdersByTableId(localStorage.getItem('token'), table.id).then(result => {
      console.log(result.data.data);
      setOrders(result.data.data);
      calculateAll(result.data.data);
    });
    // eslint-disable-next-line
  }, []);

  const handlePayedBtnClick = () => {
    const ordersService = new OrdersService();
    ordersService.setActiveFalseByTableId(localStorage.getItem('token'), table.id).then(result => {
      console.log(result.data.message);
      setOrders([]);
    });
  };

  return (
    <div>
      <TableContainer style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Ürün Fiyatı</TableCell>
              <TableCell>Adet</TableCell>
              <TableCell>Toplam</TableCell>
              <TableCell>Not</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.product_name}</TableCell>
                <TableCell>{order.product_price} ₺</TableCell>
                <TableCell>x{order.amount} Adet</TableCell>
                <TableCell>{parseFloat(order.product_price) * order.amount} ₺</TableCell>
                <TableCell>{order.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>Genel Toplam: {totalPrice} ₺</p>
      <div style={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#E45826', marginRight: '10px' }}
          onClick={() => handlePayedBtnClick()}>
          Ödendi Olarak İşaretle
        </Button>
        <Button variant="contained" onClick={() => handleClose()}>
          Kapat
        </Button>
      </div>
    </div>
  );
}

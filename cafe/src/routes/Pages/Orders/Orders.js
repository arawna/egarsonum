import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import baseUrl from 'services/api/basurl';
import OrdersService from 'services/api/OrdersService';
import socketIOClient from 'socket.io-client';
import swal from 'sweetalert';

const socket = socketIOClient(baseUrl);

export default function Orders() {
  const breadcrumbs = [
    { label: 'Ana Menü', link: '/' },
    { label: 'Siparişler', isActive: true },
  ];
  const { authItem } = useSelector(({ authNew }) => authNew);

  useEffect(() => {
    socket.emit('joincafeId', authItem[0].user.id.toString());
  }, [authItem]);

  let [notSeenOrders, setNotSeenOrders] = useState([]);
  let [seenOrders, setSeenOrders] = useState([]);
  const ordersService = new OrdersService();

  let [reloadValues, setReloadValues] = useState('0');
  const handleReloadValues = () => {
    setReloadValues(new Date().getTime().toString());
  };

  function beep() {
    var snd = new Audio(
      'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=',
    );
    snd.play();
  }

  socket.on('siparis', deger => {
    console.log('sipariş geldi');
    beep();
    handleReloadValues();
    swal('Yeni sipariş geldi!', {
      icon: 'success',
      buttons: 'Tamam',
    });
  });

  const handleClickSetSeenTrue = orderId => {
    ordersService.setSeenTrueByOrderId(localStorage.getItem('token'), orderId).then(result => {
      handleReloadValues();
    });
  };

  useEffect(() => {
    const ordersService = new OrdersService();
    ordersService.getActiveAndNotSeenOrders(localStorage.getItem('token')).then(result => {
      console.log(result.data.data);
      setNotSeenOrders(result.data.data);
    });
    ordersService.getActiceAndSeenOrders(localStorage.getItem('token')).then(result => {
      console.log(result.data.data);
      setSeenOrders(result.data.data);
    });
  }, [reloadValues]);

  return (
    <PageContainer heading="Siparişler" breadcrumbs={breadcrumbs}>
      <h3>Görüntülenmemiş Siparişler</h3>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Görüldü Olarak İşaretle</TableCell>
              <TableCell>Masa Numarası</TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Ürün Fiyatı</TableCell>
              <TableCell>Adet</TableCell>
              <TableCell>Sipariş Notu</TableCell>
              <TableCell>Sipariş Zamanı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notSeenOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleClickSetSeenTrue(order.id)}>
                    Görüldü
                  </Button>
                </TableCell>
                <TableCell>{order.table_no}</TableCell>
                <TableCell>{order.product_name}</TableCell>
                <TableCell>{order.product_price}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.note}</TableCell>
                <TableCell>
                  {new Date(new Date(order.order_date).setHours(new Date(order.order_date).getHours() + 3)).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ marginTop: '20px' }}>Görüntülenmiş Siparişler</h3>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Masa Numarası</TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Ürün Fiyatı</TableCell>
              <TableCell>Adet</TableCell>
              <TableCell>Sipariş Notu</TableCell>
              <TableCell>Sipariş Zamanı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seenOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.table_no}</TableCell>
                <TableCell>{order.product_name}</TableCell>
                <TableCell>{order.product_price}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.note}</TableCell>
                <TableCell>
                  {new Date(new Date(order.order_date).setHours(new Date(order.order_date).getHours() + 3)).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}

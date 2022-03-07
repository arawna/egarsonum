import React from 'react';
import { QRCode } from 'react-qrcode';
import CryptoJS from 'crypto-js';

export default function TableQrModal({ selectedTableForQr }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <QRCode
        value={
          'http://192.168.1.33:5000/api/cafe/' +
          encodeURIComponent(
            CryptoJS.AES.encrypt(selectedTableForQr.cafeId + '----' + selectedTableForQr.tableId, 'ali').toString(),
          )
        }
      />
      {selectedTableForQr.cafeId} - {selectedTableForQr.tableId}
      {'http://localhost:5000/api/cafe/' +
        encodeURIComponent(
          CryptoJS.AES.encrypt(selectedTableForQr.cafeId + '----' + selectedTableForQr.tableId, 'ali').toString(),
        )}
    </div>
  );
}

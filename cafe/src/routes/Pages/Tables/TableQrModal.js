import React from 'react';
import { QRCode } from 'react-qrcode';
import CryptoJS from 'crypto-js';
import baseUrl from 'services/api/basurl';

export default function TableQrModal({ selectedTableForQr }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <QRCode
        value={
          `${baseUrl}/api/cafe/` +
          encodeURIComponent(
            CryptoJS.AES.encrypt(selectedTableForQr.cafeId + '----' + selectedTableForQr.tableId, 'ali').toString(),
          )
        }
      />
      {selectedTableForQr.cafeId} - {selectedTableForQr.tableId}
      {`${baseUrl}/api/cafe/` +
        encodeURIComponent(
          CryptoJS.AES.encrypt(selectedTableForQr.cafeId + '----' + selectedTableForQr.tableId, 'ali').toString(),
        )}
    </div>
  );
}

import React, { createRef } from 'react';
import { QRCode } from 'react-qrcode';
import CryptoJS from 'crypto-js';
import baseUrl from 'services/api/basurl';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { Button } from '@mui/material';

export default function TableQrModal({ selectedTableForQr }) {
  const ref = createRef(null);
  const [, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  });
  const download = (image, { name = 'img', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={ref}>
        <QRCode
          value={
            `${baseUrl}/api/cafe/` +
            encodeURIComponent(
              CryptoJS.AES.encrypt(selectedTableForQr.cafeId + '----' + selectedTableForQr.tableId, 'ali').toString(),
            )
          }
        />
      </div>

      <Button variant="contained" onClick={() => downloadScreenshot()}>
        İndir
      </Button>
      <p style={{ marginTop: '10px' }}>
        {`${baseUrl}/api/cafe/` +
          encodeURIComponent(
            CryptoJS.AES.encrypt(selectedTableForQr.cafeId + '----' + selectedTableForQr.tableId, 'ali').toString(),
          )}
      </p>
    </div>
  );
}

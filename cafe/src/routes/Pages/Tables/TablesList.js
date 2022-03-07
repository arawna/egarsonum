import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import { Add, TableChart } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import TablesService from 'services/api/tablesService';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TableAddModal from './TableAddModal';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import swal from 'sweetalert';
import '../css/addModalStyle.css';
import TableQrModal from './TableQrModal';

export default function TablesList() {
  let token = localStorage.getItem('token');
  let [tables, setTables] = useState([]);

  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const addModalHandleOpen = () => setAddModalOpen(true);
  const addModalHandleClose = () => setAddModalOpen(false);
  let tableService = new TablesService();
  const getTablesData = () => {
    tableService.getTables({ token: token }).then(result => {
      console.log(result.data.data);
      setTables(result.data.data);
    });
  };

  useEffect(() => {
    getTablesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addModalOpen]);

  const handleDeleteClick = tableId => {
    swal({
      title: 'Emin misiniz?',
      text: 'Bu masayı silmek istediginize eminmisiniz!',
      icon: 'warning',
      buttons: ['Iptal', 'Sil!'],
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        tableService.deleteTable({ token: localStorage.getItem('token'), tableId: tableId }).then(result => {
          getTablesData();
          swal('Masa silindi!', {
            icon: 'success',
            buttons: 'Tamam',
          });
        });
      } else {
        swal('Silme işlemi iptal edildi!', {
          buttons: 'Tamam',
        });
      }
    });
  };

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const handleQrModalOpen = () => setQrModalOpen(true);
  const handleQrModalClose = () => setQrModalOpen(false);
  const [selectedTableForQr, setSelectedTableForQr] = useState({ cafeId: 0, tableId: 0 });
  const handleClickQrBtn = tableInfo => {
    setSelectedTableForQr(tableInfo);
    handleQrModalOpen();
  };

  return (
    <div>
      <NotificationContainer />
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button variant="contained" onClick={() => addModalHandleOpen()}>
          <Add /> Masa Ekle
        </Button>
      </div>
      <GridContainer>
        {tables.map(table => (
          <Grid item md={3} xs={12} key={table.id}>
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(97,102,179,1) 18%, rgba(84,65,121,1) 100%)',
                color: 'white',
                borderRadius: '5px',
                marginTop: '10px',
              }}>
              <GridContainer>
                <Grid item md={1} xs={12}></Grid>
                <Grid item md={2} xs={12} style={{ textAlign: 'center' }}>
                  <TableChart style={{ position: 'relative', top: '50%', transform: 'perspective(1px) translateY(-50%)' }} />
                </Grid>
                <Grid item md={2} xs={12} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 25, fontWeight: 'bold' }}>{table.table_no}</p>
                  <p style={{ fontSize: 13, fontWeight: 'bold' }}>Masa</p>
                </Grid>
                <Grid item md={7} xs={12}></Grid>
              </GridContainer>
              <GridContainer>
                <Grid item md={6} xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    style={{ borderColor: 'white', color: 'white', marginLeft: '5px' }}
                    onClick={() => handleClickQrBtn({ cafeId: table.cafe_id, tableId: table.id })}>
                    QR Üret
                  </Button>
                </Grid>
                <Grid item md={6} xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    style={{ borderColor: 'white', color: 'white', marginRight: '5px' }}
                    onClick={() => handleDeleteClick(table.id)}>
                    Masayı Sil
                  </Button>
                </Grid>
              </GridContainer>
            </div>
          </Grid>
        ))}
      </GridContainer>
      <Modal
        open={addModalOpen}
        onClose={addModalHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="addModal">
          <TableAddModal addModalHandleClose={addModalHandleClose} />
        </Box>
      </Modal>
      <Modal
        open={qrModalOpen}
        onClose={handleQrModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="addModal">
          <TableQrModal selectedTableForQr={selectedTableForQr} />
        </Box>
      </Modal>
    </div>
  );
}

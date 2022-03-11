import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import { TableChart } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import TablesService from 'services/api/tablesService';
import Button from '@mui/material/Button';
import 'react-notifications/lib/notifications.css';
import '../css/addModalStyle.css';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';

export default function TablesBill() {
  const breadcrumbs = [
    { label: 'Ana Menü', link: '/' },
    { label: 'Masa Hesapları', isActive: true },
  ];

  let [tables, setTables] = useState([]);
  let tableService = new TablesService();
  const getTablesData = () => {
    tableService.getTables({ token: localStorage.getItem('token') }).then(result => {
      console.log(result.data.data);
      setTables(result.data.data);
    });
  };
  useEffect(() => {
    getTablesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer heading="Masa Hesapları" breadcrumbs={breadcrumbs}>
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
                <Grid item md={12} xs={12} style={{ textAlign: 'center' }}>
                  <Button variant="outlined" style={{ borderColor: 'white', color: 'white' }}>
                    Hesabı Görüntüle
                  </Button>
                </Grid>
              </GridContainer>
            </div>
          </Grid>
        ))}
      </GridContainer>
    </PageContainer>
  );
}

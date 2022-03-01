import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import TablesService from 'services/api/tablesService';
import * as Yup from 'yup';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function TableAddModal({ addModalHandleClose }) {
  const tableService = new TablesService();

  const addTableSchema = Yup.object().shape({
    tableNo: Yup.string().required('Bu alan zorunludur'),
  });

  const formik = useFormik({
    initialValues: {
      token: localStorage.getItem('token'),
      tableNo: '',
    },
    validationSchema: addTableSchema,
    onSubmit: values => {
      tableService
        .addTable(values)
        .then(result => {
          NotificationManager.success(result.data.message, 'Eklendi', 3000);
          addModalHandleClose();
        })
        .catch(result => {
          NotificationManager.error(result.response.data.message, 'Hata', 3000);
          addModalHandleClose();
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="tableNo"
          label="Masa Numarası"
          variant="outlined"
          value={formik.values.tableNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.tableNo && formik.touched.tableNo}
          helperText={formik.errors.tableNo}
          sx={{ width: '100%' }}
        />
        <Button variant="contained" type="submit" sx={{ width: '100%', marginTop: '20px' }}>
          Ekle
        </Button>
      </form>
    </div>
  );
}

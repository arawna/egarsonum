import React from 'react';
import CategoriesService from 'services/api/categoriesService';
import { useDropzone } from 'react-dropzone';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { NotificationManager } from 'react-notifications';

export default function CategoryUpdateModal({ selectedCategory, handleUpdateModalClose, setReloadValues }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map(file => (
    <ListItem key={file.path}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  const addCategorySchema = Yup.object().shape({
    name: Yup.string().required('Bu alan zorunludur'),
  });

  const categoriesService = new CategoriesService();

  const formik = useFormik({
    initialValues: {
      token: localStorage.getItem('token'),
      categoryId: selectedCategory.id,
      name: selectedCategory.name,
      pic: '',
    },
    validationSchema: addCategorySchema,
    onSubmit: values => {
      if (acceptedFiles[0]) {
        const fd = new FormData();
        fd.append('pic', acceptedFiles[0], acceptedFiles[0].name);
        fd.append('name', values.name);
        fd.append('token', values.token);
        fd.append('categoryId', values.categoryId);
        categoriesService
          .updateCategory(fd)
          .then(result => {
            NotificationManager.success(result.data.message, 'Kategori Güncellendi', 3000);
            setReloadValues(new Date().getTime().toString());
            handleUpdateModalClose();
          })
          .catch(result => {
            NotificationManager.error(result.response.data.message, 'Hata', 3000);
            handleUpdateModalClose();
          });
      } else {
        const fd = new FormData();
        fd.append('name', values.name);
        fd.append('token', values.token);
        fd.append('categoryId', values.categoryId);
        categoriesService
          .updateCategory(fd)
          .then(result => {
            NotificationManager.success(result.data.message, 'Kategori Güncellendi', 3000);
            setReloadValues(new Date().getTime().toString());
            handleUpdateModalClose();
          })
          .catch(result => {
            NotificationManager.error(result.response.data.message, 'Hata', 3000);
            handleUpdateModalClose();
          });
        //resim yoksa yapılacaklar
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Typography>Kategori resmini sürükleyip buraya bırak, yada dosya seçmek için buraya tıkla</Typography>
        </Box>
        <aside>
          <Typography component="h4" variant="inherit">
            Seçilen dosya
          </Typography>
          <List>{files}</List>
        </aside>
        <TextField
          id="name"
          label="Kategori Adı"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name && formik.touched.name}
          helperText={formik.errors.name}
          sx={{ width: '100%' }}
        />
        <Button variant="contained" type="submit" sx={{ width: '100%', marginTop: '20px' }}>
          Güncelle
        </Button>
      </form>
    </div>
  );
}

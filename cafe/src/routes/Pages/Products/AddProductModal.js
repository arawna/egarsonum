import { Box, Grid, List, ListItem, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import GridContainer from '@jumbo/components/GridContainer';
import CategoriesService from 'services/api/categoriesService';
import { useSelector } from 'react-redux';
import ProductsService from 'services/api/productsService';
import { NotificationManager } from 'react-notifications';

export default function AddProductModal({ handleAddModalClose, setReloadValues, reloadValues }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map(file => (
    <ListItem key={file.path}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  const addProductSchema = Yup.object().shape({
    productName: Yup.string()
      .required('Ürün adı giriniz')
      .min(2, 'İsim 2 karakterden kısa olamaz')
      .max(45, 'İsim 45 karakterden uzun olamaz'),
    categoryId: Yup.number().required('Kategori seçiniz'),
    productPrice: Yup.number()
      .required('Fiyat giriniz')
      .min(0, 'Fiyat 0 dan az olamaz'),
    prodcuctDescription: Yup.string()
      .required('Ürün açıklaması giriniz')
      .min(2, 'Ürün açıklaması 2 karakterden kısa olamaz')
      .max(300, 'Ürün açıklaması çok uzun'),
  });

  let [picError, setPicError] = useState(false);
  const productsService = new ProductsService();

  const formik = useFormik({
    initialValues: {
      token: localStorage.getItem('token'),
      productName: '',
      categoryId: '',
      productPrice: '',
      prodcuctDescription: '',
      pic: '',
    },
    validationSchema: addProductSchema,
    onSubmit: values => {
      if (acceptedFiles[0]) {
        const fd = new FormData();
        fd.append('pic', acceptedFiles[0], acceptedFiles[0].name);
        fd.append('token', values.token);
        fd.append('productName', values.productName);
        fd.append('categoryId', values.categoryId);
        fd.append('productPrice', values.productPrice);
        fd.append('prodcuctDescription', values.prodcuctDescription);
        productsService
          .addProduct(fd)
          .then(result => {
            NotificationManager.success(result.data.message, 'Eklendi', 3000);
            setReloadValues(new Date().getTime().toString());
            handleAddModalClose();
          })
          .catch(result => {
            NotificationManager.error(result.response.data.message, 'Hata', 3000);
            handleAddModalClose();
          });
      } else {
        setPicError(true);
      }
    },
  });
  const { authItem } = useSelector(({ authNew }) => authNew);
  let [categories, setCategories] = useState([]);
  useEffect(() => {
    const categoriesService = new CategoriesService();
    categoriesService.getCategories(authItem[0].user.id).then(result => {
      setCategories(result.data.data);
    });
  }, [authItem]);

  const handleChangeMaterial = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {picError && <p style={{ color: 'red' }}>Ürün resmi zorunludur</p>}
        <Box {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Typography>Ürün resmini sürükleyip buraya bırak, yada dosya seçmek için buraya tıkla</Typography>
        </Box>
        <aside>
          <Typography component="h4" variant="inherit">
            Seçilen dosya
          </Typography>
          <List>{files}</List>
        </aside>
        <TextField
          id="productName"
          label="Ürün Adı"
          variant="outlined"
          value={formik.values.productName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ width: '100%' }}
          error={formik.errors.productName && formik.touched.productName}
          helperText={formik.errors.productName}
        />
        <div style={{ marginTop: '10px' }}></div>
        <GridContainer>
          <Grid item md={6}>
            <FormControl fullWidth error={formik.errors.categoryId && formik.touched.categoryId}>
              <InputLabel id="categoryId-label">Kategori</InputLabel>
              <Select
                labelId="categoryId-label"
                id="categoryId"
                value={formik.values.categoryId}
                label="Kategori"
                onChange={(event, data) => handleChangeMaterial(event.target.value, 'categoryId')}
                onBlur={formik.handleBlur}>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{formik.errors.categoryId}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="productPrice"
              label="Ürün Fiyatı"
              variant="outlined"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: '100%' }}
              error={formik.errors.productPrice && formik.touched.productPrice}
              helperText={formik.errors.productPrice}
              InputProps={{
                startAdornment: <InputAdornment position="start">₺</InputAdornment>,
              }}
              type="number"
            />
          </Grid>
        </GridContainer>
        <TextField
          id="prodcuctDescription"
          label="Ürün Açıklaması"
          multiline
          rows={4}
          value={formik.values.prodcuctDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.prodcuctDescription && formik.touched.prodcuctDescription}
          helperText={formik.errors.prodcuctDescription}
          style={{ marginTop: '10px', width: '100%' }}
        />
        <Button type="submit" variant="contained" style={{ marginTop: '10px', width: '100%' }}>
          Ürünü Ekle
        </Button>
      </form>
    </div>
  );
}

import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsService from 'services/api/productsService';
import swal from 'sweetalert';
import '../css/addModalStyle.css';
import UpdateProductModal from './UpdateProductModal';

export default function ProductsList({ reloadValues, setReloadValues }) {
  const { authItem } = useSelector(({ authNew }) => authNew);
  let [products, setProducts] = useState([]);
  useEffect(() => {
    let productsService = new ProductsService();
    productsService.getProducts({ cafeId: authItem[0].user.id }).then(result => {
      setProducts(result.data.data);
    });
  }, [authItem, reloadValues]);

  const productsService = new ProductsService();
  const handleDeleteClick = productId => {
    swal({
      title: 'Emin misiniz?',
      text: 'Bu ürünü silmek istediginize eminmisiniz!',
      icon: 'warning',
      buttons: ['Iptal', 'Sil!'],
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        productsService.deleteProduct({ token: localStorage.getItem('token'), productId: productId }).then(result => {
          setReloadValues(new Date().getTime().toString());
          //setReloadValues(categoryId);
          swal('Kategori silindi!', {
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

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => setUpdateModalOpen(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const handleUpdateBtnClick = product => {
    setSelectedProduct(product);
    handleUpdateModalOpen();
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <GridContainer>
        {products.map(product => (
          <Grid item md={3} key={product.product_id}>
            <Card>
              <CardMedia component={'img'} alt={product.product_name} height="140" image={product.product_img_url} />
              <CardContent>
                <Typography gutterBottom variant="h5" component={'div'}>
                  {product.product_name} - {product.product_price}₺
                </Typography>
                <p>Kategori: {product.category_name}</p>
                <p>{product.product_description}</p>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleUpdateBtnClick(product)}>
                  Güncelle
                </Button>
                <Button size="small" onClick={() => handleDeleteClick(product.product_id)}>
                  Sil
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </GridContainer>

      <Modal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="addModal">
          <UpdateProductModal
            selectedProduct={selectedProduct}
            setReloadValues={setReloadValues}
            handleUpdateModalClose={handleUpdateModalClose}
          />
        </Box>
      </Modal>
    </div>
  );
}

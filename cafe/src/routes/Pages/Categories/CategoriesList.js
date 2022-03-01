import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoriesService from 'services/api/categoriesService';
import swal from 'sweetalert';
import CategoryUpdateModal from './CategoryUpdateModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CategoriesList({ setReloadValues, reloadValues }) {
  let [categories, setCategories] = useState([]);
  const { authItem } = useSelector(({ authNew }) => authNew);
  let categoriesService = new CategoriesService();

  useEffect(() => {
    let categoriesService = new CategoriesService();
    categoriesService.getCategories(authItem[0].user.id).then(result => {
      setCategories(result.data.data);
    });
  }, [authItem, reloadValues]);

  const handleDeleteClick = categoryId => {
    swal({
      title: 'Emin misiniz?',
      text: 'Bu kategoriyi silmek istediginize eminmisiniz!',
      icon: 'warning',
      buttons: ['Iptal', 'Sil!'],
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        categoriesService.deleteCategory({ token: localStorage.getItem('token'), categoryId: categoryId }).then(result => {
          setReloadValues(categoryId);
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

  let [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  let [selectedCategory, setSelectedCategory] = useState({ id: 0, name: '' });

  const handleUpdateBtnClick = (categoryId, categoryName) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    handleUpdateModalOpen();
  };

  return (
    <div>
      <GridContainer>
        {categories.map(category => (
          <Grid item md={3} key={category.id}>
            <Card>
              <CardMedia component={'img'} alt={category.name} height="140" image={category.img_url} />
              <CardContent>
                <Typography gutterBottom variant="h5" component={'div'}>
                  {category.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleUpdateBtnClick(category.id, category.name)}>
                  Güncelle
                </Button>
                <Button size="small" onClick={() => handleDeleteClick(category.id)}>
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
        <Box sx={style}>
          <CategoryUpdateModal
            selectedCategory={selectedCategory}
            setReloadValues={setReloadValues}
            handleUpdateModalClose={handleUpdateModalClose}
          />
        </Box>
      </Modal>
    </div>
  );
}

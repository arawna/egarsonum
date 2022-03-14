import React, { useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Box, Button, Modal } from '@mui/material';
import { Add } from '@material-ui/icons';
import AddProductModal from './AddProductModal';
import ProductsList from './ProductsList';
import '../css/addModalStyle.css';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 800,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function Products() {
  const breadcrumbs = [
    { label: 'Düzenleme', link: '/' },
    { label: 'Ürünler', isActive: true },
  ];

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [reloadValues, setReloadValues] = useState(new Date().getTime().toString());

  return (
    <PageContainer heading="Ürünler" breadcrumbs={breadcrumbs}>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => handleAddModalOpen()} variant="contained">
          <Add /> Ürün Ekle
        </Button>
      </div>
      <ProductsList setAddModalOpen={setAddModalOpen} reloadValues={reloadValues} setReloadValues={setReloadValues} />

      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="addModal">
          <AddProductModal
            handleAddModalClose={handleAddModalClose}
            setReloadValues={setReloadValues}
            reloadValues={reloadValues}
          />
        </Box>
      </Modal>
    </PageContainer>
  );
}

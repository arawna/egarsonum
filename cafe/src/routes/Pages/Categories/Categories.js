import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Add } from '@material-ui/icons';
import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import CategoriesList from './CategoriesList';
import CategoryAddModal from './CategoryAddModal';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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

export default function Categories() {
  const breadcrumbs = [
    { label: 'Düzenleme', link: '/' },
    { label: 'Kategoriler', isActive: true },
  ];

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  let [reloadValues, setReloadValues] = useState('0');

  return (
    <PageContainer heading="Kategoriler" breadcrumbs={breadcrumbs}>
      <NotificationContainer />
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button variant="contained" onClick={() => handleAddModalOpen()}>
          <Add /> Kategori Ekle
        </Button>
      </div>
      <CategoriesList reloadValues={reloadValues} setReloadValues={setReloadValues} />

      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="addModal">
          <CategoryAddModal handleAddModalClose={handleAddModalClose} setReloadValues={setReloadValues} />
        </Box>
      </Modal>
    </PageContainer>
  );
}

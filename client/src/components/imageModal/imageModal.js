
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PHOTO_INFO } from '../../constants';
import styles from './imageModal.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ImageModal = ({ handleClose, photo}) => {

  return (
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <img src={photo.imageUrl} className={styles.imageModal} alt='photo' />
            {PHOTO_INFO.map( info => <div key={info}>{info}: {photo[info]}</div>)}
        </Box>
      </Modal>
  );
}

export default ImageModal;
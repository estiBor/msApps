import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './gridGallery.module.css';
import ImageModal from '../imageModal/imageModal';

const GridGallery = () => {
    const photos = useSelector(state => state.photo.photos);
    const [ showModal, setShowModal ] = useState(false);
    const [ photo, setPhoto ] = useState({});

    //open the modal
    const open = (photo) => {
        setPhoto(photo);
        setShowModal(true);
    }

    //close the modal
    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div>
            { showModal && <ImageModal photo={photo} handleClose={handleClose} />}
            
            <div className={styles.gridGallery}>
                {photos.map((photo) => (
                    <img 
                        key={photo.id} 
                        className={styles.photo} 
                        src={photo.imageUrl} 
                        onClick={()=>open(photo)} 
                        alt='photo' 
                    />
                ))}
            </div>
        </div>
    )
}

export default GridGallery;
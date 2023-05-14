import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './gridGallery.css';
import ImageModal from '../imageModal/imageModal';

const GridGallery = () => {
    const photos = useSelector(state => state.photo.photos);
    const [ showModal, setShowModal ] = useState(false);
    const [ photo, setPhoto ] = useState({});

    const open = (photo) => {
        setPhoto(photo);
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div>
            { showModal && <ImageModal photo={photo} handleClose={handleClose} />}
            
            <div className='grid-gallery'>
                {photos.map((photo) => (
                    <img 
                        key={photo.id} 
                        className='photo' 
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
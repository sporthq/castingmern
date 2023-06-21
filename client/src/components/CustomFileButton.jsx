import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const CustomFileButton = ({ onChange }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const textColor = useColorModeValue('orange.100', 'orange.700');
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Box display="flex" justifyContent="left" alignItems="flex-start" flexDirection="column">
        {!previewImage ? (
          <Box
            rounded="md"
            mb="6"
            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
            onClick={handleButtonClick}
            w={'200px'}
           
            display="flex"
            justifyContent="left"
            alignItems="center"
          >
            <MdOutlineAddPhotoAlternate size={100} />
          </Box>
        ) : (
          <Image
            rounded="md"
            mb="6"
            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
            onClick={handleButtonClick}
            w={'200px'}
            src={previewImage}
          />
        )}

        {previewImage && (
          <Text mb={2} bg={textColor} textAlign="center" fontSize="sm">
            Kliknij na zdjęcie, jeśli chcesz je zmienić
          </Text>
        )}
      </Box>
    </>
  );
};

export default CustomFileButton;

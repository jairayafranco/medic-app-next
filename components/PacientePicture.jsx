import UploadIcon from '@mui/icons-material/Upload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Webcam from "react-webcam";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Confirm from './Confirm';
import styles from '../styles/components/userPicture.module.css';
import { useState, useRef } from 'react';

export default function PacientePicture() {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            console.log(reader.result);
        }
    }

    return (
        <Box className={styles.userImgContainer}>
            <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{ width: 170, height: 170 }}
            />
            <ButtonGroup orientation='vertical' variant="contained">
                <Confirm
                    buttonTitle="Tomar Foto"
                    title="Tomar Foto"
                    content={
                        <Webcam
                            audio={false}
                            height={420}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={550}
                        />
                    }
                    buttonAction={() => {
                        const imageSrc = webcamRef.current.getScreenshot();
                        setImage(imageSrc);
                        console.log(imageSrc);
                    }}
                    buttonColor="secondary"
                    buttonComponentType="label"
                    buttonStartIcon={<CameraAltIcon />}

                />
                <Button component="label" startIcon={<UploadIcon />}>
                    Subir Foto
                    <input
                        type="file"
                        hidden
                        accept='image/jpeg'
                        onChange={handleUploadImage}
                    />
                </Button>
                <Button color="success" component="label" disabled={!!!image}>Guardar</Button>
            </ButtonGroup>
        </Box>
    );
} 
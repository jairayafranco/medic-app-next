import UploadIcon from '@mui/icons-material/Upload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import Webcam from "react-webcam";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Confirm from './Confirm';
import styles from '../styles/components/userPicture.module.css';
import { useState, useRef, useEffect } from 'react';
import { uploadImage, deleteImage } from '../firebase/config';
import { getSessionStorageData, saveSessionStorageData } from '../helpers/helpers';
import { AppContext } from '../context/AppContext';
import { updatePaciente } from '../api/axiosApi';

export default function PacientePicture() {
    const { notifyHandler, backdropHandler } = AppContext();
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const paciente = getSessionStorageData("datosBasicos");

    const handleUploadImage = (e) => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImage(imageSrc);
            return;
        }

        const file = e?.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const handleSaveImage = () => {
        if (!image) return;
        if (!paciente?.idUsuario) return notifyHandler(true, "warning", "No se ha seleccionado un paciente");

        backdropHandler(true);
        uploadImage("pacientes", { name: paciente.idUsuario, file: image })
            .then(url => {
                updatePaciente({ ...paciente, foto: url }).then(res => {
                    if (!res.status) {
                        notifyHandler(true, res.type, res.message);
                        return;
                    }

                    notifyHandler(true, res.type, "Imagen guardada");
                    saveSessionStorageData("datosBasicos", { ...paciente, foto: url });
                }).finally(() => {
                    backdropHandler(false);
                    setImage(null);
                })
            }).catch(err => {
                notifyHandler(true, "error", "Error al subir la imagen");
                console.log("error", err);
            });
    }

    const handleDeleteImage = () => {
        if (!paciente?.foto) return notifyHandler(true, "warning", "El paciente no tiene una imagen asignada");

        backdropHandler(true);
        deleteImage("pacientes", paciente.idUsuario)
            .then(() => {
                updatePaciente({ ...paciente, foto: null }).then(res => {
                    if (!res.status) {
                        notifyHandler(true, res.type, res.message);
                        return;
                    }

                    notifyHandler(true, res.type, "Imagen eliminada");
                    saveSessionStorageData("datosBasicos", { ...paciente, foto: null });
                }).finally(() => {
                    backdropHandler(false);
                    setImage(null);
                })
            }).catch(err => {
                notifyHandler(true, "error", "Error al eliminar la imagen");
                console.log("error", err);
            })
    }

    return (
        <Box className={styles.userImgContainer}>
            <Avatar
                alt="Remy Sharp"
                src={image ? image : paciente?.foto}
                sx={{ width: 170, height: 170 }}
            />
            <ButtonGroup orientation='horizontal' variant="contained" size="small">
                <Confirm
                    buttonTitle={
                        <Tooltip title="Tomar foto" placement="bottom">
                            <CameraAltIcon />
                        </Tooltip>
                    }
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
                    buttonAction={handleUploadImage}
                    buttonColor="secondary"
                    buttonComponentType="label"
                />
                <Tooltip title="Subir foto" placement="bottom">
                    <Button component="label" variant="contained">
                        <UploadIcon />
                        <input
                            type="file"
                            hidden
                            accept='image/*'
                            onChange={handleUploadImage}
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Guardar" placement="bottom">
                    <Button component="label" color="success" variant="contained" onClick={handleSaveImage} disabled={!image}>
                        <CheckIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Cancelar" placement="bottom">
                    <Button component="label" color="warning" variant="contained" onClick={() => setImage(null)} disabled={!image}>
                        <ClearIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Eliminar Imagen" placement="bottom" disabled={!paciente?.foto}>
                    <Button component="label" color="error" variant="contained" onClick={handleDeleteImage}>
                        <DeleteIcon />
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </Box>
    );
} 
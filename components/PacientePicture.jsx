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
import { useState, useRef } from 'react';
import { uploadImage, deleteImage } from '../firebase/config';
import { getSessionStorageData, saveSessionStorageData } from '../helpers/helpers';
import { AppContext } from '../context/AppContext';
import { updatePaciente } from '../api/axiosApi';

export default function PacientePicture() {
    const { setNotify, setBackdrop } = AppContext();
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

    const handleFirebaseImage = async ({ method, data }) => {
        if (method === "upload" && !paciente?.idUsuario) return setNotify({ open: true, type: "warning", message: "No se ha seleccionado un paciente" });

        const options = {
            upload: {
                method: () => uploadImage("pacientes", data),
                messages: {
                    success: "Imagen guardada correctamente",
                    error: "Error al guardar la imagen"
                }
            },
            delete: {
                method: () => deleteImage("pacientes", data),
                messages: {
                    success: "Imagen eliminada correctamente",
                    error: "Error al eliminar la imagen"
                }
            }
        }[method];

        if (!options) throw new Error("No se ha especificado un método válido");

        setBackdrop(true);
        try {
            const uploadDeleteFirebaseImage = await options.method();
            await updatePaciente({ ...paciente, foto: uploadDeleteFirebaseImage === undefined ? null : uploadDeleteFirebaseImage });
            setNotify({ open: true, type: "success", message: options.messages.success });
            saveSessionStorageData("datosBasicos", { ...paciente, foto: uploadDeleteFirebaseImage || null });
        } catch (error) {
            console.log(error);
            setNotify({ open: true, type: "error", message: options.messages.error });
        } finally {
            setBackdrop(false);
            setImage(null);
        }
    }

    return (
        <Box className={styles.userImgContainer}>
            <Avatar
                alt={paciente?.nombreUsuario}
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
                    <Button component="label" color="success" onClick={() => handleFirebaseImage({ method: "upload", data: { name: paciente?.idUsuario, file: image } })} disabled={!image}>
                        <CheckIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Cancelar" placement="bottom">
                    <Button component="label" color="warning" onClick={() => setImage(null)} disabled={!image}>
                        <ClearIcon />
                    </Button>
                </Tooltip>
                <Confirm
                    buttonTitle={
                        <Tooltip title="Eliminar Imagen" placement="bottom">
                            <DeleteIcon />
                        </Tooltip>
                    }
                    title="Eliminar Imagen"
                    content="¿Está seguro que desea eliminar la imagen?"
                    buttonAction={() => handleFirebaseImage({ method: "delete", data: paciente?.idUsuario })}
                    buttonColor="error"
                    buttonComponentType="label"
                    disabled={!paciente?.foto}
                />
            </ButtonGroup>
        </Box>
    );
} 
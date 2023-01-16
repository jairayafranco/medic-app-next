import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirm({ buttonTitle, title, content, buttonAction, disabled, buttonColor, buttonStartIcon, buttonComponentType }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleButtonAction = () => {
        buttonAction();
        handleClose();
    }

    return (
        <>
            <Button variant="contained" component={buttonComponentType} color={buttonColor} onClick={handleClickOpen} disabled={disabled} startIcon={buttonStartIcon}>
                {buttonTitle}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancelar</Button>
                    <Button onClick={handleButtonAction}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
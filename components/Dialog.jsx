import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from '../context/AppContext';

export default function FormDialog({ buttonTitle, title, label, buttonActionTitle, buttonAction }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [input, setInput] = useState('');
    const { closeDialog } = AppContext();

    useEffect(() => {
        if (closeDialog) {
            handleClose();
        }
    }, [closeDialog]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInput('');
        setError(false);
    };

    const handleButtonAction = (e) => {
        e.preventDefault();
        if (!input) return setError(true);
        buttonAction(input);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                {buttonTitle}
            </Button>

            <Dialog component="form" onSubmit={handleButtonAction} open={open} onClose={handleClose} maxWidth='sm' fullWidth={true} >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={label}
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setInput(e.target.value)}
                        error={error}
                        helperText={error ? 'El campo es requerido' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                    <Button variant='contained' type='submit'>{buttonActionTitle}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
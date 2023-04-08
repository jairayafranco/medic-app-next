import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useNotifyStore from '../store/useNotifyStore';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notify() {
    const { open, type, message, setNotify } = useNotifyStore();

    const handleClose = () => {
        setNotify({ open: false, type, message });
    };

    return (
        <Snackbar open={open} autoHideDuration={3500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
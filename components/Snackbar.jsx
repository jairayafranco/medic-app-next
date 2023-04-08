import { forwardRef, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useNotifyStore from '../store/useNotifyStore';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notify() {
    const notify = useNotifyStore();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => notify.open ? setOpen(true) : setOpen(false), [notify]);

    return (
        <Snackbar open={open} autoHideDuration={3500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={notify.type} sx={{ width: '100%' }}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
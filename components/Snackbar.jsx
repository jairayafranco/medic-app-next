import { forwardRef, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notify({ call }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (call.open) setOpen(true);
    }, [call])

    const handleClose = () => setOpen(false);

    return (
        <Snackbar open={open} autoHideDuration={3500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={call.type} sx={{ width: '100%' }}>
                {call.message}
            </Alert>
        </Snackbar>
    );
}
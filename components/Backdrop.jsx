import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useNotifyStore from '../store/useNotifyStore';

export default function Loader() {
    const { backdrop } = useNotifyStore();

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1300 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
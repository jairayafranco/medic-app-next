import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner({ minHeight = '100vh' }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={minHeight}
        >
            <CircularProgress />
        </Box>
    );
}

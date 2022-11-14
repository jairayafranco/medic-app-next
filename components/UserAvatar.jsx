import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';

export default function UserAvatar() {
    function useNetwork() {
        const [isOnline, setNetwork] = useState(window.navigator.onLine);

        const updateNetwork = () => {
            setNetwork(window.navigator.onLine);
            return setNotify({
                open: true,
                message: !isOnline ? '¡Conectado!' : '¡Desconectado!',
                type: !isOnline ? 'success' : 'warning',
            });
        };
        useEffect(() => {
            window.addEventListener("offline", updateNetwork);
            window.addEventListener("online", updateNetwork);
            return () => {
                window.removeEventListener("offline", updateNetwork);
                window.removeEventListener("online", updateNetwork);
            };
        });
        return isOnline;
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: useNetwork() ? '#44b700' : '#D32F2F',
            color: useNetwork() ? '#44b700' : '#D32F2F',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <Stack direction="row" spacing={2}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar sx={{ width: 32, height: 32 }}><PersonIcon /></Avatar>
            </StyledBadge>
        </Stack>
    );
}
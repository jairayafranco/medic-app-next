import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/router';
import { clearSessionStorageData } from '../helpers/helpers';
import { getUserProfile, logout } from '../api/axiosApi';

export default function AccountMenu() {
    // const [userName, setUserName] = useState('');

    const router = useRouter();

    useEffect(() => {
        getUserProfile().then(res => {
            setUserName(res.username);
        }).catch(err => {
            console.error('Error al obtener el perfil del usuario', err);
        });
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <form autoComplete='off' sx={{ zIndex: 100 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ ml: 1 }}>{''}</Typography>
                <Tooltip title="Ajustes de cuenta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        variant="dot"
                        sx={{ ml: 0.5 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <UserAvatar />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    {userName}
                </MenuItem>

                <MenuItem onClick={() => router.push('/panel/ajustes')}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    Ajustes
                </MenuItem>

                <MenuItem onClick={() => {
                    logout().then(res => {
                        if (!res.status) {
                            console.log(res);
                            return;
                        }
                        clearSessionStorageData();
                        router.replace('/login');
                    });
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar Sesion
                </MenuItem>
            </Menu>
        </form>
    );
}
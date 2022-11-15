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
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AccountMenu() {
    const [userName, setUserName] = useState('');

    const router = useRouter();

    useEffect(() => {
        axios.get('/api/settings/profile').then(res => {
            setUserName(res.data.username);
        }).catch(err => {
            console.log(err);
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
                    {userName.charAt(0).toUpperCase() + userName.slice(1)}
                </MenuItem>

                <MenuItem onClick={() => router.push('/panel/ajustes')}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    Ajustes
                </MenuItem>

                <MenuItem onClick={() => {
                    axios.post('/api/auth/logout').then(() => {
                        window.location.reload();
                    }).catch(err => {
                        console.log(err);
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
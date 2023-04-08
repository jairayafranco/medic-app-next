import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Tooltip } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountMenu from '../components/AccountMenu';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import Logo from '../public/logo.png';
import Image from 'next/image';
import useThemeStore from '../store/useThemeStore';

const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7.1)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Dashboard({ children }) {
    const [open, setOpen] = useState(false);
    const [pageParams, setPageParams] = useState({
        title: '',
        active: null,
    });
    const router = useRouter();

    const { themeMode, setTheme } = useThemeStore();
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setTheme(themeMode().palette.mode === 'dark' ? 'light' : 'dark');
        }
    }), []);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const icons = [<PersonIcon />, <FeaturedPlayListIcon />, <FolderSharedIcon />,
    <MedicalServicesIcon />, <BloodtypeIcon />, <AccessibilityNewIcon />,
    <AssessmentIcon />, <FormatListNumberedIcon />, <AccountBalanceWalletIcon />];

    const routes = [
        { name: 'Datos Básicos', route: '/panel/datos-basicos', active: 0 },
        { name: 'Anamnesis y Revisión por Sistemas', route: '/panel/anamnesis', active: 1 },
        { name: 'Antecedentes', route: '/panel/antecedentes', active: 2 },
        { name: 'Signos Vitales', route: '/panel/signos-vitales', active: 3 },
        { name: 'Función Renal - Tasa Filtración Glomerular', route: '/panel/funcion-renal', active: 4 },
        { name: 'Examen Físico', route: '/panel/examen-fisico', active: 5 },
        { name: 'Impresión Diagnóstica - Análisis', route: '/panel/impresion-diagnostica', active: 6 },
        { name: 'Formulación', route: '/panel/formulacion', active: 7 },
        { name: 'Facturación', route: '/panel/facturacion', active: 8 },
    ];

    useEffect(() => {
        const { name: title, active } = routes.find(route => route.route === window.location.pathname) || {};
        setPageParams({ title, active });
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            {pageParams.title}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                color: 'text.primary',
                                borderRadius: 1,
                            }}
                        >
                            {
                                router.pathname !== '/panel' && (
                                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                                        <Image src={Logo} alt='Logo' width={40} height={40} style={{ borderRadius: 10 }} />
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="div"
                                            sx={{
                                                flexGrow: 1,
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem',
                                                marginRight: 2,
                                                alignSelf: 'center',
                                            }}
                                        >
                                            Consultorio Medico D. Samuel Aya
                                        </Typography>
                                    </Box>
                                )
                            }

                            <Tooltip title='Menu Principal' placement='bottom'>
                                <IconButton onClick={() => {
                                    router.push('/panel')
                                    setPageParams({ title: '', active: null })
                                }}
                                >
                                    <HomeIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={themeMode().palette.mode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'} placement='bottom'>
                                <IconButton onClick={() => {
                                    colorMode.toggleColorMode();
                                }} sx={{ color: '#fff' }}>
                                    {themeMode().palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Tooltip>

                            <AccountMenu />
                        </Box>

                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>

                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {themeMode().direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>

                    <Divider />

                    <List>
                        {['DI', 'ARS', 'ANT', 'SV', 'TFEF', 'EF', 'IDA', 'FORM', 'FACT'].map((text, index) => (
                            <ListItem
                                key={text}
                                disablePadding
                                sx={{ display: 'block' }}
                                onClick={() => {
                                    setPageParams({ title: routes[index].name, active: routes[index].active });
                                    open && setOpen(false);
                                    router.push(routes[index].route);
                                }}
                                style={index === pageParams.active ? { backgroundColor: themeMode().palette.primary.main, borderRadius: 10 } : { borderRadius: 10 }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: index === pageParams.active && 'white'
                                        }}
                                    >
                                        <Tooltip title={routes[index].name.toUpperCase()} placement='right'>
                                            {icons[index]}
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText secondary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {children}
                </Box>

            </Box>
        </>
    );
}
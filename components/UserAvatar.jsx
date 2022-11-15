import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';

export default function UserAvatar() {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar sx={{ width: 32, height: 32 }}><PersonIcon /></Avatar>
        </Stack>
    );
}
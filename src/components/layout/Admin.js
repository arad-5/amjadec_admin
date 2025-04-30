import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Typography, Chip, Stack } from '@mui/material'
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone'

const Admin = () => {
    const { admin } = useContext(AuthContext)

    if (!admin) return null

    const getRoleChip = (role) => {
        switch (role) {
            case 'owner':
                return <Chip label="مالک" color="warning" size="small" />
            case 'admin':
                return <Chip label="ادمین" color="primary" size="small" />
            case 'editor':
                return <Chip label="ادیتور" color="default" size="small" />
            default:
                return <Chip label="نامشخص" color="error" size="small" />
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
            <Stack direction="row" alignItems="center" spacing={1}>
                <PermIdentityTwoToneIcon fontSize="small" />
                <Typography
                    variant="body2"
                    fontWeight="600"
                    color="text.primary"
                >
                    {admin.fullname}
                </Typography>
            </Stack>
            {getRoleChip(admin.role)}
        </Stack>
    )
}

export default Admin

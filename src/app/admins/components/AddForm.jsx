import TextField from '@mui/material/TextField'
import { Box } from '@mui/system'
import RoleSelect from './RoleSelect'
import PermissionSwitches from './PermissionSwitches'

function AddForm({
    setOpen,
    fullname,
    setFullname,
    phone,
    setPhone,
    role,
    setRole,
    permissions,
    setPermissions,
}) {
    return (
        <Box
            component="form"
            sx={{ m: 1, mt: 3 }}
            noValidate
            autoComplete="off"
            className="min-w-80"
        >
            <TextField
                label="نام و نام خانوادگی"
                variant="outlined"
                sx={{ mb: 2 }}
                value={fullname}
                fullWidth
                onChange={(e) => setFullname(e.currentTarget.value)}
            />
            <TextField
                id="filled-basic"
                label="شماره موبایل"
                sx={{ mb: 2 }}
                variant="outlined"
                value={phone}
                fullWidth
                onChange={(e) => setPhone(e.currentTarget.value)}
            />
            <RoleSelect role={role} setRole={setRole} />
            <PermissionSwitches
                permissions={permissions}
                setPermissions={setPermissions}
            />
        </Box>
    )
}

export default AddForm

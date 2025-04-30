import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import RoleSelect from './RoleSelect'
import PermissionSwitches from './PermissionSwitches'
import { AdminEditDialogContext } from '../context/AdminEditDialogContextProvider'

function EditForm() {
    const {
        fullname,
        setFullname,
        phone,
        setPhone,
        role,
        setRole,
        permissions,
        setPermissions,
    } = useContext(AdminEditDialogContext)
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
                fullWidth
                value={fullname}
                onChange={(e) => setFullname(e.currentTarget.value)}
            />
            <TextField
                id="filled-basic"
                sx={{ mb: 2 }}
                label="شماره موبایل"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
            />
            {role === 'owner' ? null : (
                <>
                    <RoleSelect role={role} setRole={setRole} />
                    <PermissionSwitches
                        permissions={permissions}
                        setPermissions={setPermissions}
                    />
                </>
            )}
        </Box>
    )
}
export default EditForm

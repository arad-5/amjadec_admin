import {
    FormControlLabel,
    FormGroup,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect } from 'react'
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
    useEffect(() => {
        console.log(permissions)
    }, [permissions])

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
            {role === 'owner' ? (
                <FormGroup sx={{ width: '100%' }}>
                    <Typography fontSize={18} mb={1}>
                        دسترسی ها
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        <Typography fontSize={16} sx={{ mr: 2 }}>
                            ارسال پیامک سفارش ثبت شده
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={permissions.includes(
                                        'sendOrderSms'
                                    )}
                                    onChange={() => {
                                        setPermissions(
                                            permissions.includes('sendOrderSms')
                                                ? []
                                                : ['sendOrderSms']
                                        )
                                    }}
                                />
                            }
                            label=""
                        />
                    </Box>
                </FormGroup>
            ) : (
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

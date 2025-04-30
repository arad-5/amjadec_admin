import React, { useContext } from 'react'
import {
    FormGroup,
    Typography,
    Box,
    Switch,
    FormControlLabel,
} from '@mui/material'
import { AdminEditDialogContext } from '../context/AdminEditDialogContextProvider'

const PERMISSIONS = [
    { key: 'excel', label: 'اکسل' },
    { key: 'products:add', label: 'افزودن محصول' },
    { key: 'products:edit', label: 'تغییر محصول' },
    { key: 'products:delete', label: 'حذف محصول' },
    { key: 'products:confirm', label: 'انتشار محصول' },
    { key: 'categories:add', label: 'افزودن دسته بندی' },
    { key: 'categories:edit', label: 'تغییر دسته بندی' },
    { key: 'categories:delete', label: 'حذف دسته بندی' },
    { key: 'questions', label: 'تایید و پاسخ سوالات' },
    { key: 'comments', label: 'تایید و پاسخ نظرات' },
    { key: 'banners', label: 'تغییرات بنر' },
]

export default function PermissionSwitches({ permissions, setPermissions }) {
    const handleToggle = (key) => {
        if (permissions.includes(key)) {
            setPermissions(permissions.filter((perm) => perm !== key))
        } else {
            setPermissions([...permissions, key])
        }
    }

    return (
        <FormGroup sx={{ width: '100%' }}>
            <Typography fontSize={18} mb={1}>
                دسترسی ها
            </Typography>
            <Box>
                {PERMISSIONS.map(({ key, label }) => (
                    <Box
                        key={key}
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                    >
                        <Typography fontSize={16} sx={{ mr: 2 }}>
                            {label}
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={permissions.includes(key)}
                                    onChange={() => handleToggle(key)}
                                />
                            }
                            label=""
                        />
                    </Box>
                ))}
            </Box>
        </FormGroup>
    )
}

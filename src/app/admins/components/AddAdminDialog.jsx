import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'

import PermissionSwitches from './PermissionSwitches'
import axiosInstance from '@/utils/axios'
import RoleSelect from './RoleSelect'

import { Box, CircularProgress, Typography } from '@mui/material'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
import { enqueueSnackbar } from 'notistack'
import AddForm from './AddForm'

const AddAdminDialog = ({ handleRefresh }) => {
    const [open, setOpen] = useState(false)
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        if (fullname && role && phone) {
            try {
                setLoading(true)
                const res = await axiosInstance.post('/admin/admins', {
                    fullname,
                    phone,
                    role,
                    permissions,
                })

                enqueueSnackbar('ادمین با موفقیت ثبت شد', {
                    variant: 'success',
                })
                handleClose()
                handleRefresh()
            } catch (error) {
                const message = error?.response?.data?.message
                    ? error?.response?.data?.message
                    : error.message
                enqueueSnackbar(message, {
                    variant: 'error',
                })
            } finally {
                setLoading(false)
            }
        } else {
            enqueueSnackbar('مقادیر نام و شماره موبایل , وظیفه الزامی است', {
                variant: 'error',
            })
        }
    }
    const handleClose = () => {
        setOpen(false)
        setFullname('')
        setPhone('')
        setRole('')
        setPermissions([])
    }

    return (
        <Box>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<AddTwoToneIcon />}
                    onClick={() => setOpen(true)}
                >
                    افزودن ادمین
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="border-b">
                    <PersonAddAltTwoToneIcon sx={{ marginRight: 1 }} />
                    افزودن ادمین
                </DialogTitle>
                <DialogContent>
                    <AddForm
                        handleSubmit={handleSubmit}
                        setOpen={setOpen}
                        fullname={fullname}
                        setFullname={setFullname}
                        phone={phone}
                        setPhone={setPhone}
                        role={role}
                        setRole={setRole}
                        permissions={permissions}
                        setPermissions={setPermissions}
                        handleClose={handleClose}
                        handleRefresh={handleRefresh}
                    />
                </DialogContent>
                <DialogActions className="border-t">
                    <Button onClick={handleClose}>بستن</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        loading={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                size={'1.2rem'}
                                sx={{ marginRight: 2 }}
                                color="#fff"
                            />
                        ) : null}
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AddAdminDialog

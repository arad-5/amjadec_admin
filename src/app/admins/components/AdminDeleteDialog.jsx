import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import { useContext } from 'react'

import { Box } from '@mui/system'
import { CircularProgress, IconButton } from '@mui/material'
import { AdminDeleteDialogContext } from '../context/AdminDeleteDialogContextProvider'
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone'
import axiosInstance from '@/utils/axios'
const AdminDeleteDialog = ({ handleRefresh }) => {
    const { open, setOpen, admin } = useContext(AdminDeleteDialogContext)
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
    }
    const handleSubmit = async () => {
        try {
            setLoading(true)
            console.log(admin)
            const res = await axiosInstance.delete('/admin/admins/' + admin._id)
            console.log(res)
            setLoading(false)
            handleRefresh()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            handleClose()
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <IconButton sx={{ marginRight: 1 }} onClick={handleClose}>
                    <PersonRemoveTwoToneIcon />
                </IconButton>
                حذف ادمین
            </DialogTitle>
            <DialogContent className="min-w-96">
                <DialogContentText
                    component={'div'}
                    id="alert-dialog-description"
                >
                    <ul>
                        <li className="mb-2">
                            نام و نام خانوادگی:{' '}
                            <span className="font-semibold mr-3">
                                {admin?.fullname}
                            </span>
                        </li>
                        <li>
                            وظیفه:{' '}
                            <span className="font-semibold mr-3">
                                {admin?.role}
                            </span>
                        </li>
                    </ul>
                </DialogContentText>
            </DialogContent>
            <DialogActions className="border-t">
                <Button onClick={handleClose}>بستن</Button>
                <Button
                    variant="contained"
                    color="error"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    {loading ? (
                        <CircularProgress size={'1.2rem'} color="#fff" />
                    ) : null}
                    حذف
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AdminDeleteDialog

import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DialogTitle from '@mui/material/DialogTitle'
import { useContext } from 'react'
import { AdminEditDialogContext } from '../context/AdminEditDialogContextProvider'
import { CircularProgress } from '@mui/material'
import axiosInstance from '@/utils/axios'
import { enqueueSnackbar } from 'notistack'

import EditForm from './EditForm'
const AdminEditDialog = ({ handleRefresh }) => {
    const {
        open,
        setOpen,
        fullname,
        phone,
        role,
        adminId,
        permissions,
        handleClearContext,
    } = useContext(AdminEditDialogContext)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.put(
                '/admin/admins/' + adminId,
                {
                    fullname,
                    phone,
                    role,
                    permissions,
                }
            )

            handleClearContext()
            handleRefresh()
            handleClose()
        } catch (err) {
            console.log(err)

            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                enqueueSnackbar(err.response.data.message, {
                    variant: 'error',
                })
            } else {
                console.log('مشکلی پیش آمده است.')
            }
        } finally {
            setLoading(false)
        }
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="border-b">
                <EditTwoToneIcon sx={{ marginRight: 1 }} />
                ویرایش ادمین
            </DialogTitle>
            <DialogContent>
                <EditForm />
            </DialogContent>
            <DialogActions className="border-t">
                <Button onClick={handleClose}>بستن</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    {loading ? (
                        <CircularProgress
                            size={'1.2rem'}
                            sx={{ marginRight: 2 }}
                            color="#fff"
                        />
                    ) : null}
                    ذخیره تغییرات
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AdminEditDialog

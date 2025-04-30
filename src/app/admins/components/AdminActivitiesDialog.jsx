import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import { useContext } from 'react'
import { AdminActivitiesDialogContext } from '../context/AdminActivitiesDialogContextProvider'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
const AdminActivitiesDialog = () => {
    const { open, setOpen, admin } = useContext(AdminActivitiesDialogContext)
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
            <DialogTitle id="alert-dialog-title">
                <IconButton sx={{ marginRight: 1 }} onClick={handleClose}>
                    <CloseTwoToneIcon />
                </IconButton>
                فعالیت های {admin?.fullname}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default AdminActivitiesDialog

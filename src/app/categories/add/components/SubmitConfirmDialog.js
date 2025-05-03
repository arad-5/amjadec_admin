import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContextProvider'

export default function SubmitConfirmDialog({ handleSubmit }) {
    const [open, setOpen] = React.useState(false)
    const { title, description, slug, isMain, parent, image } =
        useContext(CategoryContext)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                افزودن دسته بندی
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">تایید مشخصات</DialogTitle>
                <DialogContent>
                    <Box flex>
                        <Typography>عنوان:</Typography>
                        <Typography>{title}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        flexDirection: 'row-reverse',
                    }}
                >
                    <Button onClick={handleClose} color="inherit">
                        لغو
                    </Button>
                    <Button variant="contained" onClick={handleClose} autoFocus>
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

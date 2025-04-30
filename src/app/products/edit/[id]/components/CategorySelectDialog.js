import { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import axiosInstance from '@/utils/axios'
import CategoryTreeSelect from './CategoryTreeSelect'
import { EditProductContext } from '../context/EditProductContextProvider'

import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import { IconButton } from '@mui/material'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'

export default function CategorySelectDialog() {
    const { categoryObj } = useContext(EditProductContext)

    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)

    return (
        <>
            {categoryObj?._id === categoryObj?.title ? (
                <Button onClick={() => setOpen(true)} variant="contained">
                    {categoryObj?._id ? categoryObj?.title : 'انتخاب دسته بندی'}
                </Button>
            ) : (
                <div className="p-4 rounded-md bg-blue-50 flex justify-between items-center">
                    <div>
                        <CategoryTwoToneIcon
                            fontSize="medium"
                            className="text-blue-800 ml-2"
                        />
                        <span className="text-lg font-semibold text-blue-800">
                            {categoryObj.title}
                        </span>
                    </div>
                    <IconButton onClick={() => setOpen(true)} size="medium">
                        <EditTwoToneIcon fontSize="inherit" />
                    </IconButton>
                </div>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                className=""
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="scroll-dialog-title">
                    انتخاب دسته بندی
                </DialogTitle>
                <DialogContent
                    className="sm:min-w-96 min-w-40 w-full "
                    dividers={'paper'}
                >
                    <CategoryTreeSelect />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        لغو
                    </Button>
                    <Button onClick={handleClose} variant="contained">
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

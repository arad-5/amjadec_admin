import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { CategoryDeleteContext } from '../context/CategoryDeleteContextProvider'
import { useContext } from 'react'
import { useState } from 'react'
import axiosInstance from '@/utils/axios'
import { enqueueSnackbar } from 'notistack'
export default function CategoryDeleteDialog({ onUpdate }) {
    const { open, setOpen, title, categoryId } = useContext(
        CategoryDeleteContext
    )
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            const res = await axiosInstance.delete(
                '/admin/categories/' + categoryId
            )
            console.log(res)
            if (res?.data?.success) {
                enqueueSnackbar('دسته بندی با موفقیت حذف شد', {
                    variant: 'success',
                })
                onUpdate()
            }
        } catch (error) {
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="alert-dialog-title">حذف دسته بندی</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    آیا از حذف دسته‌بندی با عنوان{' '}
                    <b className="mx-2">{title}</b> اطمینان دارید؟
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="inherit">
                    لغو
                </Button>
                <Button
                    startIcon={<DeleteTwoToneIcon />}
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    autoFocus
                    loading={loading}
                >
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    )
}

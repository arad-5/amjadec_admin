import React, { useContext, useEffect, useState } from 'react'
import {
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Stack,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { FileDeleteDialogContext } from '../context/FileDeleteDialogContextProvider'
import moment from 'moment-jalaali'
import axiosInstance from '@/utils/axios'
import { enqueueSnackbar } from 'notistack'

const FileDeleteDialog = ({ handleRefresh }) => {
    const { file, open, setOpen } = useContext(FileDeleteDialogContext)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (file?.url && file?.format?.startsWith('image')) {
            setPreviewUrl(file.url)
        } else {
            setPreviewUrl(null)
        }
    }, [file])

    const handleSubmit = async () => {
        setLoading(true)
        setMessage(null)
        try {
            await axiosInstance.delete(`/admin/files/${file._id}`)

            enqueueSnackbar({
                message: ' فایل با موفقیت حذف شد',
                variant: 'success',
            })
            setOpen(false)
            handleRefresh()
        } catch (err) {
            console.error(err)
            enqueueSnackbar({
                message: '❌ خطا در حذف فایل',
                variant: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setPreviewUrl(null)
        setMessage(null)
    }

    const truncateTitle = (title, maxLength = 20) => {
        if (!title) return ''
        return title.length > maxLength
            ? title.substring(0, maxLength) + '...'
            : title
    }

    const formatFileSize = (size) => {
        if (size < 1024) return size + ' بایت'
        if (size < 1024 * 1024) return Math.round(size / 1024) + ' کیلوبایت'
        return Math.round(size / (1024 * 1024)) + ' مگابایت'
    }

    const formatPersianDate = (dateString) => {
        return moment(dateString).format('jYYYY/jMM/jDD')
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    حذف فایل
                </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Stack alignItems="center" spacing={2}>
                    {previewUrl && (
                        <Card sx={{ width: '100%', maxWidth: 400 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={previewUrl}
                                alt="پیش‌نمایش فایل"
                            />
                        </Card>
                    )}

                    <Typography variant="subtitle1" fontWeight={600}>
                        {truncateTitle(file?.filename)}
                    </Typography>

                    <Box textAlign="center">
                        <Typography variant="body2">
                            فرمت: {file?.format}
                        </Typography>
                        <Typography variant="body2">
                            حجم: {formatFileSize(file?.size)}
                        </Typography>
                        <Typography variant="body2">
                            تاریخ ایجاد: {formatPersianDate(file?.createdAt)}
                        </Typography>
                    </Box>

                    {message && (
                        <Typography
                            mt={2}
                            color={message.includes('✅') ? 'green' : 'error'}
                        >
                            {message}
                        </Typography>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>لغو</Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={
                        loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <DeleteIcon />
                        )
                    }
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    حذف
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FileDeleteDialog

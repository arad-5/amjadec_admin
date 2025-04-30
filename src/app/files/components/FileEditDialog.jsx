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
    Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import UploadIcon from '@mui/icons-material/Upload'
import axios from 'axios'
import { FileEditDialogContext } from '../context/FileEditDialogContextProvider'
import moment from 'moment-jalaali'
import axiosInstance from '@/utils/axios'
import { enqueueSnackbar } from 'notistack'

const FileEditDialog = ({ handleRefresh }) => {
    const { setFile, file, fileId, oldType, open, setOpen, currentFileUrl } =
        useContext(FileEditDialogContext)

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(currentFileUrl || null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (!file) return
        setFile(file)

        const newType = file.type.split('/')[0]

        if (newType !== oldType) {
            setMessage(
                `فرمت فایل انتخاب شده (${newType}) (${oldType}) با فرمت فایل قبلی  همخوانی ندارد !`
            )
            setSelectedFile(null)
            return
        }

        setSelectedFile(file)

        if (newType === 'image') {
            const reader = new FileReader()
            reader.onload = (e) => setPreviewUrl(e.target.result)
            reader.readAsDataURL(file)
        } else {
            setPreviewUrl(null)
        }

        setMessage(null)
    }
    useEffect(() => {
        console.log(selectedFile)
    }, [selectedFile])

    const handleSubmit = async () => {
        if (!selectedFile) return
        setLoading(true)
        setMessage(null)

        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const res = await axiosInstance.put(
                `/admin/files/${fileId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            )

            enqueueSnackbar({
                message: ' فایل با موفقیت تغییر کرد',
                variant: 'success',
            })
            setOpen(false)
            handleRefresh()
        } catch (err) {
            console.error(err)
            setMessage('❌ خطا در تغییر فایل')
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedFile(null)
        setPreviewUrl(currentFileUrl || null)
        setMessage(null)
    }

    // کوتاه کردن عنوان
    const truncateTitle = (title, maxLength = 20) => {
        if (!title) return ''
        return title.length > maxLength
            ? title.substring(0, maxLength) + '...'
            : title
    }

    // فرمت حجم فایل (بدون اعشار)
    const formatFileSize = (size) => {
        if (size < 1024) {
            return size + ' بایت'
        } else if (size < 1024 * 1024) {
            return Math.round(size / 1024) + ' کیلوبایت'
        } else {
            return Math.round(size / (1024 * 1024)) + ' مگابایت'
        }
    }

    // فرمت تاریخ جلالی
    const formatPersianDate = (dateString) => {
        return moment(dateString).format('jYYYY/jMM/jDD')
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    ویرایش
                </DialogTitle>

                <DialogContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Tooltip title="Select New File">
                            <IconButton
                                component="label"
                                sx={{ border: '1px dashed gray', p: 2, mb: 3 }}
                            >
                                <UploadIcon fontSize="large" />
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </IconButton>
                        </Tooltip>
                        {previewUrl && oldType === 'image' && (
                            <Card sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={previewUrl}
                                    alt="File Preview"
                                />
                            </Card>
                        )}
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            fontWeight="bold"
                        >
                            {truncateTitle(file.filename, 20)}
                        </Typography>

                        {/* جزئیات فایل به صورت متن ساده */}
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                                فرمت: {file.format}
                            </Typography>
                            <Typography variant="body2">
                                حجم: {formatFileSize(file.size)}
                            </Typography>
                            <Typography variant="body2">
                                تاریخ ایجاد: {formatPersianDate(file.createdAt)}
                            </Typography>
                        </Box>

                        {message && (
                            <Typography
                                mt={2}
                                color={
                                    message.includes('✅') ? 'green' : 'error'
                                }
                            >
                                {message}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>لغو</Button>
                    <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={handleSubmit}
                        disabled={!selectedFile || loading}
                    >
                        {loading ? (
                            <CircularProgress size={22} color="inherit" />
                        ) : (
                            'تایید تغییرات'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FileEditDialog

// components/FileListDialog.js
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Checkbox,
    TextField,
    IconButton,
    Box,
    Skeleton,
} from '@mui/material'
import { ArrowBack, ArrowForward, InsertDriveFile } from '@mui/icons-material'
import axios from 'axios'
import axiosInstance from '@/utils/axios'

// اگر می‌خواهید از آیکن متفاوت برای فایل‌ها استفاده کنید، در اینجا ایمپورت نمایید:
// import { Description } from '@mui/icons-material'

function FileListDialog({ open, onClose, onConfirm }) {
    const [page, setPage] = useState(1)
    const [limit] = useState(6) // تعداد آیتم‌ها در هر صفحه
    const [files, setFiles] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [selectedFileIds, setSelectedFileIds] = useState([])

    // برای نمایش یا عدم نمایش اسکلتون
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // عبارت جستجو
    const [searchTerm, setSearchTerm] = useState('')

    // فراخوانی فایل‌ها از سرور
    useEffect(() => {
        if (!open) return

        const fetchFiles = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await axiosInstance.get('/admin/files', {
                    params: {
                        page,
                        limit,
                        search: searchTerm, // این پارامتر را به سرور می‌فرستیم
                    },
                })
                const data = response.data

                if (data.success) {
                    setFiles(data.files)
                    setTotalPages(data.totalPages)
                } else {
                    setError('خطایی هنگام دریافت فایل‌ها رخ داد.')
                }
            } catch (err) {
                console.error(err)
                setError('خطایی در ارتباط با سرور رخ داد.')
            } finally {
                setLoading(false)
            }
        }

        fetchFiles()
    }, [open, page, limit, searchTerm])

    // مدیریت انتخاب/عدم انتخاب یک فایل
    const handleToggle = (fileId) => {
        setSelectedFileIds((prev) => {
            if (prev.includes(fileId)) {
                return prev.filter((id) => id !== fileId)
            } else {
                return [...prev, fileId]
            }
        })
    }

    // تایید انتخاب و ارسال فایل‌های انتخاب‌شده به والد
    const handleConfirm = () => {
        const selectedFiles = files.filter((f) =>
            selectedFileIds.includes(f._id)
        )
        onConfirm(selectedFiles)
        // در صورت تمایل انتخاب‌ها را ریست کنید
        setSelectedFileIds([])
        setPage(1) // برگرداندن به صفحه اول (اختیاری)
        setSearchTerm('') // ریست جستجو (اختیاری)
    }

    // بستن دیالوگ
    const handleClose = () => {
        onClose()
        setSelectedFileIds([])
        setPage(1)
        setSearchTerm('')
    }

    // کنترل صفحه قبلی/بعدی
    const goToNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1)
        }
    }
    const goToPreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    // کنترل تغییر در فیلد جستجو
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setPage(1) // با هر تغییر جستجو، به صفحه 1 برگردیم
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>انتخاب فایل</DialogTitle>

            {/* فیلد جستجو در هدر دیالوگ */}
            <Box sx={{ px: 3, mb: 1 }}>
                <TextField
                    label="جستجو بر اساس شناسه یا نام فایل"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Box>

            <DialogContent dividers>
                {loading && (
                    <Grid container spacing={2}>
                        {Array.from({ length: limit }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={140}
                                />
                                <Skeleton width="60%" />
                                <Skeleton width="40%" />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {!loading && error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                {/* نمایش فایل‌ها در قالب گرید کارت */}
                {!loading && !error && files.length > 0 && (
                    <Grid container spacing={2}>
                        {files.map((file) => {
                            const isSelected = selectedFileIds.includes(
                                file._id
                            )

                            return (
                                <Grid item xs={12} sm={6} md={4} key={file._id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderColor: isSelected
                                                ? 'primary.main'
                                                : 'divider',
                                            borderWidth: isSelected ? 2 : 1,
                                            borderStyle: 'solid',
                                        }}
                                    >
                                        {/* اگر فایل عکس باشد، نمایش تصویر، در غیر این صورت نمایش آیکن */}
                                        {file.type === 'image' ? (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={file.url} // لینک عکس
                                                alt={file.filename}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: 140,
                                                    backgroundColor: '#f0f0f0',
                                                }}
                                            >
                                                <InsertDriveFile
                                                    sx={{
                                                        fontSize: 48,
                                                        color: '#888',
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        <CardContent>
                                            <Typography
                                                variant="subtitle1"
                                                noWrap
                                            >
                                                {file.filename}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                noWrap
                                            >
                                                نوع: {file.type} | فرمت:{' '}
                                                {file.format}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                اندازه: {file.size} بایت
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() =>
                                                    handleToggle(file._id)
                                                }
                                            />
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                )}

                {/* در صورت خالی بودن نتیجه جستجو */}
                {!loading && !error && files.length === 0 && (
                    <Typography sx={{ mt: 2 }}>هیچ فایلی یافت نشد.</Typography>
                )}
            </DialogContent>

            {/* کنترل‌های پیمایش صفحه (Pagination) */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ArrowBack />
                </IconButton>
                <Typography sx={{ mx: 2 }}>
                    صفحه {page} از {totalPages}
                </Typography>
                <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages || totalPages === 0}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    انصراف
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                >
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FileListDialog

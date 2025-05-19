'use client'
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
    Box,
    Skeleton,
    Pagination,
} from '@mui/material'
import { InsertDriveFile } from '@mui/icons-material'
import axiosInstance from '@/utils/axios'

function FileListDialog({ open, onClose, onConfirm }) {
    const [page, setPage] = useState(1)
    const [limit] = useState(6)
    const [files, setFiles] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [selectedFileIds, setSelectedFileIds] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (!open) return

        const fetchFiles = async () => {
            try {
                setLoading(true)
                const res = await axiosInstance.get('/admin/files', {
                    params: { page, limit, search: searchTerm },
                })
                const data = res.data
                if (data.success) {
                    setFiles(data.files)
                    const totalCount = data.totalCount || 0
                    setTotalPages(Math.ceil(totalCount / limit))
                } else {
                    setError('خطایی هنگام دریافت فایل‌ها رخ داد.')
                }
            } catch (err) {
                console.error(err)
                setError('ارتباط با سرور برقرار نشد.')
            } finally {
                setLoading(false)
            }
        }

        fetchFiles()
    }, [open, page, limit, searchTerm])

    const handleToggle = (fileId) => {
        setSelectedFileIds((prev) =>
            prev.includes(fileId)
                ? prev.filter((id) => id !== fileId)
                : [...prev, fileId]
        )
    }

    const handleConfirm = () => {
        const selected = files.filter((f) => selectedFileIds.includes(f._id))
        onConfirm(selected)
        setSelectedFileIds([])
        setPage(1)
        setSearchTerm('')
    }

    const handleClose = () => {
        onClose()
        setSelectedFileIds([])
        setPage(1)
        setSearchTerm('')
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setPage(1)
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>انتخاب فایل</DialogTitle>

            <Box sx={{ px: 3, mb: 1 }}>
                <TextField
                    label="جستجو بر اساس نام یا شناسه"
                    fullWidth
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Box>

            <DialogContent dividers>
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: limit }).map((_, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Skeleton variant="rectangular" height={140} />
                                <Skeleton width="80%" />
                                <Skeleton width="60%" />
                            </Grid>
                        ))}
                    </Grid>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : files.length === 0 ? (
                    <Typography>هیچ فایلی یافت نشد.</Typography>
                ) : (
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
                                        }}
                                    >
                                        {file.type === 'image' ? (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={file.url}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    height: 140,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#f5f5f5',
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
                                            <Typography noWrap>
                                                {file.filename}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
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
            </DialogContent>

            {/* صفحه‌بندی با MUI Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                />
            </Box>

            <DialogActions>
                <Button onClick={handleClose}>انصراف</Button>
                <Button onClick={handleConfirm} variant="contained">
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FileListDialog

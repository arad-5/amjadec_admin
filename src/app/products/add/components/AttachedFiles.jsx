'use client'
import React, { useContext, useState } from 'react'
import {
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    TextField,
    Grid,
} from '@mui/material'

import { InsertDriveFile } from '@mui/icons-material'
import FileListDialog from './FileListDialog'
import { ProductContext } from '../context/ProductContextProvider'

const AttachedFiles = () => {
    const { attachedFiles, setAttachedFiles } = useContext(ProductContext)

    const [openDialog, setOpenDialog] = useState(false)
    const [manualFileId, setManualFileId] = useState('')

    const handleAddManualFile = () => {
        const trimmed = manualFileId.trim()
        if (!trimmed) return

        if (attachedFiles.some((f) => f._id === trimmed)) return

        setAttachedFiles((prev) => [
            ...prev,
            {
                _id: trimmed,
                filename: `شناسه: ${trimmed}`,
                type: 'unknown',
                format: '-',
                url: '',
            },
        ])
        setManualFileId('')
    }

    const handleConfirmDialog = (files) => {
        const newFiles = files.filter(
            (file) => !attachedFiles.some((f) => f._id === file._id)
        )
        setAttachedFiles((prev) => [...prev, ...newFiles])
        setOpenDialog(false)
    }

    return (
        <Box className="rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="pb-3 mb-6 border-b">
                <span className="text-lg font-semibold">
                    {' '}
                    فایل‌های پیوست شده
                </span>
            </div>

            <Grid container spacing={2} mb={3}>
                {attachedFiles.map((file) => (
                    <Grid item xs={12} sm={6} md={4} key={file._id}>
                        <Card>
                            {file.type === 'image' && file.url ? (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={file.url}
                                    alt={file.filename}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        height: 140,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#eee',
                                    }}
                                >
                                    <InsertDriveFile fontSize="large" />
                                </Box>
                            )}
                            <CardContent>
                                <Typography noWrap>{file.filename}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mb={3}>
                <TextField
                    label="افزودن دستی شناسه فایل"
                    value={manualFileId}
                    onChange={(e) => setManualFileId(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <Button variant="contained" onClick={handleAddManualFile}>
                    افزودن دستی
                </Button>
            </Box>

            <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                انتخاب از لیست فایل‌ها
            </Button>

            <FileListDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleConfirmDialog}
            />
        </Box>
    )
}

export default AttachedFiles

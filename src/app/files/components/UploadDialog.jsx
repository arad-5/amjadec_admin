import React, { useContext, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone'
import { Button, LinearProgress, Typography, Box, Paper } from '@mui/material'

import axios from 'axios'
import axiosInstance from '@/utils/axios'
import Image from 'next/image'
import FileUpload from './FileUpload'
import { FileUploadDialogContext } from '@/context/FileUploadDialogContextProvider'

export default function UploadDialog({ handleRefresh }) {
    const { open, setOpen } = useContext(FileUploadDialogContext)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState('')

    const handleClickOpen = () => () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedFiles([])
        setUploadedFiles([])
        setUploadProgress(0)
    }
    // Handle File Upload
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setError('Please select files first!')
            return
        }

        const formData = new FormData()
        selectedFiles.forEach((file) => formData.append('files', file))

        try {
            const response = await axiosInstance.post(
                '/admin/files/upload',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setUploadProgress(percentCompleted)
                    },
                }
            )

            setUploadedFiles(response.data.files)
            setUploadProgress(0)
            setSelectedFiles([])
            handleRefresh()
        } catch (error) {
            setError('File upload failed')
            console.error(error)
        }
    }
    const descriptionElementRef = React.useRef(null)
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="scroll-dialog-title">آپلود فایل</DialogTitle>
                <DialogContent dividers={true}>
                    <FileUpload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        uploadedFiles={uploadedFiles}
                        setUploadedFiles={setUploadedFiles}
                        uploadProgress={uploadProgress}
                        setUploadProgress={setUploadProgress}
                        handleUpload={handleUpload}
                        error={error}
                        setError={setError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        لغو
                    </Button>
                    {/* Upload Button */}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={!(selectedFiles.length > 0)}
                        startIcon={<UploadFileTwoToneIcon />}
                    >
                        {selectedFiles.length > 0 ? (
                            <span>آپلود {selectedFiles.length} فایل</span>
                        ) : (
                            'آپلود'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

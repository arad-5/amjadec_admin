import React, { useState } from 'react'
import { Button, LinearProgress, Typography, Box, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import axios from 'axios'
import FilePreviewer from './FilePreviewer'
import axiosInstance from '@/utils/axios'
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone'
import { cn } from '@/utils/cn'

const FileUpload = ({
    selectedFiles,
    setSelectedFiles,
    uploadedFiles,
    setUploadedFiles,
    uploadProgress,
    setUploadProgress,
    error,
    setError,
}) => {
    // Handle File Selection
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files)
        setSelectedFiles(files)
        setError('')
    }

    return (
        <div>
            {/* File Input */}
            <div className="sticky top-0 ">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <label htmlFor="file-input">
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<FileOpenTwoToneIcon />}
                        className="!mb-4"
                    >
                        انتخاب فایل ها
                    </Button>
                </label>
            </div>

            {/* Preview Selected Files Before Upload */}
            {selectedFiles.length > 0 && (
                <div>
                    <div className="mb-3">
                        <span>فایل های انتخاب شده:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {selectedFiles.map((file, index) => (
                            <FilePreviewer
                                key={index}
                                file={file}
                                isUploaded={false}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Progress */}
            {uploadProgress > 0 && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                    />
                    <Typography variant="body2">{uploadProgress}%</Typography>
                </Box>
            )}

            {/* Preview Uploaded Files */}
            {uploadedFiles.length > 0 && (
                <div className={cn('p-4 rounded-lg border')}>
                    <div className="mb-3">
                        <span>فایل های آپدیت شده:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {uploadedFiles.map((file, index) => (
                            <FilePreviewer
                                key={index}
                                file={file}
                                isUploaded={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Error Handling */}
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </div>
    )
}

export default FileUpload

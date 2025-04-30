import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import axiosInstance from '@/utils/axios'
import { useEffect } from 'react'
import { cn } from '@/utils/cn'
import { enqueueSnackbar } from 'notistack'
import ExcelUploadForm from './ExcelUploadForm'
import UploadResult from './UploadResult'

function ProdcutExcelImport() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadResult, setUploadResult] = useState(null)

    const [loading, setLoading] = useState(false)

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    // Handle form submission (upload)
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedFile) {
            enqueueSnackbar({
                message: 'لطفا فایل اکسل را قبل اپلود بارگزاری کنید',
                variant: 'error',
            })
            return
        }

        setLoading(true)

        setUploadResult(null)

        try {
            // Prepare form data
            const formData = new FormData()
            formData.append('file', selectedFile)

            // Make the POST request to your bulk-import endpoint
            const response = await axiosInstance.post(
                '/admin/products/excel-import',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            // On success, store the results (created/updated) in state
            setUploadResult(response.data.messages)
            const errors = response.data.errors
            if (errors) {
                enqueueSnackbar({
                    message: errors.join('\n'),
                    variant: 'error',
                })
            }
        } catch (err) {
            // Handle and display errors
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message

            enqueueSnackbar({
                message,
                variant: 'error',
            })
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        console.log(uploadResult)

        return () => {}
    }, [uploadResult])

    return (
        <Box sx={{ p: 3 }}>
            <ExcelUploadForm
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                selectedFile={selectedFile}
                loading={loading}
            />
            <UploadResult uploadResult={uploadResult} />
        </Box>
    )
}

export default ProdcutExcelImport

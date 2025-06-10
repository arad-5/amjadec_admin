'use client'
import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'

import { EditProductContext } from '../context/EditProductContextProvider'
import FilePicker from '@/components/files/FilePicker'

const ProductFileSection = () => {
    const {
        mainImage,
        setMainImage,
        images,
        setImages,
        attachedFiles,
        setAttachedFiles,
        symbolFile,
        setSymbolFile,
        datasheetFile,
        setDatasheetFile,
        footprintFile,
        setFootprintFile,
        file3d,
        setFile3d,
    } = useContext(EditProductContext)

    return (
        <Box className="bg-white rounded-lg shadow-md p-4 my-4">
            <Typography variant="h6" gutterBottom>
                فایل‌های مرتبط با محصول
            </Typography>
            <FilePicker
                label="فایل‌های پیوست"
                value={attachedFiles}
                onChange={setAttachedFiles}
                multiple
            />
            <FilePicker
                label="فایل نماد"
                value={symbolFile}
                onChange={setSymbolFile}
            />
            <FilePicker
                label="دیتاشیت"
                value={datasheetFile}
                onChange={setDatasheetFile}
            />
            <FilePicker
                label="فوت‌پرینت"
                value={footprintFile}
                onChange={setFootprintFile}
            />
            <FilePicker
                label="فایل سه‌بعدی"
                value={file3d}
                onChange={setFile3d}
            />
        </Box>
    )
}

export default ProductFileSection

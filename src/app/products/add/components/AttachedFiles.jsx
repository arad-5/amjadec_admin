// import { Button, Input, TextField } from '@mui/material'
// import React, { useContext, useState } from 'react'
// import { ProductContext } from '../context/ProductContextProvider'

// const AttachedFiles = () => {
//     const { attachedFiles, setAttachedFiles } = useContext(ProductContext)
//     const [newFile, setNewFile] = useState(null)

//     return (
//         <div className="rounded-lg shadow-md bg-white p-4 mb-4">
//             <div className="pb-3 mb-6 border-b">
//                 <span className="text-lg font-semibold">فایل های پیوست</span>
//             </div>
//             <ul className="mb-6">
//                 {attachedFiles.map((file, i) => (
//                     <li key={i}>{file}</li>
//                 ))}
//             </ul>
//             <form>
//                 <TextField
//                     label="شناسه فایل"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     className="!mb-4"
//                     value={newFile}
//                     onChange={(e) => setNewFile(e.target.value)}
//                 />
//                 <Button
//                     variant="contained"
//                     onClick={() =>
//                         setAttachedFiles((curr) => [...curr, newFile])
//                     }
//                 >
//                     افزودن
//                 </Button>
//             </form>
//         </div>
//     )
// }

// pages/product/add.js (یا صفحه‌ای که فرم ایجاد محصول را دارید)
import React, { useState } from 'react'
import {
    Button,
    Typography,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Checkbox,
} from '@mui/material'
import { InsertDriveFile } from '@mui/icons-material'
import FileListDialog from './FileListDialog' // مسیر را درست تنظیم کنید

function ProductAddPage() {
    // حالت باز/بسته بودن دیالوگ
    const [openDialog, setOpenDialog] = useState(false)

    // فایل‌های انتخاب‌شده
    const [selectedFiles, setSelectedFiles] = useState([])

    // باز کردن دیالوگ
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    // بستن دیالوگ
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    // زمانی که کاربر در دیالوگ فایل‌ها را تایید می‌کند
    const handleConfirmDialog = (files) => {
        setSelectedFiles(files)
        setOpenDialog(false)
    }

    return (
        <Box sx={{ p: 2 }}>
            {/* دیالوگ انتخاب فایل */}
            <FileListDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDialog}
            />
        </Box>
    )
}

export default ProductAddPage

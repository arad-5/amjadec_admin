import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { Box, Grid, useTheme } from '@mui/system'
import React, { useContext, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew' // برای بازکردن در تب جدید

import { red } from '@mui/material/colors'

import { FileEditDialogContext } from '../context/FileEditDialogContextProvider'
import truncateTitle from '../utils/truncateTitle'
import formatFileSize from '../utils/formatFileSize'
import formatPersianDate from '../utils/formatPersianDate'
import handleViewFile from '../utils/handleViewFile'
import { FileDeleteDialogContext } from '../context/FileDeleteDialogContextProvider'

const ImageCard = ({ file }) => {
    const theme = useTheme()
    // منوی سه‌نقطه برای هر کارت
    const [menuAnchors, setMenuAnchors] = useState({})

    // شناسه فایلی که کپی شده (برای تغییر آیکون کپی به تیک)
    const [copiedFileId, setCopiedFileId] = useState(null)
    // کپی لینک
    // const handleCopyLink = async (url) => {
    //     try {
    //         await navigator.clipboard.writeText(url)
    //         alert('لینک کپی شد!')
    //     } catch {
    //         alert('متأسفانه لینک کپی نشد!')
    //     }
    // }

    // کپی شناسه فایل
    const handleCopyId = async (id) => {
        try {
            await navigator.clipboard.writeText(id)
            setCopiedFileId(id)
            setTimeout(() => {
                setCopiedFileId(null)
            }, 2000)
        } catch {
            alert('متأسفانه کپی شناسه انجام نشد!')
        }
    }

    const {
        fileId,
        setFile,
        setFileId,
        oldType,
        setOldType,
        fileUrl,
        open,
        setOpen: setEditDialogOpen,
        setCurrentFileUrl,
    } = useContext(FileEditDialogContext)
    const { setOpen: setDeleteDialogOpen, setFile: setDeleteFile } = useContext(
        FileDeleteDialogContext
    )
    // ویرایش
    const handleEdit = (file) => {
        console.log(file)
        setEditDialogOpen(true)
        setFileId(file._id)
        setCurrentFileUrl(file.url)
        setOldType(file.type)
        setFile(file)
    }

    // حذف
    const handleDelete = (file) => {
        setDeleteDialogOpen(true)
        setDeleteFile(file)
        try {
        } catch (error) {}
    }

    // باز کردن منوی سه‌نقطه
    const handleMenuOpen = (e, fileId) => {
        setMenuAnchors((prev) => ({
            ...prev,
            [fileId]: e.currentTarget,
        }))
    }

    // بستن منوی سه‌نقطه
    const handleMenuClose = (fileId) => {
        setMenuAnchors((prev) => ({
            ...prev,
            [fileId]: null,
        }))
    }

    // const resolutionText =
    //     file.width && file.height
    //         ? `${file.width}x${file.height}`
    //         : 'بدون رزولوشن'

    return (
        <Card
            sx={{
                p: 2,
                position: 'relative',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
            }}
        >
            {/* دکمه کپی شناسه */}
            <Tooltip
                title={copiedFileId === file._id ? 'کپی شد!' : 'کپی شناسه'}
                arrow
            >
                <IconButton
                    onClick={() => handleCopyId(file._id)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 48,
                    }}
                    size="small"
                >
                    {copiedFileId === file._id ? (
                        <CheckIcon fontSize="small" color="success" />
                    ) : (
                        <ContentCopyIcon fontSize="small" />
                    )}
                </IconButton>
            </Tooltip>

            {/* منوی سه‌نقطه */}
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
                onClick={(e) => handleMenuOpen(e, file._id)}
                size="small"
            >
                <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
                anchorEl={menuAnchors[file._id] || null}
                open={Boolean(menuAnchors[file._id])}
                onClose={() => handleMenuClose(file._id)}
            >
                {/* آیتم 1) مشاهده (باز کردن در تب جدید) */}
                <MenuItem
                    sx={{
                        paddingX: '10px',
                    }}
                    onClick={() => {
                        handleViewFile(file.url)
                        handleMenuClose(file._id)
                    }}
                >
                    <OpenInNewIcon
                        sx={{
                            mr: 1,

                            fontSize: '1.2rem',
                        }}
                    />
                    مشاهده
                </MenuItem>

                {/* آیتم 2) کپی لینک */}
                {/* <MenuItem
                    sx={{
                        paddingX: '10px',
                    }}
                    onClick={() => {
                        handleCopyLink(file.url)
                        handleMenuClose(file._id)
                    }}
                >
                    <LinkIcon
                        sx={{
                            fontSize: '1.2rem',
                            mr: 1,
                        }}
                    />
                    کپی لینک
                </MenuItem> */}

                {/* آیتم 3) ویرایش */}
                <MenuItem
                    sx={{
                        paddingX: '10px',
                    }}
                    onClick={() => {
                        handleEdit(file)
                        handleMenuClose(file._id)
                    }}
                >
                    <EditIcon
                        sx={{
                            fontSize: '1.2rem',
                            mr: 1,
                        }}
                    />
                    ویرایش
                </MenuItem>

                {/* آیتم 4) حذف */}
                <MenuItem
                    onClick={() => {
                        handleDelete(file)
                        // handleMenuClose(file._id)
                    }}
                    sx={{
                        paddingX: '10px',

                        ':hover': {
                            backgroundColor: red[500],
                            color: '#fff',
                        },
                        fontSize: '16px',
                    }}
                >
                    <DeleteIcon
                        sx={{
                            mr: 1,
                            fontSize: '1.2rem',
                        }}
                    />
                    حذف
                </MenuItem>
            </Menu>

            {/* تصویر */}
            <CardMedia
                component="img"
                sx={{
                    mt: 1,
                    height: 200,
                    borderRadius: 1,
                    objectFit: 'contain',
                    backgroundColor: theme.palette.grey[100],
                }}
                image={file.url}
                alt={file.filename}
            />

            {/* محتوای کارت: نمایش اطلاعات به صورت متن ساده */}
            <CardContent sx={{ px: 0, pt: 2 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    {truncateTitle(file.filename, 20)}
                </Typography>

                {/* جزئیات فایل به صورت متن ساده */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">فرمت: {file.format}</Typography>
                    <Typography variant="body2">
                        حجم: {formatFileSize(file.size)}
                    </Typography>
                    <Typography variant="body2">
                        تاریخ ایجاد: {formatPersianDate(file.createdAt)}
                    </Typography>
                    {/* <Typography variant="body2">
                        رزولوشن: {resolutionText}
                    </Typography> */}
                </Box>
            </CardContent>
        </Card>
    )
}

export default ImageCard

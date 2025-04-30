// components/BannerManager.jsx
'use client'

import React, { useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Stack,
    CircularProgress,
    TextField,
} from '@mui/material'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const bannersInitial = [
    { id: 'main', title: 'بنر اصلی', image: null, link: '' },
    { id: 'b1', title: 'بنر ۱', image: null, link: '' },
    { id: 'b2', title: 'بنر ۲', image: null, link: '' },
    { id: 'b3', title: 'بنر ۳', image: null, link: '' },
]

const BannerManager = () => {
    const [banners, setBanners] = useState(bannersInitial)
    const [selectedBanner, setSelectedBanner] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [link, setLink] = useState('')
    const [open, setOpen] = useState(false)
    const [uploading, setUploading] = useState(false)

    const handleOpenDialog = (banner) => {
        setSelectedBanner(banner)
        setPreviewUrl(banner.image || null)
        setLink(banner.link || '')
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedBanner(null)
        setPreviewUrl(null)
        setLink('')
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleUpload = () => {
        setUploading(true)
        setTimeout(() => {
            setBanners((prev) =>
                prev.map((b) =>
                    b.id === selectedBanner.id
                        ? { ...b, image: previewUrl, link }
                        : b
                )
            )
            setUploading(false)
            handleClose()
        }, 1500)
    }

    const handleRemoveImage = () => {
        setPreviewUrl(null)
    }

    return (
        <Box>
            <Grid container spacing={2}>
                {banners.map((banner) => (
                    <Grid
                        item
                        xs={12}
                        md={banner.id === 'main' ? 12 : 4}
                        key={banner.id}
                    >
                        <Card
                            sx={{
                                position: 'relative',
                                borderRadius: 3,
                                overflow: 'hidden',
                                height: banner.id === 'main' ? 280 : 180,
                            }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    height: '100%',
                                    backgroundColor: '#f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundImage: banner.image
                                        ? `url(${banner.image})`
                                        : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {!banner.image && (
                                    <Typography color="text.secondary">
                                        بدون تصویر
                                    </Typography>
                                )}
                                <IconButton
                                    onClick={() => handleOpenDialog(banner)}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 8,
                                        bgcolor: 'rgba(255,255,255,0.85)',
                                        '&:hover': { bgcolor: 'white' },
                                    }}
                                >
                                    <EditTwoToneIcon fontSize="small" />
                                </IconButton>
                            </CardMedia>
                            <CardActions
                                sx={{ px: 2, justifyContent: 'space-between' }}
                            >
                                <Typography variant="subtitle2">
                                    {banner.title}
                                </Typography>
                                {banner.link && (
                                    <Typography
                                        variant="caption"
                                        color="primary"
                                        sx={{
                                            direction: 'ltr',
                                            overflowWrap: 'anywhere',
                                        }}
                                    >
                                        {banner.link}
                                    </Typography>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{selectedBanner?.title}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} alignItems="center">
                        <Box
                            component="label"
                            htmlFor="upload-banner"
                            sx={{
                                width: '100%',
                                height: 200,
                                border: '2px dashed #ccc',
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#f9fafb',
                                position: 'relative',
                            }}
                        >
                            {previewUrl ? (
                                <>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveImage()
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'rgba(255,255,255,0.85)',
                                            '&:hover': { bgcolor: 'white' },
                                        }}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </>
                            ) : (
                                <Stack alignItems="center" spacing={1}>
                                    <AddPhotoAlternateTwoToneIcon fontSize="large" />
                                    <Typography fontSize="0.9rem">
                                        بارگذاری تصویر جدید
                                    </Typography>
                                </Stack>
                            )}
                            <input
                                id="upload-banner"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Box>

                        <TextField
                            label="لینک بنر (اختیاری)"
                            fullWidth
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            size="small"
                            variant="outlined"
                            placeholder="https://example.com"
                            sx={{ direction: 'ltr' }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>بستن</Button>
                    <Button
                        onClick={handleUpload}
                        variant="contained"
                        disabled={!previewUrl || uploading}
                        startIcon={
                            uploading && (
                                <CircularProgress size={18} color="inherit" />
                            )
                        }
                    >
                        {uploading ? 'در حال آپلود' : 'ذخیره'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default BannerManager

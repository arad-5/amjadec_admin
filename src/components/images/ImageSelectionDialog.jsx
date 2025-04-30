import React, { useState } from 'react'
import axios from 'axios'
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Pagination,
    Typography,
    Chip,
    IconButton,
} from '@mui/material'
import axiosInstance from '@/utils/axios'
import Image from 'next/image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import ImagePreviewerCard from './ImagePreviewerCard'

function ImagePickerCard({ selectedImage, setSelectedImage }) {
    // State for the card selection (committed image)
    // const [selectedImage, setSelectedImage] = useState(null)

    // State for dialog and its internal selections
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogSelectedImage, setDialogSelectedImage] = useState(null)
    const [images, setImages] = useState([])
    const [dialogLoading, setDialogLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const limit = 10 // Number of images per page

    // Fetch images for a given page from the API endpoint
    const fetchImages = async (pageNumber) => {
        setDialogLoading(true)
        try {
            const response = await axiosInstance.get('/admin/files/images', {
                params: { page: pageNumber, limit },
            })
            // Assuming response.data contains { results, totalPages, ... }
            const { results, totalPages } = response.data
            setImages(results)
            setTotalPages(totalPages)
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setDialogLoading(false)
        }
    }

    // Open the dialog and fetch the first page of images
    const openDialog = () => {
        setDialogOpen(true)
        setPage(1)
        fetchImages(1)
    }

    // Close the dialog and reset any temporary dialog selection
    const closeDialog = () => {
        setDialogOpen(false)
        setDialogSelectedImage(null)
    }

    // When the user saves their selection in the dialog,
    // update the main selected image and close the dialog.
    const handleSaveSelection = () => {
        setSelectedImage(dialogSelectedImage)
        closeDialog()
    }

    // Handle selecting an image within the dialog (temporary selection)
    const handleDialogImageSelect = (image) => {
        setDialogSelectedImage(image)
    }

    // Handle pagination changes
    const handlePageChange = (event, value) => {
        setPage(value)
        fetchImages(value)
    }

    return (
        <div>
            <Box className="cursor-pointer" position={'relative'}>
                {selectedImage ? (
                    <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => setSelectedImage(null)}
                        sx={{
                            position: 'absolute',
                            right: '1rem',
                            top: '1rem',
                            background: '#fff',
                            ':hover': {
                                background: '#fff',
                            },
                            zIndex: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <CardActionArea
                    onClick={openDialog}
                    sx={
                        !selectedImage
                            ? {
                                  width: 140,
                                  height: 140,
                              }
                            : {
                                  width: 280,
                              }
                    }
                >
                    {selectedImage ? (
                        <>
                            <ImagePreviewerCard
                                image={selectedImage}
                                className={' border-blue-300 bg-blue-50'}
                                index={1}
                                topLabel={
                                    <Chip
                                        className=" z-10"
                                        color="primary"
                                        label="عکس اصلی"
                                    ></Chip>
                                }
                            />
                        </>
                    ) : (
                        <Grid item xs={6} sm={4} md={3} sx={{}}>
                            <Box
                                sx={{
                                    width: 140,
                                    height: 140,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                }}
                                onClick={openDialog}
                                className="!bg-blue-100"
                            >
                                <AddPhotoAlternateIcon
                                    className="text-blue-800"
                                    fontSize="large"
                                />
                                <Typography className="!text-blue-800">
                                    افزودن عکس اصلی
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </CardActionArea>
            </Box>

            {/* The Image Selection Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Select an Image</DialogTitle>
                <DialogContent dividers>
                    {dialogLoading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                py: 3,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {images.map((image) => (
                                <Grid
                                    item
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    key={image._id || image.id}
                                >
                                    <Card
                                        sx={{
                                            border:
                                                dialogSelectedImage &&
                                                (dialogSelectedImage._id ||
                                                    dialogSelectedImage.id) ===
                                                    (image._id || image.id)
                                                    ? '2px solid blue'
                                                    : 'none',
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() =>
                                                handleDialogImageSelect(image)
                                            }
                                        >
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={image.url}
                                                alt={image.filename}
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </DialogContent>

                {/* Pagination Control */}
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>

                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={handleSaveSelection}
                        variant="contained"
                        disabled={!dialogSelectedImage}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ImagePickerCard

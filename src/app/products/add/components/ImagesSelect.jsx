import React, { useContext, useState } from 'react'
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
    IconButton,
    Pagination,
    Typography,
    Chip,
} from '@mui/material'

import axiosInstance from '@/utils/axios'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import { ProductContext } from '../context/ProductContextProvider'

function ImagesSelect() {
    // State to hold images added to the product

    const { images: productImages, setImages: setProductImages } =
        useContext(ProductContext)

    // State for dialog visibility and its image selection
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogSelectedImage, setDialogSelectedImage] = useState(null)
    const [images, setImages] = useState([])
    const [dialogLoading, setDialogLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const limit = 10 // Number of images per page

    // Fetch images from the API for a given page
    const fetchImages = async (pageNumber) => {
        setDialogLoading(true)
        try {
            const response = await axiosInstance.get('/admin/files/images', {
                params: { page: pageNumber, limit },
            })
            // Expecting a response with { results, totalPages, ... }
            const { results, totalPages } = response.data
            setImages(results)
            setTotalPages(totalPages)
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setDialogLoading(false)
        }
    }

    // Open the dialog and load the first page of images
    const openDialog = () => {
        setDialogOpen(true)
        setPage(1)
        fetchImages(1)
    }

    // Close the dialog and clear any temporary selection
    const closeDialog = () => {
        setDialogOpen(false)
        setDialogSelectedImage(null)
    }

    // Handle selecting an image from the dialog
    const handleDialogImageSelect = (image) => {
        setDialogSelectedImage(image)
    }

    // Handle pagination changes in the dialog
    const handlePageChange = (event, value) => {
        setPage(value)
        fetchImages(value)
    }

    // When the user saves their selection, add the image to the product images list
    const handleSaveSelection = () => {
        if (dialogSelectedImage) {
            // Optionally, avoid duplicates based on a unique id field (e.g., _id)
            if (
                !productImages.find(
                    (img) => img._id === dialogSelectedImage._id
                )
            ) {
                setProductImages((prev) => [...prev, dialogSelectedImage])
            }
        }
        closeDialog()
    }

    // Optional: Remove an image from the product images list

    return (
        <div>
            <Grid item xs={6} sm={4} md={3}>
                <CardActionArea
                    sx={{
                        width: 140,
                        height: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: '#eaeaea',
                        borderRadius: '8px',
                    }}
                    onClick={openDialog}
                >
                    <AddPhotoAlternateIcon fontSize="large" />
                    <Typography>افزودن عکس</Typography>
                </CardActionArea>
            </Grid>

            {/* Image Selection Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>انتخاب عکس</DialogTitle>
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

                {/* Pagination Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>

                <DialogActions>
                    <Button onClick={closeDialog} color="inherit">
                        لغو
                    </Button>
                    <Button
                        onClick={handleSaveSelection}
                        variant="contained"
                        disabled={!dialogSelectedImage}
                    >
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ImagesSelect

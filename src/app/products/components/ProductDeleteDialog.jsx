import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useContext } from 'react'
import { ProductDeleteDialogContext } from '../context/ProductDeleteDialogContextProvider'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { enqueueSnackbar } from 'notistack'
import axiosInstance from '@/utils/axios'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
export default function ProductDeleteDialog({ refreshProducts }) {
    const { open, setOpen, product, setProduct } = useContext(
        ProductDeleteDialogContext
    )
    const { title, partNumber, stockStatus, _id, status, stockQuantity } =
        product
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setLoading(true)
        setOpen(false)
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            //states validation , throws error if state are not valid

            const response = await axiosInstance.delete(
                '/admin/products/' + _id
            )
            console.log(response)

            if (response.data.success) {
                enqueueSnackbar({
                    message: 'حذف شد',
                    variant: 'success',
                })
                setProduct({})
                handleClose()
                refreshProducts()
            } else {
                enqueueSnackbar({
                    message: response.data.message || 'درخواست ناموفق بود.',
                    variant: 'error',
                })
            }
        } catch (error) {
            console.error('خطا:', error)

            enqueueSnackbar({
                message: error.response?.data?.message || 'خطا.',
                variant: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">حذف محصول</DialogTitle>
            <DialogContent>
                <Box>
                    {product?.mainImage?.url ? (
                        <Image
                            src={product.mainImage.url}
                            alt={title}
                            width={300}
                            height={200}
                            className="mb-3"
                        />
                    ) : (
                        <Box
                            sx={{
                                width: 300,
                                height: 200,
                                background: '#eee',
                                marginBottom: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '0.4rem',
                            }}
                        >
                            <ImageNotSupportedTwoToneIcon
                                sx={{
                                    marginBottom: 1,
                                }}
                            />
                            <Typography>بدون تصویر</Typography>
                        </Box>
                    )}

                    <Typography
                        sx={{
                            marginBottom: 1,
                        }}
                    >
                        عنوان: {title}
                    </Typography>
                    <Typography
                        sx={{
                            marginBottom: 1,
                        }}
                    >
                        پارت نامبر: {partNumber}
                    </Typography>
                    <Typography
                        sx={{
                            marginBottom: 1,
                        }}
                    >
                        وضعیت:{' '}
                        <span>
                            {status === 'published'
                                ? 'فعال'
                                : status === 'incomplete'
                                  ? 'ناقص'
                                  : status === 'unconfirmed'
                                    ? 'تایید نشده'
                                    : 'نامشخص'}
                        </span>
                    </Typography>
                    <Typography
                        sx={{
                            marginBottom: 1,
                        }}
                    >
                        انبار:{' '}
                        <span>
                            {stockStatus === 'in_stock'
                                ? 'موجود'
                                : stockStatus === 'out_of_stock'
                                  ? 'ناموجود'
                                  : stockStatus === 'contact'
                                    ? 'تماس'
                                    : 'نامشخص'}{' '}
                            {stockQuantity ? `(${stockQuantity})` : ''}
                        </span>
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    لغو
                </Button>
                <Button
                    loading={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    color="error"
                >
                    <DeleteTwoToneIcon sx={{ marginRight: 1 }} />
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    )
}

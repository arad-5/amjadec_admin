import axiosInstance from '@/utils/axios'
import { Button, Tooltip } from '@mui/material'

import { useContext, useState } from 'react'
import { ProductContext } from '../context/ProductContextProvider'
import { Add } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'
import { MessagesContext } from '@/context/MessagesContextProvider'

const Submit = () => {
    const productStates = useContext(ProductContext)
    const {
        status,
        setStatus,
        price,
        setSuccessMessage,
        title,
        description,
        partNumber,
        category,
        specification,
        mainImage,
        images,
        discountPrice,
        isDiscountActive,
        stockStatus,
        stockQuantity,
        lowStockThreshold,
    } = productStates
    const { setMessages } = useContext(MessagesContext)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        // Reset messages
        setLoading(true)
        setSuccessMessage('')

        try {
            //states validation , throws error if state are not valid
            console.log(productStates)
            const response = await axiosInstance.post('/admin/products', {
                status,
                mainImage: mainImage?._id,
                images: images.map((image) => image._id),
                title,
                description,
                partNumber,
                price,
                discountPrice,
                category,
                specification,
                isDiscountActive,
                stockStatus,
                stockQuantity,
                lowStockThreshold,
            })

            if (response.data.success) {
                setMessages([
                    {
                        message: 'محصول ایجاد شد',
                        type: 'success',
                    },
                ])
                // Clear form fields
                // setTitle('')
                // setDescription('')
                // setPrice('')
                // setStatus(null)
                // setCategory(null)
            } else {
                setMessages([
                    {
                        message:
                            response?.data?.message || 'درخواست ناموفق بود.',
                        type: 'error',
                    },
                ])
            }
        } catch (error) {
            setMessages([
                {
                    message:
                        error.response?.data?.message || 'درخواست ناموفق بود.',
                    type: 'error',
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Tooltip
                title={true ? 'مشخصات برای انتشار محصول کافی نمیباشد' : ''}
                placement="top"
            >
                <Button
                    startIcon={
                        loading && status === 'published' ? (
                            <CircularProgress color="inherit" size={'1rem'} />
                        ) : (
                            <Add />
                        )
                    }
                    variant="contained"
                    size="large"
                    onClick={() => {
                        setStatus('published')
                        handleSubmit()
                    }}
                    sx={{ marginRight: 2 }}
                >
                    افزودن و انتشار
                </Button>
            </Tooltip>
            {/* <Button
                startIcon={
                    loading && !status ? (
                        <CircularProgress color="warning" size={'1rem'} />
                    ) : (
                        <Add />
                    )
                }
                variant="outlined"
                size="large"
                color="warning"
                onClick={() => {
                    setStatus(null)
                    handleSubmit()
                }}
            >
                افزودن به ناقص
            </Button> */}
        </>
    )
}

export default Submit

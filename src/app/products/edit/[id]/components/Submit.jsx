import axiosInstance from '@/utils/axios'
import { Button } from '@mui/material'

import { useContext } from 'react'
import { EditProductContext } from '../context/EditProductContextProvider'
import { cn } from '@/utils/cn'

import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone'
import { MessagesContext } from '@/context/MessagesContextProvider'
const Submit = ({ loading, setLoading }) => {
    const productStates = useContext(EditProductContext)
    const {
        productId,
        setTitle,
        setDescription,
        price,
        setPrice,
        setCategory,
        setSuccessMessage,
        setErrorMessage,
        title,
        description,
        partNumber,
        category,
        specifications,
        mainImage,
        images,
        discountPrice,
        isDiscountActive,
        stockStatus,
        stockQuantity,
        lowStockThreshold,
        attachedFiles,
        symbolFile,
        datasheetFile,
        footprintFile,
        file3d,
    } = useContext(EditProductContext)
    const { setMessages } = useContext(MessagesContext)
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Reset messages
        setSuccessMessage('')
        setErrorMessage('')

        try {
            //states validation , throws error if state are not valid
            setLoading(true)
            console.log('submit', productStates)
            const response = await axiosInstance.put(
                '/admin/products/' + productId,
                {
                    mainImage: mainImage?._id,
                    images: images.map((image) => image._id),
                    attachedFiles: attachedFiles.map((file) => file._id),
                    symbolFile: symbolFile?._id || null,
                    datasheetFile: datasheetFile?._id || null,
                    footprintFile: footprintFile?._id || null,
                    file3d: file3d?._id || null,
                    title,
                    description,
                    partNumber,
                    price,
                    discountPrice,
                    category,
                    specifications,
                    isDiscountActive,
                    stockStatus,
                    stockQuantity,
                    lowStockThreshold,
                }
            )
            if (response.data.success) {
                setMessages([
                    {
                        message: 'محصول ویرایش شد',
                        type: 'success',
                    },
                ])
            } else {
                setMessages([
                    {
                        message:
                            response?.data?.message || 'درخواست ناموفق بود.',
                        type: 'error',
                    },
                ])
            }
            if (response.data.success) {
                setSuccessMessage('درخواست موفق بود!')
            } else {
                setErrorMessage(response.data.message || 'درخواست ناموفق بود.')
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
        <Button
            size="large"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={<SaveAsTwoToneIcon />}
        >
            ذخیره تغییرات
        </Button>
    )
}

export default Submit

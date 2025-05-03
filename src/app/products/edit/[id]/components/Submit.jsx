import axiosInstance from '@/utils/axios'
import { Button } from '@mui/material'

import { useContext } from 'react'
import { EditProductContext } from '../context/EditProductContextProvider'
import { cn } from '@/utils/cn'

const Submit = ({ loading }) => {
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
    } = useContext(EditProductContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Reset messages
        setSuccessMessage('')
        setErrorMessage('')

        try {
            //states validation , throws error if state are not valid

            console.log('submit', productStates)
            const response = await axiosInstance.put(
                '/admin/products/' + productId,
                {
                    mainImage: mainImage?._id,
                    images: images.map((image) => image._id),
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
                setSuccessMessage('درخواست موفق بود!')
            } else {
                setErrorMessage(response.data.message || 'درخواست ناموفق بود.')
            }
        } catch (error) {
            console.error('خطا:', error)
            setErrorMessage(error.response?.data?.message || 'خطا.')
        }
    }

    return (
        <Button
            variant="contained"
            className={cn(loading ? '' : '!bg-white !text-neutral-700')}
            onClick={handleSubmit}
            disabled={loading}
        >
            ذخیره تغییرات
        </Button>
    )
}

export default Submit

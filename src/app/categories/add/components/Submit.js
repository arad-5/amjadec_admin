import { Box, Button } from '@mui/material'
import { useContext, useState } from 'react'
import { CategoryContext } from '../context/CategoryContextProvider'
import axiosInstance from '@/utils/axios'
import SubmitConfirmDialog from './SubmitConfirmDialog'

const Submit = () => {
    const { title, description, slug, isMain, image, parent } =
        useContext(CategoryContext)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.post('/admin/categories', {
                title,
                description,
                slug,
                isMain,
                image: image?._id,
                parent: parent?._id,
            })
            console.log(response)
            if (response.data.success) {
                alert('category created')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <SubmitConfirmDialog handleSubmit={handleSubmit} />
        </>
    )
}

export default Submit

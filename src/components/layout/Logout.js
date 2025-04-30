import axiosInstance from '@/utils/axios'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import React, { useState } from 'react'

const Logout = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.post('/admin/auth/logout')
            console.log(res)

            router.push('/login')
            enqueueSnackbar('خروج موفق بود', {
                variant: 'success',
            })
        } catch (error) {
            enqueueSnackbar('خطا', {
                variant: 'error',
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            loading={loading}
            onClick={handleSubmit}
            className="w-full"
            variant="outlined"
            color="error"
        >
            خروج
        </Button>
    )
}

export default Logout

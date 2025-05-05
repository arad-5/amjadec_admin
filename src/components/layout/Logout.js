import axiosInstance from '@/utils/axios'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import WestTwoToneIcon from '@mui/icons-material/WestTwoTone'
import React, { useState } from 'react'
import FirstPageTwoToneIcon from '@mui/icons-material/FirstPageTwoTone'
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
            variant="text"
            size="large"
            fullWidth
            color="error"
            endIcon={<FirstPageTwoToneIcon />}
        >
            خروج
        </Button>
    )
}

export default Logout

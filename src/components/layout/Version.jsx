'use client'
import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axios'

const Version = () => {
    const [latestVersion, setLatestVersion] = useState(null)

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const res = await axiosInstance.get('/admin/versions')
                // مرتب‌سازی از جدید به قدیم
                const sorted = res.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                )
                setLatestVersion(sorted[0]?.version || 'نامشخص')
            } catch (err) {
                console.error('⛔ خطا در دریافت نسخه:', err)
                setLatestVersion('خطا')
            }
        }

        fetchVersion()
    }, [])

    return (
        <div className="flex px-6 items-center justify-between">
            <Typography fontSize={'0.8rem'}>نسخه :</Typography>
            <Typography fontSize={'0.8rem'} sx={{ fontFamily: 'sans-serif' }}>
                {latestVersion || 'در حال بارگذاری...'}
            </Typography>
        </div>
    )
}

export default Version

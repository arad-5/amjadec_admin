'use client'

import BannerManager from '@/components/banners/BannerManager'
import ShopStats from '@/components/dashboard/ShopStats'

import { Box, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'

export default function Home() {
    return (
        <Box sx={{ padding: 3 }}>
            <ShopStats />
            <BannerManager />
        </Box>
    )
}

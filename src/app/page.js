'use client'

import BannerManager from '@/components/banners/BannerManager'
import ShopStats from '@/components/dashboard/ShopStats'

import { Box } from '@mui/material'

export default function Home() {
    return (
        <Box sx={{ padding: 3 }}>
            <ShopStats />
            <BannerManager />
        </Box>
    )
}

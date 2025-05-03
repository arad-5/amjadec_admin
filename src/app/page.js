'use client'

import BannerManager from '@/components/banners/BannerManager'
import ShopStats from '@/components/dashboard/ShopStats'
import { TopBarContext } from '@/context/TopBarContextProvider'
import { Box, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'

export default function Home() {
    const { setTitle } = useContext(TopBarContext)
    useEffect(() => {
        setTitle(null)
    }, [])

    return (
        <Box sx={{ padding: 3 }}>
            <ShopStats />
            <BannerManager />
        </Box>
    )
}

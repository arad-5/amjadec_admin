'use client'
import './globals.css'
import localFont from 'next/font/local'
import Navbar from '@/components/layout/Navbar'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import rtlCache from '../rtlCache'
import theme from '../theme'

import SideMenu from '@/components/layout/SideMenu'

const yekanVF = localFont({
    src: '../fonts/IRANYekanXVFaNumVF.woff2',
    display: 'swap',
})

export default function ClientThemeProvider({ children }) {
    return (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={yekanVF.className}>
                    <div className="bg-[#f9f9f9] ">
                        <Navbar />
                        <div className="md:flex md:gap-4 container mx-auto">
                            <SideMenu />
                            <div className="flex-1 py-4 pl-4">{children}</div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}

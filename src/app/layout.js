'use client'
import './globals.css'
import localFont from 'next/font/local'
import Navbar from '@/components/layout/Navbar'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import rtlCache from '../rtlCache'
import theme from '../theme'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import SideMenu from '@/components/layout/SideMenu'
import { AuthProvider } from '../context/AuthContext'
import { cn } from '@/utils/cn'
import FileUploadDialogContextProvider from '@/context/FileUploadDialogContextProvider'
import { SnackbarProvider } from 'notistack'
import MessagesContextProvider from '@/context/MessagesContextProvider'
import TopBar from '@/components/layout/TopBar'
import TopBarContextProvider from '@/context/TopBarContextProvider'

const yekanVF = localFont({
    src: '../fonts/IRANYekanXVFaNumVF.woff2',
    display: 'swap',
})

export default function RootLayout({ children }) {
    const pathname = usePathname()
    useEffect(() => {
        console.log(pathname)
    }, [])

    return (
        <html lang="fa" dir="rtl">
            <body
                className={cn(
                    `antialiased text-neutral-800 !bg-[#f3f9ff]`,
                    yekanVF.className
                )}
            >
                <CacheProvider value={rtlCache}>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <CssBaseline />
                            <AuthProvider>
                                <FileUploadDialogContextProvider>
                                    <TopBarContextProvider>
                                        <MessagesContextProvider>
                                            {pathname !== '/login' ? (
                                                <Navbar />
                                            ) : (
                                                ''
                                            )}
                                            <div className="md:flex container mx-auto ">
                                                {pathname !== '/login' ? (
                                                    <SideMenu />
                                                ) : (
                                                    ''
                                                )}

                                                <div
                                                    className={cn(
                                                        pathname !== '/login'
                                                            ? ''
                                                            : 'w-full h-full flex flex-1 min-h-screen justify-center ',
                                                        'w-full'
                                                    )}
                                                >
                                                    <TopBar />
                                                    {children}
                                                </div>
                                            </div>
                                        </MessagesContextProvider>
                                    </TopBarContextProvider>
                                </FileUploadDialogContextProvider>
                            </AuthProvider>
                        </SnackbarProvider>
                    </ThemeProvider>
                </CacheProvider>
            </body>
        </html>
    )
}

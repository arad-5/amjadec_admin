'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import Logout from './Logout'
import NavigationList from './NavigationList'
import Logo from '../Logo'
import Admin from './Admin'
import Version from './Version'

const SideMenu = () => {
    return (
        <div className="w-[230px] border-l hidden lg:flex shrink-0 py-4 rounded-none sticky top-0 h-screen lg:flex-col bg-white">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 pb-3 border-b">
                    <div className="flex items-center border-b mb-3">
                        <div>
                            <span className="text-[10px] -mb-3 block">
                                شهر الکترونیک
                            </span>
                            <Logo className="w-[64px] h-[64px]" />
                        </div>
                        <div className="px-3 border-r mr-3">
                            <span className="text-sm">پنل ادمین</span>
                        </div>
                    </div>
                    <Admin />
                </div>

                {/* Scrollable Navigation List */}
                <Box
                    className="flex-1 overflow-y-auto scrollbar-hide"
                    sx={{
                        scrollbarWidth: 'none', // Firefox
                        '&::-webkit-scrollbar': {
                            display: 'none', // Chrome/Safari
                        },
                    }}
                >
                    <NavigationList />
                </Box>

                {/* Footer */}
                <div>
                    <div className="px-6 flex justify-end py-2 mb-2 border-y">
                        <Logout />
                    </div>
                    <Version />
                </div>
            </div>
        </div>
    )
}

export default SideMenu

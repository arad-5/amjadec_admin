'use client'

import React from 'react'

import ProdcutExcelImport from './components/ProductExcelImport'

import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone'
import { Alert, AlertTitle } from '@mui/material'
import { Box } from '@mui/system'
import TopBar from '@/components/layout/TopBar'

const Page = () => {
    return (
        <>
            <TopBar
                title={'اکسل'}
                icon={<TableViewTwoToneIcon className="text-2xl ml-3" />}
            />
            <Box
                sx={{
                    p: 3,
                    background: '#fff',
                }}
            >
                <Alert
                    severity="warning"
                    sx={{
                        marginBottom: 3,
                    }}
                >
                    <AlertTitle>مهم:</AlertTitle>
                    فایلی که انتخاب می‌کنید، مستقیماً برای مدیریت و به‌روزرسانی
                    محصولات سایت استفاده می‌شود. لطفاً از درستی و ساختار صحیح
                    فایل Excel مطمئن شوید.
                </Alert>
                <ProdcutExcelImport />
            </Box>
        </>
    )
}

export default Page

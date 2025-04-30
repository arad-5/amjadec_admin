'use client'

import React, { useContext, useEffect } from 'react'

import ProdcutExcelImport from './components/ProductExcelImport'
import ExcelMessageContextProvider from './context/ExcelMessageContextProvider'
import { TopBarContext } from '@/context/TopBarContextProvider'
import { LiaCommentsSolid } from 'react-icons/lia'
import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone'
import { MessagesContext } from '@/context/MessagesContextProvider'

const Page = () => {
    const { setTitle, setIcon } = useContext(TopBarContext)
    const { setMessages } = useContext(MessagesContext)

    useEffect(() => {
        setTitle('اکسل')
        setIcon(<TableViewTwoToneIcon className="text-2xl ml-3" />)
        setMessages([
            {
                message:
                    'فایلی که انتخاب می‌کنید، مستقیماً برای مدیریت و به‌روزرسانی محصولات سایت استفاده می‌شود. لطفاً از درستی و ساختار صحیح فایل Excel مطمئن شوید. هرگونه اشتباه در این فایل می‌تواند باعث تغییر اشتباه محصولات شود.',
                type: 'warning',
            },
        ])
    }, [])

    return (
        <ExcelMessageContextProvider>
            <div className="bg-white">
                <ProdcutExcelImport />
            </div>
        </ExcelMessageContextProvider>
    )
}

export default Page

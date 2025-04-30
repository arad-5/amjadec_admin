// app/admin/create-product/page.jsx

'use client'

import React, { useState, useContext, useEffect } from 'react'

import axios from '@/utils/axios'
import { AuthContext } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import SuccessAlert from './components/SuccessAlert'
import ErrorAlert from './components/ErrorAlert'

import ProductImages from './components/ProductImages'
import ProductInfo from './components/ProductInfo'
import ProductCategory from './components/ProductCategory'

import ProductFilter from './components/ProductFilter'
import TopBar from './components/TopBar'
import ProductInventoryManagement from './components/ProductInventoryManagement'
import ProductPriceManagement from './components/ProductPriceManagement'
import ProductSpecification from './components/ProductSpecification'

import ProductContextProvider from './context/ProductContextProvider'
import BottomBar from './components/BottomBar'
import AttachedFiles from './components/AttachedFiles'
import { TopBarContext } from '@/context/TopBarContextProvider'

export default function CreateProductPage() {
    const { setTitle: setTopBarTitle } = useContext(TopBarContext)

    useEffect(() => {
        setTopBarTitle('افزودن محصول')
    }, [])

    return (
        <ProductContextProvider>
            <div className="w-full">
                <div className="relative z-0">
                    <div className="px-4 mt-4 w-full">
                        <ProductImages />
                    </div>
                    <div className="p-4 items-start grid grid-cols-12 gap-4">
                        <div className="col-span-6 ">
                            <ProductInfo />
                            <ProductCategory />
                            <ProductSpecification />
                            <AttachedFiles />
                            <ProductFilter />
                        </div>
                        <div className="col-span-6 ">
                            <ProductInventoryManagement />
                            <ProductPriceManagement />
                        </div>
                    </div>
                </div>
                <BottomBar />
            </div>
        </ProductContextProvider>
    )
}

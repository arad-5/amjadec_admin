'use client'

import React, { useContext, useEffect } from 'react'

import ProductImages from './components/ProductImages'
import ProductInfo from './components/ProductInfo'
import ProductCategory from './components/ProductCategory'

import ProductFilter from './components/ProductFilter'

import ProductInventoryManagement from './components/ProductInventoryManagement'
import ProductPriceManagement from './components/ProductPriceManagement'
import ProductSpecification from './components/ProductSpecification'
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone'
import ProductContextProvider from './context/ProductContextProvider'
import BottomBar from './components/BottomBar'
import AttachedFiles from './components/AttachedFiles'

import TopBar from '@/components/layout/TopBar'
import ProductFilesSection from './components/ProductFilesSection'

export default function CreateProductPage() {
    return (
        <ProductContextProvider>
            <>
                <TopBar
                    title={'افزودن محصول'}
                    icon={
                        <DashboardCustomizeTwoToneIcon className="ml-3 text-2xl" />
                    }
                />
                <div className="relative z-0">
                    <div className="px-4 mt-4 w-full">
                        <ProductImages />
                    </div>
                    <div className="p-4 items-start grid grid-cols-12 gap-4">
                        <div className="col-span-6 ">
                            <ProductInfo />
                            <ProductCategory />
                            <ProductSpecification />
                            <ProductFilesSection />
                        </div>
                        <div className="col-span-6 ">
                            <ProductInventoryManagement />
                            <ProductPriceManagement />
                        </div>
                    </div>
                </div>
                <BottomBar />
            </>
        </ProductContextProvider>
    )
}

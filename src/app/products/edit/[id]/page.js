'use client'
import React, { useContext, useEffect, useState } from 'react'
import { EditProductContext } from './context/EditProductContextProvider'
import axiosInstance from '@/utils/axios'

import ProductImages from './components/ProductImages'
import ProductInfo from './components/ProductInfo'
import ProductCategory from './components/ProductCategory'

import ProductFilter from './components/ProductFilter'

import ProductInventoryManagement from './components/ProductInventoryManagement'
import ProductPriceManagement from './components/ProductPriceManagement'
import ProductSpecification from './components/ProductSpecification'
import { Box, Skeleton } from '@mui/material'
import BottomBar from './components/BottomBar'
import TopBar from '@/components/layout/TopBar'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import MessageCollapse from '@/components/layout/Messages/MessageCollapse'
import Messages from '@/components/layout/Messages/Messages'
import { MessagesContext } from '@/context/MessagesContextProvider'
import ProductFileSection from './components/ProductFileSection'

export default function Page({ params }) {
    const { id: productId } = React.use(params)
    const [loading, setLoading] = useState(true)
    const {
        setProductId,
        setTitle,
        setDescription,
        setPrice,
        setCategory,
        setSpecifications,
        setDiscountPrice,
        setIsDiscountActive,
        setStockStatus,
        setStockQuantity,
        setLowStockThreshold,
        setCategoryObj,
        setPartNumber,
        setImages,
        setAttachedFiles,
        setSymbolFile,
        setDatasheetFile,
        setFootprintFile,
        setFile3d,
        setMainImage,
        title,
    } = useContext(EditProductContext)

    const fetchProduct = async () => {
        const response = await axiosInstance.get('/admin/products/' + productId)
        console.log(response)
        if (response?.data?.product) {
            const product = response.data.product
            setProductId(product._id)
            setTitle(product.title)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category?._id)
            setSpecifications(product?.specifications)
            setDiscountPrice(product.discountPrice)
            setIsDiscountActive(product.isDiscountActive)
            setStockStatus(product.stockStatus)
            setStockQuantity(product.stockQuantity)
            setLowStockThreshold(product.lowStockThreshold)
            setCategoryObj(product.category)
            setPartNumber(product.partNumber)
            setImages(product.images)
            setMainImage(product.mainImage)
            setAttachedFiles(product.attachedFiles)
            setSymbolFile(product.symbolFile)
            setDatasheetFile(product.datasheetFile)
            setFootprintFile(product.footprintFile)
            setFile3d(product.file3d)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="w-full">
            <TopBar
                title={'ویرایش محصول' + ' ' + title}
                icon={<EditTwoToneIcon className="ml-3 text-2xl" />}
            />
            <div className="relative z-0">
                <div className="px-4 mt-4 w-full">
                    {loading ? (
                        <Box className="bg-white w-full pl-4 p-4 rounded-lg shadow-md">
                            <Skeleton
                                width={100}
                                height={40}
                                sx={{ marginBottom: 2 }}
                                animation="wave"
                            />

                            <Box height={200}>
                                <Skeleton
                                    animation="wave"
                                    width={'100%'}
                                    height={'100%'}
                                    sx={{ transform: 'unset' }}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <ProductImages />
                    )}
                </div>
                <div className="p-4 items-start md:grid grid-cols-12 gap-4">
                    {loading ? (
                        <Box className="bg-white w-full pl-4 p-4 rounded-lg shadow-md col-span-6">
                            <Skeleton
                                width={100}
                                height={40}
                                sx={{ marginBottom: 2 }}
                                animation="wave"
                            />

                            <Skeleton
                                animation="wave"
                                width={'100%'}
                                height={'500px'}
                                sx={{ transform: 'unset' }}
                            />
                        </Box>
                    ) : (
                        <div className="col-span-6 pl-4 ">
                            <ProductInfo />
                            <ProductCategory />
                            <ProductSpecification />

                            <ProductFileSection />
                        </div>
                    )}
                    {loading ? (
                        <Box className="col-span-6">
                            <Box className="bg-white w-full pl-4 p-4 rounded-lg shadow-md  mb-4">
                                <Skeleton
                                    width={100}
                                    height={40}
                                    sx={{ marginBottom: 2 }}
                                    animation="wave"
                                />

                                <Box height={200}>
                                    <Skeleton
                                        animation="wave"
                                        width={'100%'}
                                        height={'100%'}
                                        sx={{ transform: 'unset' }}
                                    />
                                </Box>
                            </Box>
                            <Box className="bg-white w-full pl-4 p-4 rounded-lg shadow-md  ">
                                <Skeleton
                                    width={100}
                                    height={40}
                                    sx={{ marginBottom: 2 }}
                                    animation="wave"
                                />

                                <Box height={200}>
                                    <Skeleton
                                        animation="wave"
                                        width={'100%'}
                                        height={'100%'}
                                        sx={{ transform: 'unset' }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <div className="col-span-6 ">
                            <ProductInventoryManagement />
                            <ProductPriceManagement />
                        </div>
                    )}
                </div>
            </div>
            <BottomBar loading={loading} setLoading={setLoading} />
        </div>
    )
}

'use client'
import React, { useContext, useEffect, useState } from 'react'
import { EditProductContext } from './context/EditProductContextProvider'
import axiosInstance from '@/utils/axios'

import ProductImages from './components/ProductImages'
import ProductInfo from './components/ProductInfo'
import ProductCategory from './components/ProductCategory'

import ProductFilter from './components/ProductFilter'
import TopBar from './components/TopBar'
import ProductInventoryManagement from './components/ProductInventoryManagement'
import ProductPriceManagement from './components/ProductPriceManagement'
import ProductSpecification from './components/ProductSpecification'
import { Box, Divider, Skeleton } from '@mui/material'
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
        setImageUrl,
        setSuccessMessage,
        setErrorMessage,
        setDiscountPrice,
        setIsDiscountActive,
        setStockStatus,
        setStockQuantity,
        setLowStockThreshold,
        setCategoryObj,
        setPartNumber,
        setImages,
        setMainImage,
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
            setSpecifications(product?.specification)
            setDiscountPrice(product.discountPrice)
            setIsDiscountActive(product.isDiscountActive)
            setStockStatus(product.stockStatus)
            setStockQuantity(product.stockQuantity)
            setLowStockThreshold(product.lowStockThreshold)
            setCategoryObj(product.category)
            setPartNumber(product.partNumber)
            setImages(product.images)
            setMainImage(product.mainImage)
            //
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="w-full">
            <TopBar loading={loading} />
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
                <div className="p-4 items-start grid grid-cols-12 gap-4">
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
                        <div className="col-span-6 pl-4 bg-white p-4 rounded-lg shadow-md ">
                            <div className="pb-3 mb-3 border-b">
                                <span className="text-lg font-semibold">
                                    مشخصات محصول
                                </span>
                            </div>
                            <ProductInfo />
                            <ProductCategory />
                            <ProductSpecification />
                            <ProductFilter />
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
        </div>
    )
}

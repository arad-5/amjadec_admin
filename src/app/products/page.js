'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Box, IconButton, Pagination } from '@mui/material'

import Products from './components/Products'
import axiosInstance from '@/utils/axios'

import ProductsSearch from './components/ProductsSearch'

import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import debounce from 'lodash.debounce'
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone'
import { cn } from '@/utils/cn'
import ProductDeleteDialogContextProvider from './context/ProductDeleteDialogContextProvider'
import ProductDeleteDialog from './components/ProductDeleteDialog'
import TopBar from '@/components/layout/TopBar'

const ProductManagement = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [limit] = useState(8)

    const fetchProducts = async (pageNumber = 1) => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(
                `/admin/products?page=${pageNumber}&limit=${limit}`
            )
            if (response?.data?.products) {
                setProducts(response.data.products)
                setTotalPages(response.data.pagination.pages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!searchQuery) {
            fetchProducts(page)
        }
    }, [page, searchQuery]) // فقط زمانی که صفحه یا سرچ خالیه

    const debouncedSearch = useMemo(
        () => debounce((q) => queryProduct(q), 500),
        []
    )

    const queryProduct = async (q) => {
        try {
            setLoading(true)
            const res = await axiosInstance.get(`/admin/products/search?q=` + q)
            if (res?.data?.data) {
                setProducts(res?.data?.data)
            }
        } catch (error) {
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (searchQuery) {
            setPage(1)
            debouncedSearch(searchQuery.trim())
        } else {
            debouncedSearch.cancel()
            fetchProducts(page)
        }
        return () => debouncedSearch.cancel()
    }, [searchQuery])

    return (
        <ProductDeleteDialogContextProvider>
            <Box>
                <TopBar
                    title={'محصولات'}
                    icon={<GridViewTwoToneIcon className="ml-3 text-2xl" />}
                />
                <ProductDeleteDialog
                    refreshProducts={() => fetchProducts(page)}
                />
                <ProductsSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <Box sx={{ padding: 2, paddingBottom: 0 }}>
                    <IconButton onClick={() => fetchProducts(page)}>
                        <LoopTwoToneIcon
                            className={cn(loading ? 'animate-spin' : '')}
                        />
                    </IconButton>
                </Box>
                <Products loading={loading} products={products} />
                {!searchQuery && totalPages > 1 && (
                    <Box
                        sx={{
                            width: '100%',
                            py: 2,
                            backgroundColor: '#fff',
                            position: 'sticky',
                            bottom: 0,
                            left: 0,
                        }}
                    >
                        <Box className="flex justify-center fixed lg:static w-full py-4 bottom-0 bg-white">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </ProductDeleteDialogContextProvider>
    )
}

export default ProductManagement

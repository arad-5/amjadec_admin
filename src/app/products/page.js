'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Box, IconButton } from '@mui/material'

import Products from './components/Products'
import axiosInstance from '@/utils/axios'
import { TopBarContext } from '@/context/TopBarContextProvider'
import ProductsSearch from './components/ProductsSearch'
// import ProdcutsFilter from './components/ProdcutsFilter'
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import debounce from 'lodash.debounce'
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone'
import { cn } from '@/utils/cn'
import ProductDeleteDialogContextProvider from './context/ProductDeleteDialogContextProvider'
import ProductDeleteDialog from './components/ProductDeleteDialog'

const ProductManagement = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState('')

    const { setTitle: setTopBarTitle, setIcon } = useContext(TopBarContext)
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get('/admin/products')
            if (response?.data?.products) {
                setProducts(response.data.products)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setTopBarTitle('محصولات')
        setIcon(<GridViewTwoToneIcon className="ml-3 text-2xl" />)
        fetchProducts()
    }, [])
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
            debouncedSearch(searchQuery.trim())
        } else {
            debouncedSearch.cancel()
            fetchProducts()
        }
        return () => debouncedSearch.cancel()
    }, [searchQuery, debouncedSearch])

    return (
        <ProductDeleteDialogContextProvider>
            <Box>
                <ProductDeleteDialog refreshProducts={fetchProducts} />
                <ProductsSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <Box
                    sx={{
                        padding: 2,
                        paddingBottom: 0,
                    }}
                >
                    <IconButton onClick={() => fetchProducts()}>
                        <LoopTwoToneIcon
                            className={cn(loading ? 'animate-spin' : '')}
                        />
                    </IconButton>
                </Box>
                <Products loading={loading} products={products} />
            </Box>
        </ProductDeleteDialogContextProvider>
    )
}

export default ProductManagement

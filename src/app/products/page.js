'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'

import Products from './components/Products'
import axiosInstance from '@/utils/axios'
import { TopBarContext } from '@/context/TopBarContextProvider'
import ProductsSearch from './components/ProductsSearch'
// import ProdcutsFilter from './components/ProdcutsFilter'
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import debounce from 'lodash.debounce'

const ProductManagement = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { setTitle: setTopBarTitle, setIcon } = useContext(TopBarContext)
    const fetchProduct = async () => {
        const response = await axiosInstance.get('/admin/products')
        if (response?.data?.products) {
            setProducts(response.data.products)
            setLoading(false)
        }
    }
    useEffect(() => {
        setTopBarTitle('محصولات')
        setIcon(<GridViewTwoToneIcon className="ml-3 text-2xl" />)
        fetchProduct()
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
            fetchProduct()
        }
        return () => debouncedSearch.cancel()
    }, [searchQuery, debouncedSearch])

    return (
        <Box className="rounded-lg">
            <ProductsSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {/* <ProdcutsFilter /> */}
            <Products loading={loading} products={products} />
        </Box>
    )
}

export default ProductManagement

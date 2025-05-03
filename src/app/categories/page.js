'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone'
import { cn } from '@/utils/cn'

import CategoriesTree from './components/CategoriesTree'
import CategoryEditContextProvider from './context/CategoryEditContextProvider'
import CategoryEditDialog from './components/CategoryEditDialog'
import { useContext } from 'react'
import { TopBarContext } from '@/context/TopBarContextProvider'

import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import axiosInstance from '@/utils/axios'
import Add from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'
import CategoryDeleteContextProvider from './context/CategoryDeleteContextProvider'
import CategoryDeleteDialog from './components/CategoryDeleteDialog'

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const { setTitle, setIcon } = useContext(TopBarContext)

    useEffect(() => console.log(categories), [categories])
    const getAllCategories = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/admin/categories/main')
            console.log('fetching categories')
            console.log(response)
            if (response.data.success) {
                setCategories(response.data.mainCategories)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setTitle('دسته بندی ها')
        setIcon(<CategoryTwoToneIcon className="text-2xl ml-3" />)
        getAllCategories()
    }, [])

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleDeleteCategory = () => {
        setCategories(
            categories.filter((cat) => cat.id !== selectedCategory.id)
        )
        setDeleteDialog(false)
        setSelectedCategory(null)
    }
    const router = useRouter()
    return (
        <CategoryEditContextProvider>
            <CategoryDeleteContextProvider>
                <>
                    <Box>
                        {/* <CategoriesSearch /> */}
                        {/* <CategoriesList filteredCategories={categories} /> */}

                        <Box
                            sx={{
                                background: '#fff',
                                padding: 3,
                            }}
                        >
                            <Button
                                onClick={() => router.push('/categories/add')}
                                startIcon={<Add />}
                                variant="contained"
                            >
                                افزودن دسته بندی اصلی
                            </Button>
                            <Tooltip title="بروزرسانی">
                                <IconButton
                                    sx={{
                                        marginLeft: 3,
                                    }}
                                    onClick={() => getAllCategories()}
                                >
                                    <LoopTwoToneIcon
                                        className={cn(
                                            loading ? 'animate-spin' : ''
                                        )}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box
                            sx={{
                                padding: 3,
                            }}
                        >
                            <CategoriesTree
                                loading={loading}
                                categories={categories}
                            />
                        </Box>
                    </Box>
                    <CategoryDeleteDialog onUpdate={() => getAllCategories()} />
                    <CategoryEditDialog onUpdate={() => getAllCategories()} />
                </>
            </CategoryDeleteContextProvider>
        </CategoryEditContextProvider>
    )
}

export default CategoriesManagement

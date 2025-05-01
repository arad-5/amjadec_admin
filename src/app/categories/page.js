'use client'
import React, { useEffect, useState } from 'react'
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'

import axios from '@/utils/axios'
import CategoriesTree from './components/CategoriesTree'
import CategoryEditContextProvider from './context/CategoryEditContextProvider'
import CategoryEditDialog from './components/CategoryEditDialog'
import { useContext } from 'react'
import { TopBarContext } from '@/context/TopBarContextProvider'
import CategoriesSearch from './components/CategoriesSearch'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import axiosInstance from '@/utils/axios'
const CategoriesManagement = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const { setTitle, setIcon } = useContext(TopBarContext)

    useEffect(() => console.log(categories), [categories])
    const getAllCategories = async () => {
        try {
            const response = await axiosInstance.get('/admin/categories/main')
            console.log('fetching categories')
            console.log(response)
            if (response.data.success) {
                setCategories(response.data.mainCategories)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
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

    return (
        <CategoryEditContextProvider>
            <Box className="rounded-lg">
                {/* <CategoriesSearch /> */}
                {/* <CategoriesList filteredCategories={categories} /> */}
                <CategoriesTree loading={loading} categories={categories} />
                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialog}
                    onClose={() => setDeleteDialog(false)}
                >
                    <DialogTitle>تایید حذف</DialogTitle>
                    <DialogContent>
                        آیا مطمئن هستید که می‌خواهید دسته‌بندی
                        {selectedCategory?.name} را حذف کنید؟
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialog(false)}>
                            لغو
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteCategory}
                        >
                            حذف
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <CategoryEditDialog onUpdate={() => getAllCategories()} />
        </CategoryEditContextProvider>
    )
}

export default CategoriesManagement

import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Checkbox,
    IconButton,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import axiosInstance from '@/utils/axios'
import { EditProductContext } from '../context/EditProductContextProvider'

const CategoryTree = () => {
    const {
        category: selectedCategory,
        setCategory: setSelectedCategory,
        categoryObj,
        setCategoryObj,
    } = useContext(EditProductContext)

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [openCategories, setOpenCategories] = useState({})

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get(
                    '/admin/categories/main'
                )
                setCategories(response.data.mainCategories)
            } catch (err) {
                setError('خطا در دریافت دسته‌بندی‌ها')
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // تابعی برای باز و بسته کردن دسته‌ها بدون بستن والد اصلی
    const handleToggle = (categoryId, parentId) => {
        setOpenCategories((prevOpen) => {
            let newState = { ...prevOpen }

            // اگر دسته باز است، آن را ببند
            if (newState[categoryId]) {
                delete newState[categoryId]
            } else {
                newState[categoryId] = true
            }

            return newState
        })
    }

    // انتخاب دسته و تغییر چک‌باکس
    const handleSelect = (category) => {
        setSelectedCategory(category._id)
        setCategoryObj(category)
    }

    // تابع بازگشتی برای نمایش دسته‌ها
    const renderCategory = (category, parentId = null, level = 0) => (
        <Box
            key={category._id}
            sx={{
                width: '100%',
            }}
            className="border-b"
        >
            <ListItem
                onClick={() => handleToggle(category._id, parentId)}
                sx={{
                    width: '100%',
                    paddingLeft: `${level * 30}px`, // تو رفتگی بر اساس سطح
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': {
                        backgroundColor:
                            selectedCategory === category._id ? '' : '#f5f5f5',
                    },
                    background:
                        selectedCategory === category._id ? '#daedff' : '',
                    paddingY: 0,
                }}
            >
                <Box className="mr-2 border-r-4 !py-0">
                    <Checkbox
                        checked={selectedCategory === category._id}
                        onChange={() => handleSelect(category)}
                        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن لیست هنگام کلیک روی چک‌باکس
                    />
                </Box>
                <ListItemText
                    primary={category.title}
                    sx={{
                        fontWeight:
                            selectedCategory === category._id
                                ? 'bold'
                                : 'normal',
                    }}
                />
                {category.children.length > 0 && (
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleToggle(category._id, parentId)
                        }}
                    >
                        {openCategories[category._id] ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )}
                    </IconButton>
                )}
            </ListItem>
            <Collapse
                in={openCategories[category._id]}
                timeout="auto"
                unmountOnExit
            >
                <List component="div" disablePadding sx={{ width: '100%' }}>
                    {category.children.map((child) =>
                        renderCategory(child, category._id, level + 1)
                    )}
                </List>
            </Collapse>
        </Box>
    )

    if (loading) return <CircularProgress />
    if (error) return <Alert severity="error">{error}</Alert>

    return (
        <List
            sx={{
                width: '100%',

                padding: '10px',
            }}
        >
            {categories.map((category) => renderCategory(category))}
        </List>
    )
}

export default CategoryTree

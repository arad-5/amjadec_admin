'use client'

import { CategoryContext } from './context/CategoryContextProvider'
import SubCategoryManagement from './components/SubCategoryManagement'
import CategoryInfo from './components/CategoryInfo'
import React, { useContext, useEffect } from 'react'
import axiosInstance from '@/utils/axios'
import TopStatusBar from './components/TopStatusBar'
import { Typography } from '@mui/material'
import ParentCategory from './components/ParentCategory'
import BottomBar from '../../products/add/components/BottomBar'

const Page = ({ searchParams }) => {
    const { parent: parentId } = React.use(searchParams)
    const { setParent } = useContext(CategoryContext)

    const fetchParentCategory = async () => {
        try {
            const response = await axiosInstance.get(
                '/admin/categories/' + parentId
            )
            if (response.data.success) {
                setParent(response.data.category)
            }
        } catch (error) {}
    }
    useEffect(() => {
        fetchParentCategory()
    }, [])

    return (
        <div className="w-full mb-4">
            <TopStatusBar />
            <div className="p-4 md:grid grid-cols-12 gap-4 items-start">
                <CategoryInfo parentId={parentId} />
                {parentId ? <ParentCategory /> : null}
            </div>
        </div>
    )
}

export default Page

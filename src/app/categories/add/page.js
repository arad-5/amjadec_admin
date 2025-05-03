'use client'

import { CategoryContext } from './context/CategoryContextProvider'
import CategoryInfo from './components/CategoryInfo'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '@/utils/axios'
import ParentCategory from './components/ParentCategory'
import { TopBarContext } from '@/context/TopBarContextProvider'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { MessagesContext } from '@/context/MessagesContextProvider'
const Page = ({ searchParams }) => {
    const { parent: parentId } = React.use(searchParams)

    const { setTitle: setTopbarTitle, setIcon } = useContext(TopBarContext)

    const [loading, setLoading] = useState(false)
    const { title, description, slug, isMain, parent, setParent, image } =
        useContext(CategoryContext)
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
    const { setMessages } = useContext(MessagesContext)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.post('/admin/categories', {
                title,
                description,
                slug,
                isMain,
                image: image?._id,
                parent: parent?._id,
            })

            if (response.data.success) {
                setMessages([
                    {
                        message: 'دسته بندی ایجاد شد',
                        type: 'success',
                    },
                ])
            }
        } catch (error) {
            console.log(error)

            setMessages([
                {
                    message:
                        error?.response?.data?.message || 'درخواست ناموفق بود.',
                    type: 'error',
                },
            ])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setTopbarTitle(parent ? 'افزودن زیردسته بندی به  ' : 'افزودن دسته بندی')
        setIcon(<Add className="text-2xl ml-3" />)
        fetchParentCategory()
    }, [])

    return (
        <div className="w-full h-full relative flex flex-col justify-between">
            <div className="p-4 max-w-md gap-4 items-start">
                <div className="p-4 rounded-lg bg-white">
                    {parentId ? <ParentCategory /> : null}
                    <CategoryInfo parentId={parentId} />
                    <Button
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={!(title && slug)}
                        variant="contained"
                        startIcon={<Add />}
                    >
                        افزودن
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page

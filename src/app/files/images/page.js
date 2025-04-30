'use client'

import React, { useContext, useEffect, useMemo, useState } from 'react'

import ImageGallery from '../components/ImageGallery'
import FileEditDialog from '../components/FileEditDialog'
import FileEditDialogContextProvider from '../context/FileEditDialogContextProvider'
import FileDeleteDialogContextProvider from '../context/FileDeleteDialogContextProvider'
import FileDeleteDialog from '../components/FileDeleteDialog'
import UploadDialog from '../components/UploadDialog'
import PermMediaTwoToneIcon from '@mui/icons-material/PermMediaTwoTone'
import { TopBarContext } from '@/context/TopBarContextProvider'
import axiosInstance from '@/utils/axios'
import FileSearch from './components/FileSearch'
import debounce from 'lodash.debounce'

const Page = () => {
    const { setTitle, setIcon } = useContext(TopBarContext)
    // حالت‌های مربوط به صفحه‌بندی
    const [page, setPage] = useState(1)
    const [limit] = useState(8) // تعداد آیتم در هر صفحه
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [images, setImages] = useState([])
    // حالت بارگذاری
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTitle('تصاویر')
        setIcon(<PermMediaTwoToneIcon className="ml-3 text-2xl" />)
    }, [])
    const debouncedSearch = useMemo(
        () => debounce((q) => queryImages(q), 500),
        []
    )
    const queryImages = async (q) => {
        try {
            setLoading(true)
            const res = await axiosInstance.get(
                `/admin/files/images/search?q=` + q
            )
            console.log(res)
            if (res?.data) {
                console.log(res.data)
                setImages(res?.data?.data)
            }
        } catch (error) {
            console.log(error)
            setImages([])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery.trim())
        } else {
            debouncedSearch.cancel()
            fetchImages()
        }
        return () => debouncedSearch.cancel()
    }, [searchQuery, debouncedSearch])
    // لیست تصاویر واکشی‌شده

    // واکشی تصاویر از سرور
    const fetchImages = async (currentPage) => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/admin/files/images', {
                params: { page: currentPage, limit },
            })
            const data = response.data // { page, totalPages, totalResults, results }
            setImages(data.results)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error('خطا در واکشی تصاویر:', error)
        } finally {
            setLoading(false)
        }
    }

    // بارگذاری اولیه و هر زمان که page تغییر کند
    useEffect(() => {
        fetchImages(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    // رفرش
    const handleRefresh = () => {
        fetchImages(page)
    }
    return (
        <FileDeleteDialogContextProvider>
            <FileEditDialogContextProvider>
                <FileEditDialog handleRefresh={handleRefresh} />
                <UploadDialog handleRefresh={handleRefresh} />
                <FileDeleteDialog handleRefresh={handleRefresh} />
                <FileSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <ImageGallery
                    images={images}
                    loading={loading}
                    handleRefresh={handleRefresh}
                    limit={limit}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                />
            </FileEditDialogContextProvider>
        </FileDeleteDialogContextProvider>
    )
}

export default Page

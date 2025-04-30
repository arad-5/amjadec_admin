'use client'

import { useEffect, useMemo, useState } from 'react'
import FileFilter from './components/FileFilter'
import FileSearch from './components/FileSearch'
import FilesTable from './components/FilesTable'
import { useContext } from 'react'
import { TopBarContext } from '@/context/TopBarContextProvider'
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone'
import FileDeleteDialogContextProvider from './context/FileDeleteDialogContextProvider'
import FileEditDialogContextProvider from './context/FileEditDialogContextProvider'
import FileEditDialog from './components/FileEditDialog'
import FileDeleteDialog from './components/FileDeleteDialog'
import axiosInstance from '@/utils/axios'
import UploadDialog from './components/UploadDialog'
import debounce from 'lodash.debounce'

const page = () => {
    const { setTitle, setIcon } = useContext(TopBarContext)
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setTitle('فایل ها')
        setIcon(<FileCopyTwoToneIcon className="ml-3 text-2xl" />)
    }, [])
    const fetchFiles = async () => {
        try {
            const response = await axiosInstance.get(
                `/admin/files?page=${page + 1}&limit=${rowsPerPage}`
            )
            setFiles(response.data.files)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('Error fetching files:', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchFiles()
    }, [page, rowsPerPage])
    const debouncedSearch = useMemo(
        () => debounce((q) => queryFiles(q), 500),
        []
    )
    const queryFiles = async (q) => {
        try {
            setLoading(true)
            const res = await axiosInstance.get(`/admin/files/search?q=` + q)
            if (res?.data?.data) {
                setFiles(res?.data?.data)
            }
        } catch (error) {
            setFiles([])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery.trim())
        } else {
            debouncedSearch.cancel()
            fetchFiles()
        }
        return () => debouncedSearch.cancel()
    }, [searchQuery, debouncedSearch])

    const handleRefresh = () => {
        fetchFiles()
    }
    return (
        <div className="bg-white">
            <FileDeleteDialogContextProvider>
                <FileEditDialogContextProvider>
                    <UploadDialog handleRefresh={handleRefresh} />
                    <FileEditDialog handleRefresh={handleRefresh} />
                    <FileDeleteDialog handleRefresh={handleRefresh} />
                    <FileSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    {/* <FileFilter /> */}
                    <FilesTable
                        files={files}
                        loading={loading}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        totalPages={totalPages}
                    />
                </FileEditDialogContextProvider>
            </FileDeleteDialogContextProvider>
        </div>
    )
}

export default page

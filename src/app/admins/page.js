'use client'
import { AuthContext } from '@/context/AuthContext'
import { Box } from '@mui/system'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

import AdminsTable from './components/AdminsTable'
import axiosInstance from '@/utils/axios'
import AdminActivitiesDialogContextProvider from './context/AdminActivitiesDialogContextProvider'
import AdminEditDialogContextProvider from './context/AdminEditDialogContextProvider'
import AdminsContextProvider from './context/AdminsContextProvider'
import AdminEditDialog from './components/AdminEditDialog'
import AdminActivitiesDialog from './components/AdminActivitiesDialog'
import AddAdminDialog from './components/AddAdminDialog'
import LoopIcon from '@mui/icons-material/Loop'
import { IconButton, Tooltip } from '@mui/material'
import { cn } from '@/utils/cn'
import AdminDeleteDialogProvider from './context/AdminDeleteDialogContextProvider'
import AdminDeleteDialog from './components/AdminDeleteDialog'

import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import TopBar from '@/components/layout/TopBar'

const Page = () => {
    const router = useRouter()
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(false)

    const { admin } = useContext(AuthContext)
    if (admin?.role !== 'owner' && admin?.role !== 'developer')
        return router.push('/')
    useEffect(() => {
        fetchAdmins()
    }, [])
    const fetchAdmins = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get('/admin/admins')
            const admins = res.data?.admins
            if (admins) setAdmins(admins)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        fetchAdmins()
    }

    return (
        <AdminsContextProvider>
            <AdminEditDialogContextProvider>
                <AdminActivitiesDialogContextProvider>
                    <AdminDeleteDialogProvider>
                        <AdminEditDialog handleRefresh={handleRefresh} />
                        {/* <AdminActivitiesDialog /> */}
                        <AdminDeleteDialog handleRefresh={handleRefresh} />
                        <>
                            <TopBar
                                title={'مدیریت ادمین'}
                                icon={
                                    <PeopleAltTwoToneIcon className="text-2xl ml-3" />
                                }
                            />
                            <Box
                                sx={{
                                    padding: 3,
                                    background: '#fff',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 2,
                                    }}
                                >
                                    <AddAdminDialog
                                        handleRefresh={handleRefresh}
                                    />
                                    <Tooltip title={'بروزرسانی'}>
                                        <IconButton
                                            size="large"
                                            sx={{
                                                marginLeft: 2,
                                            }}
                                            onClick={handleRefresh}
                                        >
                                            <LoopIcon
                                                className={cn(
                                                    loading
                                                        ? 'animate-spin'
                                                        : ''
                                                )}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box
                                    sx={{
                                        overflowX: 'auto',
                                        width: '100%',
                                    }}
                                >
                                    <AdminsTable admins={admins} />
                                </Box>
                            </Box>
                        </>
                    </AdminDeleteDialogProvider>
                </AdminActivitiesDialogContextProvider>
            </AdminEditDialogContextProvider>
        </AdminsContextProvider>
    )
}

export default Page

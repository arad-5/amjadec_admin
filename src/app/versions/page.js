'use client'
import { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import VersionCreateForm from './components/VersionCreateForm'
import VersionsList from './components/VersionsList'
import TopBar from '@/components/layout/TopBar'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { AdminsContext } from '../admins/context/AdminsContextProvider'
import { AuthContext } from '@/context/AuthContext'
import axiosInstance from '@/utils/axios'

export default function Page() {
    const {
        admin: { role },
    } = useContext(AuthContext)
    const [versions, setVersions] = useState([])

    const fetchVersions = async () => {
        const res = await axiosInstance.get(`/admin/versions`)
        setVersions(res.data)
    }

    useEffect(() => {
        fetchVersions()
    }, [])
    return (
        <>
            <TopBar
                title={'نسخه ها'}
                icon={<DataObjectIcon className="text-2xl ml-3" />}
            />

            {role === 'developer' && (
                <VersionCreateForm fetchVersions={fetchVersions} />
            )}
            <VersionsList
                isDeveloper={role === 'developer'}
                versions={versions}
                setVersions={setVersions}
                fetchVersions={fetchVersions}
            />
        </>
    )
}

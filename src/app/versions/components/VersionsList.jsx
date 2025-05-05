import axiosInstance from '@/utils/axios'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VersionCard from './VersionCard'

const VersionsList = ({
    isDeveloper,
    versions,
    setVersions,
    fetchVersions,
}) => {
    const handleDelete = async (id) => {
        await axiosInstance.delete(`/admin/versions/${id}`)
        fetchVersions()
    }
    return (
        <Box
            sx={{
                p: 3,
            }}
        >
            {versions.map((v) => (
                <VersionCard
                    key={v._id}
                    version={v.version}
                    date={v.date}
                    changes={v.changes}
                    onDelete={() => handleDelete(v._id)}
                    isDeveloper={isDeveloper}
                />
            ))}
        </Box>
    )
}

export default VersionsList

'use client'
import TopBar from '@/components/layout/TopBar'
import { Box } from '@mui/system'
import React from 'react'
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone'

const page = () => {
    return (
        <div>
            <TopBar
                title={'آموزش'}
                icon={<SchoolTwoToneIcon className="text-2xl ml-3" />}
            />
            <Box
                sx={{
                    p: 3,
                    background: '#fff',
                }}
            ></Box>
        </div>
    )
}

export default page

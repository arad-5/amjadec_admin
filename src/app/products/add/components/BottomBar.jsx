import React from 'react'
import Submit from './Submit'
import { Box } from '@mui/material'

const BottomBar = () => {
    return (
        <Box
            sx={{
                padding: 2,
                width: '100%',
                borderTop: '1px solid #eee',
                borderRight: '1px solid #eee',
                backgroundColor: '#fff',
                position: 'sticky',
                left: 0,
                bottom: 0,
            }}
        >
            <Submit />
        </Box>
    )
}

export default BottomBar

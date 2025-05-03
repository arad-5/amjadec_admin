import React from 'react'
import Submit from './Submit'
import { Box } from '@mui/material'

const BottomBar = () => {
    return (
        <Box
            sx={{
                padding: 2,
                width: '100%',
                border: '1px solid #eee',
                borderBottom: '0px solid #eee',
                backgroundColor: '#fff',
                position: 'sticky',
                right: 0,
                bottom: 0,
            }}
        >
            <Submit />
        </Box>
    )
}

export default BottomBar

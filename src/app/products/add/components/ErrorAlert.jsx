import { Alert } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContextProvider'
import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone'
const ErrorAlert = () => {
    const { errorMessage } = useContext(ProductContext)

    const [open, setOpen] = React.useState(true)

    useEffect(() => {
        setOpen(errorMessage)
    }, [errorMessage])

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Box sx={{ padding: 2 }}>
                    <Alert color="error" icon={<ReportProblemTwoToneIcon />}>
                        {errorMessage.split(',').map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </Alert>
                </Box>
            </Collapse>
        </Box>
    )
}

export default ErrorAlert

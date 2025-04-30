import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import Collapse from '@mui/material/Collapse'

import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone'
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'

const MessageCollapse = ({ message }) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            {message?.message ? (
                <Collapse in={open}>
                    <Box sx={{ padding: 2, background: 'white' }}>
                        <Alert
                            severity={message?.type ? message?.type : 'info'}
                            icon={
                                message?.type === 'success' ? (
                                    <CheckCircleTwoToneIcon />
                                ) : message?.type === 'info' ? (
                                    <InfoTwoToneIcon />
                                ) : message?.type === 'warning' ? (
                                    <WarningTwoToneIcon />
                                ) : message?.type === 'error' ? (
                                    <ErrorTwoToneIcon />
                                ) : (
                                    <InfoTwoToneIcon />
                                )
                            }
                        >
                            {message.message.split(',').map((message, i) => (
                                <li key={message + i}>{message}</li>
                            ))}
                        </Alert>
                    </Box>
                </Collapse>
            ) : null}
        </Box>
    )
}

export default MessageCollapse

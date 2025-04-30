import { Alert } from '@mui/material'
import React, { useContext } from 'react'
import { EditProductContext } from '../context/EditProductContextProvider'

const ErrorAlert = () => {
    const { errorMessage } = useContext(EditProductContext)
    if (!errorMessage) return
    return (
        <div className="bg-white p-4">
            <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
            </Alert>
        </div>
    )
}

export default ErrorAlert

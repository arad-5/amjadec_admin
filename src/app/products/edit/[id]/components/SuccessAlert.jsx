import { Alert } from '@mui/material'
import { useContext } from 'react'
import { EditProductContext } from '../context/EditProductContextProvider'

const SuccessAlert = () => {
    const { successMessage } = useContext(EditProductContext)
    if (!successMessage) return
    return (
        <div className="bg-white p-4">
            <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
            </Alert>
        </div>
    )
}

export default SuccessAlert

import { Alert } from '@mui/material'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContextProvider'

const SuccessAlert = () => {
    const { successMessage } = useContext(ProductContext)
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

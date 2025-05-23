import React, { useContext } from 'react'
import Submit from './Submit'
import { EditProductContext } from '../context/EditProductContextProvider'
import SuccessAlert from './SuccessAlert'
import ErrorAlert from './ErrorAlert'
import { Box } from '@mui/material'

const TopBar = ({ loading }) => {
    const { setErrorMessage } = useContext(EditProductContext)
    return (
        <Box
            sx={{
                zIndex: 100,
            }}
            className="bg-white sticky top-0 left-0 mb-4"
        >
            <div className="w-full p-4 pb-4 pt-6 text-white flex justify-between items-center !bg-[#1462b0] ">
                <h1 className="text-lg font-semibold">ویرایش محصول</h1>
                <Submit setErrorMessage={setErrorMessage} loading={loading} />
            </div>
            <SuccessAlert />
            <ErrorAlert />
        </Box>
    )
}

export default TopBar

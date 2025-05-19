import { TextField } from '@mui/material'
import React, { useContext } from 'react'

import { EditProductContext } from '../context/EditProductContextProvider'

const ProductInfo = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        partNumber,
        setPartNumber,
    } = useContext(EditProductContext)

    return (
        <div className="mb-3   bg-white p-4 rounded-lg shadow-md">
            <div className="pb-3 mb-3 border-b">
                <span className="text-lg font-semibold">مشخصات محصول</span>
            </div>
            <form className=" w-full">
                <TextField
                    label="عنوان محصول"
                    variant="outlined"
                    fullWidth
                    multiline
                    className="!mb-4"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="پارت نامبر"
                    variant="outlined"
                    fullWidth
                    className="!mb-4"
                    required
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="توضیحات"
                    multiline
                    fullWidth
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </form>
        </div>
    )
}

export default ProductInfo

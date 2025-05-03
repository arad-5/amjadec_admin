import React, { createContext, useState } from 'react'

export const ProductDeleteDialogContext = createContext()

const ProductDeleteDialogContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)

    const [product, setProduct] = useState({})
    return (
        <ProductDeleteDialogContext.Provider
            value={{
                open,
                setOpen,
                product,
                setProduct,
            }}
        >
            {children}
        </ProductDeleteDialogContext.Provider>
    )
}

export default ProductDeleteDialogContextProvider

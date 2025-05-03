import React, { createContext, useState } from 'react'
export const CategoryDeleteContext = createContext()

const CategoryDeleteContextProvider = ({ children }) => {
    const [title, setTitle] = useState(null)
    const [open, setOpen] = useState(false)
    const [categoryId, setCategoryId] = useState(null)

    return (
        <CategoryDeleteContext.Provider
            value={{
                title,
                setTitle,
                open,
                setOpen,
                categoryId,
                setCategoryId,
            }}
        >
            {children}
        </CategoryDeleteContext.Provider>
    )
}

export default CategoryDeleteContextProvider

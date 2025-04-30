import { createContext, useState } from 'react'

export const CategoryEditContext = createContext()

const CategoryEditContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    return (
        <CategoryEditContext.Provider
            value={{
                open,
                setOpen,
                selectedCategory,
                setSelectedCategory,
            }}
        >
            {children}
        </CategoryEditContext.Provider>
    )
}

export default CategoryEditContextProvider

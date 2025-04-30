import { createContext, useEffect, useState } from 'react'

export const CategoryContext = createContext()

const CategoryContextProvider = ({ children }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [isMain, setIsMain] = useState(false)
    const [parent, setParent] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        console.log(parent)
    }, [parent])

    return (
        <CategoryContext.Provider
            value={{
                title,
                description,
                slug,
                isMain,
                parent,
                setTitle,
                setDescription,
                setSlug,
                setIsMain,
                setParent,
                image,
                setImage,
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider

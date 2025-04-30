import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext()
const ProductContextProvider = ({ children }) => {
    // State for form fields
    const [status, setStatus] = useState(null)
    const [images, setImages] = useState([])
    const [mainImage, setMainImage] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [partNumber, setPartNumber] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState(null)
    const [categoryObj, setCategoryObj] = useState({})
    const [discountPrice, setDiscountPrice] = useState(90000) // Default discount price
    const [isDiscountActive, setIsDiscountActive] = useState(true) // Toggle for discount
    const [stockStatus, setStockStatus] = useState('in_stock')
    const [stockQuantity, setStockQuantity] = useState(1)
    const [lowStockThreshold, setLowStockThreshold] = useState(10)
    const [specifications, setSpecifications] = useState([
        // { id: 1, attribute: 'Material', value: 'Cotton' },
        // { id: 2, attribute: 'Color', value: 'Blue' },
    ])
    const [attachedFiles, setAttachedFiles] = useState([])
    const [imageUrl, setImageUrl] = useState('')

    // State for handling submission status
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {}, [])
    useEffect(() => {
        console.log('main image changed', mainImage)
    }, [mainImage])
    useEffect(() => {
        console.log('images changed', images)
    }, [images])
    useEffect(() => {
        console.log('title changed', title)
    }, [title])

    useEffect(() => {
        console.log('description changed', description)
    }, [description])

    useEffect(() => {
        console.log('price changed', price)
    }, [price])

    useEffect(() => {
        console.log('category changed', category)
    }, [category])

    useEffect(() => {
        console.log('specifications changed', specifications)
    }, [specifications])

    useEffect(() => {
        console.log('imageUrl changed', imageUrl)
    }, [imageUrl])

    useEffect(() => {
        console.log('successMessage changed', successMessage)
    }, [successMessage])

    useEffect(() => {
        console.log('discountPrice changed', discountPrice)
    }, [discountPrice])

    useEffect(() => {
        console.log('isDiscountActive changed', isDiscountActive)
    }, [isDiscountActive])

    useEffect(() => {
        console.log('stockStatus changed', stockStatus)
    }, [stockStatus])

    useEffect(() => {
        console.log('stockQuantity changed', stockQuantity)
    }, [stockQuantity])

    useEffect(() => {
        console.log('lowStockThreshold changed', lowStockThreshold)
    }, [lowStockThreshold])

    useEffect(() => {
        console.log('categoryObj changed', categoryObj)
    }, [categoryObj])

    useEffect(() => {
        console.log('partNumber changed', partNumber)
    }, [partNumber])

    return (
        <ProductContext.Provider
            value={{
                status,
                setStatus,
                title,
                setTitle,
                description,
                setDescription,
                price,
                setPrice,
                category,
                setCategory,
                specifications,
                setSpecifications,
                imageUrl,
                setImageUrl,
                successMessage,
                setSuccessMessage,
                errorMessage,
                setErrorMessage,
                discountPrice,
                setDiscountPrice,
                isDiscountActive,
                setIsDiscountActive,
                stockStatus,
                setStockStatus,
                stockQuantity,
                setStockQuantity,
                lowStockThreshold,
                setLowStockThreshold,
                categoryObj,
                setCategoryObj,
                partNumber,
                setPartNumber,
                images,
                setImages,
                mainImage,
                setMainImage,
                attachedFiles,
                setAttachedFiles,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider

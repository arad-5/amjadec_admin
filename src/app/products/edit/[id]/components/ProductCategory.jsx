import CategorySelectDialog from './CategorySelectDialog'

const ProductCategory = () => {
    return (
        <div className="mb-3 bg-white p-4 rounded-lg shadow-md ">
            <div className="mb-3">
                <span className="text-xl font-medium">دسته بندی ها</span>
            </div>
            <div className="mb-3">
                <CategorySelectDialog />
            </div>
        </div>
    )
}

export default ProductCategory

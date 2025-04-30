import CategorySelectDialog from '@/components/categories/CategorySelectDialog'

const ProductCategory = () => {
    return (
        <div className="rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="pb-3 mb-6 border-b">
                <span className="text-lg font-semibold">دسته بندی</span>
            </div>
            <div className="mb-3">
                <CategorySelectDialog />
            </div>
        </div>
    )
}

export default ProductCategory

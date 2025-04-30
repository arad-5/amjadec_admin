import React from 'react'

const ProductFilter = () => {
    return (
        <div className="rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="pb-3 mb-6 border-b">
                <span className="text-lg font-semibold">مدیریت فیلتر</span>
            </div>
            <div>
                <div className="w-full bg-neutral-100 rounded-md h-20 flex items-center justify-center ">
                    <span> برای مشخصات فیلتر دسته بندی را انتخاب کنید.</span>
                </div>
            </div>
        </div>
    )
}

export default ProductFilter

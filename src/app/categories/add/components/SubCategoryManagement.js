import React from 'react'
import AddCategoryModal from './AddCategoryModal'

const SubCategoryManagement = () => {
    return (
        <div>
            <div className="mb-3 flex items-center">
                <span className="text-lg font-semibold ml-3">
                    زیر دسته بندی ها
                </span>
                <AddCategoryModal />
            </div>
            <div className="">
                <div className="bg-neutral-100 w-full p-6 rounded-lg">
                    هیج زیر دسته بندی ای وجود ندارد
                </div>
            </div>
        </div>
    )
}

export default SubCategoryManagement

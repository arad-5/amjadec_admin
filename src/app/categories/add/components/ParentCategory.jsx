import React, { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContextProvider'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { Button, IconButton, Skeleton } from '@mui/material'
const ParentCategory = ({ loading }) => {
    const { parent } = useContext(CategoryContext)

    return (
        <div className="col-span-6 pl-4 bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="pb-3 mb-3 border-b">
                <span className="text-lg font-semibold"> دسته بندی والد</span>
            </div>
            {parent ? (
                <div className="p-4 rounded-md bg-blue-50 flex justify-between items-center">
                    <div>
                        <CategoryTwoToneIcon
                            fontSize="medium"
                            className="text-blue-800 ml-2"
                        />
                        <span className="text-lg font-semibold text-blue-800">
                            {parent.title}
                        </span>
                    </div>
                </div>
            ) : (
                <Skeleton
                    height={80}
                    width={'100%'}
                    animation="wave"
                    sx={{ transform: 'unset' }}
                ></Skeleton>
            )}
        </div>
    )
}

export default ParentCategory

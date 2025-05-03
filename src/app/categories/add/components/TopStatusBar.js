import { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContextProvider'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'

const TopStatusBar = () => {
    const { parent } = useContext(CategoryContext)

    return (
        <div className="w-full p-4 pb-4 pt-6 text-white flex justify-between items-center !bg-[#1462b0] absolute top-0 left-0">
            <div className="flex items-center">
                <AddTwoToneIcon />
                <h1 className="text-lg mr-2">
                    {parent ? (
                        <>
                            افزودن زیر دسته بندی به <b>{parent.title}</b>
                        </>
                    ) : (
                        <span className="font-semibold">افزودن دسته بندی</span>
                    )}
                </h1>
            </div>
        </div>
    )
}

export default TopStatusBar

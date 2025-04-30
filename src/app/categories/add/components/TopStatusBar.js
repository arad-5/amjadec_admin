import { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContextProvider'
import Submit from './Submit'

const TopStatusBar = () => {
    const { parent } = useContext(CategoryContext)

    return (
        <div className="w-full p-4 pb-4 pt-6 text-white flex justify-between items-center !bg-[#1462b0] sticky top-0 left-0">
            <h1 className="text-lg ">
                {parent ? (
                    <>
                        افزودن زیر دسته بندی به <b>{parent.title}</b>
                    </>
                ) : (
                    <span className="font-semibold">افزودن دسته بندی</span>
                )}
            </h1>
            <Submit />
        </div>
    )
}

export default TopStatusBar

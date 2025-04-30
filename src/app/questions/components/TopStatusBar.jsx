import React from 'react'
import { TbMessage2Question } from 'react-icons/tb'

const TopStatusBar = () => {
    return (
        <div className="flex items-center justify-between  py-6 px-6 text-white !bg-[#1462b0]">
            <div className="flex items-center ">
                <TbMessage2Question className="text-2xl ml-3" />
                <h1 className="text-xl font-bold">سوالات</h1>
            </div>
            <div className="">
                <span className="text-sm ml-2">تعداد کل:</span>
                <span className="text-xl font-semibold">10</span>
            </div>
        </div>
    )
}

export default TopStatusBar

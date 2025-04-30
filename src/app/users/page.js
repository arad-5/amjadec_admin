import UserRow from '@/components/users/UserRow'
import UsersTable from '@/components/users/UsersTable'
import React from 'react'
import { FaUsers } from 'react-icons/fa'

const Users = () => {
    return (
        <div className="bg-white md:p-6 rounded-xl md:pt-8">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center pl-3 ">
                    <FaUsers className="text-2xl ml-3" />
                    <h1 className="text-xl font-bold">کاربران</h1>
                </div>
                <div className="">
                    <span className="text-sm ml-2">تعداد کل:</span>
                    <span className="text-xl font-semibold">10</span>
                </div>
            </div>
            <UsersTable />
        </div>
    )
}

export default Users

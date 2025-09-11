'use client'
import TopBar from '@/components/layout/TopBar'
import axiosInstance from '@/utils/axios'
import { Box } from '@mui/material'
import Link from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import React, { useEffect, useState } from 'react'

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get('/admin/orders')
                if (data.success) {
                    setOrders(data.orders)
                }
            } catch (err) {
                console.error('⛔ خطا در دریافت سفارشات:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) return <p>در حال بارگذاری سفارشات...</p>

    return (
        <Box className="bg-white">
            <TopBar
                title={'لیست سفارشات'}
                icon={<ShoppingCartOutlinedIcon className="ml-3 text-2xl" />}
            />
            <Box sx={{ flexGrow: 1, padding: 3 }} className="overflow-auto">
                <table className=" table-auto border text-sm overflow-auto">
                    <thead className="bg-gray-100 text-right">
                        <tr>
                            <th className="border px-3 py-2">شناسه</th>
                            <th className="border px-3 py-2">نام گیرنده</th>
                            <th className="border px-3 py-2">جمع کل</th>
                            <th className="border px-3 py-2">وضعیت</th>
                            <th className="border px-3 py-2">تاریخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr
                                key={o._id}
                                className="border-b hover:bg-gray-100 cursor-pointer transition"
                            >
                                <Link
                                    href={`/orders/${o._id}`}
                                    className="contents" // ✅ table-safe clickable wrapper
                                >
                                    <td className="border px-3 py-2 font-mono text-xs">
                                        {o._id}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {o.recipient?.fullName ||
                                            o.guestInfo?.fullName}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {o.totalPrice.toLocaleString()} تومان
                                    </td>
                                    <td className="border px-3 py-2">
                                        {o.statusHistory?.[
                                            o.statusHistory.length - 1
                                        ]?.status || '—'}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {new Date(
                                            o.createdAt
                                        ).toLocaleDateString('fa-IR')}
                                    </td>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    )
}

export default AdminOrdersPage

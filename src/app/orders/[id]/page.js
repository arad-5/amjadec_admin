'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from '@/utils/axios'
import { Box } from '@mui/material'
import TopBar from '@/components/layout/TopBar'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

const OrderDetails = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [statusUpdating, setStatusUpdating] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('')
    const [refresh, setRefresh] = useState(false)

    const statusOptions = [
        'pending',
        'paid',
        'failed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
    ]

    useEffect(() => {
        if (!id) return

        const fetchOrder = async () => {
            try {
                const { data } = await axiosInstance.get(`/admin/orders/${id}`)
                if (data.success) {
                    setOrder(data.order)
                    const lastStatus =
                        data.order.statusHistory?.[
                            data.order.statusHistory.length - 1
                        ]?.status
                    setSelectedStatus(lastStatus || '')
                }
            } catch (err) {
                console.error('⛔ خطا در گرفتن جزئیات سفارش:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [id, refresh])

    const handleStatusChange = async () => {
        if (!selectedStatus || selectedStatus === order.status) return

        try {
            setStatusUpdating(true)
            const { data } = await axiosInstance.patch(
                `/admin/orders/${order._id}/status`,
                { status: selectedStatus }
            )
            if (data.success) {
                alert('✅ وضعیت با موفقیت تغییر کرد.')
                setRefresh((r) => !r)
            } else {
                alert('❌ خطا در تغییر وضعیت: ' + data.message)
            }
        } catch (err) {
            console.error('⛔ خطا در تغییر وضعیت:', err)
            alert('❌ خطای سرور در تغییر وضعیت.')
        } finally {
            setStatusUpdating(false)
        }
    }

    if (loading) return <p className="p-4">در حال بارگذاری...</p>
    if (!order) return <p className="p-4">سفارش یافت نشد</p>

    const {
        recipient,
        guestInfo,
        items,
        totalPrice,
        statusHistory,
        createdAt,
        shippingMethod,
        shippingPrice,
        paymentMethod,
        paperInvoiceRequested,
    } = order

    const address = recipient || guestInfo

    return (
        <Box className="bg-white ">
            <TopBar
                title={'جزییات سفارش'}
                icon={<ShoppingCartOutlinedIcon className="ml-3 text-2xl" />}
            />
            <Box sx={{ flexGrow: 1, padding: 3 }} className="space-y-6">
                {/* اطلاعات کلی سفارش */}
                <div className="rounded border p-4 space-y-2 text-sm bg-gray-50">
                    <p>
                        <strong>کد سفارش:</strong> {order._id}
                    </p>
                    <p>
                        <strong>نام گیرنده:</strong> {address?.fullName}
                    </p>
                    <p>
                        <strong>شماره موبایل:</strong> {address?.mobile || '—'}
                    </p>
                    <p>
                        <strong>آدرس:</strong> {address?.addressLine1},{' '}
                        {address?.city}, {address?.postalCode},{' '}
                        {address?.country}
                    </p>
                    <p>
                        <strong>روش ارسال:</strong> {shippingMethod}
                    </p>
                    <p>
                        <strong>روش پرداخت:</strong> {paymentMethod}
                    </p>
                    <p>
                        <strong>درخواست فاکتور کاغذی:</strong>{' '}
                        {paperInvoiceRequested ? 'بله' : 'خیر'}
                    </p>
                    <p>
                        <strong>تاریخ ثبت:</strong>{' '}
                        {new Date(createdAt).toLocaleDateString('fa-IR')}
                    </p>
                    <p>
                        <strong>وضعیت فعلی:</strong>{' '}
                        {statusHistory?.[statusHistory.length - 1]?.status}
                    </p>
                </div>

                {/* فرم تغییر وضعیت */}
                <div className="bg-white border rounded p-4 space-y-3">
                    <label className="block font-semibold text-sm">
                        تغییر وضعیت سفارش:
                    </label>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border p-2 rounded text-sm"
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleStatusChange}
                            disabled={statusUpdating}
                            className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                        >
                            {statusUpdating
                                ? 'در حال بروزرسانی...'
                                : 'ثبت تغییر وضعیت'}
                        </button>
                    </div>
                </div>

                {/* محصولات سفارش */}
                <h2 className="text-lg font-semibold mt-6">
                    محصولات سفارش داده‌شده:
                </h2>
                <div className="rounded border divide-y">
                    {items.map((item, idx) => {
                        const product = item.product
                        const imageUrl = product?.mainImage?.url

                        return (
                            <Link
                                href={`/products/${product?.slug || product?._id}`}
                                key={idx}
                                className="flex items-center gap-4 p-3 text-sm hover:bg-gray-50 transition"
                            >
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={product?.title}
                                        width={64}
                                        height={64}
                                        className="rounded border object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded border flex items-center justify-center text-xs text-gray-400">
                                        بدون تصویر
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-base">
                                        {product?.title}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        پارت نامبر: {product?.partNumber || '—'}
                                    </span>
                                    <span className="text-sm">
                                        تعداد: {item.quantity}
                                    </span>
                                    <span className="text-sm">
                                        قیمت واحد:{' '}
                                        {item.price?.toLocaleString()} تومان
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* جمع کل */}
                <div className="rounded border p-4 space-y-2 text-sm bg-gray-50">
                    <p>
                        <strong>هزینه ارسال:</strong>{' '}
                        {shippingPrice?.toLocaleString()} تومان
                    </p>
                    <p className="font-semibold text-primary-700">
                        <strong>جمع کل نهایی:</strong>{' '}
                        {totalPrice?.toLocaleString()} تومان
                    </p>
                </div>

                {/* تاریخچه وضعیت‌ها */}
                <h3 className="text-lg font-semibold mt-6">
                    تاریخچه وضعیت‌ها:
                </h3>
                <ul className="text-sm border rounded p-4 space-y-1 bg-gray-50">
                    {statusHistory.map((entry, idx) => (
                        <li key={idx}>
                            <strong>{entry.status}</strong> در{' '}
                            {new Date(entry.date).toLocaleDateString('fa-IR')}
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
    )
}

export default OrderDetails

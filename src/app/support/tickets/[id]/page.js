'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from '@/utils/axios'
import {
    Box,
    Typography,
    CircularProgress,
    Chip,
    Link as MuiLink,
} from '@mui/material'

import axiosInstance from '@/utils/axios'
import MessageList from '../../components/MessageList'
import ReplyForm from '../../components/ReplyForm'

export default function TicketDetailsPage() {
    const { id } = useParams()
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchTicket = async () => {
        try {
            const res = await axiosInstance.get(`/admin/support/tickets/${id}`)
            setTicket(res.data)
        } catch (err) {
            console.error('⛔ خطا در دریافت تیکت:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) fetchTicket()
    }, [id])

    if (loading) return <CircularProgress />
    if (!ticket) return <Typography>تیکت پیدا نشد.</Typography>

    return (
        <Box sx={{ p: 4, backgroundColor: '#fff' }}>
            <Typography variant="h5" gutterBottom>
                {ticket.title}
            </Typography>

            <Chip
                label={translateStatus(ticket.status)}
                color="primary"
                sx={{ mr: 1 }}
            />
            <Chip
                label={`اولویت: ${translatePriority(ticket.priority)}`}
                color="secondary"
                sx={{ mr: 2 }}
            />

            <Typography variant="body1" sx={{ mt: 3 }}>
                {ticket.description}
            </Typography>

            <Typography variant="caption" sx={{ display: 'block', mt: 3 }}>
                تاریخ ایجاد:{' '}
                {new Date(ticket.createdAt).toLocaleString('fa-IR')}
            </Typography>

            {ticket.attachments?.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2">فایل پیوست:</Typography>
                    {ticket.attachments.map((url, index) => (
                        <MuiLink
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener"
                            underline="hover"
                        >
                            دانلود فایل {index + 1}
                        </MuiLink>
                    ))}
                </Box>
            )}

            <MessageList messages={ticket.messages} />

            <ReplyForm ticketId={ticket._id} onSuccess={fetchTicket} />
        </Box>
    )
}

function translateStatus(status) {
    switch (status) {
        case 'open':
            return 'باز'
        case 'in_progress':
            return 'در حال بررسی'
        case 'answered':
            return 'پاسخ داده‌شده'
        case 'closed':
            return 'بسته شده'
        default:
            return status
    }
}

function translatePriority(priority) {
    switch (priority) {
        case 'low':
            return 'کم'
        case 'medium':
            return 'متوسط'
        case 'high':
            return 'زیاد'
        default:
            return priority
    }
}

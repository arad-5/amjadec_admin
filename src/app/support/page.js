'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress,
    Link,
    IconButton,
} from '@mui/material'
import CreateTicketForm from './components/CreateTicketForm'
import axiosInstance from '@/utils/axios'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import PermPhoneMsgTwoToneIcon from '@mui/icons-material/PermPhoneMsgTwoTone'

import { useRouter } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import PriorityChip from './components/PriorityChip'
import StatusChip from './components/StatusChip'
export default function SupportTicketsPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()
    const fetchTickets = async () => {
        try {
            const res = await axiosInstance.get('/admin/support/tickets')
            setTickets(res.data)
        } catch (err) {
            console.error('⛔ خطا در دریافت تیکت‌ها:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    return (
        <>
            <TopBar
                title={'پشتیبانی'}
                icon={<PermPhoneMsgTwoToneIcon className="text-2xl ml-3" />}
            />
            <Box sx={{ p: 4, backgroundColor: '#fff' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                    }}
                >
                    <Typography variant="h5">تیکت‌های پشتیبانی</Typography>
                    <Button
                        variant="contained"
                        onClick={() => setOpenDialog(true)}
                    >
                        ارسال تیکت جدید
                    </Button>
                </Box>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>عنوان</TableCell>
                                <TableCell>وضعیت</TableCell>
                                <TableCell>اولویت</TableCell>
                                <TableCell>تاریخ ایجاد</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow
                                    key={ticket._id}
                                    hover
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {ticket.title}
                                    </TableCell>
                                    <TableCell>
                                        <StatusChip status={ticket.status} />
                                    </TableCell>
                                    <TableCell>
                                        <PriorityChip
                                            priority={ticket.priority}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            ticket.createdAt
                                        ).toLocaleDateString('fa-IR')}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() =>
                                                router.push(
                                                    `/support/tickets/${ticket._id}`
                                                )
                                            }
                                        >
                                            <VisibilityTwoToneIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>ارسال تیکت جدید</DialogTitle>
                    <DialogContent>
                        <CreateTicketForm
                            onSuccess={() => {
                                setOpenDialog(false)
                                fetchTickets() // به جای reload از API لیست جدید بگیر
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
        </>
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

'use client'
import { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material'
import axios from '@/utils/axios'
import axiosInstance from '@/utils/axios'

export default function ReplyForm({ ticketId, onSuccess }) {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await axiosInstance.post(
                `/admin/support/tickets/${ticketId}/reply`,
                {
                    message,
                }
            )
            setMessage('')
            if (onSuccess) onSuccess()
        } catch (err) {
            setError('❌ خطا در ارسال پاسخ.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="پاسخ"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                fullWidth
                required
                rows={3}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" type="submit" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'ارسال پاسخ'}
            </Button>

            {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    )
}

'use client'
import { useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    MenuItem,
} from '@mui/material'

import axiosInstance from '@/utils/axios'

export default function CreateTicketForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        attachment: null,
        priority: 'medium',
    })

    const [loading, setLoading] = useState(false)
    const [responseMsg, setResponseMsg] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, files } = e.target

        if (name === 'attachment') {
            setFormData((prev) => ({ ...prev, attachment: files[0] }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setResponseMsg('')
        setError('')

        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('description', formData.description)
            data.append('priority', formData.priority)
            if (formData.attachment) {
                data.append('attachment', formData.attachment)
            }

            const res = await axiosInstance.post('/admin/support/tickets', data)

            setResponseMsg('✅ تیکت با موفقیت ارسال شد.')
            setFormData({
                title: '',
                description: '',
                attachment: null,
                priority: 'medium',
            })
            if (onSuccess) onSuccess()
        } catch (err) {
            const msg =
                err?.response?.data?.message || '❌ خطا در ارسال تیکت رخ داد.'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                label="عنوان تیکت"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />

            <TextField
                label="توضیحات"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                sx={{ mb: 2 }}
            />

            <TextField
                label="اولویت"
                name="priority"
                select
                value={formData.priority}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            >
                <MenuItem value="low">کم</MenuItem>
                <MenuItem value="medium">متوسط</MenuItem>
                <MenuItem value="high">زیاد</MenuItem>
            </TextField>

            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                بارگذاری فایل (اختیاری)
                <input
                    type="file"
                    hidden
                    name="attachment"
                    accept="image/*"
                    onChange={handleChange}
                />
            </Button>

            {formData.attachment && (
                <Typography sx={{ mb: 2 }}>
                    فایل انتخاب‌شده: {formData.attachment.name}
                </Typography>
            )}

            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'ارسال تیکت'}
            </Button>

            {responseMsg && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                    {responseMsg}
                </Typography>
            )}
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    )
}

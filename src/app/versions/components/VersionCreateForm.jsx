import axiosInstance from '@/utils/axios'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

const VersionCreateForm = ({ fetchVersions }) => {
    const [form, setForm] = useState({ version: '', changes: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axiosInstance.post(`/admin/versions`, {
            version: form.version,
            changes: form.changes.split('\n'),
            createdBy: 'Admin',
        })
        setForm({ version: '', changes: '' })
        fetchVersions()
    }

    return (
        <Box sx={{ p: 3, backgroundColor: '#fff' }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <TextField
                    fullWidth
                    label="شماره نسخه (مثلاً v1.2.0)"
                    value={form.version}
                    onChange={(e) =>
                        setForm({ ...form, version: e.target.value })
                    }
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="تغییرات (هر خط یک مورد)"
                    value={form.changes}
                    onChange={(e) =>
                        setForm({ ...form, changes: e.target.value })
                    }
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    افزودن نسخه
                </Button>
            </form>
        </Box>
    )
}

export default VersionCreateForm

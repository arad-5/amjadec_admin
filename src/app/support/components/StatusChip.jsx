import { Chip } from '@mui/material'

export default function StatusChip({ status }) {
    const map = {
        open: { label: 'باز', color: 'primary' },
        in_progress: { label: 'در حال بررسی', color: 'warning' },
        answered: { label: 'پاسخ داده‌شده', color: 'success' },
        closed: { label: 'بسته شده', color: 'default' },
    }

    const item = map[status] || { label: status, color: 'default' }

    return <Chip label={item.label} color={item.color} size="small" />
}

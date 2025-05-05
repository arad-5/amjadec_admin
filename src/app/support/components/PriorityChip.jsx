import { Chip } from '@mui/material'

export default function PriorityChip({ priority }) {
    const map = {
        low: { label: 'کم', color: 'success' },
        medium: { label: 'متوسط', color: 'warning' },
        high: { label: 'زیاد', color: 'error' },
    }

    const item = map[priority] || { label: priority, color: 'default' }

    return <Chip label={item.label} color={item.color} size="small" />
}

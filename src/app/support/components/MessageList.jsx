import { Box, Typography, Paper } from '@mui/material'

export default function MessageList({ messages = [] }) {
    if (messages.length === 0) {
        return <Typography sx={{ mt: 3 }}>هیچ پاسخی ثبت نشده است.</Typography>
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                گفت‌وگو
            </Typography>

            {messages.map((msg, idx) => (
                <Paper
                    key={idx}
                    sx={{
                        p: 2,
                        mb: 2,
                        bgcolor:
                            msg.sender === 'developer' ? '#e3f2fd' : '#f3e5f5',
                        borderRight:
                            msg.sender === 'developer'
                                ? '5px solid #1976d2'
                                : '5px solid #9c27b0',
                    }}
                >
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        <strong>
                            {msg.sender === 'developer'
                                ? 'توسعه‌دهنده'
                                : 'ادمین'}
                        </strong>{' '}
                        | {new Date(msg.createdAt).toLocaleString('fa-IR')}
                    </Typography>
                    <Typography>{msg.message}</Typography>
                </Paper>
            ))}
        </Box>
    )
}

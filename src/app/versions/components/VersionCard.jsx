'use client'
import { Card, CardContent, Button } from '@mui/material'

export default function VersionCard({
    version,
    date,
    changes,
    onDelete,
    isDeveloper,
}) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <h2 className="font-sans text-xl font-semibold mb-3">
                    {version}
                </h2>
                <p>{new Date(date).toLocaleDateString('fa-IR')}</p>
                <ul style={{ paddingInlineStart: '20px' }}>
                    {changes.map((change, index) => (
                        <li key={index}>{change}</li>
                    ))}
                </ul>
                {isDeveloper && (
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onDelete}
                        sx={{ mt: 1 }}
                    >
                        حذف
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

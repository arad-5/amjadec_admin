'use client'
import { Box, Button, Chip, Typography } from '@mui/material'

import { useState } from 'react'
import FileListDialog from './FileListDialog'

const FilePicker = ({ label, multiple = false, value, onChange }) => {
    const [open, setOpen] = useState(false)

    const handleConfirm = (files) => {
        onChange(multiple ? files : files[0] || null)
        setOpen(false)
    }

    const handleDelete = (index) => {
        if (multiple) {
            const updated = [...value]
            updated.splice(index, 1)
            onChange(updated)
        } else {
            onChange(null)
        }
    }

    return (
        <Box mb={3}>
            <Typography mb={1}>{label}</Typography>

            <Box>
                {multiple ? (
                    <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                        {value?.map((f, i) => (
                            <Chip
                                key={f._id}
                                label={f.filename}
                                onDelete={() => handleDelete(i)}
                                variant="outlined"
                            />
                        ))}
                    </Box>
                ) : (
                    value && (
                        <Chip
                            label={value.filename}
                            onDelete={handleDelete}
                            variant="outlined"
                            sx={{ mb: 1 }}
                        />
                    )
                )}
            </Box>

            <Button variant="outlined" onClick={() => setOpen(true)}>
                انتخاب فایل
            </Button>

            <FileListDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
                allowMultiple={multiple}
            />
        </Box>
    )
}

export default FilePicker

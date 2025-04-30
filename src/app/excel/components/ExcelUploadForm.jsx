import React from 'react'
import {
    Box,
    Button,
    Typography,
    Stack,
    CircularProgress,
    Paper,
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function ExcelUploadForm({
    handleSubmit,
    handleFileChange,
    selectedFile,
    loading,
}) {
    return (
        <Paper
            elevation={3}
            variant="outlined"
            sx={{ p: 3, borderRadius: 2, maxWidth: 400, mx: 'auto' }}
        >
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} alignItems="center">
                    {/* Display selected file name with icon */}
                    {selectedFile && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <InsertDriveFileIcon color="action" />
                            <Typography
                                variant="body2"
                                sx={{ wordBreak: 'break-all' }}
                            >
                                {selectedFile.name}
                            </Typography>
                        </Box>
                    )}
                    {/* File Input Button */}
                    <Button
                        variant="outlined"
                        component="label"
                        size="medium"
                        startIcon={<UploadFileIcon />}
                        sx={{ textTransform: 'none', minWidth: 180 }}
                    >
                        {selectedFile ? 'تغییر فایل' : 'انتخاب فایل اکسل'}
                        <input
                            type="file"
                            hidden
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                        />
                    </Button>

                    {/* Upload Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={!loading && <CloudUploadIcon />}
                        disabled={loading || !selectedFile}
                        size="medium"
                        sx={{ textTransform: 'none', minWidth: 180 }}
                    >
                        {loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            'آپلود فایل'
                        )}
                    </Button>
                </Stack>
            </Box>
        </Paper>
    )
}

import React from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import ImageIcon from '@mui/icons-material/Image'
import Image from 'next/image'

const FilePreviewer = ({ file, isUploaded = false }) => {
    if (!file) return null

    const fileUrl = isUploaded ? file.url : URL.createObjectURL(file)
    const fileType = file.type ? file.type.split('/')[0] : ''
    const fileExtension = file.name
        ? file.name.split('.').pop().toLowerCase()
        : ''

    return (
        <div className="bg-neutral-50 p-4 border rounded-lg w-36 ">
            <div className="">
                <span className="text-xs w-full text-wrap inline-block">
                    {file.name || file.filename}
                </span>
            </div>
            {isUploaded && (
                <Typography variant="body2">
                    {(file.size / 1024).toFixed(2)} KB
                </Typography>
            )}

            <div className="flex">
                {fileType === 'image' && (
                    <Image
                        src={fileUrl}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="w-36 bg-white"
                        style={{ borderRadius: 8 }}
                    />
                )}

                {/* Video Preview */}
                {fileType === 'video' && (
                    <video width="100%" controls style={{ borderRadius: 8 }}>
                        <source src={fileUrl} type={file.type} />
                        Your browser does not support the video tag.
                    </video>
                )}

                {/* PDF Preview */}
                {fileExtension === 'pdf' && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <PictureAsPdfIcon sx={{ fontSize: 80, color: 'red' }} />
                        <Button
                            variant="contained"
                            href={fileUrl}
                            target="_blank"
                            sx={{ mt: 1 }}
                        >
                            Open PDF
                        </Button>
                    </Box>
                )}

                {/* Generic File Download (DOCX, TXT, ZIP, etc.) */}
                {fileType !== 'image' &&
                    fileType !== 'video' &&
                    fileExtension !== 'pdf' && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <InsertDriveFileIcon
                                sx={{ fontSize: 80, color: 'gray' }}
                            />
                            <Button
                                variant="contained"
                                href={fileUrl}
                                download
                                sx={{ mt: 1 }}
                            >
                                Download File
                            </Button>
                        </Box>
                    )}
            </div>
        </div>
    )
}

export default FilePreviewer

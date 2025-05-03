import { styled } from '@mui/material/styles'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))
import React, { useState, useEffect, useContext } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    TablePagination,
    Tooltip,
} from '@mui/material'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import CheckIcon from '@mui/icons-material/Check'

import { FileEditDialogContext } from '../context/FileEditDialogContextProvider'
import { FileDeleteDialogContext } from '../context/FileDeleteDialogContextProvider'
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
const FileTable = ({
    files,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
}) => {
    const {
        fileId,
        setFile,
        setFileId,
        oldType,
        setOldType,
        fileUrl,
        open,

        setOpen: setEditDialogOpen,
        setCurrentFileUrl,
    } = useContext(FileEditDialogContext)
    // Fetch files from backend with pagination
    const { setOpen: setDeleteDialogOpen, setFile: setDeleteFile } = useContext(
        FileDeleteDialogContext
    )
    const [copiedFileId, setCopiedFileId] = useState(null)

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const [menuAnchors, setMenuAnchors] = useState({})
    const handleEdit = (file) => {
        console.log(file)
        setEditDialogOpen(true)
        setFileId(file._id)
        setCurrentFileUrl(file.url)
        setOldType(file.type)
        setFile(file)
    }
    const handleDelete = (file) => {
        setDeleteDialogOpen(true)
        setDeleteFile(file)
        try {
        } catch (error) {}
    }

    const handleMenuClose = (fileId) => {
        setMenuAnchors((prev) => ({
            ...prev,
            [fileId]: null,
        }))
    }
    const handleCopyId = async (id) => {
        try {
            await navigator.clipboard.writeText(id)
            setCopiedFileId(id)
            setTimeout(() => {
                setCopiedFileId(null)
            }, 2000)
        } catch {
            alert('متأسفانه کپی شناسه انجام نشد!')
        }
    }
    return (
        <TableContainer component={Paper} className="p-6">
            {loading ? (
                <Typography sx={{ textAlign: 'center', p: 2 }}>
                    بارگزاری فایل ها...
                </Typography>
            ) : files.length === 0 ? (
                <Typography sx={{ textAlign: 'center', p: 2 }}>
                    هیچ فایلی یافت نشد.
                </Typography>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow className="bg-blue-300">
                                <TableCell>نام فایل</TableCell>
                                <TableCell>نوع فایل</TableCell>
                                <TableCell>حجم (KB)</TableCell>
                                <TableCell>بروزرسانی در</TableCell>
                                <TableCell>عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((file) => (
                                <StyledTableRow key={file._id}>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.format}</TableCell>
                                    <TableCell>
                                        {(file.size / 1024).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            file.createdAt
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            title={
                                                copiedFileId === file._id
                                                    ? 'کپی شد!'
                                                    : 'کپی شناسه'
                                            }
                                            arrow
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleCopyId(file._id)
                                                }
                                                size="small"
                                            >
                                                {copiedFileId === file._id ? (
                                                    <CheckIcon
                                                        fontSize="small"
                                                        color="success"
                                                    />
                                                ) : (
                                                    <ContentCopyTwoToneIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="دانلود">
                                            <IconButton
                                                href={file.url}
                                                target="_blank"
                                                download
                                            >
                                                <DownloadTwoToneIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="ویرایش">
                                            <IconButton
                                                onClick={() => {
                                                    handleEdit(file)
                                                    handleMenuClose(file._id)
                                                }}
                                            >
                                                <EditTwoToneIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="حذف">
                                            <IconButton
                                                onClick={() => {
                                                    handleDelete(file)
                                                    handleMenuClose(file._id)
                                                }}
                                            >
                                                <DeleteTwoToneIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={totalPages * rowsPerPage} // Approximate total count
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </TableContainer>
    )
}

export default FileTable

import React, { useContext, useState } from 'react'
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Button,
    Paper,
    Stack,
} from '@mui/material'
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Add as AddIcon,
} from '@mui/icons-material'
import { ProductContext } from '../context/ProductContextProvider'

const ProductSpecification = () => {
    const { specifications, setSpecifications } = useContext(ProductContext)
    const [editingRowId, setEditingRowId] = useState(null)
    const [newRow, setNewRow] = useState({ attribute: '', value: '' })

    const handleNewRowChange = (field, value) => {
        setNewRow({ ...newRow, [field]: value })
    }

    const handleAddRow = () => {
        if (!newRow.attribute.trim() || !newRow.value.trim()) {
            alert('مقدار ویژگی و مقدار باید وارد شوند.')
            return
        }
        setSpecifications([...specifications, { id: Date.now(), ...newRow }])
        setNewRow({ attribute: '', value: '' })
    }

    const handleDeleteRow = (id) => {
        setSpecifications(specifications.filter((row) => row.id !== id))
    }

    const handleEditRow = (id) => {
        setEditingRowId(id)
    }

    const handleSaveRow = (id) => {
        setSpecifications(
            specifications.map((row) =>
                row.id === id
                    ? { ...row, attribute: row.attribute, value: row.value }
                    : row
            )
        )
        setEditingRowId(null)
    }

    const handleRowChange = (id, field, value) => {
        setSpecifications(
            specifications.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        )
    }

    return (
        <Box className="rounded-lg shadow-md bg-white p-4 mb-4">
            <Typography variant="h6" fontWeight={700} mb={2}>
                ویژگی‌های محصول
            </Typography>

            <TableContainer
                component={Paper}
                sx={{ marginY: 2, borderRadius: 2 }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                            <TableCell sx={{ fontWeight: 600 }}>
                                ویژگی
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                مقدار
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                عملیات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specifications.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>
                                    {editingRowId === row.id ? (
                                        <TextField
                                            value={row.attribute}
                                            onChange={(e) =>
                                                handleRowChange(
                                                    row.id,
                                                    'attribute',
                                                    e.target.value
                                                )
                                            }
                                            fullWidth
                                            size="small"
                                        />
                                    ) : (
                                        <Typography fontSize={14}>
                                            {row.attribute}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingRowId === row.id ? (
                                        <TextField
                                            value={row.value}
                                            onChange={(e) =>
                                                handleRowChange(
                                                    row.id,
                                                    'value',
                                                    e.target.value
                                                )
                                            }
                                            fullWidth
                                            size="small"
                                        />
                                    ) : (
                                        <Typography fontSize={14}>
                                            {row.value}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        spacing={1}
                                    >
                                        {editingRowId === row.id ? (
                                            <IconButton
                                                color="success"
                                                onClick={() =>
                                                    handleSaveRow(row.id)
                                                }
                                            >
                                                <SaveIcon fontSize="small" />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEditRow(row.id)
                                                }
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDeleteRow(row.id)
                                            }
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    label="ویژگی جدید"
                    value={newRow.attribute}
                    onChange={(e) =>
                        handleNewRowChange('attribute', e.target.value)
                    }
                    size="small"
                />
                <TextField
                    label="مقدار جدید"
                    value={newRow.value}
                    onChange={(e) =>
                        handleNewRowChange('value', e.target.value)
                    }
                    size="small"
                />
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleAddRow}
                    sx={{ minWidth: 120 }}
                >
                    افزودن
                </Button>
            </Stack>
        </Box>
    )
}

export default ProductSpecification

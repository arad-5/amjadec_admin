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
} from '@mui/icons-material'
import { EditProductContext } from '../context/EditProductContextProvider'

const ProductSpecification = () => {
    const { specifications, setSpecifications } = useContext(EditProductContext)
    const [editingRowId, setEditingRowId] = useState(null)
    const [newRow, setNewRow] = useState({ attribute: '', value: '' })

    // Handle input changes for new rows
    const handleNewRowChange = (field, value) => {
        setNewRow({ ...newRow, [field]: value })
    }

    // Add a new row
    const handleAddRow = () => {
        if (!newRow.attribute || !newRow.value) {
            alert('Both attribute and value are required.')
            return
        }
        setSpecifications([...specifications, { id: Date.now(), ...newRow }])
        setNewRow({ attribute: '', value: '' })
    }

    // Delete a row
    const handleDeleteRow = (id) => {
        setSpecifications(specifications.filter((row) => row.id !== id))
    }

    // Edit a row
    const handleEditRow = (id) => {
        setEditingRowId(id)
    }

    // Save edited row
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

    // Handle inline editing
    const handleRowChange = (id, field, value) => {
        setSpecifications(
            specifications.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        )
    }

    return (
        <div className="mb-3">
            <div className="mb-3">
                <span className="text-xl font-medium">فیچر ها</span>
            </div>

            {/* Table */}
            <TableContainer component={Paper} sx={{ marginY: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Attribute</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specifications.map((row) => (
                            <TableRow key={row.id}>
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
                                        />
                                    ) : (
                                        row.attribute
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
                                        />
                                    ) : (
                                        row.value
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editingRowId === row.id ? (
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleSaveRow(row.id)
                                            }
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                handleEditRow(row.id)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteRow(row.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add New Row */}
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    label="Attribute"
                    value={newRow.attribute}
                    onChange={(e) =>
                        handleNewRowChange('attribute', e.target.value)
                    }
                />
                <TextField
                    label="Value"
                    value={newRow.value}
                    onChange={(e) =>
                        handleNewRowChange('value', e.target.value)
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRow}
                >
                    Add
                </Button>
            </Stack>
        </div>
    )
}

export default ProductSpecification

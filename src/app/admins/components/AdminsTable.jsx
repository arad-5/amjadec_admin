'use client'

import * as React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
    Box,
} from '@mui/material'

import EditButton from './EditButton'
import ActivitiesButton from './ActivitiesButton'
import DeleteButton from './DeleteButton'

export default function AdminsTable({ admins }) {
    const getRoleChip = (role) => {
        switch (role) {
            case 'owner':
                return <Chip label="مالک" color="warning" size="small" />
            case 'admin':
                return <Chip label="ادمین" color="primary" size="small" />
            case 'editor':
                return <Chip label="ادیتور" color="default" size="small" />
            case 'developer':
                return <Chip label="توسعه دهنده" color="primary" size="small" />
            default:
                return <Chip label="نامشخص" color="error" size="small" />
        }
    }

    return (
        <Box>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
            >
                <Table aria-label="admins table" size="small">
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <TableCell sx={{ fontWeight: 700 }}>نام</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                وظیفه
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                شماره موبایل
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                شناسه کاربر
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                                عملیات‌ها
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((row, i) => (
                            <TableRow
                                key={row._id}
                                hover
                                sx={{
                                    backgroundColor:
                                        i % 2 === 0 ? '#fff' : '#fafafa',
                                    transition: 'background 0.3s',
                                }}
                            >
                                <TableCell sx={{ fontWeight: 500 }}>
                                    {row.fullname}
                                </TableCell>
                                <TableCell>{getRoleChip(row.role)}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        <EditButton admin={row} />
                                        {/* <ActivitiesButton admin={row} /> */}
                                        {row.role !== 'owner' && (
                                            <DeleteButton admin={row} />
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

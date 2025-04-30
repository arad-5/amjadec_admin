import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import { FiArrowUpLeft } from 'react-icons/fi'
import { Button } from '@mui/material'
function createData(firstname, lastname, cellphone, userId, createdAt) {
    return { firstname, lastname, cellphone, userId, createdAt }
}

const rows = [
    createData('آراد', 'تقی خانی', '09120547435', 1, '1401/10/15'),
    createData('محمد جواد', 'تقی خانی', '09120547435', 12, '1401/10/15'),
    createData('آراد', 'محمدی', '09120547435', 13, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 14, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 15, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 16, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 17, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 18, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 19, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 10, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 111, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 122, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 133, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 144, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 155, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 166, '1401/10/15'),
    createData('آراد', 'تقی خانی', '09120547435', 177, '1401/10/15'),
]

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
export default function UsersTable() {
    return (
        <TableContainer component={Paper} className="!rounded-md !shadow-none">
            <Table aria-label="simple table" sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow className="bg-[#eeeeee] ">
                        <TableCell className="!font-bold  ">نام</TableCell>
                        <TableCell className="!font-bold " align="left">
                            نام خانوادگی
                        </TableCell>
                        <TableCell className="!font-bold " align="left">
                            شماره موبایل
                        </TableCell>
                        <TableCell className="!font-bold " align="left">
                            تاریخ ثبت نام
                        </TableCell>
                        <TableCell className="!font-bold " align="left">
                            شناسه کاربر
                        </TableCell>
                        <TableCell
                            className="!font-bold "
                            align="left"
                        ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow
                            key={row.userId}
                            sx={{
                                backgroundColor: i % 2 ? '#fcfcfc' : 'white',
                            }}
                        >
                            <TableCell
                                className="!font-semibold !border-b-0 "
                                component="th"
                                scope="row"
                            >
                                {row.firstname}
                            </TableCell>
                            <TableCell
                                align="left"
                                className="!font-semibold !border-b-0"
                            >
                                {row.lastname}
                            </TableCell>
                            <TableCell className=" !border-b-0" align="left">
                                {row.cellphone}
                            </TableCell>
                            <TableCell className=" !border-b-0" align="left">
                                {row.createdAt}
                            </TableCell>
                            <TableCell className=" !border-b-0" align="left">
                                {row.userId}
                            </TableCell>
                            <TableCell
                                className="!border-b-0  w-20"
                                align="left"
                            >
                                <Link href={'/users'}>
                                    <Button endIcon={<ArrowBackOutlinedIcon />}>
                                        جزییات
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

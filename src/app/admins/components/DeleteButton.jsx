import { IconButton, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { AdminDeleteDialogContext } from '../context/AdminDeleteDialogContextProvider'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

const DeleteButton = ({ admin }) => {
    const { setAdmin, setOpen } = useContext(AdminDeleteDialogContext)
    return (
        <Tooltip title={'حذف ادمین'}>
            <IconButton
                size="large"
                sx={{
                    marginLeft: 2,
                }}
                onClick={() => {
                    setOpen(true)
                    setAdmin(admin)
                }}
            >
                <DeleteTwoToneIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteButton

import React, { useContext } from 'react'
import { AdminActivitiesDialogContext } from '../context/AdminActivitiesDialogContextProvider'
import { IconButton, Tooltip } from '@mui/material'
import ChecklistTwoToneIcon from '@mui/icons-material/ChecklistTwoTone'

const ActivitiesButton = ({ admin }) => {
    const { setAdmin, setOpen } = useContext(AdminActivitiesDialogContext)
    return (
        <Tooltip title="فعالیت ها">
            <IconButton
                sx={{
                    marginLeft: 1,
                }}
                onClick={() => {
                    setOpen(true)
                    setAdmin(admin)
                }}
            >
                <ChecklistTwoToneIcon />
            </IconButton>
        </Tooltip>
    )
}

export default ActivitiesButton

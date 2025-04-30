import { IconButton, Tooltip } from '@mui/material'

import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone'

const { useContext } = require('react')

const {
    AdminEditDialogContext,
} = require('../context/AdminEditDialogContextProvider')

const EditButton = ({ admin }) => {
    const {
        setAdminId,
        setFullname,
        setPhone,
        setRole,
        setOpen,
        setPermissions,
    } = useContext(AdminEditDialogContext)
    return (
        <Tooltip title="ویرایش">
            <IconButton
                sx={{
                    marginLeft: 1,
                }}
                onClick={() => {
                    setOpen(true)
                    setFullname(admin?.fullname)
                    setPhone(admin?.phone)
                    setRole(admin?.role)
                    setAdminId(admin?._id)
                    setPermissions(admin?.permissions)
                }}
            >
                <ModeEditOutlineTwoToneIcon />
            </IconButton>
        </Tooltip>
    )
}

export default EditButton

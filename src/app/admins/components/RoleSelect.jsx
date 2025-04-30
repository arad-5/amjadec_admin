import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box } from '@mui/system'
import { AdminEditDialogContext } from '../context/AdminEditDialogContextProvider'
import { useContext } from 'react'

function RoleSelect({ role, setRole }) {
    const handleChange = (event) => {
        setRole(event.target.value)
    }

    return (
        <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
                <InputLabel id="role-simple-select-label">وظیفه</InputLabel>
                <Select
                    labelId="role-simple-select-label"
                    value={role}
                    label="وظیفه"
                    onChange={handleChange}
                >
                    <MenuItem value={'admin'}>ادمین</MenuItem>
                    <MenuItem value={'editor'}>ادیتور</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default RoleSelect

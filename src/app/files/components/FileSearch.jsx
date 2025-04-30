import { Add, Search } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import FileUpload from './FileUpload'
import UploadDialog from './UploadDialog'
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone'
import { useContext } from 'react'
import { FileUploadDialogContext } from '@/context/FileUploadDialogContextProvider'

const FileSearch = ({ setSearchQuery, searchQuery }) => {
    const { setOpen } = useContext(FileUploadDialogContext)

    return (
        <Stack
            className="p-4"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
        >
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                component="span"
                startIcon={<UploadFileTwoToneIcon />}
                sx={{ mb: 2, flexShrink: 0 }}
            >
                آپلود فایل
            </Button>
            <TextField
                label="جستجو بر اساس نام یا شناسه"
                variant="outlined"
                size="small"
                InputProps={{
                    startAdornment: <Search sx={{ mr: 1 }} />,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
            />
        </Stack>
    )
}

export default FileSearch

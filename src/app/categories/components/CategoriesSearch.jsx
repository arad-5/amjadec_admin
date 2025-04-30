import { Add, Search } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'

const CategoriesSearch = ({ setSearchQuery, setOpenDialog }) => {
    return (
        <Stack
            className="p-4 bg-white"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
        >
            <TextField
                label="جستجو بر اساس نام یا شناسه"
                variant="outlined"
                size="small"
                InputProps={{
                    startAdornment: <Search sx={{ mr: 1 }} />,
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                className="shrink-0"
                href="/categories/add"
            >
                افزودن دسته‌بندی
            </Button>
        </Stack>
    )
}

export default CategoriesSearch

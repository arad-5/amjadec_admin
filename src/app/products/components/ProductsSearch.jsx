import { Add, Search } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/navigation'

const ProductsSearch = ({ searchQuery, setSearchQuery }) => {
    const router = useRouter()

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                startIcon={<Add />}
                className="shrink-0"
                onClick={() => router.push('/products/add')}
            >
                افزودن محصول
            </Button>
        </Stack>
    )
}

export default ProductsSearch

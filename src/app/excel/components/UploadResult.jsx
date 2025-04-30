import {
    Box,
    Typography,
    Alert,
    List,
    ListItem,
    Paper,
    Chip,
    Stack,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
export default function UploadResult({ uploadResult }) {
    return (
        <>
            {uploadResult && (
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="h6"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                    >
                        {uploadResult.success ? (
                            <>
                                <CheckCircleOutlineIcon
                                    color="success"
                                    sx={{ mr: 1 }}
                                />
                                نتیجه تغییرات (موفق)
                            </>
                        ) : (
                            <>
                                <ErrorOutlineIcon
                                    color="error"
                                    sx={{ mr: 1 }}
                                />
                                نتیجه تغییرات (ناموفق)
                            </>
                        )}
                    </Typography>
                    {/* If there is a list of results */}
                    {Array.isArray(uploadResult) && (
                        <Box sx={{ mt: 2, p: 1 }}>
                            <List disablePadding>
                                {uploadResult.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'start',
                                            mb: 1.5,
                                            p: 1.5,
                                            borderRadius: 2,
                                            backgroundColor:
                                                item.type === 'success'
                                                    ? '#f0fdf4'
                                                    : '#fef2f2',
                                            borderLeft: `4px solid ${
                                                item.type === 'success'
                                                    ? '#16a34a'
                                                    : '#dc2626'
                                            }`,
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            mb={0.5}
                                        >
                                            <Chip
                                                label={
                                                    item.type === 'success'
                                                        ? 'موفق'
                                                        : 'ناموفق'
                                                }
                                                color={
                                                    item.type === 'success'
                                                        ? 'success'
                                                        : 'error'
                                                }
                                                size="small"
                                            />
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                ردیف:{' '}
                                                <strong>{item.row}</strong>
                                            </Typography>
                                            {item.partNumber && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    شماره قطعه:{' '}
                                                    <strong>
                                                        {item.partNumber}
                                                    </strong>
                                                </Typography>
                                            )}
                                        </Stack>
                                        <Typography variant="body2">
                                            {item.message}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </Box>
            )}
        </>
    )
}

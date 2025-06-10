import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import ProductCard from './ProductCard'
import { Skeleton } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    height: '100%',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}))

export default function Products({ products, loading }) {
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 2, sm: 10, md: 16 }}
            >
                {loading
                    ? Array.from({ length: 8 }).map((items, i) => (
                          <Grid item xs={2} sm={4} md={4} key={i}>
                              <Item>
                                  <Skeleton
                                      height={200}
                                      width={200}
                                      animation="wave"
                                      sx={{
                                          transform: 'unset',
                                          marginBottom: 1,
                                      }}
                                  ></Skeleton>
                                  <Skeleton
                                      height={40}
                                      width={200}
                                      animation="wave"
                                      sx={{
                                          transform: 'unset',
                                          marginBottom: 1,
                                      }}
                                  ></Skeleton>
                                  <Skeleton
                                      height={20}
                                      width={200}
                                      animation="wave"
                                      sx={{ transform: 'unset' }}
                                  ></Skeleton>
                              </Item>
                          </Grid>
                      ))
                    : products.map((product) => (
                          <Grid item xs={2} sm={4} md={4} key={product._id}>
                              <Item>
                                  <ProductCard product={product} />
                              </Item>
                          </Grid>
                      ))}
            </Grid>
        </Box>
    )
}

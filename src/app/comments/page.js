import TopStatusBar from './components/TopStatusBar'
import Comments from './components/Comments'
import { Pagination } from '@mui/material'
import PaginationBar from './components/PaginationBar'

const Page = () => {
    return (
        <div className="bg-white rounded-xl">
            <TopStatusBar />
            <Comments />
            <PaginationBar />
        </div>
    )
}

export default Page

import PaginationBar from './components/PaginationBar'
import Questions from './components/Questions'
import TopStatusBar from './components/TopStatusBar'

const Page = () => {
    return (
        <div className="bg-white  rounded-xl ">
            <TopStatusBar />
            <Questions />
            <PaginationBar />
        </div>
    )
}

export default Page

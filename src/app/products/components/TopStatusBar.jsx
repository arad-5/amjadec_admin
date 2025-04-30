import { LiaCommentsSolid } from 'react-icons/lia'
import ProductsSearch from './ProductsSearch'
import ProdcutsFilter from './ProdcutsFilter'
import { Box } from '@mui/system'

const TopStatusBar = () => {
    return (
        <div className="sticky top-0 left-0 z-30">
            <div className="flex items-center justify-between border-b py-6 px-6 !bg-[#1462b0] text-white ">
                <div className="flex items-center ">
                    <LiaCommentsSolid className="text-2xl ml-3" />
                    <h1 className="text-xl font-bold">مدیریت محصولات</h1>
                </div>
                <div>
                    <span className="text-sm ml-2">تعداد کل:</span>
                    <span className="text-xl font-semibold">10</span>
                </div>
            </div>{' '}
            <ProductsSearch />
            <ProdcutsFilter />
        </div>
    )
}

export default TopStatusBar

import { LiaCommentsSolid } from 'react-icons/lia'

const TopStatusBar = () => {
    return (
        <div className="flex items-center justify-between border-b py-6 px-6">
            <div className="flex items-center ">
                <LiaCommentsSolid className="text-2xl ml-3" />
                <h1 className="text-xl font-bold">دیدگاه ها</h1>
            </div>
            <div>
                <span className="text-sm ml-2">تعداد کل:</span>
                <span className="text-xl font-semibold">10</span>
            </div>
        </div>
    )
}

export default TopStatusBar

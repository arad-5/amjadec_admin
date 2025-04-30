import { TopBarContext } from '@/context/TopBarContextProvider'
import { useContext } from 'react'
import { LiaCommentsSolid } from 'react-icons/lia'
import Messages from './Messages/Messages'

const TopBar = () => {
    const { title, icon } = useContext(TopBarContext)
    return (
        <>
            {title ? (
                <div className="sticky top-0 left-0 z-30">
                    <div className="flex items-center justify-between border-b py-6 px-6 !bg-[#1462b0] text-white ">
                        <div className="flex items-center ">
                            {icon}
                            <h1 className="text-xl font-bold">{title}</h1>
                        </div>
                        {/* <div>
                            <span className="text-sm ml-2">تعداد کل:</span>
                            <span className="text-xl font-semibold">10</span>
                        </div> */}
                    </div>
                    <Messages />
                </div>
            ) : null}
        </>
    )
}

export default TopBar

import { useContext } from 'react'
import { ProductContext } from '../context/ProductContextProvider'
import FilePicker from '@/components/files/FilePicker'

const ProductFilesSection = () => {
    const {
        attachedFiles,
        setAttachedFiles,
        symbolFile,
        setSymbolFile,
        datasheetFile,
        setDatasheetFile,
        footprintFile,
        setFootprintFile,
        file3d,
        setFile3d,
    } = useContext(ProductContext)

    return (
        <div className="rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="pb-3 mb-6 border-b">
                <span className="text-lg font-semibold">فایل های محصول</span>
            </div>
            <FilePicker
                label="فایل‌های پیوست"
                value={attachedFiles}
                onChange={setAttachedFiles}
                multiple
            />
            <FilePicker
                label="نماد شماتیک"
                value={symbolFile}
                onChange={setSymbolFile}
            />
            <FilePicker
                label="دیتاشیت"
                value={datasheetFile}
                onChange={setDatasheetFile}
            />
            <FilePicker
                label="فوت‌پرینت"
                value={footprintFile}
                onChange={setFootprintFile}
            />
            <FilePicker
                label="فایل سه‌بعدی"
                value={file3d}
                onChange={setFile3d}
            />
        </div>
    )
}

export default ProductFilesSection

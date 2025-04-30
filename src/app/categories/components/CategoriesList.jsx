import Category from './Category'

const CategoriesList = ({ filteredCategories }) => {
    return (
        <div className="p-4">
            {filteredCategories.map((category) => (
                <Category key={category._id} category={category} />
            ))}
        </div>
    )
}

export default CategoriesList

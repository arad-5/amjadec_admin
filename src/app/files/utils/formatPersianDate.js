import moment from 'moment-jalaali'

const formatPersianDate = (dateString) => {
    return moment(dateString).format('jYYYY/jMM/jDD')
}
export default formatPersianDate

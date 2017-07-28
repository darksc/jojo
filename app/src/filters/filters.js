import moment from 'moment'
export default {
  FormatNull (value) {
    return (value === '' || value === null) ? '无' : value
  },
  FormatDate: function (value, format) {
    if (value === undefined) return
    return moment(value).format(format)
  }
}

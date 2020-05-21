import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    },
    formatToYYYYMMDD_HHMMSS(datetime) {
      return datetime ? moment(datetime).format('YYYY-MM-DD, HH:mm:ss') : '-'
    }
  }
}
import moment from 'moment'
export const DateFormats = [
  {
    code: 'DD/MM/YYYY',
    name: moment().format('DD/MM/YYYY')
  },
  {
    code: 'MM/DD/YYYY',
    name: moment().format('MM/DD/YYYY')
  },
  {
    code: 'YYYY/MM/DD',
    name: moment().format('YYYY/MM/DD')
  },
]

export const DefaultDateFormat = 'MM/DD/YYYY'

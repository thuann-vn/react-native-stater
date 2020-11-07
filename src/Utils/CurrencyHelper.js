import Currency from '@/Config/Currency'
import Flags from '@/Config/Flags'

export const GetCurrencyList = (keyword) => {
  var results = []
  Object.keys(Currency).map((key) => {
    const currency = Currency[key]
    if (Flags[key]) {
      if (
        !keyword ||
        (keyword && currency.name.includes(keyword)) ||
        (keyword && currency.code.includes(keyword))
      ) {
        currency.image = Flags[currency.code]
        results.push(currency)
      }
    }
  })
  return results
}

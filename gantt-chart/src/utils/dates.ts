import {oneDayInMilliseconds} from "../constants/date";

export function formatDateToCommonStringFormat(date: Date) {
  return [
    date.getDate().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"), // +1 because in Date.prototype.getMonth() first month is 0
    date.getFullYear(),
  ].join(".")
}


export function getDatesFromChartPeriod(periodStart: string, periodEnd: string): string[] {
  const dates = []
  const [periodStartDate, periodEndDate] = [periodStart, periodEnd].map(date => {
    const dateParts = date.split("-").map(Number)
    if(dateParts.length < 3) throw new Error("Invalid period format")
    return new Date(dateParts.at(0)!, dateParts.at(1)! - 1, dateParts.at(2))
  })
  console.log(periodStart)
  console.log(periodEnd)
  const differenceBetweenDates = +periodEndDate - +periodStartDate
  const daysAmount = differenceBetweenDates / oneDayInMilliseconds
  let lastDay = periodStartDate
  for (let i = 0; i < daysAmount + 1; i++) {
    dates.push(formatDateToCommonStringFormat(lastDay))
    lastDay = new Date(+lastDay + oneDayInMilliseconds)
  }
  console.log(dates)
  return dates
}

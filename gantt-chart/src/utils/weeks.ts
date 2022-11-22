import {oneDayInMilliseconds, oneWeekInMilliseconds} from "../constants/date";
import {formatDateToCommonStringFormat} from "./dates";

type Day = {
  date: number;
  fullDate: string;
}

type Week = {
  title: string;
  days: Day[];
}


export function formatProjectPeriodToWeeks(periodStart: string, periodEnd: string): Week[] {
  const period = [periodStart, periodEnd].map(date => {
    const dateParts = date.split(".").map(Number)
    if(dateParts.length < 3) throw new Error("Invalid period format")
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0] - 1)
  }) // Converting periodStr that returned by response "02.09.2022-31.12.2022" to Date Object

  const weeks: Week[] = []

  const differenceBetweenDates = (+period[1] - +period[0]) // Calculating difference between start and end
  const weeksAmount = differenceBetweenDates / oneWeekInMilliseconds

  let weekStartDate = period[0] // Day that open week, every morning ( 02, 09, 16 )
  for (let i = 0; i < weeksAmount; i++) {
    const dateAfterWeek = new Date(+weekStartDate + oneWeekInMilliseconds) // If we have day that open the week, we can find day that close the week

    const days: Day[] = []
    let lastDay = weekStartDate // first day of week - day that open week
    for (let j = 0; j < 7; j++) { // 7 day - 1 week
      days.push({
        date: lastDay.getDate(),
        fullDate: formatDateToCommonStringFormat(lastDay)
      })
      lastDay = new Date(+lastDay + oneDayInMilliseconds) // Find the next day, while loop is active
    }

    weeks.push({
      days,
      title: [
        weekStartDate.toLocaleString("en-AU", { month: "short", day: "2-digit" }),
        dateAfterWeek.toLocaleString("en-AU", { month: "short", day: "2-digit" })
      ].join(" - ")
    })
    weekStartDate = new Date(+dateAfterWeek + oneDayInMilliseconds) // week ended, we need to add one day to open new week
  }

  return weeks
}

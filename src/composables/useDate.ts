import dayjs from "dayjs";
import {IItem, IStatus} from '@/types/table';

export const getDatesInRange = (startDate: Date, endDate: Date): string[]  => {
  let dates = [];
  let currentDate = new Date(startDate.getTime());
  const endCurrentDate = new Date(endDate.getTime());
  while (currentDate.getTime() <= endCurrentDate.getTime()) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  dates = dates.map(i => dayjs(i).format('MM.DD.YYYY').toString());
  return dates;
}

export const calculateSum = (items: IItem[], status: IStatus, labels: string[], type: string): number[] | [] => {
  if (items.length === 0) return []

  const calculatedArray = JSON.parse(JSON.stringify(labels))
  calculatedArray.fill(0)

  items.forEach(i => {
    if(labels.includes(i.date) && i.status === status || type === i.type) {
      calculatedArray[labels.indexOf(i.date)] += +i.sum
    }
  })
  return calculatedArray
}

export const getLastMonthDate = (date: Date): Date => {
  const lastMonthDate = new Date(date);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  return lastMonthDate;
}

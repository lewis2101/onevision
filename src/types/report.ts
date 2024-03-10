import {IStatus} from "./table";

export const reportList = [
  'status',
  'sum',
] as const

export type IReportList = typeof reportList[number]

export type IReportItem = Record<IReportList, IStatus | string>

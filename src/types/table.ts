export const typeList = [
  'buy',
  'comeback',
  'subscribe',
  'all'
] as const

export type IType = typeof typeList[number]

export const statusList = [
  'success',
  'pending',
  'reject'
] as const

export type IStatus = typeof statusList[number]

export type IItem =  {
  date: string,
  sum: string,
  type: IType,
  status: IStatus,
  fullName: string,
  city: string,
  id: string
}

type IDatasets = {
  data: number[] | [];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  label: string
}

export type IDataChart = {
  labels: string[] | [],
  datasets: IDatasets[],
}

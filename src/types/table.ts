export const typeList = [
  'buy',
  'comeback',
  'subscribe'
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
  id: string
}

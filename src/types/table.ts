const type = [
  'buy',
  'comeback',
  'subscribe'
] as const

export type IType = typeof type[number]

const status = [
  'success',
  'pending',
  'reject'
] as const

export type IStatus = typeof status[number]

export type IItem =  {
  date: string,
  sum: string,
  type: IType,
  status: IStatus,
  id: string
}

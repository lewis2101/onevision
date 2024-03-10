import dayjs from "dayjs";

export const formatPhone = (phone: string) =>
  phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4')
export const formatSum = (sum: string) =>
  sum.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
export const formatDate = (argDate: string) => dayjs(argDate).format('MM.DD.YYYY')

export const filterType = (t: any) =>  [
  {
    title: t('type.buy'),
    value: 'buy',
  },
  {
    title: t('type.comeback'),
    value: 'comeback',
  },
  {
    title: t('type.subscribe'),
    value: 'subscribe',
  }
]

export const filterStatus = (t: any) => [
  {
    title: t('status.success'),
    value: 'success',
  },
  {
    title: t('status.reject'),
    value: 'reject',
  },
  {
    title: t('status.pending'),
    value: 'pending',
  }
]

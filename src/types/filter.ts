export const filterType = (t: (message: string) => string): Record<string, string>[] =>  [
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

export const filterGrafic = (t: (message: string) => string): Record<string, string>[] =>  [
  {
    title: t('grafic.line'),
    value: 'line'
  },
  {
    title: t('grafic.bar'),
    value: 'bar'
  }
]

export const filterStatus = (t: (message: string) => string): Record<string, string>[] => [
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

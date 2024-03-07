import {createI18n} from 'vue-i18n'

import ru from '@/locales/ru'
import kk from '@/locales/kk'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  globalInjection: true,
  messages: { ru, kk }
})

export const setLocale = (locale: 'ru' | 'kk') => i18n.global.locale.value = locale
export const getLocale = () => i18n.global.locale.value

export default i18n

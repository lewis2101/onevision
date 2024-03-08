import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";

import {watch} from "vue";

export const titleOfRoute = {
  'main': 'header.main-title',
  'diagram': 'header.diagram-title',
  'report': 'header.report-title'
}

export const useRouteLocale = () => {
  const {locale} = useI18n()
  const route = useRoute()
  const router = useRouter()

  watch(
    () => route.path,
    () => {
      locale.value = String(route.params.locale) || 'ru'
    }
  )

  watch(locale, value => {
    router.replace({
      params: {
        locale: value
      }
    })
  })

}

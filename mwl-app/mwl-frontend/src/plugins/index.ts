import type { App } from 'vue'

import router from '../router'
import i18n from './i18n'
import vuetify from './vuetify'
import pinia from './pinia'

export function registerPlugins (app: App) {
 app.use(vuetify)
 app.use(pinia)
 app.use(i18n)
 app.use(router)
}
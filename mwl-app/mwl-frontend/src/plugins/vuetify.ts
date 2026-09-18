/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'mwlLight',
    themes: {
      mwlLight: {
        dark: false,
        colors: {
          primary: '#F25C74',
          background: '#F5F5F5', 
          surface: '#FFFFFF',
        },
      },
    },
  },
})
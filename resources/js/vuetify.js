import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {

                primary: '#6200EE',
                secondary: '#03DAC6',
                accent: '#77E315',
                error: '#B00020',


                ceagNaranja: '#F4AC3E',
                ceagNaranja_2: '#F19123',
                ceagNaranja_3: '#E95A28',


                ceagAzul: '#50C0E6',
                ceagAzul_2: '#298ECC',
                ceagAzul_3: '#22A9DD',


                gris:'F5F4F6',


            },
        },
    },
    icons: {
        iconfont: 'mdi'
      },
})

import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'

import en from './locale/en'
import zh from './locale/zh'
console.log(en)
console.log(zh)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    en,
    zh
  }
})
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
export default i18n


import AppIntro from '@views/intro/app'
import DarkModeIntro from '@views/intro/color-mode'
import FontSizeIntro from '@views/intro/font-size'

export default [
  {
    path: 'app',
    component: AppIntro,
    name: 'appIntro'
  },
  {
    path: 'dark-mode-intro',
    component: DarkModeIntro,
    name: 'darkModeIntro'
  },
  {
    path: 'font-size-intro',
    component: FontSizeIntro,
    name: 'fontSizeIntro'
  }
]

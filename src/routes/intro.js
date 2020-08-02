
import DarkModeIntro from '@views/intro/color-mode'
import PermissionIntro from '@views/intro/permission'

export default [
  {
    path: 'dark-mode-intro',
    component: DarkModeIntro,
    name: 'darkModeIntro'
  },
  {
    path: 'permission-intro',
    component: PermissionIntro,
    name: 'permissionIntro'
  }
]

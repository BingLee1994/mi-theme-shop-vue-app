
import Gallery from '@views/home/gallery/index'
import Category from '@views/home/category/index'
import Me from '@views/home/me/me'

export default [
  {
    path: 'gallery',
    name: 'gallery',
    component: Gallery
  },
  {
    path: 'category',
    component: Category,
    name: 'category',
    showTab: false
  },
  {
    path: 'gallery/:type',
    component: Gallery,
    name: 'galleryByType'
  },
  {
    path: 'me',
    component: Me,
    name: 'me'
  }
]

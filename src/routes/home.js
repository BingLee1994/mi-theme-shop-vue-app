
import Gallery from '@views/home/gallery/index'
import Category from '@views/home/category/index'
import Me from '@views/home/me/me'

export default [
  {
    path: 'gallery',
    name: 'gallery',
    component: Gallery,
    meta: {
      keepAlive: false
    }
  },
  {
    path: 'category',
    component: Category,
    name: 'category',
    showTab: false,
    meta: {
      keepAlive: true
    }
  },
  {
    path: 'gallery/:type',
    component: Gallery,
    name: 'galleryByType',
    meta: {
      keepAlive: true
    }
  },
  {
    path: 'me',
    component: Me,
    name: 'me',
    meta: {
      keepAlive: true
    }
  }
]

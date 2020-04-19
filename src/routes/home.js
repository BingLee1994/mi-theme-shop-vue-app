
import Gallery from '@views/home/gallery/index'
import Category from '@views/home/category/index'
import Me from '@views/home/me/me'

export default [
  {
    path: 'gallery',
    name: 'galleryHome',
    redirect: {
        name: 'gallery',
        params: { navId: 0 }
    }
  },
  {
    path: 'category',
    name: 'categoryHome',
    redirect: {
        name: 'category',
        params: { navId: 0 }
    }
  },
  {
    path: 'gallery/:navId',
    component: Gallery,
    name: 'gallery'
  },
  {
    path: 'category/:navId',
    component: Category,
    name: 'category'
  },
  {
    path: 'me',
    component: Me,
    name: 'me'
  }
]

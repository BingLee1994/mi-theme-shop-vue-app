<template>
  <div class="article">
    <p>{{$route.params.id || '暂无文章'}}</p>
    <p>{{$route.params.comment_id || '暂无评论'}}</p>
  </div>
</template>

<script>
export default {
  name: 'Article',
  created() {
      console.log('article组件创建')
  },
  // 一个组件被做个路由使用时，仅创建一次，需要使用watch观察变化
  watch: {
    $route(to, from) {
      console.log(to)
      console.log(from)
    }
  },
  beforeRouteUpdate(to, from, next) {
      console.log(to)
      console.log(from)
  }
}
</script>

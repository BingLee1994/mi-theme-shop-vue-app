<template>
    <div>
        <p>Hi {{$route.params.name}}</p>
        <!-- <router-link :to="{ path: 'fav/1'}" append>我的收藏</router-link> |
        <router-link :to="{ path: 'prd/2'}" append>我的创作</router-link> | -->
        <a data-path-name="fav-list" @click="goto">我的收藏</a> |
        <a data-path-name="productin-list" @click="goto">我的创作</a>
        <router-view />
    </div>
</template>

<script>
export default {
    methods: {
        goto(e) {
            let name = e.currentTarget.dataset.pathName
            this.$router.push({
                name,
                params: { id: '123' }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <div class="search-filter">
        <ul class="filter-bar">
            <li>最新上线</li>
            <li>价格</li>
            <li>销量</li>
        </ul>
        <div>高级</div>
        <div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'SearchFilter'
}
</script>

<style lang="scss">
.search-filter {
    .filter-bar {
        display: flex;
        align-items: center;
    }
}
</style>

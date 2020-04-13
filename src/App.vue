<template>
  <MiuiDarkMode id='app' class='miui'>
    <router-view></router-view>
  </MiuiDarkMode>
</template>

<script>
  import MiuiDarkMode from '@miui/dark-mode'

export default {
    components: { MiuiDarkMode },
    data() {
        return {}
    }
}
</script>

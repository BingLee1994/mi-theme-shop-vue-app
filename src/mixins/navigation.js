import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentNavIndex', 'currentNav', 'currentNavName', 'navItems'])
  },
  methods: {
    ...mapActions(['selectNavByIndex', 'hideNavItem', 'showNavItem', 'selectNavByName'])
  }
}

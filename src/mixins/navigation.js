import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentNavIndex', 'currentNavName', 'currentNav', 'navItems'])
  },

  methods: {
    ...mapActions(['selectNavByIndex', 'selectNavByName'])
  }
}

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <nav>
      <button @click="back">后退</button>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      console.log(this.$router)
      console.log(this.$route)
    }
  }
}
</script>

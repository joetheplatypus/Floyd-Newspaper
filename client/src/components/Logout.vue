<template>
  <div>Redirecting....</div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('setUser', { _id: null })
    this.$store.dispatch('setToken', '')
    this.$store.dispatch('setLoggedIn', false)
    this.$router.push({
      name: 'Home'
    })
  }
}
</script>

<style>

</style>

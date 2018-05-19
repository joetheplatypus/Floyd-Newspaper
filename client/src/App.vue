<template>
  <div id="app">
    <v-app>
      <toolbar></toolbar>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import UserService from '@/services/UserService'

export default {
  name: 'App',
  components: {
    'toolbar': Toolbar
  },
  async created () {
    const tok = window.localStorage.getItem('token')
    if (tok !== '') {
      this.$store.dispatch('setToken', tok)
      try {
        const user = (await UserService.info()).data
        this.$store.dispatch('setUser', user)
        this.$store.dispatch('setLoggedIn', true)
      } catch (err) {
        this.$store.dispatch('setToken', '')
      }
    } else {
      this.$store.dispatch('setToken', '')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

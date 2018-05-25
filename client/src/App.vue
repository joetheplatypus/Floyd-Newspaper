<template>
  <div id="app">
    <v-app>
      <toolbar></toolbar>
      <v-content>
        <v-snackbar
          :timeout=tm
          top
          v-model="snackbar"
        >
          {{ text }}
          <v-btn flat color="accent" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
        <router-view @snack="snackFunc"/>
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
  data () {
    return {
      snackbar: false,
      text: '',
      tm: 5000
    }
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
  },
  methods: {
    snackFunc (data) {
      this.text = data
      this.snackbar = true
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

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

export default {
  name: 'App',
  components: {
    'toolbar': Toolbar
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

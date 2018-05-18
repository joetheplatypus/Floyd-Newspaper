<template>
  <v-container>
    <h1>Create a news item</h1>
    <v-flex xs8 offset-xs2 class="box" elevation-1>
      <v-form>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <vue-editor v-model="content"></vue-editor>
        <v-btn @click.prevent="login()" flat color="primary">Login</v-btn>
      </v-form>
      <div>{{error}}{{content}}</div>
    </v-flex>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService'
import { VueEditor } from 'vue2-editor'

export default {
  data () {
    return {
      title: '',
      content: '',
      error: ''
    }
  },
  methods: {
    async login () {
      this.error = ''
      const response = (await UserService.login(this.user)).data
      if (response.auth) {
        this.$store.dispatch('setToken', response.token)
        this.$store.dispatch('setUser', response.user)
        this.$store.dispatch('setLoggedIn', true)
        this.$router.push({
          name: 'Home'
        })
      } else {
        this.error = 'invalid login'
      }
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style scoped>
.box {
  background-color:white;
  padding: 20px 50px;
  margin-top: 30px
}
</style>

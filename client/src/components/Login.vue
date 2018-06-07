<template>
  <v-container>
    <h1>Login</h1>
    <v-flex md6 offset-md3 class="box" elevation-1>
      <v-form @submit.prevent="login()">
        <v-text-field label="email" v-model="user.email"></v-text-field>
        <v-text-field type="password" label="password" v-model="user.password"></v-text-field>
        <v-btn type="submit" flat color="primary">Login</v-btn>
      </v-form>
      <div>{{error}}</div>
    </v-flex>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async login () {
      this.error = ''
      const creds = this.user
      const response = (await UserService.login(creds)).data
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

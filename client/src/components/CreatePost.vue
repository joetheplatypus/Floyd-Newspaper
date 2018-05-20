<template>
  <v-container>
    <h1>Create a news item</h1>
    <v-flex xs8 offset-xs2 class="box" elevation-1>
      <v-form>
        <v-text-field label="Title" v-model="post.title"></v-text-field>
        <v-radio-group v-model="post.category" row>
          <v-radio label="School News" value="School News" ></v-radio>
          <v-radio label="Politics" value="Politics"></v-radio>
          <v-radio label="World" value="World"></v-radio>
        </v-radio-group>
        <v-text-field label="Image URL" v-model="post.imgurl"></v-text-field>
        <vue-editor v-model="post.content"></vue-editor>
        <v-btn @click.prevent="submit()" flat color="primary">Create</v-btn>
      </v-form>
      <div>{{error}}{{post.content}}</div>
    </v-flex>
  </v-container>
</template>

<script>
import NewsService from '@/services/NewsService'
import { VueEditor } from 'vue2-editor'

export default {
  data () {
    return {
      post: {
        title: '',
        content: '',
        category: '',
        imgurl: '',
        posterId: this.$store.getters.userId
      },
      error: ''
    }
  },
  methods: {
    async submit () {
      this.error = ''
      const response = (await NewsService.post(this.post)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.$router.push({
          name: 'Home'
        })
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

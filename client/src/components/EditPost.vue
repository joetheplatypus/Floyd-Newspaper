<template>
  <v-container>
    <h1>Edit a news item</h1>
    <v-flex xs8 offset-xs2 class="box" elevation-1>
      <h3 class="err title" v-if="error">{{error}}</h3>
      <v-form v-if="!error">
        <v-text-field label="Title" v-model="post.title"></v-text-field>
        <v-radio-group v-model="post.category" row>
          <v-radio label="School News" value="School News" ></v-radio>
          <v-radio label="Politics" value="Politics"></v-radio>
          <v-radio label="World" value="World"></v-radio>
        </v-radio-group>
        <v-text-field label="Image URL" v-model="post.imgurl"></v-text-field>
        <vue-editor v-model="post.content"></vue-editor>
        <v-btn @click.prevent="save()" flat color="primary">Save as draft</v-btn>
        <v-btn @click.prevent="submit()" flat color="primary">Submit</v-btn>
      </v-form>
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
        status: '',
        posterId: this.$store.getters.userId
      },
      error: null
    }
  },
  async mounted () {
    this.load()
  },
  methods: {
    async load () {
      const post = (await NewsService.getPreview(this.$route.params.postId)).data
      if (post.error) {
        this.error = post.error
      }
      this.post = post
    },
    async submit () {
      this.post.status = 'pending'
      this.error = ''
      const response = (await NewsService.putPreview(this.post)).data
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
.err {
  color: red;
}
.box {
  background-color:white;
  padding: 20px 50px;
  margin-top: 30px
}
</style>

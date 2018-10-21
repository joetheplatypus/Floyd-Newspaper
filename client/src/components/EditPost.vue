<template>
  <v-container>
    <h1>Edit a news item</h1>
    <v-flex sm8 offset-sm2 :class="{'px-3': $vuetify.breakpoint.smAndDown, 'box': $vuetify.breakpoint.mdAndUp}" elevation-1>
      <h3 class="err title" v-if="error">{{error}}</h3>
      <v-form v-if="!error">
        <v-text-field
          label="Title"
          v-model="post.title"
          :rules="[(v) => v.length <= 100 || 'Max 100 characters']"
          :counter="100"
        ></v-text-field>
        <v-radio-group v-model="post.category" row v-if="$vuetify.breakpoint.mdAndUp">
          <v-radio v-for="category in $store.getters.categories" :key="category.value" :label="category.name" :value="category.value"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="post.category" column v-if="$vuetify.breakpoint.smAndDown">
          <v-radio v-for="category in $store.getters.categories" :key="category.value" :label="category.name" :value="category.value"></v-radio>
        </v-radio-group>
        <v-layout row wrap>
          <v-flex sm10 xs12>
            <v-text-field label="Image URL" v-model="post.imgurl"></v-text-field>
          </v-flex>
          <v-flex sm2 xs12>
            <v-btn color="primary" flat @click="uploadImg = true">Upload</v-btn>
          </v-flex>
        </v-layout>
        <vue-editor v-model="post.content"></vue-editor>
        <v-btn @click.prevent="submit()" flat color="primary">Save</v-btn>
      </v-form>
      <div>{{smallError}}</div>
    </v-flex>
    <v-dialog v-model="uploadImg" max-width="290">
      <v-card>
        <v-card-title class="headline">Upload an image</v-card-title>
        <v-card-text>
          <v-form enctype="multipart/form-data">
            <input type="file" name="img" @change="upload($event)">
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      smallError: '',
      error: null,
      uploadImg: false
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
      if (this.post.posterId === '') {
        this.post.posterId = this.$store.getters.userId
      }
      if (this.post.title.length === 0 || this.post.title.length > 100 || this.post.content.length === 0 || this.post.category.length === 0 || this.post.imgurl.length === 0) {
        this.smallError = 'Check Fields'
        return
      }
      this.smallError = ''
      this.error = ''
      const response = (await NewsService.put(this.post)).data
      if (response.error) {
        this.smallError = response.error
      } else {
        this.$emit('snack', 'Post edited successfully')
        this.$router.push({
          name: 'Dashboard'
        })
      }
    },
    async upload (data) {
      const formData = new FormData()
      formData.append(data.target.name, data.target.files[0])

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      const response = (await NewsService.uploadImg(formData)).data
      if (response.filename) {
        this.post.imgurl = `http://localhost:8081/${response.filename}`
        this.uploadImg = false
      } else {
        this.error = 'an error occured uploading the image'
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

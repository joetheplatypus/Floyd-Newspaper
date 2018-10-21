<template>
  <v-container>
    <h1>Create a news item</h1>
    <v-flex sm8 offset-sm2 :class="{'px-3': $vuetify.breakpoint.smAndDown, 'box': $vuetify.breakpoint.mdAndUp}" elevation-1>
      <v-form>
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
        <!-- <textarea name="content" id="editor" v-model="post.content" /> -->
        <vue-editor v-model="post.content"></vue-editor>
        <v-btn @click.prevent="save()" flat color="primary">Save as draft</v-btn>
        <v-btn @click.prevent="submitDialog = true" flat color="primary">Submit</v-btn>
      </v-form>
      <div>{{error}}</div>
    </v-flex>
    <v-dialog v-model="submitDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure you want to submit this post for approval?</v-card-title>
        <v-card-text>This post cannot be edited while pending approval</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat="flat" @click.native="submitDialog = false">No</v-btn>
          <v-btn color="primary" flat="flat" @click.native="submit()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import config from '@/SETTINGS'

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
      error: '',
      config: {
        // toolbar: [
        //   [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ]
        // ],
        height: 800
      },
      editor: null,
      submitDialog: false,
      uploadImg: false
    }
  },
  methods: {
    async submit () {
      // this.post.content = this.editor.getData()
      this.post.posterId = this.$store.getters.userId
      if (this.post.title.length === 0 || this.post.title.length > 100 || this.post.content.length === 0 || this.post.category.length === 0 || this.post.imgurl.length === 0) {
        console.log(this.post)
        this.error = 'Complete all fields'
        return
      }
      this.post.status = 'pending'
      this.error = ''
      const response = (await NewsService.post(this.post)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.$emit('snack', 'Post submitted for approval')
        this.$router.push({
          name: 'Dashboard'
        })
      }
    },
    async save () {
      // this.post.content = this.editor.getData()
      this.post.posterId = this.$store.getters.userId
      if (this.post.title.length === 0 || this.post.title.length > 100 || this.post.content.length === 0 || this.post.category.length === 0 || this.post.imgurl.length === 0) {
        this.error = 'Complete all fields'
        return
      }
      this.post.status = 'draft'
      this.error = ''
      const response = (await NewsService.post(this.post)).data
      if (response.error) {
        this.error = response.error
      } else {
        this.$emit('snack', 'Post saved as draft')
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
        this.post.imgurl = `${config.url}/${response.filename}`
        this.uploadImg = false
      } else {
        this.error = 'an error occured uploading the image'
      }
    }
  },
  async mounted () {
    // this.editor = await ClassicEditor.create(document.querySelector('#editor')) //eslint-disable-line
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
.mycontent >>> .ql-align-right {
  text-align: right
}
.mycontent >>> .ql-align-center {
  text-align: center
}
.mycontent >>> .ql-align-left {
  text-align: left
}
</style>

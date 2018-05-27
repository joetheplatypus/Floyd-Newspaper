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
        <v-layout row>
          <v-flex xs10>
            <v-text-field label="Image URL" v-model="post.imgurl"></v-text-field>
          </v-flex>
          <v-flex xs2>
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
      if (this.post.title.length === 0 || this.post.content.length === 0 || this.post.category.length === 0 || this.post.imgurl.length === 0) {
        console.log(this.post)
        this.error = 'Missing Fields'
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
      if (this.post.title.length === 0 || this.post.content.length === 0 || this.post.category.length === 0 || this.post.imgurl.length === 0) {
        this.error = 'Missing Fields'
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
        this.post.imgurl = `http://localhost:8081/${response.filename}`
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

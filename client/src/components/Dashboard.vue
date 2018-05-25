<template>
  <div class="fullheight">
    <v-card v-if="$store.getters.loggedIn && $store.getters.admin === false">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="primary"
          to="new"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-card>
    <div class="red">{{error}}</div>
    <v-flex xs8 offset-xs2 class="offwhite fullheight" height="100%" v-if='!error'>
      <v-container v-if="!admin">
        <h1 class="display-2">The Floyd News</h1>
        <h1 class="headline ma-3">Author Dashboard</h1>
        <h1 class="title ma-3 pt-3">- Posts pending approval -</h1>
        <v-data-table
          :headers="headers"
          :items="posts"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</td>
          <td class="text-xs-right px-0 pr-3">
            <v-btn icon class="mx-0" @click="previewPost(props.item)">
              <v-icon color="primary">visibility</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="checkDeletePost(props.item)">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </td>
        </template>
        </v-data-table>
        <h1 class="title ma-3 pt-3">- Draft Posts -</h1>
        <v-data-table
          :headers="headers"
          :items="draftPosts"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</td>
          <td class="text-xs-right px-0 pr-3">
            <v-btn icon class="mx-0" @click="previewPost(props.item)">
              <v-icon color="primary">visibility</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="editPost(props.item)">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0 mr-3" @click="checkDeletePost(props.item)">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
            <v-btn icon class="ml-3 mr-0" color="primary" @click="checkSubmitPost(props.item)">
              <v-icon color="white">send</v-icon>
            </v-btn>
          </td>
        </template>
        </v-data-table>
      </v-container>
      <v-container v-if="admin">
        <h1 class="display-2">The Floyd News</h1>
        <h1 class="headline ma-3">Admin Dashboard</h1>
        <h1 class="title ma-3 pt-3">- Posts pending approval -</h1>
        <v-data-table
          :headers="adminHeaders"
          :items="posts"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.poster.name }}</td>
          <td class="text-xs-left">{{ props.item.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</td>
          <td class="text-xs-right px-0 pr-3">
            <v-btn icon class="mx-0" @click="previewPost(props.item)">
              <v-icon color="primary">visibility</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="editPost(props.item)">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0 mr-3" @click="checkDeletePost(props.item)">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
            <v-btn icon class="ml-3 mr-0" color="primary" @click="checkApprovePost(props.item)">
              <v-icon color="white">done</v-icon>
            </v-btn>
          </td>
        </template>
        </v-data-table>
        <h1 class="title ma-3 pt-3">- All active posts -</h1>
        <v-data-table
          :headers="allAdminHeaders"
          :items="activePosts"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.poster.name }}</td>
          <td class="text-xs-left">{{ props.item.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</td>
          <td class="">
            <v-checkbox class="mx-0" v-model="props.item.featured" @click="featurePost(props.item)">
            </v-checkbox>
          </td>
          <td class="text-xs-right px-0 pr-3">
            <v-btn icon class="mx-0" @click="viewPost(props.item)">
              <v-icon color="primary">visibility</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="editPost(props.item)">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="checkDeletePost(props.item)">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </td>
        </template>
        </v-data-table>
      </v-container>
      <v-dialog v-model="deleteDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure you want to delete this post?</v-card-title>
          <v-card-text>This action cannot be undone</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" flat="flat" @click.native="deleteDialog = false">No</v-btn>
            <v-btn color="red darken-1" flat="flat" @click.native="deletePost()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="submitDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure you want to submit this post for approval?</v-card-title>
          <v-card-text>This post cannot be edited while pending approval</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" flat="flat" @click.native="submitDialog = false">No</v-btn>
            <v-btn color="primary" flat="flat" @click.native="submitPost()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="approveDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure you want to approve this post?</v-card-title>
          <v-card-text>This action cannot be undone</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" flat="flat" @click.native="approveDialog = false">No</v-btn>
            <v-btn color="primary" flat="flat" @click.native="approvePost()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <router-link to="logout">
        Logout
      </router-link>
    </v-flex>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import NewsService from '@/services/NewsService'

export default {
  data () {
    return {
      headers: [
        { text: 'News Item', value: 'title' },
        { text: 'Created at', value: 'date' },
        { text: '', value: 'actions' }
      ],
      adminHeaders: [
        { text: 'News Item', value: 'title' },
        { text: 'Author', value: 'author' },
        { text: 'Created at', value: 'date' },
        { text: '', value: 'actions' }
      ],
      allAdminHeaders: [
        { text: 'News Item', value: 'title' },
        { text: 'Author', value: 'author' },
        { text: 'Created at', value: 'date' },
        { text: 'Featured', value: 'featured' },
        { text: '', value: 'actions' }
      ],
      posts: [],
      draftPosts: [],
      activePosts: [],
      admin: false,
      deleteDialog: false,
      deleteDialogPost: {},
      submitDialog: false,
      submitDialogPost: {},
      approveDialog: false,
      approveDialogPost: {},
      error: ''
    }
  },
  async mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      let data = null
      try {
        data = (await UserService.dash()).data
      } catch (err) {
        this.error = 'Dashboard not available'
      }
      this.admin = data.admin
      if (this.admin) {
        const posts = data.posts
        for (var j = 0; j < posts.length; j++) {
          posts[j].poster = (await UserService.get(posts[j].posterId)).data
          posts[j].date = new Date(posts[j].date)
        }
        this.posts = posts
        const aposts = data.activePosts
        for (var l = 0; l < aposts.length; l++) {
          aposts[l].poster = (await UserService.get(aposts[l].posterId)).data
          aposts[l].date = new Date(aposts[l].date)
        }
        this.activePosts = aposts
      } else {
        const posts = data.posts
        for (var i = 0; i < posts.length; i++) {
          posts[i].date = new Date(posts[i].date)
        }
        this.posts = posts
        const dposts = data.draftPosts
        for (var k = 0; k < dposts.length; k++) {
          dposts[k].date = new Date(dposts[k].date)
        }
        this.draftPosts = dposts
      }
    },
    previewPost (item) {
      this.$router.push({
        name: 'PreviewPost',
        params: {
          postId: item._id
        }
      })
    },
    editPost (item) {
      this.$router.push({
        name: 'EditPost',
        params: {
          postId: item._id
        }
      })
    },
    viewPost (item) {
      this.$router.push({
        name: 'ViewPost',
        params: {
          postId: item._id
        }
      })
    },
    checkDeletePost (item) {
      this.deleteDialog = true
      this.deleteDialogPost = item
    },
    checkSubmitPost (item) {
      this.submitDialog = true
      this.submitDialogPost = item
    },
    checkApprovePost (item) {
      this.approveDialog = true
      this.approveDialogPost = item
    },
    async deletePost () {
      const response = (await NewsService.delete(this.deleteDialogPost._id)).data
      if (response.error) {
        this.error = response.error
        return
      }
      this.$emit('snack', 'Post deleted')
      this.deleteDialogPost = {}
      this.deleteDialog = false
      this.fetchData()
    },
    async approvePost () {
      const item = this.approveDialogPost
      this.approveDialogPost = {}
      this.approveDialog = false
      item.status = 'approved'
      const response = (await NewsService.put(item)).data
      if (response.error) {
        console.log(response.error)
        return
      }
      this.$emit('snack', 'Post approved')
      this.$router.push({
        name: 'ViewPost',
        params: {
          postId: item._id
        }
      })
    },
    async submitPost () {
      const item = this.submitDialogPost
      this.submitDialogPost = {}
      this.submitDialog = false
      item.status = 'pending'
      const response = (await NewsService.put(item)).data
      if (response.error) {
        console.log(response.error)
        return
      }
      this.$emit('snack', 'Post submitted for approval')
      this.fetchData()
    },
    async featurePost (item) {
      const response = (await NewsService.put(item)).data
      if (response.error) {
        console.log(response.error)
        return
      }
      if (item.featured) {
        this.$emit('snack', 'Added to featured posts')
      } else {
        this.$emit('snack', 'Removed from featured posts')
      }
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.offwhite {
  background-color:rgb(231, 228, 228);
}
.fullheight {
  height: 100%;
}
</style>

<template>
  <div class="fullheight">
    <v-card v-if="$store.getters.loggedIn">
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
            <v-btn icon class="mx-0" @click="editPost(props.item)">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deletePost(props.item)">
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
            <v-btn icon class="mx-0 mr-3" @click="deletePost(props.item)">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
            <v-btn icon class="ml-3 mr-0" color="primary" @click="submitPost(props.item)">
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
            <v-btn icon class="mx-0 mr-3" @click="deletePost(props.item)">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
            <v-btn icon class="ml-3 mr-0" color="primary" @click="approvePost(props.item)">
              <v-icon color="white">done</v-icon>
            </v-btn>
          </td>
        </template>
        </v-data-table>
      </v-container>
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
      posts: [],
      draftPosts: [],
      admin: false,
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
    deletePost () {

    },
    async approvePost (item) {
      item.status = 'approved'
      const response = (await NewsService.putPreview(item)).data
      if (response.error) {
        console.log(response.error)
        return
      }
      this.$router.push({
        name: 'ViewPost',
        params: {
          postId: item._id
        }
      })
    },
    async submitPost (item) {
      item.status = 'pending'
      const response = (await NewsService.putPreview(item)).data
      if (response.error) {
        console.log(response.error)
        return
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

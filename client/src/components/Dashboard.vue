<template>
  <v-flex xs8 offset-xs2 class="offwhite fullheight" height="100%">
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
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon>delete</v-icon>
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
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="primary">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="primary">delete</v-icon>
          </v-btn>
        </td>
      </template>
      </v-data-table>
    </v-container>
  </v-flex>
</template>

<script>
import UserService from '@/services/UserService'

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
      admin: false
    }
  },
  async mounted () {
    const data = (await UserService.dash()).data
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
    }
  },
  methods: {
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

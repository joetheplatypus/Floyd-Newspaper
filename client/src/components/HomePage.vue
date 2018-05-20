<template>
  <div>
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
    <v-flex xs8 offset-xs2 class="offwhite fullheight" height="100%">
      <v-container>
        <h1 class="display-2">The Floyd News</h1>
        <h2 class="ma-3 headline">{{convertedCat($route.params.category)}}</h2>
        <v-container>
          <v-layout row class="mb-3">
            <v-flex xs8>
              <h3 class="mb-3">Featured Post</h3>
              <v-card v-if="posts[0]">
                <v-card-media
                  :src="posts[0].imgurl"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">{{posts[0].title}}</h2><i> in <router-link :to="{name:'Home', params: {category: convertCat(posts[0].category)}}">{{posts[0].category}}</router-link></i><v-spacer /><span class="px-3">by {{posts[0].poster.name}} - {{posts[0].date.toJSON().substr(0,10).split('-').reverse().join('/')}}</span></v-card-title>
                <v-card-text v-if="posts[0].content">
                  <div v-html="posts[0].content.substr(0,500) + ' ...'" class="text-xs-left"></div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat :to="`posts/${posts[0]._id}`">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <h3 class="mb-3">Latest Posts</h3>
              <v-card class="my-2" v-for="post in posts" :key="post._id">
                <v-card-media
                  :src="post.imgurl"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">{{post.title}}</h2><i> in <router-link :to="{name:'Home', params: {category: convertCat(post.category)}}">{{post.category}}</router-link></i><v-spacer /><span class="px-3">by {{post.poster.name}} - {{post.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</span></v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat :to="`posts/${post._id}`">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <router-link to="login" v-if="!$store.getters.loggedIn">
            Login
          </router-link>
          <router-link to="logout" v-if="$store.getters.loggedIn">
            Logout
          </router-link>
        </v-container>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import NewsService from '@/services/NewsService'
import UserService from '@/services/UserService'

export default {
  name: 'HomePage',
  data () {
    return {
      posts: []
    }
  },
  watch: {
    '$route.params.category': { immediate: true,
      async handler (category) {
        this.fetchPosts(category)
      }
    }
  },
  methods: {
    async fetchPosts (cat) {
      const posts = (await NewsService.index(cat)).data
      for (var i = 0; i < posts.length; i++) {
        posts[i].poster = (await UserService.get(posts[i].posterId)).data
        posts[i].date = new Date(posts[i].date)
      }
      this.posts = posts
    },
    convertCat (cat) {
      if (cat === 'School News') {
        return 'school-news'
      } else if (cat === 'Politics') {
        return 'politics'
      } else if (cat === 'World') {
        return 'world'
      } else {
        return false
      }
    },
    convertedCat (cat) {
      if (cat === 'school-news') {
        return 'School News'
      } else if (cat === 'politics') {
        return 'Politics'
      } else if (cat === 'world') {
        return 'World'
      } else {
        return ''
      }
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

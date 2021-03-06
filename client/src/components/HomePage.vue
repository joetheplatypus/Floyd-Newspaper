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
        :to="{name: 'Dashboard'}"
      >
        <v-icon>dashboard</v-icon>
      </v-btn>
  </v-card>
    <v-flex md8 offset-md2 class="offwhite fullheight" height="100%">
      <v-container>
        <h1 class="display-2">The Floyd News</h1>
        <h2 class="ma-3 headline">{{convertedCat($route.params.category)}}</h2>
        <v-alert :value=alert outline type="error">{{error}}</v-alert>
        <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp}">
          <v-layout row wrap class="mb-3">
            <v-flex sm8 xs12>
              <h3 class="mb-3">Featured Posts</h3>
              <v-card class="my-2" v-for="post in featuredPosts" :key="post._id">
                <v-card-media
                  :src="post.imgurl"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">{{post.title}}</h2><i> in <router-link :to="{name:'Home', params: {category: post.category}}">{{convertedCat(post.category)}}</router-link></i><v-spacer /><span class="px-3">by {{post.poster.name}} - {{post.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</span></v-card-title>
                <v-card-text v-if="post.content">
                  <div v-html="post.content.substr(0,500) + ' ...'" class="text-xs-left"></div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat :to="`posts/${post._id}`">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex sm4 xs12 :class="{'': $vuetify.breakpoint.xsAndDown, 'pl-3': $vuetify.breakpoint.smAndUp}">
              <h3 :class="{'my-3': $vuetify.breakpoint.smAndDown, 'mb-3': $vuetify.breakpoint.smAndUp}">Latest Posts</h3>
              <v-card class="my-2" v-for="post in posts" :key="post._id">
                <v-card-media
                  :src="post.imgurl"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">{{post.title}}</h2><i> in <router-link :to="{name:'Home', params: {category: post.category}}">{{convertedCat(post.category)}}</router-link></i><v-spacer /><span class="px-3">by {{post.poster.name}} - {{post.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</span></v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat :to="`posts/${post._id}`">Read More</v-btn>
                </v-card-actions>
              </v-card>
              <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
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
      posts: [],
      featuredPosts: [],
      error: '',
      scroller: 0,
      limit: 10,
      alert: true,
      loading: false
    }
  },
  watch: {
    '$route.params.category': { immediate: true,
      async handler (category) {
        this.posts = []
        this.featuredPosts = []
        this.scroller = 0
        this.fetchPosts(category, this.limit, this.scroller)
      }
    }
  },
  methods: {
    async fetchPosts (cat, limit) {
      this.loading = true
      this.error = ''
      this.alert = false
      const start = this.scroller
      console.log(`fetching more posts from ${start} to ${start + limit}`)
      const posts = (await NewsService.index(cat, limit, start)).data
      if (posts.length === 0) {
        this.loading = false
        return
      }
      if (this.featuredPosts.length === 0) {
        const fposts = (await NewsService.indexFeatured(cat)).data
        for (var j = 0; j < fposts.length; j++) {
          fposts[j].poster = (await UserService.get(fposts[j].posterId)).data
          fposts[j].date = new Date(fposts[j].date)
          this.featuredPosts.push(fposts[j])
        }
      }
      for (var i = 0; i < posts.length; i++) {
        posts[i].poster = (await UserService.get(posts[i].posterId)).data
        posts[i].date = new Date(posts[i].date)
        this.posts.push(posts[i])
      }
      this.scroller = start + limit
      this.loading = false
    },
    convertCat (cat) {
      if (this.$store.getters.categoryMap.get(cat)) {
        return this.$store.getters.categoryMap.get(cat)
      } else {
        return false
      }
    },
    convertedCat (cat) {
      if (cat === undefined) {
        return ''
      } else if (this.$store.getters.invCategoryMap.get(cat)) {
        return this.$store.getters.invCategoryMap.get(cat)
      } else {
        this.error = 'cannot find category'
        this.alert = true
        return ''
      }
    },
    handleScroll () {
      if ((window.innerHeight + window.pageYOffset) > document.body.offsetHeight - 30) {
        this.fetchPosts(this.$route.params.category, this.limit)
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
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

<template>
  <v-container>
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
    <v-flex md8 offset-md2>
      <h3 class="err title" v-if="error">{{error}}</h3>
      <v-card v-if="!error">
        <v-card-media
          :src="post.imgurl"
          height="200px"
        />
        <v-card-title><h2 class="px-3">{{post.title}}</h2><i> in <router-link :to="{name:'Home', params: {category: post.category}}">{{convertedCat(post.category)}}</router-link></i><v-spacer /><span class="px-3">by {{post.poster.name}} - {{post.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</span></v-card-title>
        <v-card-text>
          <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp}">
            <div v-html="post.content" class="mycontent text-xs-left body-1"></div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" flat>Something</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import NewsService from '@/services/NewsService'
import UserService from '@/services/UserService'

export default {
  data () {
    return {
      post: {
        poster: {},
        date: new Date()
      },
      error: ''
    }
  },
  async mounted () {
    const post = (await NewsService.get(this.$route.params.postId)).data
    if (!post) {
      this.error = 'Cannot find post'
      return
    }
    post.date = new Date(post.date)
    post.poster = (await UserService.get(post.posterId)).data
    // if (post.poster._id === this.$store.state.user._id) {
    //   post.myPost = true;
    // }
    this.post = post
  },
  methods: {
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
    }
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
.mycontent >>> span img {
  max-width: 100%;
  height: auto;
}
</style>

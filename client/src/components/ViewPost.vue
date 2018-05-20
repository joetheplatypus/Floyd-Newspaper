<template>
  <v-container>
    <v-flex xs8 offset-xs2>
      <v-card>
        <v-card-media
          :src="post.imgurl"
          height="200px"
        />
        <v-card-title><h2 class="px-3">{{post.title}}</h2><i> in <router-link :to="{name:'Home', params: {category: convertCat(post.category)}}">{{post.category}}</router-link></i><v-spacer /><span class="px-3">by {{post.poster.name}} - {{post.date.toJSON().substr(0,10).split('-').reverse().join('/')}}</span></v-card-title>
        <v-card-text>
          <div v-html="post.content" class="text-xs-left"></div>
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
    post.date = new Date(post.date)
    post.poster = (await UserService.get(post.posterId)).data
    // if (post.poster._id === this.$store.state.user._id) {
    //   post.myPost = true;
    // }
    this.post = post
  },
  methods: {
    convertCat (cat) {
      if (cat === 'School News') {
        return 'school-news'
      } else if (cat === 'Politics') {
        return 'politics'
      } else if (cat === 'World') {
        return 'world'
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
</style>

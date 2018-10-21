<template>
  <div class="pa-0 ma-0 cont">
    <v-toolbar app dark color="primary" class="mainToolbar">
      <img src="https://www.sirhenryfloyd.bucks.sch.uk/themes/floyd/images/logo.png" height="64px" width="64px" />
      <v-toolbar-title>Floyd News</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="menu = true"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{name: 'Home'}">All</v-btn>
        <v-btn v-for="category in $store.getters.categories" :key="category.value" flat :to="{name: 'Home', params: {category: category.value}}">{{category.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-menu
      v-model="menu"
      :position-x="0"
      :position-y="56"
      absolute
      attach=".mainToolbar"
      v-if="$vuetify.breakpoint.smAndDown"
      transition="slide-y-transition"
      content-class="fullwidth hidden-md-and-up"
      class="fixmargin hidden-md-and-up">
      <v-list light>
        <router-link :to="{name: 'Home'}" class="nodec">
          <v-list-tile>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link :to="{name: 'Home', params: {category: 'school-news'}}" class="nodec">
          <v-list-tile>
            <v-list-tile-title>School News</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link :to="{name: 'Home', params: {category: 'politics'}}" class="nodec">
          <v-list-tile>
            <v-list-tile-title>Politics</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <router-link :to="{name: 'Home', params: {category: 'world'}}" class="nodec">
          <v-list-tile>
            <v-list-tile-title>World</v-list-tile-title>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: false
    }
  }
}
</script>

<style>
.fullwidth {
  min-width: 100% !important;
}
.fixmargin {
  display: inline !important;
}
.nodec {
  text-decoration: none;
}
</style>

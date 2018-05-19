<template>
  <v-toolbar app dark color="primary">
    <img src="https://www.sirhenryfloyd.bucks.sch.uk/themes/floyd/images/logo.png" height="64px" width="64px" />
    <v-toolbar-title>Floyd News</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat :to="{name: 'Home'}">All</v-btn>
      <v-btn flat :to="{name: 'FilteredHome', params: {category: 'school-news'}}">School News</v-btn>
      <v-btn flat :to="{name: 'FilteredHome', params: {category: 'politics'}}">Politics</v-btn>
      <v-btn flat :to="{name: 'FilteredHome', params: {category: 'world'}}">World</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>

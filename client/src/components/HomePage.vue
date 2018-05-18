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
        <h1>The Floyd News</h1>
        <v-container>
          <v-layout row>
            <v-flex xs8>
              <h3 class="mb-3">Featured Post</h3>
              <v-card>
                <v-card-media
                  src="https://www.sirhenryfloyd.bucks.sch.uk/assets/Gallery/_resampled/CroppedImage1200513-school-photos-2.jpg"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">News Article Title</h2><i> in <a href="#">School News</a></i><v-spacer /><span class="px-3">by Joe Blogs</span></v-card-title>
                <v-card-text>
                  Buildings
                  Our current building project has not got as
                  far as we would have hoped by this time. We
                  are estimating that all three parts of the
                  project will be complete by Easter. Internal
                  adaptations are always more complex to
                  manage than the construction of a complete
                  new building. We have been coping with
                  moving lessons from one room to another in
                  the Central Block, having a section of the
                  canteen boarded up, losing a corridor in the
                  Performing Arts building… students have
                  been remarkably co-operative through all the
                  disruption. It will all be worth it in the end!
                  ...
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat>Read More</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <h3 class="mb-3">Latest Posts</h3>
              <v-card class="my-2">
                <v-card-media
                  src="https://www.sirhenryfloyd.bucks.sch.uk/assets/Gallery/_resampled/CroppedImage1200513-school-photos-2.jpg"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">News Article Title</h2><i> in <a href="#">School News</a></i><v-spacer /><span class="px-3">by Joe Blogs</span></v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat>Read More</v-btn>
                </v-card-actions>
              </v-card>
              <v-card class="my-2">
                <!-- <v-card-media
                  src="https://www.sirhenryfloyd.bucks.sch.uk/assets/Gallery/_resampled/CroppedImage1200513-school-photos-2.jpg"
                  height="200px"
                /> -->
                <v-card-title><h2 class="px-3">News Article Title</h2><i> in <a href="#">School News</a></i><v-spacer /><span class="px-3">by Joe Blogs</span></v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat>Read More</v-btn>
                </v-card-actions>
              </v-card>
              <v-card class="my-2">
                <v-card-media
                  src="https://www.sirhenryfloyd.bucks.sch.uk/assets/Gallery/_resampled/CroppedImage1200513-school-photos-2.jpg"
                  height="200px"
                />
                <v-card-title><h2 class="px-3">News Article Title</h2><i> in <a href="#">School News</a></i><v-spacer /><span class="px-3">by Joe Blogs</span></v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat>Read More</v-btn>
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
export default {
  name: 'HomePage',
  data () {
    return {
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

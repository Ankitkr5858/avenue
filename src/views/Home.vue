<template>
  <div class="home pb-15">
    <v-col
          v-for="post in allPosts"
          :key="post.id"
          cols="8"
          class="mx-auto pa-0 ma-0"
        >
      <v-card outlined>
        <div class="d-flex flex-no-wrap justify-space-between blog-post-wrap pl-15 pr-15 pt-7 pb-7">
          <div>
            <v-card-subtitle class="blog-post-author pa-0 pb-1">{{post.date}}</v-card-subtitle>
            <v-card-title class="blog-post-title pa-0 pb-4">{{post.title}}</v-card-title>
            <v-card-text class="blog-post-content pa-0 pb-4">
              <div>
                {{printInnerText(post.content)}}
              </div>
            </v-card-text>
            <v-card-actions class="pa-0">
              <v-btn
                class="pl-7 pr-7 white--text"
                color="grey lighten-1"
                elevation="0"
                @click="$router.push('/post/'+post.id)"
              >
                READ MORE
              </v-btn>
            </v-card-actions>
          </div>
          <v-img class="blog-post-cover-image ml-6" :src="post.coverImage"></v-img>
        </div>
      </v-card>
    </v-col>
    <v-btn
      color="grey darken-4 blog-post-add"
      fab
      dark
      fixed
      @click="createNewPost"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
  data: function () {
    return {
      allPosts: []
    }
  },
  components: {
  },
  mounted: function () {
    this.allPosts = this.posts()
  },
  methods: {
    ...mapMutations(['addPost']),
    createNewPost () {
      const dummyPost = {
        title: 'Lorem Ipsum',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        date: new Date().toDateString(),
        author: 'John Doe',
        coverImage: 'https://picsum.photos/500/300?image=20'
      }
      this.addPost(dummyPost)
      this.$router.push('/post/' + (this.counter() - 1))
    },
    printInnerText (content) {
      const ele = document.createElement('div')
      ele.innerHTML = content
      return ele.innerText
    }
  },
  computed: {
    ...mapGetters({ posts: 'getPosts', counter: 'getCounter' })
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
.home{
  background-color: #EEEEEE;
  height: 100%;
  min-height: 100vh !important;
}
.blog-post-title{
  font-family: 'Oswald', sans-serif;
  font-size: 2.6rem !important;
  text-transform: uppercase;
  color: #424242;
  word-break: unset !important;
  letter-spacing: 0 !important;
  line-height: 2.6rem !important;
}
.blog-post-content{
  font-family: 'Poppins', sans-serif !important;
  color: #616161;
}
.blog-post-content div{
  max-height: 2.5rem !important;
  overflow: hidden;
}
.blog-post-author{
  font-weight: 700  !important;
  font-family: 'Open Sans', sans-serif  !important;
  color: #757575  !important;
  letter-spacing: 2px !important;
  text-transform: uppercase  !important;
}
.blog-post-cover-image{
  height: inherit !important;
  width: auto !important;
  max-height: 210px;
  max-width: 300px !important;
}
.blog-post-add{
  bottom: 5%;
  right: 5%;
}
</style>

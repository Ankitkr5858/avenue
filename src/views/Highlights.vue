<template>
  <div class="home pb-15">
    <v-col
          cols="8"
          class="mx-auto pa-0 ma-0"
        >
      <v-card outlined class="pa-0 pl-10 pr-10 pt-5 pb-10">
        <div class="d-inline-flex flex-wrap" v-for="word in allHighlightedWords" :key="word">
          <v-btn elevation="0" rounded dark class="mt-1 ml-2" color="yellow darken-4" small @click="getPostsWithHighlights(word)">
            {{word}}
          </v-btn>
        </div>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="700"
        >
          <v-card>
            <v-card-text class="pt-5"  style="max-height: 400px;">
             <v-card v-for="(post, index) in matchedPosts" :key="index" outlined :to="'/post/'+post.id" class="ma-2">
                <v-card-title class="blog-post-title">{{post.title}}</v-card-title>
                <v-divider></v-divider>
                <div class="blog-post-content pa-2">
                  <div v-html="post.content"></div>
                </div>
             </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                light
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data: function () {
    return {
      allHighlightedWords: [],
      dialog: false,
      matchedPosts: [],
      allPosts: []
    }
  },
  components: {
  },
  mounted: function () {
    const allPosts = this.posts()
    this.allPosts = allPosts
    const highlightedWords = new Set()
    allPosts.forEach(post => {
      const content = post.content
      const ele = document.createElement('div')
      ele.innerHTML = content
      // console.log(ele)
      const currHighlightedWords = ele.getElementsByClassName('highlighted')
      // console.log(currHighlightedWords)
      currHighlightedWords.forEach(word => {
        // console.log(word)
        highlightedWords.add(word.innerText)
      })
    })
    // console.log(highlightedWords)
    this.allHighlightedWords = new Array(...highlightedWords)
    // console.log(this.allHighlightedWords)
  },
  methods: {
    getPostsWithHighlights (word) {
      const allPosts = this.allPosts
      const matchedPosts = []
      allPosts.forEach(post => {
        const content = post.content
        const ele = document.createElement('div')
        ele.innerHTML = content
        let str = ele.innerHTML.toString()
        str = str.replaceAll('<span class="highlighted yellow darken-4">' + word + '</span>', '=====')
        // console.log(str)
        const lines = str.split('=====')
        console.log(lines)
        // const currHighlightedWords = ele.getElementsByClassName('highlighted')
        // console.log(currHighlightedWords)
        const dummyPost = {}
        dummyPost.id = post.id
        dummyPost.title = post.title
        const leftLength = 100 - word.length
        const rightLength = 200 - leftLength
        for (let i = 0; i < lines.length - 1; i++) {
          const dummyPost = {}
          dummyPost.id = post.id
          dummyPost.title = post.title
          const currLine = this.printInnerText(lines[i])
          const nextLine = this.printInnerText(lines[i + 1])
          // console.log(currLine, '\n', nextLine)
          dummyPost.content = currLine.substring(Math.max(currLine.length - leftLength - 1, 0))
          console.log(dummyPost.content)
          dummyPost.content += '<span class="highlighted yellow darken-4">'
          dummyPost.content += word
          dummyPost.content += '</span>'
          dummyPost.content += nextLine.substring(0, Math.min(rightLength, nextLine.length))
          console.log(dummyPost.content)
          matchedPosts.push(dummyPost)
        }
      })
      this.matchedPosts = matchedPosts
      this.dialog = true
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
  font-size: 1rem !important;
  text-transform: uppercase;
  color: #424242;
  word-break: unset !important;
  letter-spacing: 0 !important;
  line-height: 1rem !important;
}
.blog-post-content{
  font-family: 'Poppins', sans-serif !important;
  color: #616161;
}
.blog-post-content div{
  max-height: 4rem !important;
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

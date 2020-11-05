<template>
<div>
    <div class="blog-post" v-if="!isEditing||isPreviewing">
      <v-col cols="8" class="mx-auto pa-0 ma-0 mb-15">
        <v-card outlined>
          <div class="d-block justify-center blog-post-wrap pl-15 pr-15 pt-7 pb-7">
            <v-card-subtitle class="blog-post-author pa-0 pb-1">{{post.date}}</v-card-subtitle>
            <v-card-title class="blog-post-title pa-0 pb-6">
              {{post.title}}</v-card-title>
            <v-card-subtitle class="blog-post-author-2 pa-0 pb-1"><i>by {{post.author}}</i></v-card-subtitle>
            <v-img class="blog-post-cover-image mx-auto" :src="post.coverImage"></v-img>
            <v-card-text class="blog-post-content pa-0 pb-4 pt-4">
                <div ref="target" id="content" v-html="post.content">
                </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <div class="blog-post-add" >
        <v-btn
          color="grey darken-4"
          fab
          dark
          class="ml-2"
          v-if="!isEditing"
          @click="isEditing=true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          color="yellow darken-4"
          fab
          class="ml-2"
          dark
          v-if="isValidSelection"
          @click="addHighlightedWord"
        >
            <v-icon large>mdi-format-color-highlight</v-icon>
        </v-btn>
        <v-btn
          color="grey darken-4"
          fab
          dark
          class="ml-2"
          v-if="isPreviewing"
          @click="isPreviewing=false"
        >
          <v-icon large>mdi-eye-off</v-icon>
        </v-btn>
        <v-btn
          color="grey darken-4"
          fab
          class="ml-2"
          dark
          @click="$router.push('/')"
        >
          <v-icon large>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
    </div>
    <!-- EDITING -->
    <div class="blog-post" v-if="isEditing&&!isPreviewing">
      <v-col cols="8" class="mx-auto pa-0 ma-0 mb-15">
        <v-card outlined>
          <div class="d-block justify-center blog-post-wrap pl-15 pr-15 pt-7 pb-7">
            <v-card-subtitle class="pa-0 pb-1">
              <input type="text" v-model="post.date" class="blog-post-author">
            </v-card-subtitle>
            <v-card-title class="pa-0 pb-6">
              <input type="text" v-model="post.title" class="blog-post-title" style="width: 100%;">
            </v-card-title>
            <v-card-subtitle class="blog-post-author-2 pa-0 pb-1">
                <i>by </i>
                <input type="text" v-model="post.author" class="blog-post-author-2">
              </v-card-subtitle>
            <v-img class="blog-post-cover-image mx-auto" :src="post.coverImage"></v-img>
            <v-card-subtitle class="blog-post-author-2 pa-0 pb-1">
                Image url: <input type="text" v-model="post.coverImage" style="width: 70%;margin-top:10px">
              </v-card-subtitle>
            <v-card-text class="pa-0 pb-4 pt-4">
                <textarea contenteditable="true" v-model="post.content" class="blog-post-content p-2" style="width: 100%;height: 200px">
                </textarea>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <div class="blog-post-add" v-if="isEditing">
        <v-btn
        color="grey darken-4"
        class="ml-2"
        fab
        dark
        @click="isPreviewing=true"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
        <v-btn
        color="grey darken-4"
        class="ml-2"
        fab
        dark
        @click="saveChanges"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        color="grey darken-4"
        class="ml-2"
        fab
        dark
        @click="deletesPost"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        color="grey darken-4"
        class="ml-2"
        fab
        dark
        @click="discardChanges"
      >
        <v-icon x-large>mdi-alpha-x</v-icon>
      </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Post',
  data: function () {
    let id_ = this.$route.params.id
    id_ = parseInt(id_)
    return {
      id: id_,
      post: {},
      isValidSelection: false,
      selection: [],
      isEditing: false,
      isPreviewing: false
    }
  },
  components: {
  },
  mounted: function () {
    let id_ = this.$route.params.id
    id_ = parseInt(id_)
    this.post = this.getPostById(id_)
    document.addEventListener('mouseup', event => {
      if (event.target === this.$refs.target || event.target.contains(this.$refs.target)) {
        this.highlightAreaSelectionFunction()
      }
    })
  },
  methods: {
    ...mapMutations(['updatePost', 'deletePost']),
    highlightAreaSelectionFunction () {
      const selection = window.getSelection().toString()
      const pattern = new RegExp(/^[a-z0-9A-Z]+$/)
      if (pattern.test(selection)) {
        this.isValidSelection = true
        const range = window.getSelection().getRangeAt(0)
        const payload = [this.id, selection, range]
        this.selection = payload
        if (this.isHighlighted(payload)) {
          this.isValidSelection = false
          this.selection = []
        } else {
          console.log(payload)
          this.isValidSelection = true
          this.selection = payload
        }
        //   console.log(this.range)
      } else {
        this.isValidSelection = false
        this.selection = []
      }
    //  console.log(this.isValidSelection)
    },
    addHighlightedWord () {
      const range = this.selection[2]
      this.surroundRangeWithSpan(range)
      this.post.content = this.$refs.target.innerHTML
      this.saveChanges()
      this.isValidSelection = false
      this.selection = []
    },
    surroundRangeWithSpan (range) {
      var span = document.createElement('span')
      span.classList.add('highlighted')
      span.classList.add('yellow')
      span.classList.add('darken-4')
      // The text is within the same node (no other html elements inside of it)
      if (range.startContainer.isEqualNode(range.endContainer) && range.startContainer.childNodes.length === 0) {
        // Here you customise your <span> element
        this.customSurroundContents(range, span)
      } else {
        // Here you have to break the selection down
      }
      return span
    },
    customSurroundContents (range, span) {
      const node = range.commonAncestorContainer
      const startNode = node.splitText(range.startOffset)
      startNode.splitText(range.toString().length)
      span.textContent = startNode.textContent
      startNode.parentNode.replaceChild(span, startNode)
    },
    discardChanges () {
      const id_ = this.id
      this.post = this.getPostById(id_)
      this.isPreviewing = false
      this.isEditing = false
    },
    saveChanges () {
      // let id_ = this.$route.params.id
      // id_ = parseInt(id_)
      const payload = this.post
      // console.log(payload)
      this.updatePost(payload)
      //  this.$router.push('/post/' + id_)
      this.isPreviewing = false
      this.isEditing = false
    },
    deletesPost () {
      const id_ = this.id
      this.deletePost(id_)
      this.$router.push({ name: 'Home' })
    }
  },
  computed: {
    ...mapGetters({ getPostById: 'getPostById', isHighlighted: 'isHighlighted' })
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
.blog-post{
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
.blog-post-author{
  font-weight: 700  !important;
  font-family: 'Open Sans', sans-serif  !important;
  color: #757575  !important;
  letter-spacing: 2px !important;
  text-transform: uppercase  !important;
}
.blog-post-author-2{
  font-weight: 700  !important;
  font-family: 'Open Sans', sans-serif  !important;
  color: #757575  !important;
}
.blog-post-cover-image{
  height: inherit !important;
  width: auto !important;
  max-height: 210px;
  max-width: 300px !important;
}
.blog-post-add{
  position: fixed;
  bottom: 5%;
  right: 5%;
}
.highlight-icon{
  bottom: 5%;
  right: 10%;
}
.highlighted{
  color: #F57F17 !important;
}
</style>

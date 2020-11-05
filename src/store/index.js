import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [
      {
        title: 'The Future of APIs.json (2020 Edition)',
        date: '06 Sep 2020',
        content: 'This website and the <span class="highlighted yellow darken-4">conversation</span> around APIs.json has been dormant for a couple of years. This was due to acquisitions, job changes, and just not enough time to invest in the specification beyond just putting it to use. Even <span class="highlighted yellow darken-4">though</span> we haven’t iterated upon the version in a couple <span class="highlighted yellow darken-4">years</span> doesn’t mean it has been put to the test when it comes to indexing internal and external APIs. With all this work, and a renewed energy in APIs, 2020 it feels like just the right time to get back to investing in the spec, and make recommendations for what the future of the APIs.json should look like.',
        author: 'John Doe',
        coverImage: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
        id: 0
      },
      {
        title: 'Inspiration for New Bloggers',
        date: '10 Sep 2020',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim leo massa, sed aliquet leo posuere ut. Curabitur malesuada accumsan erat, id varius eros tincidunt quis. Vivamus lobortis, odio at fermentum efficitur, risus est tincidunt nisl, eget condimentum tellus dui vitae nibh. Donec id lorem condimentum, porttitor augue in, fermentum leo. Morbi condimentum, nunc ut malesuada placerat, sem nulla condimentum purus, iaculis tristique metus diam lobortis enim. Suspendisse potenti. Quisque urna magna, porta eget erat ac, pharetra vehicula erat. Suspendisse sed nisi ex.',
        author: 'Ana green',
        coverImage: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        id: 1
      },
      {
        title: '5 Tips For Dance Beginners',
        date: '07 Nov 2020',
        content: 'There are so many different genres of dance that you may be unsure of which to choose when deciding to learn to dance. The simple answer is to try lots of different dance styles. It’s true that excelling at one style requires many years of practice, but to be proficient in several types of dancing take less time and may be more beneficial.Take the time to learn a little about a variety of styles, rather than focusing on one. You could find yourself at a variety of events when you could be dancing to anything from break dance to ballroom.',
        author: 'Jason Wing',
        coverImage: 'https://www.wikihow.com/images/thumb/2/2c/Learn-to-Dance-Step-12-Version-2.jpg/v4-460px-Learn-to-Dance-Step-12-Version-2.jpg.webp',
        id: 2
      }
    ],
    counter: 3,
    highlights: []
  },
  mutations: {
    addPost (state, post) {
      post = {
        ...post,
        id: state.counter
      }
      state.counter += 1
      state.posts = [
        ...state.posts,
        post
      ]
    },
    updatePost (state, payload) {
      state.posts = [
        ...state.posts.filter(post => post.id !== payload.id),
        payload
      ]
    },
    deletePost (state, id) {
      state.posts = [...state.posts.filter(post => post.id !== id)]
    },
    addHighlight (state, payload) {
      if (state.highlights.find(highlight => highlight === payload)) {
        return
      }
      state.highlights = [...state.highlights, payload]
    }
  },
  actions: {
  },
  getters: {
    getPosts: (state) => () => {
      return state.posts
    },
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id)
    },
    getPostsCount: (state) => () => {
      return state.posts.length
    },
    getCounter: (state) => () => {
      return state.counter
    },
    isHighlighted: (state) => (payload) => {
      if (state.highlights.find(highlight => highlight === payload)) {
        return true
      }
      return false
    },
    getHighLightsById: (state) => (id) => {
      return state.highlights.filter(highlight => highlight[0] === id)
    }
  },
  modules: {
  }
})

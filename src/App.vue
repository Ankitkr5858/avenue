<template>
  <v-app>
    <v-container fluid class="grey darken-4 pa-0">
      <v-row class="justify-center ma-0"><div class="white--text logo">Avenue.</div></v-row>
      <v-row class="justify-center ma-0">
        <v-col cols=8 class="grey darken-3 d-flex justify-center">
          <div class="link"><router-link to="/">HOME</router-link></div>
          <div class="link"><router-link to="/highlights">HIGHLIGHTS</router-link></div>
        </v-col>
      </v-row>
    </v-container>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat&display=swap');
.logo{
  font-family: 'Lobster', cursive;
  font-size: 2.5rem;
  margin-top: 30px;
  margin-bottom: 20px;
}
.link a{
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Open Sans', sans-serif;
  color: #757575 !important;
  margin-left:2rem;
  letter-spacing: 0.5px;
  text-decoration: none;
}

.link .router-link-exact-active{
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Open Sans', sans-serif;
  color: #BDBDBD !important;
  margin-left: 2rem;
  letter-spacing: 0.5px;
  text-decoration: none;
}

</style>

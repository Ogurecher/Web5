<template>
  <div id="app">
    <router-view/>
    <div id="output-textarea">
        <p><span v-html="marked_message"></span></p>
        <form>
          <textarea v-model="message"></textarea>
          <button v-on:click.prevent='save'> Save</button>
        </form>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
const xss = require('xss')
export default {
  name: 'App',
  data () {
    return {
      message: 'Vue!'
    }
  },
  computed: {
    marked_message: function () {
      return xss(marked(this.message))
    }
  },
  methods: {
    save: function () {
      this.$http.post('http://localhost:8081', {
        message: this.message
      }).then(function (data) {
        console.log(data)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

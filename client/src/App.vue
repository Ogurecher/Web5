<template>
  <div id="app">
    <router-view/>
    <div id="list">
        <button v-on:click.prevent='display'>Display</button>
        <ul>
          <li v-for="doc in docs">{{ doc.name }}
            <button v-on:click.prevent='edit_start(doc._id)'>Edit</button>
            <button v-on:click.prevent="del(doc._id)">Delete</button>
          </li>
        </ul>
    </div>
    <div id="editor">
        <form>
          <input id="input-name" v-model="name">
          <textarea id="input-content" v-model="content"></textarea>
          <button v-if="editing_id == ''" v-on:click.prevent='save'> Save</button>
          <button v-else v-on:click.prevent='edit'> Edit</button>
        </form>
    </div>
    <div id="preview">
        <span v-html="marked_content"></span>
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
      content: 'content',
      name: 'name',
      docs: [],
      editing_id: ''
    }
  },
  computed: {
    marked_content: function () {
      return xss(marked(this.content))
    }
  },
  methods: {
    save: function () {
      this.$http.post('http://localhost:8081/save', {
        name: this.name,
        content: this.content
      }).then(function (data) {
        this.display();
      })
    },

    display: function () {
      this.$http.get('http://localhost:8081/display', {
      }).then(function (data) {
        this.docs = data.data;
        console.log(data);
      })
    },

    del: function (doc_id) {
      this.$http.post('http://localhost:8081/del', {
        id: doc_id
      }).then(function (data) {
        this.display();
      })
    },

    edit_start: function (doc_id) {
      const doc = this.docs.find(function (element, index, arr) {
        return element._id == doc_id;
      });
      this.name = doc.name;
      this.content = doc.content;
      this.editing_id = doc_id;
    },

    edit: function () {
      this.$http.post('http://localhost:8081/edit', {
        id: this.editing_id,
        name: this.name,
        content: this.content
      }).then(function (data) {
        this.editing_id = '';
        this.name = 'name';
        this.content = 'content';
        this.display();
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
    margin: 0 auto;
    color: #2c3e50;
    margin-top: 60px;
  }

  #list {
    float: left;
    width: 250px;
    margin-top: 3%;
    margin-right: 2%;
    background: #ececec;
  }

  #editor {
    float: left;
    width: 35%;
    margin-right: 2%;
    height: 500px;
    padding: 10px;
    background: #ececec;
  }

  #preview {
    float: left;
    width: 30%;
    height: 500px;
    padding: 10px;
    background: #ececec;
  }

  #input-name {
    width: 100%;
    margin-bottom: 8px;
  }

  #input-content {
    width: 100%;
    height: 440px;
  }
</style>

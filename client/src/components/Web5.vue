<template>
  <div class="Web5">
    <div id="output-textarea">
      <p>{{ message }}</p>
      <input v-model="message">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Web5',
  data () {
    return {
      message: 'Vue!'
    }
  }/* ,
  computed: {
    marked_message: function () {
      return marked(this.message)
    }
  } */
}
</script>

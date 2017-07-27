<template lang="pug">
  .wrap
    .breadcrumb-wrap
      el-breadcrumb(separator="/")
        el-breadcrumb-item(v-bind:to="{ path: '/' }") 首页
        el-breadcrumb-item(v-bind:to="{ path: '/log' }") 日志
    h1 {{title}}
</template>
<script>
  export default {
    data () {
      return {
        title: '日志'
      }
    }
  }
</script>
<style lang="sass">
  .wrap
    background-color: red
</style>

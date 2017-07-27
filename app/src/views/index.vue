<template lang="pug">
  .index-wrap
</template>
<script>
  export default {
    data () {
      return {
        title: '首页'
      }
    },
    mounted () {
    }
  }
</script>
<style lang="sass">
  $bgWidth: 10000px
  .index-wrap
    position: absolute
    height: calc(100% - 12px)
    width: 100%
    background: linear-gradient(to right, #1e5799 0%,#2ce0bf 19%,#76dd2c 40%,#dba62b 60%,#e02cbf 83%,#1e5799 100%)
    background-size: $bgWidth 100%
    animation: bg 15s linear infinite
  @keyframes bg
    0%
      background-position-x: 0
    100%
      background-position-x: $bgWidth
</style>

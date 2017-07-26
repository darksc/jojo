<template lang="pug">
  .header-content
    .header-logo
      img(src="../../static/images/pig.png")
    .header-nav
      el-menu(theme="dark" v-bind:default-active="activeIndex" mode="horizontal" v-on:select="handleSelect")
        el-menu-item(index="server") 服务器
        el-menu-item(index="logs") 日志
</template>
<script>
  import { mapState } from 'vuex'
  import { appRouter } from '../router/'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        activeIndex: state => state.nav.activeIndex
      })
    },
    methods: {
      handleSelect (key, keyPath) {
        this.$store.dispatch('setNav', key)
        appRouter.push({name: key})
      }
    }
  }
</script>
<style lang="sass">
  .header-content
    position: relative
    height: 60px
    width: 100%
    .header-nav
      position: absolute
      left: 80px
      right: 20px
      height: 60px
    .header-logo
      position: absolute
      left: 20px
      height: 60px
      width: 60px
      img
        height: 30px
        margin: 10px 10px 0 0

</style>

<template lang="pug">
  div#app
    header.header-wrap
      header-nav
    div.content-wrap
      el-scrollbar(tag="div" class="view-scrollbar" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list")
        router-view
</template>
<script>
  import { mapState } from 'vuex'
  import { appRouter } from './router'
  import store from './store'
  import headerNav from './components/header'
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    mounted () {
      appRouter.beforeEach((to, from, next) => {
        this.$store.dispatch('setNav', to.name)
        next()
      })
    },
    computed: {
      ...mapState({
        activeIndex: state => state.nav.activeIndex
      })
    },
    store,
    methods: {
      goto (item) {
        appRouter.push({name: item.name})
      }
    },
    components: {
      headerNav
    }
  }
</script>

<style lang="sass">
  html, body
    height: 100%
  ul, li
    margin: 0
    padding: 0
    list-style: none
  .view-scrollbar
    height: 100%
    > .el-select-dropdown__wrap
      height: 100%
      max-height: 100%
      overflow-x: hidden
      > .el-scrollbar__view
        min-height: 100%
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
    position: relative
    height: 100%
    width: 100%
    font-size: 12px
  .header-wrap
    height: 60px
    line-height: 60px
    background-color: #324157
    padding: 0 20px
    color: #fff
    font-size: 24px
  .breadcrumb-wrap
    position: fixed
    top: 60px
    height: 40px
    line-height: 40px
    overflow: hidden
    padding: 0 20px
    .el-breadcrumb
      margin-top: 14px
      font-size: 14px
  .content-wrap
    position: absolute
    top: 100px
    bottom: 0
    width: 100%
    padding: 20px
    box-sizing: border-box
    background-color: #fafafa

</style>

<template lang="pug">
  div#app
    header.header-wrap
      header-nav

    div.content-wrap
      div.content
        div.nav
          el-menu(default-active="0" class="el-menu-vertical-demo" theme="dark")
            el-menu-item(v-bind:index="index + ''" v-for="(item, index) in nav" v-on:click="goto(item)" v-bind:key="item.title" ) {{item.title}}
        div.view
          el-scrollbar(tag="div" class="view-scrollbar" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list")
            router-view
</template>
<script>
  import router from './router'
  import headerNav from './components/header'
  export default {
    name: 'app',
    data () {
      return {
        nav: [
          {
            title: '端口登记',
            name: 'dtfd'
          },
          {
            title: '桩号转换',
            name: 'zhzh'
          },
          {
            title: '周边资源',
            name: 'zbzy'
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      goto (item) {
        router.push({name: item.name})
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
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
    position: relative
    height: 100%
    width: 100%
  .header-wrap
    height: 60px
    line-height: 60px
    width: 100%
    background-color: #324157
    padding: 0 20px
    color: #fff
    font-size: 24px
  .content-wrap
    position: absolute
    top: 60px
    bottom: 0
    width: 100%
    .content
      height: 100%
      width: 400px
      float: left
      .nav
        height: 100%
        width: 100px
        background-color: #324157
      .view
        position: absolute
        left: 100px
        top: 0
        right: 0
        height: 100%
        background-color: #fafafa
  .left-wrap
    padding: 20px
    .my-autocomplete
      li
        line-height: normal
        padding: 7px
        .one
          text-overflow: ellipsis
          overflow: hidden
        .two
          font-size: 12px
          color: #b4b4b4
        .highlighted .two
          color: #ddd
    .el-autocomplete, .el-select
      width: 100%
    .button-wrap
      text-align: center
    .server-wrap
      > span
        display: inline-block
        font-size: 14px
        color: #48576a
        line-height: 1
        padding: 0 0 10px
      .el-radio-group
        width: 100%
        margin-bottom: 30px
        label
          width: 50%
          span
            width: 100%
</style>

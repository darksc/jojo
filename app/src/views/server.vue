<template lang="pug">
  .server-wrap
    .button-wrap
      el-button(type="primary" icon="plus" v-on:click="dialogVisible = true") 添加服务器

    el-row
      el-col(:span="4" v-for="(o, index) in 10")
        .card-wrap
          el-card(v-bind:body-style="{ padding: '0px' }")
            .card-content
              .card-title server
              .card-info
                .card-detail 数据库服务器
                .card-line 192.168.0.1
                .card-line root
                .card-line HDSX68714962
              el-button.button(type="text") 详情
    el-dialog(title="添加服务器" v-model="dialogVisible" size="tiny")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="addFrom")
        el-form-item(label="代号")
          el-input(v-model="form.name")
        el-form-item(label="介绍")
          el-input(v-model="form.detail")
        el-form-item(label="IP地址")
          el-input(v-model="form.ip")
        el-form-item(label="用户名")
          el-input(v-model="form.user")
        el-form-item(label="密码")
          el-input(v-model="form.pass")
        el-form-item
          el-button(type="primary" v-on:click="save()") 保存
          el-button(v-on:click="reset('addForm')") 取消
</template>
<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        form: {
          name: '',
          detail: '',
          ip: '',
          user: '',
          pass: ''
        }
      }
    },
    methods: {
      save () {
        console.log('save')
      },
      reset (name) {
        this.$refs[name].resetFields()
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="sass">
  .server-wrap
    overflow: hidden
    .button-wrap
      padding: 0 20px
      margin-bottom: 20px
    .card-wrap
      padding: 20px
      text-align: center
    .card-content
      padding: 10px
      .card-title
        height: 100px
        margin: 0 20px
        line-height: 100px
        font-size: 30px
        border-bottom: 3px solid #000
        text-transform: uppercase
      .card-info
        .card-detail
          font-size: 18px
          margin-top: 10px
          margin-bottom: 20px
          height: 30px
          line-height: 30px
        .card-line
          font-size: 14px
          line-height: 30px
</style>

<template lang="pug">
  .server-wrap
    .button-wrap
      el-button(type="primary" icon="plus" v-on:click="dialogVisible = true") 添加服务器

    el-row
      el-col(:span="4" v-for="(item, index) in serverList" v-bind:key="index")
        .card-wrap
          el-card(v-bind:body-style="{ padding: '0px' }")
            .card-content
              .card-title {{item.name}}
              .card-info
                .card-detail {{item.detail}}
                .card-line {{item.ip}}
                .card-line {{item.user}}
                .card-line {{item.pass}}
              el-button.button(type="text" v-on:click="goDetail(item.id)") 详情
              el-button.button(type="text" v-on:click="removeClick(item.id)") 删除

    el-dialog(title="添加服务器" v-model="dialogVisible" size="tiny")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="addForm")
        el-form-item(label="代号" prop="name")
          el-input(v-model="form.name")
        el-form-item(label="介绍" prop="detail")
          el-input(v-model="form.detail")
        el-form-item(label="IP地址"  prop="ip")
          el-input(v-model="form.ip")
        el-form-item(label="用户名"  prop="user")
          el-input(v-model="form.user")
        el-form-item(label="密码"  prop="pass")
          el-input(v-model="form.pass")
        el-form-item
          el-button(type="primary" v-on:click="save()") 保存
          el-button(v-on:click="reset('addForm')") 取消
</template>
<script>
  import * as server from '../store/server'
  let usertimer
  export default {
    data () {
      let validateName = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]{1,6}$/
        if (value === '') {
          callback(new Error('请输入代号'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~6个字符，包含字母、数字）'))
          } else {
            clearTimeout(usertimer)
            usertimer = setTimeout(() => {
              server.serverCheckName({
                name: value
              }).then(res => {
                if (res.data.data === true) {
                  callback()
                } else {
                  callback(new Error('该代号已存在'))
                }
              })
            }, 500)
          }
        }
      }

      let validateDetail = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/
        if (value === '') {
          callback(new Error('请输入介绍'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~10个字符，包含中文、字母、数字）'))
          } else {
            callback()
          }
        }
      }

      let validateIp = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/
        if (value === '') {
          callback(new Error('请输入介绍'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~10个字符，包含中文、字母、数字）'))
          } else {
            callback()
          }
        }
      }

      let validateUser = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/
        if (value === '') {
          callback(new Error('请输入介绍'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~10个字符，包含中文、字母、数字）'))
          } else {
            callback()
          }
        }
      }

      let validatePass = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/
        if (value === '') {
          callback(new Error('请输入介绍'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~10个字符，包含中文、字母、数字）'))
          } else {
            callback()
          }
        }
      }
      return {
        dialogVisible: false,
        serverList: [],
        form: {
          name: '',
          detail: '',
          ip: '',
          user: '',
          pass: ''
        },
        formRules: {
          name: [
            { validator: validateName, required: true, trigger: 'change' }
          ],
          detail: [
            { validator: validateDetail, required: true, trigger: 'change' }
          ],
          ip: [
            { validator: validateIp, required: true, trigger: 'change' }
          ],
          user: [
            { validator: validateUser, required: true, trigger: 'change' }
          ],
          pass: [
            { validator: validatePass, required: true, trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.search()
    },
    methods: {
      save () {
        server.serverSave(this.form).then(res => {
          if (res.data.data) {
            this.$message({
              message: '恭喜你，保存成功!',
              type: 'success'
            })
            this.$refs['addForm'].resetFields()
            this.dialogVisible = false
            this.search()
          } else {
            this.$message({
              message: '对不起，保存失败!',
              type: 'error'
            })
          }
        })
      },
      reset (name) {
        this.$refs[name].resetFields()
        this.dialogVisible = false
      },
      search () {
        server.serverSearch().then(res => {
          this.serverList = res.data.data
        })
      },
      goDetail (id) {
        console.log(id)
      },
      removeClick (id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.serverRemove(id)
        }).catch(() => {})
      },
      serverRemove (id) {
        server.serverRemove({
          id: id
        }).then(res => {
          if (res.data.data) {
            this.$message({
              message: '恭喜你，删除成功!',
              type: 'success'
            })
            this.search()
          } else {
            this.$message({
              message: '恭喜你，删除失败!',
              type: 'error'
            })
          }
        })
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

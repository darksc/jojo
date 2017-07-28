<template lang="pug">
  .server-wrap
    .breadcrumb-wrap
      el-breadcrumb(separator="/")
        el-breadcrumb-item(v-bind:to="{ path: '/' }") 首页
        el-breadcrumb-item(v-bind:to="{ path: '/server' }") 服务器
    .button-wrap
      el-button(type="primary" icon="plus" v-on:click="handleAdd()") 添加服务器

    el-row
      el-col(:span="8" v-for="(item, index) in serverList" v-bind:key="index")
        .card-wrap
          el-card(v-bind:body-style="{ padding: '0px' }")
            .card-content
              .card-title(v-on:click="goDetail(item.id)") {{item.name}}
              .card-info
                .card-detail {{item.detail}}
                .card-line {{item.ip}}
                .card-line {{item.outIp | FormatNull}}
                .card-line {{item.user}}
                .card-line {{item.pass}}
              el-button.button(type="text" v-on:click="handleEdit(item)") 编辑
              el-button.button(type="text" v-on:click="handleRemove(item.id)") 删除

    el-dialog(title="添加服务器" v-model="dialogAddVisible" size="tiny" v-on:open="onOpen")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="addForm")
        el-form-item(label="代号" prop="name")
          el-input(v-model="form.name")
        el-form-item(label="介绍" prop="detail")
          el-input(v-model="form.detail")
        el-form-item(label="内网IP地址"  prop="ip")
          el-input(v-model="form.ip")
        el-form-item(label="外网IP地址"  prop="outIp")
          el-input(v-model="form.outIp")
        el-form-item(label="用户名"  prop="user")
          el-input(v-model="form.user")
        el-form-item(label="密码"  prop="pass")
          el-input(v-model="form.pass")
        el-form-item
          el-button(type="primary" v-on:click="handleSave()") 保存
          el-button(v-on:click="cancel()") 取消

    el-dialog(title="编辑服务器" v-model="dialogEditVisible" size="tiny" v-on:close="onClose")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="editForm")
        input(type="hidden" v-model="form.id")
        el-form-item(label="代号")
          el-input(v-model="form.name" v-bind:disabled="true")
        el-form-item(label="介绍" prop="detail")
          el-input(v-model="form.detail")
        el-form-item(label="内网IP地址"  prop="ip")
          el-input(v-model="form.ip")
        el-form-item(label="外网IP地址"  prop="outIp")
          el-input(v-model="form.outIp")
        el-form-item(label="用户名"  prop="user")
          el-input(v-model="form.user")
        el-form-item(label="密码"  prop="pass")
          el-input(v-model="form.pass")
        el-form-item
          el-button(type="primary" v-on:click="editClick()") 保存
          el-button(v-on:click="cancel()") 取消
</template>
<script>
  import * as server from '../store/server'
  import { appRouter } from '../router/'
  import formMixin from '../mixin/formMixin'

  let usertimer
  export default {
    data () {
      let validateName = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]{1,10}$/
        if (value === '') {
          callback(new Error('请输入代号'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~10个字符，包含字母、数字）'))
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
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/
        if (value === '') {
          callback(new Error('请输入介绍'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~20个字符，包含中文、字母、数字）'))
          } else {
            callback()
          }
        }
      }

      let validateIp = (rule, value, callback) => {
        let reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/
        if (value === '') {
          callback(new Error('请输入IP地址'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（请输入正确的IP地址）'))
          } else {
            callback()
          }
        }
      }

      let validateUser = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_]{3,16}$/
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（3~16个字符，包含字母、数字、下划线）'))
          } else {
            callback()
          }
        }
      }

      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        serverList: [],
        noneForm: {
          id: '',
          name: '',
          detail: '',
          ip: '',
          outIp: '',
          user: '',
          pass: ''
        },
        form: {
          id: '',
          name: '',
          detail: '',
          ip: '',
          outIp: '',
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
          outIp: [
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
    mixins: [formMixin],
    mounted () {
      this.search()
    },
    methods: {
      search () {
        server.serverSearch().then(res => {
          this.serverList = res.data.data
        })
      },
      goDetail (id) {
        appRouter.push({name: 'detail', query: {id: id}})
      },
      save () {
        server.serverSave(this.form).then(res => {
          this.showMessage(res.data.data, '保存')
        })
      },
      remove (id) {
        server.serverRemove({
          id: id
        }).then(res => {
          this.showMessage(res.data.data, '删除')
        })
      },
      editClick () {
        server.serverUpdate(this.form).then(res => {
          this.showMessage(res.data.data, '修改')
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
        transition: .3s
        &:hover
          cursor: pointer
          color: #20a0ff
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

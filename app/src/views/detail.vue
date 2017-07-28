<template lang="pug">
  .detail-wrap
    .breadcrumb-wrap
      el-breadcrumb(separator="/")
        el-breadcrumb-item(v-bind:to="{ path: '/' }") 首页
        el-breadcrumb-item(v-bind:to="{ path: '/server' }") 服务器
        el-breadcrumb-item {{server.name}}

    el-alert(v-bind:title="`${server.name} - ${server.detail}`" type="success" v-bind:closable="false")
      .el-alert__description {{server.ip}}, {{server.outIp | FormatNull}}, {{server.user}}, {{server.pass}}
    .detail-button-wrap
      el-button(type="primary" icon="plus" v-on:click="handleAdd()") 添加端口

    .detail-table-wrap
      el-table(v-bind:data="tableData" border style="width: 100%")
        el-table-column(prop="name" label="名称" width="180")
        el-table-column(prop="port" label="端口" width="180")
        el-table-column(prop="type" label="类型" width="180")
        el-table-column(prop="info" label="描述 ")
        el-table-column(label="操作" width="135")
          template(scope="scope")
            el-button(size="small" v-on:click="handleEdit(scope.row)") 编辑
            el-button(size="small" type="danger" v-on:click="handleRemove(scope.row.id)") 删除

    el-dialog(title="添加端口" v-model="dialogAddVisible" size="tiny" v-on:open="onOpen")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="addForm")
        el-form-item(label="名称" prop="name")
          el-input(v-model="form.name")
        el-form-item(label="端口" prop="port")
          el-input(v-model="form.port")
        el-form-item(label="类型"  prop="type")
          el-input(v-model="form.type")
        el-form-item(label="描述"  prop="info")
          el-input(type="textarea" v-model="form.info")
        el-form-item
          el-button(type="primary" v-on:click="handleSave()") 保存
          el-button(v-on:click="cancel()") 取消

    el-dialog(title="编辑端口" v-model="dialogEditVisible" size="tiny" v-on:close="onClose")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="editForm")
        input(type="hidden" v-model="form.id")
        el-form-item(label="名称")
          el-input(v-model="form.name" v-bind:disabled="true")
        el-form-item(label="端口" prop="port")
          el-input(v-model="form.port")
        el-form-item(label="类型"  prop="type")
          el-input(v-model="form.type")
        el-form-item(label="描述"  prop="info")
          el-input(type="textarea" v-model="form.info")
        el-form-item
          el-button(type="primary" v-on:click="editClick()") 保存
          el-button(v-on:click="cancel()") 取消
</template>
<script>
  import * as server from '../store/server'
  import formMixin from '../mixin/formMixin'

  let usertimer
  export default {
    data () {
      let validateName = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]{1,6}$/
        if (value === '') {
          callback(new Error('请输入名称'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（1~6个字符，包含字母、数字）'))
          } else {
            clearTimeout(usertimer)
            usertimer = setTimeout(() => {
              server.portCheckName({
                name: value
              }).then(res => {
                if (res.data.data === true) {
                  callback()
                } else {
                  callback(new Error('该名称已存在'))
                }
              })
            }, 500)
          }
        }
      }

      let validatePort = (rule, value, callback) => {
        let reg = /^[0-9,]*$/
        if (value === '') {
          callback(new Error('请输入端口'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（值能是数字,多个之间用 , 隔开）'))
          } else {
            callback()
          }
        }
      }

      let validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入类型'))
        } else {
          callback()
        }
      }

      let validateInfo = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入描述'))
        } else {
          callback()
        }
      }
      return {
        serverId: '',
        server: {},
        noneForm: {
          id: '',
          name: '',
          port: '',
          type: '',
          info: '',
          serverId: ''
        },
        form: {
          id: '',
          name: '',
          port: '',
          type: '',
          info: '',
          serverId: ''
        },
        formRules: {
          name: [
            { validator: validateName, required: true, trigger: 'change' }
          ],
          port: [
            { validator: validatePort, required: true, trigger: 'change' }
          ],
          type: [
            { validator: validateType, required: true, trigger: 'change' }
          ],
          info: [
            { validator: validateInfo, required: true, trigger: 'change' }
          ]
        },
        tableData: []
      }
    },
    mixins: [formMixin],
    mounted () {
      this.serverId = this.$route.query.id
      this.getServer(this.serverId)
      this.search(this.serverId)
    },
    methods: {
      getServer (id) {
        server.serverSearchById({
          id: id
        }).then(res => {
          if (res.data.code === 200) {
            this.server = res.data.data
          }
        })
      },
      search (serverId) {
        server.portSearch({
          serverId: serverId
        }).then(res => {
          this.tableData = res.data.data
        })
      },
      save () {
        this.form.serverId = this.serverId
        server.portSave(this.form).then(res => {
          this.showMessage(res.data.data, '保存')
        })
      },
      remove (id) {
        server.portRemove({
          id: id
        }).then(res => {
          this.showMessage(res.data.data, '删除')
        })
      },
      editClick () {
        server.portUpdate(this.form).then(res => {
          this.showMessage(res.data.data, '修改')
        })
      }
    }
  }
</script>
<style lang="sass">
  .detail-wrap
    .el-alert__title
      display: inline-block
      margin-top: 5px
      font-size: 18px
    .el-alert__description
      margin-top: 10px
      font-size: 16px
    .detail-button-wrap
      margin: 20px 0

</style>

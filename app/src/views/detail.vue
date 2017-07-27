<template lang="pug">
  .detail-wrap
    .breadcrumb-wrap
      el-breadcrumb(separator="/")
        el-breadcrumb-item(v-bind:to="{ path: '/' }") 首页
        el-breadcrumb-item(v-bind:to="{ path: '/server' }") 服务器
        el-breadcrumb-item {{server.name}}

    el-alert(v-bind:title="`${server.name} - ${server.detail}`" type="success" v-bind:description="`${server.ip}, ${server.user}, ${server.pass}`" v-bind:closable="false")

    .detail-button-wrap
      el-button(type="primary" icon="plus" v-on:click="dialogVisible = true") 添加端口

    .detail-table-wrap
      el-table(v-bind:data="tableData" border style="width: 100%")
        el-table-column(prop="name" label="名称" width="180")
        el-table-column(prop="port" label="端口" width="180")
        el-table-column(prop="type" label="类型" width="180")
        el-table-column(prop="info" label="描述 ")
        el-table-column(label="操作" width="190")
          template(scope="scope")
            el-button(size="small" v-on:click="handleSearch(scope.$index, scope.row)") 查看
            el-button(size="small" v-on:click="handleEdit(scope.$index, scope.row)") 编辑
            el-button(size="small" type="danger" v-on:click="handleRemove(scope.row)") 删除

    el-dialog(title="添加端口" v-model="dialogVisible" size="tiny")
      el-form(v-bind:model="form" v-bind:rules="formRules" ref="addForm")
        el-form-item(label="名称" prop="name")
          el-input(v-model="form.name")
        el-form-item(label="端口" prop="port")
          el-input(v-model="form.port")
        el-form-item(label="类型"  prop="type")
          el-input(v-model="form.type")
        el-form-item(label="描述"  prop="info")
          el-input(v-model="form.info")
        el-form-item
          el-button(type="primary" v-on:click="saveClick()") 保存
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
        let reg = /^[0-9]*$/
        if (value === '') {
          callback(new Error('请输入端口'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('（值能是数字）'))
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
        dialogVisible: false,
        form: {
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
        tableData: [{
          name: '什么什么',
          port: '8001',
          type: 'nginx',
          info: '很长很长的描述信息'
        }]
      }
    },
    mounted () {
      this.serverId = this.$route.query.id
      this.getServer(this.serverId)
      this.getPort(this.serverId)
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
      getPort (serverId) {
        server.portSearch({
          serverId: serverId
        }).then(res => {
          this.tableData = res.data.data
        })
      },
      saveClick () {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.save()
          } else {
            return false
          }
        })
      },
      save () {
        this.form.serverId = this.serverId
        server.portSave(this.form).then(res => {
          if (res.data.data) {
            this.$message({
              message: '恭喜你，保存成功!',
              type: 'success'
            })
            this.$refs['addForm'].resetFields()
            this.dialogVisible = false
            this.getPort(this.serverId)
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
      handleRemove (row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.portRemove(row.id)
        }).catch(() => {})
      },
      portRemove (id) {
        server.portRemove({
          id: id
        }).then(res => {
          if (res.data.data) {
            this.$message({
              message: '恭喜你，删除成功!',
              type: 'success'
            })
            this.getPort(this.serverId)
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

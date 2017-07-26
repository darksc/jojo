<template lang="pug">
  .detail-wrap
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
            el-button(size="small" v-on:click="handleEdit(scope.$index, scope.row)") 查看
            el-button(size="small" v-on:click="handleEdit(scope.$index, scope.row)") 编辑
            el-button(size="small" type="danger" v-on:click="handleEdit(scope.$index, scope.row)") 删除

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
  export default {
    data () {
      return {
        serverId: '',
        server: {},
        dialogVisible: false,
        form: {
          name: '',
          port: '',
          type: '',
          info: ''
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
      reset (name) {
        this.$refs[name].resetFields()
        this.dialogVisible = false
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

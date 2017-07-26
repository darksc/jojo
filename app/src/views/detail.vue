<template lang="pug">
  .detail-wrap
    .detail-button-wrap
      el-button(type="primary" icon="plus") 添加端口

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
</template>
<script>
  export default {
    data () {
      return {
        tableData: [{
          name: '什么什么',
          port: '8001',
          type: 'nginx',
          info: '很长很长的描述信息'
        }]
      }
    },
    mounted () {
      console.log(this.$route.query)
    }
  }
</script>
<style lang="sass">
  .detail-wrap
    .detail-button-wrap
      margin: 0 0 20px

</style>

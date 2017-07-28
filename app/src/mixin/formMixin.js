export default {
  data () {
    return {
      dialogAddVisible: false,
      dialogEditVisible: false
    }
  },
  methods: {
    onOpen () {
      let addForm = this.$refs['addForm']
      if (addForm !== undefined) {
        addForm.resetFields()
      }
    },
    reset () {
      this.form = JSON.parse(JSON.stringify(this.noneForm))
    },
    cancel () {
      this.reset()
      this.dialogAddVisible = false
      this.dialogEditVisible = false
    },
    handleAdd () {
      this.dialogAddVisible = true
      this.reset()
    },
    handleEdit (item) {
      this.dialogEditVisible = true
      this.form = item
    },
    handleSave () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    handleRemove (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.remove(id)
      }).catch(() => {})
    }
  }
}

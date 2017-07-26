<template>
  <div class="left-wrap">
    <div class="server-wrap">
      <span>服务切换</span>
      <el-radio-group v-model="server">
        <el-radio-button label="node"></el-radio-button>
        <el-radio-button label="sde"></el-radio-button>
      </el-radio-group>
    </div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top" label-width="80px">
      <el-form-item label="路线名称" prop="lxbm">
        <el-autocomplete v-model="form.lxbm"
                         popper-class="my-autocomplete"
                         custom-item="my-item-zh"
                         placeholder="如: G15"
                         :fetch-suggestions="querySearchAsync"
                         @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item label="路线方向" prop="sxxfx">
        <el-select v-model="form.sxxfx" placeholder="请选择方向">
          <el-option label="上行" value="1"></el-option>
          <el-option label="下行" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-card class="box-card">
          <div class="text item">
            桩号范围:
          </div>
          <div class="text item">
            {{qdzh}} - {{zdzh}}
          </div>
        </el-card>
      </el-form-item>
      <el-form-item label="起点桩号" prop="qdzh">
        <el-input v-model="form.qdzh"
                  placeholder="如: 12.5"></el-input>
      </el-form-item>
      <el-form-item label="止点桩号" prop="zdzh">
        <el-input v-model="form.zdzh"
                  placeholder="如: 13.5"></el-input>
      </el-form-item>
      <el-form-item class="button-wrap">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Loading} from 'element-ui'
  import * as api from '../store/api'
  Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item
      return h('li', ctx.data, [
        h('div', {attrs: {class: 'one'}}, [item.code]),
        h('span', {attrs: {class: 'two'}}, [item.name])
      ])
    },
    props: {
      item: {type: Object, required: true}
    }
  })

  var timer = null

  export default {
    name: 'dtfd',
    data () {
      return {
        qdzh: 0,
        zdzh: 0,
        server: 'node',
        form: {
          lxbm: '',
          sxxfx: '',
          qdzh: '',
          zdzh: ''
        },
        rules: {
          lxbm: [
            {required: true, message: '请输入路线名称', trigger: 'change'}
          ],
          sxxfx: [
            {required: true, message: '请选择路线方向', trigger: 'change'}
          ],
          qdzh: [
            {required: true, message: '请输入起点桩号', trigger: 'change'}
          ],
          zdzh: [
            {required: true, message: '请输入止点桩号', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      querySearchAsync (queryString, cb) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          api.auto({
            lxbm: queryString
          }).then(res => {
            cb(res.data.data)
          })
        }, 500)
      },
      handleSelect (item) {
        this.form.lxbm = item.code
        this.qdzh = item.qdzh
        this.zdzh = item.zdzh
      },
      onSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this[this.server + 'Server']()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      nodeServer () {
        let loadingService = Loading.service({fullscreen: true})
        api.dtfd({
          lxbm: this.form.lxbm,
          sxxfx: this.form.sxxfx,
          qdzh: this.form.qdzh,
          zdzh: this.form.zdzh
        }).then(res => {
          loadingService.close()
          let line = res.data.data
          line.attributes.style = {
            stroke: {
              strokeWidth: 10,
              strokeColor: '#1cb0ee'
            }
          }
          this.addLine(line)
          this.$message({
            message: '查询成功！',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          loadingService.close()
          this.$message.error('查询出错！')
        })
      },
      sdeServer () {
        let loadingService = Loading.service({fullscreen: true})
        api.sdeDtfd({
          layerName: 'gis_luxian',
          filter: 'LXBM=\'' + this.form.lxbm + '\' AND ' + 'SXXFX=' + this.form.sxxfx,
          startPos: this.form.qdzh,
          endPos: this.form.zdzh
        }).then(res => {
          loadingService.close()
          this.addLines(res.data.data.features)
          this.$message({
            message: '查询成功！',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          loadingService.close()
          this.$message.error('查询出错！')
        })
      },
      addLine (data) {
        window.Maps.removeFeatureByLayerName('node')
        window.Maps.addPolyline(data, {
          layerName: 'node',
          zoomToExtent: true
        })
      },
      addLines (data) {
        window.Maps.removeFeatureByLayerName('sde')
        window.Maps.addPolylines(data, {
          layerName: 'sde',
          zoomToExtent: true
        })
      }
    }
  }
</script>

<style lang="sass">
</style>

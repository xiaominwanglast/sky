<template>
  <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="测试人员"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="headman"
      label="组长"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="task"
      label="任务名称"
      width="450">
    </el-table-column>
    <el-table-column
      prop="content"
      label="钉钉信息"
      width="700">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'alert.vue',
    data(){
      return{
        tableData: [{
          date: '2019-05-02',
          name: '秦升',
          headman:'陈参',
          task:"人力资源整合优化v3.1.1",
          content:"@陈参@秦升 人力资源整合优化v3.1.1-上线状态未更新，请及时更新",
          status: '待更新'
        }, {
          date: '2019-09-04',
          name: '秦升',
          headman:'陈参',
          task:"人力资源整合优化v3.1.1",
          content:"@陈参@秦升 人力资源整合优化v3.1.1-上线状态未更新，请及时更新",
          status: '已更新'
        }, {
          date: '2019-09-01',
          name: '王孝敏',
          headman:'赵娜娜',
          task:"信息流3.0上线需求配合20191206",
          content:"@赵娜娜@王孝敏 信息流3.0上线需求配合20191206-上线状态未更新，请及时更新",
          status: '待更新'
        }, {
          date: '2019-12-03',
          name: '王孝敏',
          headman:'赵娜娜',
          task:"信息流3.0上线需求配合20191206",
          content:"@赵娜娜@王孝敏 信息流3.0上线需求配合20191206-上线状态未更新，请及时更新",
          status: '已更新'
        }]
      }
    }
  }
</script>

<style scoped>
  .header-cell-style {
    background:#eef1f6;
    color:#606266
  }
</style>

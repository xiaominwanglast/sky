<template>
    <div>
        <div>
            <el-date-picker
                    v-model="value2"
                    type="monthrange"
                    align="right"
                    value-format="yyyy-MM-dd"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" @click="taskSearch"  style="margin-left: 20px">搜索</el-button>
            <el-button type="primary" @click="open" style="right: 28px;position: absolute;">新增线上bug</el-button>
        </div>
        <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 10px">
            <!--                v-loading="false"-->

            <el-table-column prop="team" label="测试组" fixed width="140">
            </el-table-column>
            <el-table-column prop="project" label="项目" width="200">
            </el-table-column>
            <el-table-column prop="troubletype" label="事故定级" width="200">
            </el-table-column>
            <el-table-column prop="troubledesc" label="问题概述" width="800">
            </el-table-column>
            <el-table-column prop="mainside" label="主责方" width="150">
            </el-table-column>
            <el-table-column prop="otherside" label="次责方" width="150">
            </el-table-column>
            <el-table-column prop="troubletime" label="事故时间" width="100">
            </el-table-column>
            <el-table-column prop="effacttime" label="线上影响时间" width="200">
            </el-table-column>
            <el-table-column prop="effactusercnt" label="影响用户量" width="100">
            </el-table-column>
            <el-table-column prop="effactmoney" label="影响金额" width="90" >
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="160" >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="90">
                <template slot-scope="scope">
                    <el-button @click="handelEdit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteClick(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :title="titleMap[dialogStatus]"
                :visible.sync="dialogFormVisible"  style="width:auto">
            <el-form :model="form">
                <el-form-item label="测试组" >
                    <div style="float: left;width: 180px;padding-left: 66px;">
                        <el-select v-model="form.team" placeholder="请选择" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-tag v-model="form.id" auto-complete="off" v-show="false">id</el-tag>
                    </div>
                </el-form-item>
                <el-form-item label="项目" >
                    <div style="float: left;width: 300px;padding-left: 80px;">
                        <el-input v-model="form.project" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="事故定级">
                    <div style="float: left;width: 120px;padding-left: 53px;">
                        <el-select v-model="form.troubletype" placeholder="请选择" >
                            <el-option
                                    v-for="item in troubleoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="主责方">
                    <div style="float: left;padding-left: 68px;width: 200px">
                        <el-select v-model="form.mainside" multiple placeholder="请选择人员">
                            <el-option
                                    v-for="item in sideOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="次责方">
                    <div style="float: left;padding-left: 68px;width: 200px">
                        <el-select v-model="form.otherside" multiple placeholder="请选择人员">
                            <el-option
                                    v-for="item in sideOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="事故时间">
                    <div style="padding-left: 122px">
                        <el-date-picker
                                v-model="form.troubletime"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="线上影响时间" >
                    <div style="float: left;width: 200px;padding-left: 26px;">
                        <el-input v-model="form.effacttime" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="影响金额" >
                    <div style="float: left;width: 200px;padding-left: 54px;">
                        <el-input v-model="form.effactmoney" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="问题概述">
                    <div style="float: left;padding-left: 54px;width: 500px">
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="请填写问题描述"
                                v-model="form.troubledesc">
                        </el-input>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPro(dialogFormVisible = false)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import {mapState, mapGetters} from 'vuex'
    import {getUserGroups} from '@/api/share'
    import {getBugList,addBug,putBug,deleteBug} from '@/api/bugcollect'
    export  default {
        name: "bugcollect",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value2: '',

                //测试人员类型-默认值
                sideOptions: [
                    {
                        value: '产品',
                        label: '产品'
                    }, {
                        value: '测试',
                        label: '测试'
                    }, {
                        value: '开发',
                        label: '开发'
                    },
                    {
                        value: ' -',
                        label: ' -'},
                ],
                //事故定级-默认值
                troubleoptions: [
                    {
                        value: '一般缺陷',
                        label: '一般缺陷'
                    }, {
                        value: '严重缺陷',
                        label: '严重缺陷'
                    }, {
                        value: '轻微缺陷',
                        label: '轻微缺陷'
                    }],

                //组选择
                options: [],

                dialogFormVisible:false,

                //弹框样式
                form:{
                    id:'',
                    team: '',
                    project: '',
                    troubletype:"",
                    troubledesc:"",
                    mainside:"",
                    otherside:"",
                    troubletime:"",
                    effacttime:"",
                    effactusercnt:"",
                    effactmoney:"",
                },

                //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
                titleMap: {
                    addEquipment:'新增线上bug',
                    editEquipment: "编辑线上bug"
                },
                //新增和编辑弹框标题
                dialogStatus: "",

                //任务数据
                tableData: [],
            }
        },
        methods: {
            taskSearch(){
                if(this.value2=='' || this.value2==null){
                    this.getBugList(0,0);
                    return
                }
                this.getBugList(this.value2[0],this.value2[1])
            },

            submitPro(dialogFormVisible){
                if (this.dialogStatus==="addEquipment"){
                    addBug(this.form).then(res =>{
                        this.getBugList(0,0);
                        this.form={
                            id:'',
                            team: '',
                            project: '',
                            troubletype:"",
                            troubledesc:"",
                            mainside:"",
                            otherside:"",
                            troubletime:"",
                            effacttime:"",
                            effactusercnt:"",
                            effactmoney:"",
                        };
                        this.$message({
                            type: 'success',
                            message: "bug新建成功"
                        });
                    });
                }
                else {
                    console.log(this.form)
                    putBug(this.form).then(res =>{
                        this.getBugList(0,0);
                    })
                }
            },
            //新增
            open() {
                this.form={
                    team: '',
                    project: '',
                    troubletype:"",
                    troubledesc:"",
                    mainside:"",
                    otherside:"",
                    troubletime:"",
                    effacttime:"",
                    effactusercnt:"",
                    effactmoney:"",
                };

                //显示弹框
                this.dialogFormVisible = true;
                //新增弹框标题
                this.dialogStatus = "addEquipment";
            },
            //编辑
            handelEdit(index,row) {
                //显示弹框
                this.dialogFormVisible = true;
                //编辑弹框标题
                this.dialogStatus = "editEquipment";

                this.form={
                    id:row.id,
                    team: row.team,
                    project: row.project,
                    troubletype:row.troubletype,
                    troubledesc:row.troubledesc,
                    mainside:row.mainside.split(','),
                    otherside:row.otherside.split(','),
                    troubletime:row.troubletime,
                    effacttime:row.effacttime,
                    effactusercnt:row.effactusercnt,
                    effactmoney:row.effactmoney,
                };
            },

            deleteClick(index,row){
                console.log(index,row)
                this.$alert('确认删除此条记录！', '删除提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(row);
                        if (action==="confirm"){
                            deleteBug(row.id).then(res =>{
                                this.getBugList(0,0);
                            });
                            this.$message({
                                type: 'success',
                                message: `删除成功`
                            });
                        }else {
                            this.$message({
                                type: 'info',
                                message: `取消删除`
                            });
                        }
                    }
                });
            },

            //合并单元格属性
            objectSpanMethod ({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 1 || columnIndex === 0) {
                    // 当前行与上一行内容相同时 返回0 0 意味消除
                    if(rowIndex > 0 && row[column.property] === this.tableData[rowIndex - 1][column.property]){
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }else{
                        let rows = 1;
                        // 反之查询相同的内容有多少行 进行合并
                        for(let i = rowIndex; i < this.tableData.length - 1; i++){
                            if (row[column.property] === this.tableData[i + 1][column.property]) {
                                rows++;
                            }
                        }
                        // 返回相同内容的行数
                        return {
                            rowspan: rows,
                            colspan: 1
                        };
                    }
                }
            },

            //获取组信息
            getUserGroups() {
                getUserGroups().then(res => {
                    this.number = res.data.max_number;
                    this.getUserGroupsList = res.data.data;
                    this.getUserGroupsList.forEach(element => {
                        if (element.grade===this.number){
                            this.options.push({"value": element.department, "label": element.department})
                        }
                    });
                })
            },



            getBugList(value1,value2){
                getBugList(value1,value2).then(res =>{
                    this.tableData =res.data.data
                })
            },
        },
        // computed: {
        //     ...mapGetters([
        //         'departmentthird'
        //     ]),
        // },
        created() {
            this.getUserGroups();
            this.getBugList(0,0);
        }
    }
</script>
<style>
    .el-dialog__body{
        padding: 0 20px;
    }
</style>

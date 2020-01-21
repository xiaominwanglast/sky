<template>
    <div>
        <div>
            <el-select v-model="groupvalue" clearable placeholder="请选择组" style="width: 180px">
                <el-option
                        v-for="item in groupOptionsAll"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                    v-model="timevalue"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="选择月份"
                    style="padding-left:5px;width: 120px">
            </el-date-picker>
            <el-button type="primary" @click="taskSearch" style="margin-left: 20px">搜索</el-button>
            <el-button type="primary" @click="open" style="right: 28px;position: absolute;">新增任务</el-button>
        </div>
        <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 10px">
            <el-table-column prop="team" label="项目" fixed width="120">
            </el-table-column>
            <el-table-column prop="project" label="大类" fixed width="150">
            </el-table-column>
            <el-table-column prop="taskName" label="任务名称" fixed width="200">
                <template slot-scope="scope">
                    <img v-show="scope.row.taskStatus=='已上线'" :src="yesicon"/>{{scope.row.taskName}}
                </template>
            </el-table-column>
            <el-table-column prop="taskLink" label="任务链接" width="400">
                <template slot-scope="scope">
                    <a :href="scope.row.taskLink"
                       target="_blank"
                       class="buttonText">{{scope.row.taskLink}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="subTestTime" label="提测时间" width="100">
            </el-table-column>
            <el-table-column prop="devTime" label="开发时间" width="180">
                <template slot-scope="scope">
                    {{scope.row.devTime.split(',')[0].replace('-','.').replace('-','.').substring(0,10)}}-{{scope.row.devTime.split(',')[1].replace('-','.').replace('-','.').substring(0,10)}}
                </template>
            </el-table-column>
            <el-table-column prop="oldTestTime" label="原测试时间" width="180">
                <template slot-scope="scope">
                    {{scope.row.oldTestTime.split(',')[0].replace('-','.').replace('-','.').substring(0,10)}}-{{scope.row.oldTestTime.split(',')[1].replace('-','.').replace('-','.').substring(0,10)}}
                </template>
            </el-table-column>
            <el-table-column prop="newTestTime" label="调整后测试时间" width="180">
                <template slot-scope="scope">
                    {{scope.row.newTestTime.split(',')[0].replace('-','.').replace('-','.').substring(0,10)}}-{{scope.row.newTestTime.split(',')[1].replace('-','.').replace('-','.').substring(0,10)}}
                </template>
            </el-table-column>
            <el-table-column prop="onlineTime" label="上线时间" width="100">
            </el-table-column>
            <el-table-column prop="testPerson" label="测试人员" width="200">
            </el-table-column>
            <el-table-column prop="taskStatus" label="任务状态" width="100">
            </el-table-column>
            <el-table-column prop="importance" label="重点工作" width="90">
                <template slot-scope="scope">
                    <div v-if="scope.row.importance==1" style="text-align: center">是</div>
                    <div v-else style="text-align: center">否</div>
                </template>
            </el-table-column>
            <el-table-column prop="tag" label="备注" width="400">
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
        <div class="block">
            <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="taskCount">
            </el-pagination>
        </div>
        <el-dialog
                :title="titleMap[dialogStatus]"
                :visible.sync="dialogFormVisible" style="width:auto">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="项目">
                    <div>
                        <div style="float: left;width: 170px;padding-left: 80px;">
                            <el-select v-model="form.team" placeholder="请选择">
                                <el-option
                                        v-for="item in groupOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="float: left;padding-left: 120px;">
                            <span style="color: crimson">是否重点工作：</span>
                            <el-radio v-model="form.importance" label="1">重点工作</el-radio>
                            <el-radio v-model="form.importance" label="0">非重点工作</el-radio>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="大类" prop="project">
                    <div style="float: left;width: 300px;padding-left: 70px;">
                        <el-input v-model="form.project" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="任务名称" prop="taskName">
                    <div style="float: left;width: 300px;padding-left: 42px;">
                        <el-input v-model="form.taskName" auto-complete="off" :disabled="dialogStatus=='addEquipment'?false:true"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="任务链接">
                    <div style="float: left;padding-left: 52px;width: 500px">
                        <el-input v-model="form.taskLink" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="提测时间">
                    <div style="padding-left: 120px">
                        <el-date-picker
                                v-model="form.subTestTime"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="开发时间" prop="devTime">
                    <div style="padding-left: 120px" >
                        <el-date-picker
                                v-model="form.devTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '00:00:00']">
                        </el-date-picker>
                        <!--                        <el-date-picker-->
                        <!--                                v-model="form.oldTestTime"-->
                        <!--                                value-format="yyyy-MM-dd"-->
                        <!--                                type="daterange"-->
                        <!--                                range-separator="至"-->
                        <!--                                start-placeholder="开始日期"-->
                        <!--                                end-placeholder="结束日期">-->
                        <!--                        </el-date-picker>-->
                    </div>
                </el-form-item>
                <el-form-item label="原测试时间" prop="oldTestTime">
                    <div style="padding-left: 120px">
                        <el-date-picker
                                v-model="form.oldTestTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :disabled="dialogStatus=='addEquipment'?false:true"
                                :default-time="['00:00:00', '00:00:00']">
                        </el-date-picker>
<!--                        <el-date-picker-->
<!--                                v-model="form.oldTestTime"-->
<!--                                value-format="yyyy-MM-dd"-->
<!--                                type="daterange"-->
<!--                                range-separator="至"-->
<!--                                start-placeholder="开始日期"-->
<!--                                end-placeholder="结束日期">-->
<!--                        </el-date-picker>-->
                    </div>
                </el-form-item>
                <el-form-item label="调整后测试时间" prop="newTestTime">
                    <div style="padding-left: 120px">
                        <el-date-picker
                                v-model="form.newTestTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '00:00:00']">
                        </el-date-picker>
<!--                        <el-date-picker-->
<!--                                v-model="form.newTestTime"-->
<!--                                value-format="yyyy-MM-dd"-->
<!--                                type="daterange"-->
<!--                                range-separator="至"-->
<!--                                start-placeholder="开始日期"-->
<!--                                end-placeholder="结束日期">-->
<!--                        </el-date-picker>-->
                    </div>
                </el-form-item>
                <el-form-item label="上线时间" prop="onlineTime">
                    <div style="padding-left: 120px">
                        <el-date-picker
                                v-model="form.onlineTime"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="测试人员" prop="testPerson">
                    <div style="float: left;padding-left: 43px;width: 200px">
                        <el-select v-model="form.testPerson" multiple placeholder="请选择人员" @focus="getUsersFromGroup(form.team)">
                            <el-option
                                    v-for="item in personOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="任务状态">
                    <div style="float: left;padding-left: 52px;width: 200px">
                        <el-select v-model="form.taskStatus" placeholder="请选择">
                            <el-option
                                    v-for="item in statusOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="备注">
                    <div style="float: left;padding-left: 80px;width: 500px">
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入备注信息"
                                v-model="form.tag">
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
    import yesicon from '../../../assets/icon-yes.svg'
    import noicon from '../../../assets/icon-no.svg'
    // import {mapState, mapGetters} from 'vuex'
    import {getUserList,getUserGroups} from '@/api/share'
    import {addTask,putTask,getTask,deleteTask,checkTask} from '@/api/task'

    export default {
        name: "abort",
        data() {
            return {
                currentPage:1,
                pageSize:15,
                taskCount:100,

                yesicon: yesicon,
                noicon: noicon,
                //组筛选
                groupOptions: [],
                groupOptionsAll:[],

                groupvalue: '',
                //筛选时间
                timevalue: '',
                //任务状态
                statusOptions: [
                    {
                        value: '测试完成',
                        label: "测试完成"
                    }, {
                        value: '测试中',
                        label: "测试中"
                    },
                    {
                        value: '待测试',
                        label: "待测试"
                    },
                    {
                        value: '待提测',
                        label: "待提测"
                    },
                    {
                        value: '已上线',
                        label: "已上线"
                    },
                    {
                        value: '暂停测试',
                        label: "暂停测试"
                    }
                ],
                //测试人员选择
                personOptions: [],
                dialogFormVisible: false,

                //弹框样式
                form: {
                    team: "",
                    project: "",
                    taskName: "",
                    taskLink: "",
                    subTestTime: "",
                    devTime:"",
                    oldTestTime: "",
                    newTestTime: "",
                    onlineTime: "",
                    testPerson: "",
                    taskStatus: "",
                    tag: "",
                    importance: ""
                },

                rules:{
                    project:[{required: true, message: "请填写项目名", trigger: 'blur'}],
                    taskName:[{required: true, message: "请填写任务名", trigger: 'blur'}],
                    devTime:[{required: true, message: "请填写开发时间", trigger: 'blur'}],
                    oldTestTime:[{required: true, message: "请填写原测试时间", trigger: 'blur'}],
                    newTestTime:[{required: true, message: "不填写默认展示原测试时间", trigger: 'blur'}],
                    onlineTime:[{required: true, message: "请填写上线时间，确保不能小于测试时间最后一天", trigger: 'blur'}],
                    testPerson:[{required: true, message: "请选择测试人员，不能为空", trigger: 'blur'}],
                },

                //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
                titleMap: {
                    addEquipment: '新增任务',
                    editEquipment: "编辑任务"
                },
                //新增和编辑弹框标题
                dialogStatus: "",

                //任务数据
                tableData: []
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getTask(this.groupvalue,this.timevalue,this.currentPage,this.pageSize)
            },

            taskSearch() {
                if (this.timevalue === null) {
                    this.timevalue=''
                }
                this.currentPage=1; //搜索重置为1
                this.getTask(this.groupvalue,this.timevalue,this.currentPage,this.pageSize)
                // console.log(this.groupvalue);
                console.log(this.timevalue);
                // console.log(this.currentPage)
                // console.log(this.pageSize)
            },

            submitPro(dialogFormVisible) {
                if(this.form.devTime==null){
                    this.form.devTime=''
                }
                if(this.form.oldTestTime==null){
                    this.form.oldTestTime=''
                }
                if(this.form.newTestTime==null){
                    this.form.newTestTime=''
                }
                if(this.form.taskName===""){
                    this.$message({
                        type: 'warning',
                        message: "请填写任务名称！"
                    });
                    this.dialogFormVisible=true;
                    return;

                }
                if(this.form.testPerson===""){
                    this.$message({
                        type: 'warning',
                        message: "请选择测试人员，必须分配任务到人！"
                    });
                    this.dialogFormVisible=true;
                    return;
                }
                if(this.form.devTime===""){
                    this.$message({
                        type: 'warning',
                        message: "请选择开发时间！"
                    });
                    this.dialogFormVisible=true;
                    return;
                }
                if (this.dialogStatus==="addEquipment"){
                    checkTask(this.form.taskName).then(res =>{
                        let checkstatus=res.data.status;
                        if (checkstatus){
                            addTask(this.form).then(res =>{
                                this.currentPage=1; //新增任务 当页重置为1
                                if(res.data.status===false){
                                    this.$message({
                                        type: 'warning',
                                        message: "上线时间不能小于测试完成时间,请修改！"
                                    });
                                }else {
                                    this.$message({
                                        type: 'success',
                                        message: "任务创建成功"
                                    });
                                }
                                this.getTask(this.groupvalue,this.timevalue,this.currentPage,this.pageSize);
                            })
                        }else {
                            this.$message({
                                type: 'warning',
                                message: "任务名已存在，请更改后提交！"
                            });
                        }
                    })
                }
                else {
                    putTask(this.form).then(res =>{
                        this.currentPage=1; //修改任务 当页重置为1
                        if(res.data.status===false){
                            this.$message({
                                type: 'warning',
                                message: "上线时间不能小于测试完成时间,请修改！"
                            });
                        }else {
                            this.$message({
                                type: 'success',
                                message: "任务修改成功"
                            });
                        }
                        this.getTask(this.groupvalue,this.timevalue,this.currentPage,this.pageSize);
                    })
                }
            },
            //新增
            open() {
                //显示弹框
                this.dialogFormVisible = true;
                //新增弹框标题
                this.dialogStatus = "addEquipment";

                this.form={
                        team: "",
                        project: "",
                        taskName: "",
                        taskLink: "",
                        subTestTime: "",
                        devTime:"",
                        oldTestTime: "",
                        newTestTime: "",
                        onlineTime: "",
                        testPerson: "",
                        taskStatus: "",
                        tag: "",
                        importance: ""
                };
                if(this.form.devTime==null){
                    this.form.devTime=''
                }
                if(this.form.oldTestTime==null){
                    this.form.oldTestTime=''
                }
                if(this.form.newTestTime==null){
                    this.form.newTestTime=''
                }
            },
            //编辑
            handelEdit(index,row) {
                //显示弹框
                this.dialogFormVisible = true;
                //编辑弹框标题
                this.dialogStatus = "editEquipment"


                this.form={
                    team: row.team,
                    project: row.project,
                    taskName: row.taskName,
                    taskLink: row.taskLink,
                    subTestTime: row.subTestTime,
                    devTime: row.devTime.split(','),
                    oldTestTime: row.oldTestTime.split(','),
                    newTestTime: row.newTestTime.split(','),
                    onlineTime: row.onlineTime,
                    testPerson: row.testPerson.split(','),
                    taskStatus: row.taskStatus,
                    tag: row.tag,
                    importance: row.importance,
                }

            },

            deleteClick(index, row) {
                console.log(index,row)
                this.$alert('确认删除此条记录！', '删除提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(row);
                        if (action==="confirm"){
                            deleteTask(row.taskName).then(res =>{
                                this.getTask(this.groupvalue,this.timevalue,this.currentPage,this.pageSize);
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
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    // 当前行与上一行内容相同时 返回0 0 意味消除
                    if (rowIndex > 0 && row[column.property] === this.tableData[rowIndex - 1][column.property]) {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    } else {
                        let rows = 1;
                        // 反之查询相同的内容有多少行 进行合并
                        for (let i = rowIndex; i < this.tableData.length - 1; i++) {
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
                            this.groupOptions.push({"value": element.department, "label": element.department})
                        }
                        if(element.grade===this.number || element.grade===this.number-1){
                            this.groupOptionsAll.push({"value": element.department, "label": element.department})
                        }
                    });
                })
            },
            getUsersFromGroup(team){
                console.log(team);
                this.personOptions=[];
                getUserList(team).then(res => {
                    console.log(team);
                    this.personOptionsList = res.data.data;
                    console.log(this.personOptionsList);
                    this.personOptionsList.forEach(element =>{
                        this.personOptions.push({"value":element,"label":element})
                    });
                });
            },
            getTask(group,month,currentPage,pageSize){
                getTask(group,month,currentPage,pageSize).then(res =>{
                    this.tableData =res.data.data;
                    this.taskCount =res.data.count;
                })
            }
        },
        // computed: {
        //     ...mapGetters([
        //         'departmentthird'
        //     ]),
        // },
        mounted(){
            // console.log(window.screen.width);
            // console.log(window.screen.height)
            if(window.screen.width===1366 && window.screen.height===768){
                this.pageSize=10
            }else {
                this.pageSize=15
            }

        },
        created() {
            this.getUserGroups();
            // this.getGroupMember();
            this.getTask(this.groupvalue,this.timevalue,this.currentPage,this.pageSize)
        }
    }
</script>
<style>
    .el-dialog__body {
        padding: 0 20px;
    }
    .el-pagination{
        padding: 6px;
        text-align: right;
    }
    .el-table td, .el-table th{
        padding: 3px 0;
    }
</style>

<template>
    <div>
        <div>
            <el-button type="primary" @click="open" >新增分享</el-button>
        </div>
        <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 10px">
            <el-table-column prop="team" label="测试组" fixed width="200">
            </el-table-column>
            <el-table-column prop="shareperson" label="姓名" width="130">
            </el-table-column>
            <el-table-column prop="sharetime" label="分享时间" width="150">
            </el-table-column>
            <el-table-column prop="sharetitle" label="分享主题" width="500">
            </el-table-column>
            <el-table-column prop="shareaddress" label="分享地址" width="600">
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
                :visible.sync="dialogFormVisible" style="width:auto" >
            <el-form :model="form">
                <el-form-item label="测试组">
                    <div style="float: left;width: 180px;padding-left: 38px;">
                        <el-select v-model="form.team" placeholder="请选择" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="姓名">
                    <div style="float: left;padding-left: 52px;width: 200px">
                        <el-select v-model="form.shareperson" multiple placeholder="请选择人员" @focus="getUsersFromGroup(form.team)">
                            <el-option
                                    v-for="item in personOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="分享时间">
                    <div style="padding-left: 92px" >
                        <el-date-picker
                                v-model="form.sharetime"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期"
                                >
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="分享主题">
                    <div style="float: left;width: 450px;padding-left: 25px;">
                        <el-input v-model="form.sharetitle" auto-complete="off" :disabled="dialogStatus=='addEquipment'?false:true"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="分享地址">
                    <div style="float: left;width: 450px;padding-left: 25px;">
                        <el-input v-model="form.shareaddress" auto-complete="off"></el-input>
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
    import {getUserList,getUserGroups,getShareList,addShare,putShare,deleteShare,checkShare} from '@/api/share'
    export  default {
        name: "testshare",
        data() {
            return {
                //测试人员选择-初始化
                personOptions: [],

                //测试方选择-默认值
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
                        value: '',
                        label: ''
                    },
                ],

                //事故定级-默认值
                troubleoptions: [
                    {
                        value: '一般缺陷',
                        label: '一般缺陷'
                    },
                    {
                        value: '轻微缺陷',
                        label: '轻微缺陷'
                    },
                    {
                        value: '严重缺陷',
                        label: '严重缺陷'
                    }, ],

                //项目选择-初始化
                options: [],

                dialogFormVisible:false,

                //弹框样式
                form:{
                    team: '',
                    shareperson: '',
                    sharetime:"",
                    sharetitle:"",
                    shareaddress:"",
                },

                //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
                titleMap: {
                    addEquipment:'新增分享',
                    editEquipment: "编辑分享"
                },
                //新增和编辑弹框标题
                dialogStatus: "",
                //任务数据
                tableData: [],
            }
        },
        methods: {
            submitPro(dialogFormVisible){
                if (this.dialogStatus==="addEquipment"){
                    checkShare(this.form.sharetitle).then(res =>{
                        let checkstatus=res.data.status;
                        if (!checkstatus){
                            addShare(this.form).then(res =>{
                                this.getShareList();
                                this.form={
                                    team:'',
                                    shareperson:'',
                                    sharetime:"",
                                    sharetitle:"",
                                    shareaddress:"",
                                }
                                this.$message({
                                    type: 'success',
                                    message: `分享新建成功`
                                });
                            });
                        }else {
                            this.$message({
                                type: 'warning',
                                message: "分享主题已存在，请更改后提交！"
                            });
                        }
                    })
                }
                else {
                    console.log(this.form);
                    putShare(this.form).then(res =>{
                        this.getShareList();
                    })
                }
            },
            //新增
            open() {
                this.form={
                    team:'',
                    shareperson:'',
                    sharetime:"",
                    sharetitle:"",
                    shareaddress:"",
                };
                //显示弹框
                this.dialogFormVisible = true;
                //新增弹框标题
                this.dialogStatus = "addEquipment";
            },
            //编辑
            handelEdit(index,row) {
                this.form={
                    team: row.team,
                    shareperson: row.shareperson.split(','),
                    sharetime:row.sharetime,
                    sharetitle:row.sharetitle,
                    shareaddress:row.shareaddress,
                };
                // console.log(row.team);
                //显示弹框
                this.dialogFormVisible = true;
                //编辑弹框标题
                this.dialogStatus = "editEquipment";

            },

            deleteClick(index,row){
                console.log(index,row);
                this.$alert('确认删除此条记录！', '删除提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(row);
                        if (action==="confirm"){
                            deleteShare(row.sharetitle).then(res =>{
                                this.getShareList();
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
                if ( columnIndex === 0) {
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
            getUsersFromGroup(team){
                console.log(team);
                this.personOptions=[];
                getUserList(team).then(res => {
                    console.log(team);
                    this.personOptionsList = res.data.data;
                    this.personOptionsList.forEach(element =>{
                        this.personOptions.push({"value":element,"label":element})
                    });
                });
            },
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

            getShareList(){
                getShareList().then(res =>{
                    this.tableData=res.data.data;
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
            this.getShareList();
        }
    }
</script>
<style>
    .el-dialog__body{
        padding: 0 20px;
    }
</style>

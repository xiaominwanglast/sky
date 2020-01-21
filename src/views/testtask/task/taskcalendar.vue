<template>
    <div>
        <div>
            <el-select v-model="typevalue" clearable placeholder="请选择任务类型" style="width: 180px">
                <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="groupvalue" clearable placeholder="请选择小组" style="padding-left:5px;width: 180px">
                <el-option
                        v-for="item in groupOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="calendarSearch" style="margin-left: 20px">搜索</el-button>
        </div>
        <!--     <hr/>-->
        <el-calendar v-model="value" id="calendar">
            <!--                 v-loading="true"-->
            <!--                 element-loading-text="拼命加载中"-->
            <!--                 element-loading-spinner="el-icon-loading"-->
            <!--                 element-loading-background="rgba(0, 0, 0, 0.8)"-->


            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                <!--自定义内容-->
                <div>
                    <div class="calendar-day" :style="{color:data.day.split('-')[1]==value.getMonth()+1?'#202535':'#C0C4CC'}">{{ data.day.split('-').slice(2).join('-')}}</div>
                    <div v-for="item in calendarData">
                        <div v-if="item.datetime==data.day">
                            <el-tooltip class="item" effect="dark" :content="item.taskName" placement="right">
                                <div v-if="item.status==0" class="is-selected"><span :style="{color:item.color}">{{item.testPerson}}{{item.taskName}}</span></div>
                                <div v-else class="is-selected_other"><span :style="{color:item.color}">{{item.testPerson}}[上线]{{item.taskName}}</span>
                                </div>
                            </el-tooltip>
                        </div>
                        <div v-else></div>
                    </div>
                </div>
            </template>
        </el-calendar>
    </div>

</template>

<script>
    // import {mapState, mapGetters} from 'vuex'
    import {getUserGroups} from '@/api/share'
    import {getTaskCalendar} from '@/api/task'
    export default {
        name: 'taskcalendar.vue',
        data() {
            return {
                //选组
                groupOptions: [],

                groupvalue: '',

                //筛选任务类型
                typeOptions: [{
                    value: '重点工作',
                    label: '重点工作'
                }, {
                    value: '全部工作',
                    label: '全部工作'
                }],
                typevalue: "",

                calendarData: [],

                value: new Date()
            }
        },
        methods: {
            calendarSearch() {
                console.log(this.groupvalue);
                console.log(this.typevalue);
                this.getTaskCalendar(this.typevalue,this.groupvalue)
            },
            //获取组信息
            getUserGroups() {
                getUserGroups().then(res => {
                    this.number = res.data.max_number;
                    this.getUserGroupsList = res.data.data;
                    this.getUserGroupsList.forEach(element => {
                        if (element.grade===this.number || element.grade===this.number-1){
                            this.groupOptions.push({"value": element.department, "label": element.department})
                        }
                    });
                })
            },

            //获取日历信息(默认获取所有)
            getTaskCalendar(importance,group){
                let importanceStatus=2;
                if(importance==="重点工作" || importance===""){
                    importanceStatus ='1'
                }
                getTaskCalendar(importanceStatus,group).then(res =>{
                    this.calendarData =res.data.data;
                })
            }
        },
        // computed: {
        //     ...mapGetters([
        //         'departmentthird'
        //     ]),
        // },
        created() {
            this.getUserGroups();
            this.getTaskCalendar('1','') //默认importance=1，展示重点工作
        }
    }
</script>

<style >
    .calendar-day {
        text-align: left;
        color: #202535;
    }
    .is-selected {
        color: #11b95c;
        font-size: 13px;
        margin-top: 0;
    }
    .is-selected_other {
        background-color: #FFE4B5;
        font-size: 13px;
        margin-top: 0;
        /*font-weight: bold;*/
        /*color: darkred;*/
    }
    #calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
        content: '当月';
    }
    .el-calendar-table .el-calendar-day {
        height: auto;
        min-height: 110px;
    }
</style>

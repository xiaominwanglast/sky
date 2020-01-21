import axios from './index'

//获取日历信息，参数:任务类型和组信息
export const getTaskCalendar = (importance,team) => {
    return axios.request({
        url: '/api/project/calendar/',
        method: 'get',
        params: {
            importance,team
        }
    })
};

//新建任务
export const addTask = (jsonData) => {
    return axios.request({
        url: '/api/project/task/',
        method: 'post',
        data:jsonData
    })
};

//获取任务列表
export const getTask = (team,month,page,size) => {
    return axios.request({
        url: '/api/project/task/',
        method: 'get',
        params: {
            team,month,page,size
        }
    })
};

//修改任务
export const putTask = (jsonData) => {
    return axios.request({
        url: '/api/project/task/',
        method: 'put',
        data:jsonData
    })
};

//删除任务
export const deleteTask = (taskName) => {
    return axios.request({
        url: '/api/project/task/',
        method: 'delete',
        data: {
            taskName,
        }
    })
};

//检查任务是否重复
export const checkTask = (taskName) => {
    return axios.request({
        url: '/api/project/task/check/',
        method: 'get',
        params: {
            taskName,
        }
    })
};
